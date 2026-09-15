import * as React from "react";

export type InvoiceHistoryItem = Readonly<{
  id: string;
  date: React.ReactNode;
  amount: React.ReactNode;
  status?: React.ReactNode;
  action?: React.ReactNode;
}>;

export type InvoiceHistoryPanelProps = Readonly<{
  title: React.ReactNode;
  description?: React.ReactNode;
  invoices: readonly InvoiceHistoryItem[];
  dateLabel?: React.ReactNode;
  amountLabel?: React.ReactNode;
  statusLabel?: React.ReactNode;
  actionLabel?: React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
}>;

/**
 * Presentation-only invoice history surface. Invoice data, retrieval and every
 * action remain entirely owned by the consuming application.
 */
export function InvoiceHistoryPanel({
  title,
  description,
  invoices,
  dateLabel = "Date",
  amountLabel = "Amount",
  statusLabel = "Status",
  actionLabel = "Action",
  emptyState = "No invoices yet.",
  className,
}: InvoiceHistoryPanelProps) {
  const id = React.useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const rootClassName = [
    "min-w-0 space-y-5 rounded-xl border border-border bg-card p-5 text-card-foreground sm:p-6",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className={rootClassName}
      data-slot="invoice-history-panel"
    >
      <header className="min-w-0 space-y-2">
        <h2 className="break-words text-xl font-semibold" id={titleId}>
          {title}
        </h2>
        {description ? (
          <div
            className="break-words text-sm text-muted-foreground"
            id={descriptionId}
          >
            {description}
          </div>
        ) : null}
      </header>

      {invoices.length === 0 ? (
        <div
          className="rounded-lg border border-dashed border-border bg-background p-5 text-sm text-muted-foreground"
          data-slot="invoice-history-empty"
        >
          {emptyState}
        </div>
      ) : (
        <div className="min-w-0 overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium" scope="col">
                  {dateLabel}
                </th>
                <th className="px-4 py-3 font-medium" scope="col">
                  {amountLabel}
                </th>
                <th className="px-4 py-3 font-medium" scope="col">
                  {statusLabel}
                </th>
                <th className="px-4 py-3 text-right font-medium" scope="col">
                  {actionLabel}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((invoice) => (
                <tr className="bg-background align-middle" key={invoice.id}>
                  <td className="max-w-48 break-words px-4 py-3">
                    {invoice.date}
                  </td>
                  <td className="max-w-48 break-words px-4 py-3 font-medium">
                    {invoice.amount}
                  </td>
                  <td className="max-w-48 break-words px-4 py-3">
                    {invoice.status ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {invoice.action ? (
                      <div className="inline-flex min-w-0 justify-end">
                        {invoice.action}
                      </div>
                    ) : (
                      <span aria-hidden="true">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
