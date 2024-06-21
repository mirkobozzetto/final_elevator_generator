"use client";

import { ImageState } from "@/types/types";
import { useState } from "react";
import { ImageGenerator } from "./ImageGenerator";
import { renderPNG } from "./render-png";

export default function Home() {
  const [image, setImage] = useState<ImageState | undefined>(undefined);
  const [settings, setSettings] = useState({
    padding: 16,
    shadow: 10,
    radius: 16,
  });

  const [loading, setLoading] = useState<"downloading" | "copying" | false>(
    false
  );

  const setSetting = (key: string, value: number) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const fileName = file?.name;
    const reader = new FileReader();

    reader.onloadend = () => {
      const img = new Image();
      img.onload = () =>
        setImage({
          src: img.src,
          width: img.width,
          height: img.height,
          name: fileName,
        });
      img.src = reader.result as string;
    };

    reader.readAsDataURL(file!);
  };

  const handleDownload = async (isCopy: boolean) => {
    setLoading(isCopy ? "copying" : "downloading");
    const blob = (await renderPNG({
      image: image!,
      settings,
    })) as Blob;

    const url = URL.createObjectURL(blob);

    if (isCopy) {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
    } else {
      const a = document.createElement("a");
      a.href = url;
      a.download = `${image?.name}.png`;
      a.click();
    }

    setLoading(false);
  };

  return (
    <div className="flex max-lg:flex-col justify-center gap-8 lg:gap-16 m-auto px-4 py-8 w-full max-w-4xl min-h-full text-black">
      <div className="flex flex-1 justify-center items-center">
        <div className="flex-1 bg-base-200 shadow-xl max-w-lg card">
          <div className="card-body">
            <h2 className="card-title">Settings</h2>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">File</span>
              </div>
              <input
                type="file"
                onChange={handleImageUpload}
                className="file-input-bordered w-full max-w-xs file-input file-input-primary file-input-sm"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Padding</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.padding}
                onChange={(e) => setSetting("padding", Number(e.target.value))}
                className="range range-primary range-sm"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Shadow</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.shadow}
                onChange={(e) => setSetting("shadow", Number(e.target.value))}
                className="range range-primary range-sm"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Radius</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.radius}
                onChange={(e) => setSetting("radius", Number(e.target.value))}
                className="range range-primary range-sm"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-center items-center gap-4 m-auto w-full max-w-lg">
        <div className="border rounded-md w-full h-96 overflow-hidden">
          {image && <ImageGenerator settings={settings} image={image} />}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="btn btn-primary"
            disabled={!image || Boolean(loading)}
            onClick={() => {
              handleDownload(false);
            }}
          >
            Download
            {loading && loading === "downloading" ? (
              <span className="loading loading-sm loading-spinner"></span>
            ) : null}
          </button>

          <button
            className="btn"
            disabled={!image || Boolean(loading)}
            onClick={() => {
              handleDownload(true);
            }}
          >
            Copy{" "}
            {loading === "copying" ? (
              <span className="loading loading-sm loading-spinner"></span>
            ) : null}
          </button>
        </div>
      </div>
    </div>
  );
}
