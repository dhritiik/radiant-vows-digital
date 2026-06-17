"use client";

import { RegionProvider } from "@/contexts/RegionContext";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return <RegionProvider>{children}</RegionProvider>;
}
