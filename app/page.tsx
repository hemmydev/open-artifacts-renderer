"use client";

import { useState, createElement } from "react";
import { useComponentRenderer } from "@/lib/hooks/useComponentRenderer";
import { useParentMessaging } from "@/lib/hooks/useParentMessaging";

/**
 * Main application component that renders React components from code strings
 * Communicates with parent window via postMessage API
 */
export default function Home() {
  const [code, setCode] = useState<string | null>(null);

  const { component, error } = useComponentRenderer(code);
  const { contentRef } = useParentMessaging({ onCodeUpdate: setCode });

  if (error) {
    console.error("Component error:", error);
  }

  return <div ref={contentRef}>{component && createElement(component)}</div>;
}
