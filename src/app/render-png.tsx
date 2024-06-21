import satori from "satori";
import { ImageGenerator } from "./ImageGenerator";

interface RenderPNGParams {
  image: { width: number; src: string | undefined };
  settings: { padding: number; shadow: number; radius: number };
}

const convertSVGToPNG = (() => {
  if (typeof window === "undefined") {
    return;
  }

  console.log("Start worker", import.meta.url);

  const worker = new Worker(new URL("./resvg-worker.ts", import.meta.url));

  const pending = new Map();

  worker.onmessage = (e) => {
    const resolve = pending.get(e.data._id);

    if (resolve) {
      resolve(e.data);
      pending.delete(e.data._id);
    }
  };

  return async ({ svg, width }: { svg: string; width: number }) => {
    const message = {
      _id: Math.random(),
      svg,
      width,
    };

    worker.postMessage(message);

    return new Promise((resolve) => {
      pending.set(message._id, resolve);
    });
  };
})();

const CANVAS_SIZE = 400;

export async function renderPNG({ image, settings }: RenderPNGParams) {
  const scale = image.width / CANVAS_SIZE;

  const newSettings = {
    padding: settings.padding * scale,
    shadow: settings.shadow * scale,
    radius: settings.radius * scale,
  };

  const svg = await satori(
    <ImageGenerator settings={newSettings} image={image} />,
    {
      width: image.width,
      fonts: [],
    }
  );

  const messageData = await convertSVGToPNG?.({
    svg,
    width: image.width,
  });

  return messageData;
}
