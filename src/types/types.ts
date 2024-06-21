import { ChangeEvent } from "react";

export type FileChangeEvent = ChangeEvent<HTMLInputElement>;

export type InputFileProps = {
  onChange: (e: FileChangeEvent) => void;
};

export type ImageState = {
  width: number;
  height: number;
  src: string;
  name: string | undefined;
};
