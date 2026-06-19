import { ImageResponse } from "next/og";

// Open Graph / Twitter card image for the site root.
// Statically generated at build time (no request-time APIs), so it is
// emitted as a real image file during `output: "export"`.

export const alt = "Bart Budak — Software Engineer & Technologist";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Required for `output: "export"` — the image is generated once at build
// time and emitted as a static file.
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(120% 120% at 0% 0%, #0d1f18 0%, #07120d 55%, #050b08 100%)",
          color: "#d4f5e9",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#3ecda0",
          }}
        >
          bartbudak.io
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
              maxWidth: 900,
            }}
          >
            Bart Budak
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: "#7abfa6",
              maxWidth: 940,
            }}
          >
            Software Engineer & Technologist
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            color: "#7abfa6",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#3ecda0",
            }}
          />
          Design systems · Accessibility · eCommerce · Platycerium catalog
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
