"use client";

import { useEffect, useState } from "react";
import { roleVariants, type RoleKey, type RoleVariant } from "@/data/portfolio";

const STORAGE_KEY = "role-variant";

function isRoleKey(v: string | null): v is RoleKey {
  return v !== null && v in roleVariants;
}

/**
 * Which role this visitor came for. A `?for=product` (or ai, llm, backend)
 * link picks the variant and remembers it for the tab, so it survives a trip
 * to /blog and back. A plain visit gets the default.
 */
export function useRoleVariant(): RoleVariant & { key: RoleKey } {
  const [key, setKey] = useState<RoleKey>("default");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("for")?.toLowerCase() ?? null;
    if (isRoleKey(fromUrl)) {
      sessionStorage.setItem(STORAGE_KEY, fromUrl);
      setKey(fromUrl);
      return;
    }
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (isRoleKey(saved)) setKey(saved);
  }, []);

  return { key, ...roleVariants[key] };
}
