const githubAvatar = "https://avatars.githubusercontent.com/u/70325279?v=4";

export const site = {
  name: "Mujibul Haque Tanim",
  shortName: "Tanim",
  role: "Full-Stack AI Engineer",
  url: "https://www.mujibulhaquetanim.dev",
  email: "info@mujibulhaquetanim.dev",
  location: "Chattogram, Bangladesh",
  timeZone: "Asia/Dhaka",
  resume: "/Mujibulhaquetanim-resume.pdf",
  githubUser: "mujibulhaquetanim",
  description:
    "Full-Stack AI Engineer at MeshEver building multi-tenant backends, real-time systems and AI agents with TypeScript, NestJS, Next.js and PostgreSQL.",
  employer: { name: "MeshEver", url: "https://meshever.com" },
  // GitHub photo; also the source of the favicon files in src/app.
  avatar: githubAvatar,
  // The live LinkedIn photo through unavatar.io, so the site follows LinkedIn changes.
  // Falls back to the GitHub photo if LinkedIn can't be read. Allowed in next.config.ts.
  photo: `https://unavatar.io/linkedin/mujibulhaquetanim?fallback=${encodeURIComponent(githubAvatar)}`,
};

export const socials = [
  { label: "GitHub", url: "https://github.com/mujibulhaquetanim" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/mujibulhaquetanim/" },
  { label: "X", url: "https://twitter.com/mmhtanim" },
  { label: "Kaggle", url: "https://www.kaggle.com/mujibulhaque" },
] as const;
