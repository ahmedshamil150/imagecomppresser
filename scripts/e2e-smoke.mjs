import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const BASE = "http://localhost:3000";
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "picshrink-e2e-"));

function makeBmp(file, width, height) {
  const rowSize = Math.floor((24 * width + 31) / 32) * 4;
  const pixelSize = rowSize * height;
  const fileSize = 54 + pixelSize;
  const buf = Buffer.alloc(fileSize);
  buf.write("BM", 0);
  buf.writeUInt32LE(fileSize, 2);
  buf.writeUInt32LE(54, 10);
  buf.writeUInt32LE(40, 14);
  buf.writeInt32LE(width, 18);
  buf.writeInt32LE(height, 22);
  buf.writeUInt16LE(1, 26);
  buf.writeUInt16LE(24, 28);
  buf.writeUInt32LE(pixelSize, 34);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const off = 54 + y * rowSize + x * 3;
      buf[off] = Math.floor((x * 255) / width);
      buf[off + 1] = Math.floor(((x + y) * 255) / (width + height));
      buf[off + 2] = Math.floor((y * 255) / height);
    }
  }
  fs.writeFileSync(file, buf);
  return fileSize;
}

const checks = [];
function check(name, cond, detail = "") {
  checks.push({ name, ok: Boolean(cond), detail });
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

const imgA = path.join(tmp, "test-a.bmp");
const imgB = path.join(tmp, "test-b.bmp");
const sizeA = makeBmp(imgA, 1200, 900);
makeBmp(imgB, 1200, 900);
console.log(`test image: ${sizeA} bytes BMP, 1200x900`);

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage();
const pageErrors = [];
page.on("pageerror", (err) => pageErrors.push(String(err)));
page.on("console", (msg) => {
  if (msg.type() === "error") {
    const loc = msg.location()?.url || "";
    pageErrors.push(`console: ${loc} ${msg.text()}`);
  }
});

try {
  await page.goto(BASE, { waitUntil: "networkidle" });
  check("home page loads", (await page.locator("h1").count()) > 0);

  await page.setInputFiles('input[type="file"]', [imgA, imgB]);
  await page
    .getByRole("button", { name: "Download all (ZIP)" })
    .waitFor({ state: "visible", timeout: 30000 });
  const cards = page.locator("li").filter({ hasText: /×/ });
  check("both files processed with savings %", (await cards.count()) >= 2, `${await cards.count()} cards`);
  const firstCard = await cards.first().innerText();
  check("result shows BMP → WebP with savings", /webp/i.test(firstCard) && /%/.test(firstCard), firstCard.replace(/\n/g, " | ").slice(0, 120));

  await page.selectOption("#tool-resize-mode", "percent");
  await page
    .locator("li")
    .filter({ hasText: "600×450" })
    .first()
    .waitFor({ state: "visible", timeout: 30000 });
  check("resize mode default 50% → 600×450", true);

  await page.fill("#tool-resize-value", "75");
  await page
    .locator("li")
    .filter({ hasText: "900×675" })
    .first()
    .waitFor({ state: "visible", timeout: 30000 });
  check("resize value input 75% → 900×675", true);

  await page.selectOption("#tool-format", "image/avif");
  let avifSeen = false;
  for (let i = 0; i < 20; i++) {
    await page.waitForTimeout(3000);
    const texts = await page.locator("li").filter({ hasText: /×/ }).allInnerTexts().catch(() => []);
    if (texts.every((t) => t.includes("AVIF"))) {
      avifSeen = true;
      break;
    }
    console.log(`  waiting AVIF T+${(i + 1) * 3}s:`, JSON.stringify(texts).slice(0, 200));
  }
  check("AVIF output (WASM encoder)", avifSeen, avifSeen ? "both cards re-encoded to AVIF" : `errors: ${pageErrors.slice(-3).join(" ;; ")}`);

  const [dl1] = await Promise.all([
    page.waitForEvent("download", { timeout: 15000 }),
    page
      .locator("li")
      .filter({ hasText: "AVIF" })
      .first()
      .getByRole("button", { name: "Download" })
      .click(),
  ]);
  check("single file download", (await dl1.suggestedFilename()).endsWith("-picshrink.avif"), await dl1.suggestedFilename());

  const [dl2] = await Promise.all([
    page.waitForEvent("download", { timeout: 30000 }),
    page.getByRole("button", { name: "Download all (ZIP)" }).click(),
  ]);
  check("ZIP download-all", (await dl2.suggestedFilename()).endsWith(".zip"), await dl2.suggestedFilename());

  const converter = await browser.newPage();
  await converter.goto(`${BASE}/png-to-jpg`, { waitUntil: "networkidle" });
  check("converter page renders tool", (await converter.locator("#tool-format").count()) === 0 && (await converter.locator('input[type="file"]').count()) > 0, "format locked to JPG preset");
  await converter.close();

  const fatal = pageErrors.filter(
    (e) => !/net::ERR|favicon|adsbygoogle|_vercel\/insights|ERR_ABORTED/i.test(e),
  );
  check("no page/JS errors during run", fatal.length === 0, fatal.slice(0, 3).join(" ;; ") || "clean");
} catch (err) {
  check("test run completed", false, String(err).slice(0, 300));
} finally {
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
}

const failed = checks.filter((c) => !c.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed`);
process.exit(failed.length ? 1 : 0);
