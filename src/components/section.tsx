import type { ReactNode } from "react";

// Section name and a one-line purpose sit in a narrow left column; content takes the rest.
export function Section({
  id,
  title,
  intro,
  children,
}: {
  id?: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className="mx-auto grid max-w-[1180px] scroll-mt-20 gap-x-8 gap-y-6 px-5 pt-20 sm:px-8 lg:grid-cols-12 lg:pt-28"
    >
      <header className="lg:col-span-3">
        <div className="lg:sticky lg:top-24">
          <h2 id={id ? `${id}-title` : undefined} className="text-[1.3125rem] font-bold leading-tight tracking-tight">
            {title}
          </h2>
          {intro && <p className="mt-2 max-w-[34ch] text-[0.9375rem] text-ink-2">{intro}</p>}
        </div>
      </header>
      <div className="min-w-0 lg:col-span-9">{children}</div>
    </section>
  );
}

export function PageIntro({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-16 sm:px-8 lg:pt-24">
      <h1 className="max-w-[18ch] text-[clamp(2.25rem,5.5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
        {title}
      </h1>
      {children && <div className="mt-5 max-w-[60ch] text-lg text-ink-2">{children}</div>}
    </div>
  );
}
