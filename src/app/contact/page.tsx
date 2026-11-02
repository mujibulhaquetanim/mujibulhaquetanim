import type { Metadata } from "next";
import { ContactForm } from "@/components/forms";
import { PageIntro } from "@/components/section";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name} about a role, a project or a question.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Get in touch">
        <p>
          A role, a project, or a question about something I wrote. The message comes straight to my
          inbox, and I reply from {site.email}.
        </p>
      </PageIntro>
      <div className="mx-auto max-w-[1180px] px-5 pt-12 sm:px-8">
        <ContactForm />
      </div>
    </>
  );
}
