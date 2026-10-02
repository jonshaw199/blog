import { ImageResponse } from "next/og";

export const size = {
  width: 2400,
  height: 1260,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at top left, rgba(255,90,54,0.34), transparent 28%), linear-gradient(135deg, #09090b 0%, #121214 55%, #09090b 100%)",
          color: "#f4f4f5",
          padding: "88px",
          fontFamily: "Space Grotesk, Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 48,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            Jon Shaw
          </div>
          <div
            style={{
              fontSize: 152,
              lineHeight: 0.92,
              fontWeight: 700,
              maxWidth: 1640,
            }}
          >
            Software engineer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 32,
          }}
        >
          <div style={{ fontSize: 40, color: "#d4d4d8", maxWidth: 1180 }}>
            Homepage, blog, and links.
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#ff7a5c",
              border: "1px solid rgba(255,122,92,0.5)",
              padding: "18px 24px",
              borderRadius: 999,
            }}
          >
            jonshaw199.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}