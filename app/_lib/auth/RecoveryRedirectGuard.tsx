"use client";

import { useEffect } from "react";

export default function RecoveryRedirectGuard() {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash.startsWith("#")
      ? window.location.hash.slice(1)
      : window.location.hash;
    const hashParams = new URLSearchParams(hash);

    const queryType = queryParams.get("type");
    const hashType = hashParams.get("type");
    const isRecovery = queryType === "recovery" || hashType === "recovery";

    if (!isRecovery) {
      return;
    }

    const target = `/auth/password-recovery${window.location.search}${window.location.hash}`;
    window.location.replace(target);
  }, []);

  return null;
}
