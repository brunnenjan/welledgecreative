// src/components/WhiteSpacer.tsx
export default function WhiteSpacer() {
  return (
    <div
      className="bg-white"
      style={{
        height: "100vh",
        minHeight: "100vh",
      }}
      aria-hidden="true"
    />
  );
}
