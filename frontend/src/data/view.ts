export type View = "all" | "software" | "mechatronics";

export const VIEWS: { value: View; label: string }[] = [
  { value: "all", label: "All" },
  { value: "software", label: "Software" },
  { value: "mechatronics", label: "Mechatronics" },
];

export const DEFAULT_VIEW: View = "software";

/** Lower numbers come first. A missing key means "not shown in that view". */
export type ViewRank = { software?: number; mechatronics?: number };

export const isVisibleInView = (rank: ViewRank, view: View) =>
  view === "all" || rank[view] !== undefined;

const fallbackRank = (rank: ViewRank) =>
  rank.software ?? (rank.mechatronics !== undefined ? 100 + rank.mechatronics : 999);

export const rankInView = (rank: ViewRank, view: View) =>
  view === "mechatronics"
    ? rank.mechatronics ?? 100 + fallbackRank(rank)
    : fallbackRank(rank);

export const sortForView = <T>(items: T[], getRank: (item: T) => ViewRank, view: View) =>
  items
    .filter((item) => isVisibleInView(getRank(item), view))
    .sort((a, b) => rankInView(getRank(a), view) - rankInView(getRank(b), view));
