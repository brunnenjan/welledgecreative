// src/components/BlankDelaySection.tsx

export default function BlankDelaySection() {
  return (
    <section
      className="blank-delay-section hidden lg:block"
      style={{
        height: '100vh',
        background: '#fff'
      }}
      aria-hidden="true"
    />
  );
}
