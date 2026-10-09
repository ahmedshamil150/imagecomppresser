"use client";

import { useEffect, useState } from "react";
import { getConsent } from "@/lib/consent";
import { ADSENSE_CLIENT } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface Props {
  slot: string;
  className?: string;
}

export default function AdSlot({ slot, className = "" }: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const update = () => setActive(getConsent() === "accepted");
    update();
    window.addEventListener("consent-changed", update);
    return () => window.removeEventListener("consent-changed", update);
  }, []);

  useEffect(() => {
    if (!active) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet or blocked
    }
  }, [active]);

  if (!ADSENSE_CLIENT || !active) return null;

  return (
    <div className={`ad-slot my-6 flex min-h-[110px] justify-center ${className}`}>
      {/* data-ad-client will be populated from NEXT_PUBLIC_ADSENSE_CLIENT */}
      <ins
        className="adsbygoogle block w-full"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
