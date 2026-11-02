import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Drawn in the default (Bento) theme: slate tile on a slate page, with the avatar.
export default async function OpengraphImage() {
  // Read from disk rather than fetching the GitHub avatar, so the build never waits on the network.
  const avatar = await readFile(join(process.cwd(), "src/app/apple-icon.png"));
  const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 40,
          background: "#334155",
          backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          color: "#f8fafc",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            borderRadius: 28,
            border: "2px solid rgba(255,255,255,0.12)",
            background: "rgba(71,85,105,0.85)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <img src={avatarSrc} width={96} height={96} alt="" style={{ borderRadius: 999, border: "3px solid #f8fafc" }} />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 34, fontWeight: 700 }}>{site.name}</div>
              <div style={{ fontSize: 26, color: "#4ade80" }}>{site.role} at MeshEver</div>
            </div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>
            I build multi-tenant backends, real-time systems and AI agents.
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#cbd5e1" }}>
            TypeScript, NestJS, Next.js, PostgreSQL, LangGraph
            <div style={{ marginLeft: "auto", color: "#7dd3fc" }}>mujibulhaquetanim.dev</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
