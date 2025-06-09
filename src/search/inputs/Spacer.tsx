export default function Spacer({
  size = 16,
  direction = "vertical",
}: {
  size?: number;
  direction?: "vertical" | "horizontal";
}) {
  return (
    <div
      style={
        direction === "vertical"
          ? { height: `${size}px`, width: "100%" }
          : { width: `${size}px`, height: "100%", display: "inline-block" }
      }
    />
  );
}
