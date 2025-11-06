import { useState, useEffect } from "react";
import type { ComponentType } from "react";
import { transformToComponent } from "../transform";

/**
 * Hook to transform and render React components from code strings
 */
export function useComponentRenderer(code: string | null) {
  const [component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!code) {
      setComponent(null);
      setError(null);
      return;
    }

    try {
      const newComponent = transformToComponent(code);
      setComponent(() => newComponent);
      setError(null);
    } catch (err) {
      console.error("Failed to transform component:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setComponent(null);
    }
  }, [code]);

  return { component, error };
}
