import type { ReactNode } from "react";

type Cols = 3 | 4 | 6 | 8 | 12;

const COL_CLASS: Record<Cols, string> = {
  3: "col-span-12 sm:col-span-6 lg:col-span-3",
  4: "col-span-12 sm:col-span-6 lg:col-span-4",
  6: "col-span-12 lg:col-span-6",
  8: "col-span-12 lg:col-span-8",
  12: "col-span-12",
};

export const CardGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-12 gap-5 md:gap-7 px-6 md:px-10 pb-24">{children}</div>
);

export const Cell = ({ cols, children }: { cols: Cols; children: ReactNode }) => (
  <div className={COL_CLASS[cols]}>{children}</div>
);

export default CardGrid;