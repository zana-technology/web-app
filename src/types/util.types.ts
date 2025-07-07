export interface Step {
  step: number;
  title: string;
  route: string;
}

export type Option<T = unknown> = {
  label: string;
  value: string;
} & T;

export interface FileWithPreview extends File {
  preview?: string;
  originalUrl?: string;
}
