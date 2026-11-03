import { toolbox } from "@/content/profile";

// The tools I use, grouped by the problem they solve; on the home and about pages.
export function ToolboxList() {
  return (
    <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
      {toolbox.map(({ group, items }) => (
        <div key={group} className="reveal border-t border-line pt-4">
          <dt className="font-bold">{group}</dt>
          <dd className="mt-1 text-ink-2">{items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}
