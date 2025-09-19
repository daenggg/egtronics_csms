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
  const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>({});
  const [isResizing, setIsResizing] = React.useState(false);
  const resizingColumnRef = React.useRef<string | null>(null);
  const startXRef = React.useRef(0);
  const startWidthRef = React.useRef(0);
  const tableRef = React.useRef<HTMLTableElement>(null);

  const handleMouseDown = (e: React.MouseEvent, key: string) => {
    e.preventDefault();
    setIsResizing(true);
    resizingColumnRef.current = key;
    startXRef.current = e.clientX;
    const th = tableRef.current?.querySelector(`th[data-key='${key}']`);
    startWidthRef.current = th?.clientWidth || 0;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingColumnRef.current) return;
      const key = resizingColumnRef.current;
      const deltaX = e.clientX - startXRef.current;
      const newWidth = Math.max(50, startWidthRef.current + deltaX); // 최소 너비 50px
      setColumnWidths(prev => ({ ...prev, [key]: newWidth }));
    };

    const handleMouseUp = () => {
      resizingColumnRef.current = null;
      setIsResizing(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className={cn("w-full overflow-x-auto rounded-md border", className)}>
      <table ref={tableRef} className="min-w-full text-sm" style={{ tableLayout: isResizing || Object.keys(columnWidths).length > 0 ? 'fixed' : 'auto' }}>
        <thead>
          <tr className="bg-muted/50">
            {columns.map((c, colIndex) => {
              const key = String(c.key);
              return (
                <th key={key} data-key={key} style={{ width: columnWidths[key] ? `${columnWidths[key]}px` : undefined }} className={cn("relative text-center font-semibold px-4 py-3 border-b border-border border-r last:border-r-0 whitespace-nowrap", c.className)}>
                  {c.header}
                  <div onMouseDown={(e) => handleMouseDown(e, key)} className="absolute top-0 right-0 h-full w-2 cursor-col-resize" />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row, i) => (
            <tr key={i} className={cn("transition-colors hover:bg-muted/50", i % 2 !== 0 && "bg-muted/25")}>
              {columns.map((c, colIndex) => (
                <td key={String(c.key)} className={cn("px-4 py-3 text-center text-muted-foreground border-r border-border last:border-r-0 overflow-hidden text-ellipsis whitespace-nowrap", c.className)}>
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
