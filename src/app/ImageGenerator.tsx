/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

export const ImageGenerator = (props: {
  image: { src: string | undefined };
  settings: { padding: number; shadow: number; radius: number };
}) => {
  if (!props.image) {
    return <p className="p-4 text-center">Upload an image first.</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        padding: props.settings.padding,
      }}
    >
      <img
        src={props.image.src}
        style={{
          boxShadow: `0 0 ${props.settings.shadow}px rgba(0,0,0,.${props.settings.shadow})`,
          borderRadius: props.settings.radius,
          display: "flex",
        }}
      />
    </div>
  );
};
