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

export enum ResourceType {
  Avatar = "avatar",
  Document = "document",
}

export interface UploadedResourceDto {
  id: string;
  name: string;
  size: number;
  url: string;
  type: "image" | "video" | "document" | "other" | string;
  format: "pdf" | "jpg" | "png" | "docx" | string;
}
