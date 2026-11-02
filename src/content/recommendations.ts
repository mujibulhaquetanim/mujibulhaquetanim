import data from "@/content/recommendations.json";

/*
  Recommendations are edited in the CMS at /admin (Decap, see public/admin/config.yml),
  which commits recommendations.json. `enabled` shows or hides the whole page and its
  nav link. Only add real recommendations, quoted as written.
*/
export type Recommendation = {
  name: string;
  role: string;
  relationship: string;
  quote: string;
  url?: string;
  date?: string;
};

export const recommendations = {
  enabled: Boolean(data.enabled) && data.items.length > 0,
  items: data.items as Recommendation[],
};
