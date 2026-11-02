import { FaKeyboard } from "react-icons/fa";
import { CountUp } from "@/components/bento/count-up";
import { stats } from "@/content/profile";

export function ImpactTile() {
  return (
    <section aria-label="By the numbers" className="tile flex h-full flex-col gap-2 p-3 xl:p-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-300 xl:text-sm">By the numbers</h2>
      <ul className="grid flex-1 grid-cols-2 gap-2">
        {stats.map(({ to, suffix, label, href }) => {
          const body = (
            <>
              <span className="font-[family-name:var(--font-bricolage)] text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-2xl xl:text-4xl short:text-2xl">
                <CountUp to={to} suffix={suffix} />
              </span>
              <span className="flex items-center gap-1 text-[10px] leading-tight text-slate-300 xl:text-xs">
                {href && <FaKeyboard aria-hidden className="shrink-0" />}
                {label}
              </span>
            </>
          );
          const cell =
            "flex h-full flex-col justify-center gap-0.5 rounded-xl border border-white/5 bg-black/15 px-3 py-2 transition-[background-color,transform] duration-300 ease-out-quint hover:bg-black/25";
          return (
            <li key={label}>
              {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className={`${cell} hover:-translate-y-0.5`}>
                  {body}
                </a>
              ) : (
                <div className={cell}>{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
