import { useEffect, useCallback, useRef } from "react";
import type { IframeMessage, ParentMessage, SelectionArea } from "../types";
import { captureScreenshots } from "../capture";

interface UseParentMessagingOptions {
  onCodeUpdate: (code: string) => void;
}

/**
 * Hook to handle communication with parent window via postMessage
 */
export function useParentMessaging({ onCodeUpdate }: UseParentMessagingOptions) {
  const contentRef = useRef<HTMLDivElement>(null);

  const sendToParent = useCallback((message: ParentMessage) => {
    window.parent.postMessage(message, "*");
  }, []);

  const handleCaptureSelection = useCallback(
    async (selection: SelectionArea) => {
      if (!contentRef.current) return;

      try {
        const screenshots = await captureScreenshots(contentRef.current, selection);
        sendToParent({
          type: "SELECTION_DATA",
          data: screenshots,
        });
      } catch (err) {
        console.error("Failed to capture selection:", err);
      }
    },
    [sendToParent]
  );

  useEffect(() => {
    // Notify parent that iframe is ready
    sendToParent({ type: "INIT_COMPLETE" });

    const handleMessage = (event: MessageEvent<IframeMessage>) => {
      const { type } = event.data;

      if (type === "UPDATE_COMPONENT") {
        onCodeUpdate(event.data.code);
      } else if (type === "CAPTURE_SELECTION") {
        handleCaptureSelection(event.data.selection);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [sendToParent, onCodeUpdate, handleCaptureSelection]);

  return { contentRef };
}
