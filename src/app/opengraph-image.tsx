import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "72px 80px",
          background: "#edf0ee",
          color: "#17201c",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 700 }}>{site.name}</div>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
          I build multi-tenant backends, real-time systems and AI agents.
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#55615c" }}>
          {site.role} at MeshEver, Chattogram
          <div style={{ marginLeft: "auto", color: "#2443d6" }}>mujibulhaquetanim.dev</div>
        </div>
      </div>
    ),
    size,
  );
}
