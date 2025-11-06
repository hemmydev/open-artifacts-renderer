import html2canvas from "html2canvas";
import type { SelectionArea } from "./types";

/**
 * Captures screenshots of an element
 */
export async function captureScreenshots(
  element: HTMLElement,
  selection?: SelectionArea
): Promise<{ selectionImg: string; artifactImg: string }> {
  const [selectionCanvas, artifactCanvas] = await Promise.all([
    selection
      ? html2canvas(element, {
          x: selection.x,
          y: selection.y,
          width: selection.width,
          height: selection.height,
          logging: false,
          useCORS: true,
        })
      : html2canvas(element, { logging: false, useCORS: true }),
    html2canvas(element, { logging: false, useCORS: true }),
  ]);

  return {
    selectionImg: selectionCanvas.toDataURL("image/png"),
    artifactImg: artifactCanvas.toDataURL("image/png"),
  };
}
