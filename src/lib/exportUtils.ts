/**
 * Export data array to CSV file download
 */
export function exportToCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(","),
    ...rows.map(row =>
      headers
        .map(header => {
          let val = row[header] ?? "";
          if (typeof val === "string") {
            val = `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        })
        .join(",")
    )
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Triggers printable PDF view format window
 */
export function printAuditReport(title: string, htmlBody: string) {
  const printWindow = window.open("", "_blank", "width=850,height=750");
  if (!printWindow) return;

  const fullContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <meta charset="utf-8" />
        <style>
          body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 30px; color: #0f172a; background: #ffffff; }
          h1, h2, h3 { color: #0b132b; margin: 0 0 10px 0; }
          .receipt-box { background: #f8fafc; border: 2px solid #000080; border-radius: 12px; padding: 24px; margin: 20px 0; }
          .header-box { background: linear-gradient(to right, #ff9933, #ffffff, #138808); padding: 14px 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-weight: bold; color: #0f172a; border: 1px solid #cbd5e1; }
          .footer { margin-top: 30px; font-size: 11px; text-align: center; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 12px; }
          .hash-code { font-family: monospace; font-size: 16px; font-weight: bold; color: #000080; background: #e2e8f0; padding: 6px 12px; border-radius: 6px; display: inline-block; word-break: break-all; }
          .btn-print { padding: 10px 20px; background: #000080; color: #ffffff; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .btn-print:hover { background: #1e1b4b; }
          @media print {
            .no-print { display: none !important; }
            body { margin: 10px; }
          }
        </style>
      </head>
      <body>
        <div class="header-box">
          BHARAT MATDAN MANCH — INDIA DIGITAL ELECTION PLATFORM
        </div>
        <div class="no-print" style="margin-bottom: 15px; text-align: right;">
          <button onclick="window.print()" class="btn-print">🖨️ Print / Save PDF Receipt</button>
        </div>
        ${htmlBody}
        <div class="footer">
          Official Digital Election Infrastructure • 18th Lok Sabha General Elections 2026<br/>
          Cryptographically Verified & Tamper-Evident SHA-256 Record
        </div>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(fullContent);
  printWindow.document.close();

  setTimeout(() => {
    try {
      printWindow.focus();
      printWindow.print();
    } catch (e) {}
  }, 300);
}

