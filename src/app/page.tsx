"use client";

import InputFile from "@/components/inputs/InputFile";
import { FileChangeEvent, ImageState } from "@/types/types";
import { handleFileChange } from "@/utils/handleFileChange";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<ImageState | undefined>(undefined);

  const handleFileChangeWrapper = (e: FileChangeEvent) => {
    handleFileChange(e, setImage);
  };

  return (
    <main className="flex lg:flex-row flex-col justify-center items-center gap-8 m-auto max-w-4xl min-h-full">
      <div className="bg-indigo-100 shadow-xl w-96 card">
        <div className="card-body">
          <InputFile onChange={handleFileChangeWrapper} />
        </div>
      </div>
    </main>
  );
}
