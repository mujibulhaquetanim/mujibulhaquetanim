import { FaKeyboard } from "react-icons/fa";
import { CountUp } from "@/components/bento/count-up";
import { stats } from "@/content/profile";

export function ImpactTile() {
  return (
    <section aria-label="By the numbers" className="tile flex h-full flex-col gap-2.5 p-3 xl:p-4">
      <h2 className="text-base font-bold leading-tight text-white xl:text-lg">By the numbers</h2>
      <ul className="grid flex-1 grid-cols-2 gap-2">
        {stats.map(({ to, suffix, label, href }) => {
          // Label on top, figure anchored to the bottom, so a tall cell reads as one block.
          const body = (
            <>
              <span className="flex items-start gap-1 text-[10px] leading-tight text-slate-300 xl:text-xs">
                {href && <FaKeyboard aria-hidden className="mt-px shrink-0" />}
                {label}
              </span>
              <span className="font-[family-name:var(--font-bricolage)] text-2xl font-bold leading-none tracking-tight text-white sm:text-3xl lg:text-2xl xl:text-4xl short:text-2xl">
                <CountUp to={to} suffix={suffix} />
              </span>
            </>
          );
          const cell =
            "flex h-full flex-col justify-between gap-3 rounded-xl border border-white/[0.06] bg-black/15 px-3 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-[background-color,border-color,transform] duration-300 ease-out-quint hover:border-white/15 hover:bg-black/25 xl:py-3";
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
