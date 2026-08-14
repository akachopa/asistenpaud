"use client";

import { useEffect } from "react";

export function SWRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // offline shell opsional; kegagalan registrasi tidak mengganggu aplikasi
      });
    }
  }, []);
  return null;
}
