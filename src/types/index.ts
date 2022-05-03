export type ToolOperation = (x: number, y: number) => void;
export type ToolOperationEnd = (x: number, y: number) => void;

export interface Tool {
  name: string,
  img: string,
  pointer: string,
  isActive: boolean,
  toolOperation: ToolOperation,
  toolOperationEnd: ToolOperationEnd,
}
