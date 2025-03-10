"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function WhatsAppChat() {
  return (
    <>
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        strategy="afterInteractive"
      />
      <div
        className="elfsight-app-19bb2330-4f74-44ef-98bd-be340a1e2333"
        data-elfsight-app-lazy
      ></div>
    </>
  );
}
