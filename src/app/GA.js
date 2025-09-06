"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GA_ID = "G-HBSHMTFK39"; // ou process.env.NEXT_PUBLIC_GA_ID

export default function GA() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (!window.gtag) return;
    const url = pathname + (search?.toString() ? `?${search}` : "");
    window.gtag("config", GA_ID, { page_path: url });
  }, [pathname, search]);

  return null;
}
