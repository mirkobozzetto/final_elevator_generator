import { FileChangeEvent, ImageState } from "@/types/types";

export const handleFileChange = (
  e: FileChangeEvent,
  setImage: (image: ImageState | undefined) => void
) => {
  const files = e.target.files;
  const file = files?.[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const imgElement = new Image();
      imgElement.onload = () => {
        if (typeof reader.result === "string") {
          setImage({
            width: imgElement.width,
            height: imgElement.height,
            src: reader.result,
            name: file.name,
          });
        }
      };
      imgElement.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    setImage(undefined);
  }
};
