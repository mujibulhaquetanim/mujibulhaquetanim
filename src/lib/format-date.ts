const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// "3 November 2026" from an ISO date ("2026-11-03"), the same on the server and in any time zone.
export const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));
