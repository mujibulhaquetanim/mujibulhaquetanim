import { CopyEmail } from "@/components/copy-email";
import { LocalTime } from "@/components/local-time";
import { site, socials } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-[1.05] tracking-tight">
            Have a role or a project in mind?
          </h2>
          <p className="mt-3 max-w-[52ch] text-ink-2">
            Email is the fastest way to reach me. I&apos;m in {site.location}, and
            happy to work with teams in other time zones.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={`mailto:${site.email}`} className="btn btn-solid">
              {site.email}
            </a>
            <CopyEmail />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 text-[0.9375rem] lg:col-span-4 lg:col-start-9">
          <div>
            <h3 className="font-semibold">Elsewhere</h3>
            <ul className="mt-3 space-y-1.5 text-ink-2">
              {socials.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="link hover:text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Local time</h3>
            <p className="mt-3 text-ink-2">
              <LocalTime />
            </p>
            <a href={site.resume} download className="link mt-4 inline-block text-ink-2 hover:text-ink">
              Download résumé (PDF)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
