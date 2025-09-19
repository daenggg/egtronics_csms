import * as React from "react";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (row: T) => React.ReactNode;
};

export type TableProps<T> = {
  columns: Array<Column<T>>;
  data: Array<T>;
  className?: string;
};

export function Table<T>({ columns, data, className }: TableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto rounded-md", className)} style={{ border: "1px solid var(--border)", background: "#fff" }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ background: "#EEF6FF" }}>
            {columns.map((c) => (
              <th key={String(c.key)} className={cn("text-left font-semibold px-4 py-2", c.className)} style={{ color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-[#F8FAFC]" : undefined}>
              {columns.map((c) => (
                <td key={String(c.key)} className={cn("px-4 py-2", c.className)} style={{ color: "var(--foreground)", borderBottom: "1px solid var(--border)" }}>
                  {c.render ? c.render(row) : (row as any)[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;


