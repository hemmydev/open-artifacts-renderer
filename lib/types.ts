/**
 * Message types for parent-iframe communication
 */
export type ParentMessage =
  | { type: "INIT_COMPLETE" }
  | { type: "SELECTION_DATA"; data: { selectionImg: string; artifactImg: string } };

export type IframeMessage =
  | { type: "UPDATE_COMPONENT"; code: string }
  | { type: "CAPTURE_SELECTION"; selection: SelectionArea };

/**
 * Screenshot selection area
 */
export interface SelectionArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Code transformation result
 */
export interface TransformResult {
  modifiedCode: string;
  componentName: string | null;
}
