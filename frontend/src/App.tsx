export default function App() {
  return (
    <main
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "var(--container-pad)",
      }}
    >
      <span
        style={{
          fontSize: "var(--fs-xs)",
          color: "var(--color-text-subtle)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom: "var(--space-4)",
        }}
      >
        Pedra Lunar
      </span>
      <h1 style={{ fontSize: "var(--fs-5xl)", maxWidth: "18ch" }}>
        3D Lab
      </h1>
      <p
        style={{
          marginTop: "var(--space-5)",
          maxWidth: "46ch",
          color: "var(--color-text-muted)",
        }}
      >
        Grid de fundo com degradê renderizando. Base visual pronta para receber
        o layout definitivo.
      </p>
    </main>
  );
}