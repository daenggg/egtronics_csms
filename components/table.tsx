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
    <div className={cn("w-full overflow-x-auto rounded-md border", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50">
            {columns.map((c) => (
              <th key={String(c.key)} className={cn("text-left font-semibold px-4 py-3 border-b", c.className)}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-muted/50 transition-colors">
              {columns.map((c) => (
                <td key={String(c.key)} className={cn("px-4 py-3 text-muted-foreground", c.className)}>
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
