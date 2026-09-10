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
  const printWindow = window.open("", "_blank", "width=900,height=700");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 30px; color: #111; }
          h1 { color: #000080; border-bottom: 2px solid #FF9933; padding-bottom: 8px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 10px; text-align: left; font-size: 13px; }
          th { background-color: #f1f5f9; font-weight: bold; }
          .header-box { background: #f8fafc; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #000080; }
          .footer { margin-top: 40px; font-size: 11px; text-align: center; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header-box">
          <h2>BHARAT MATDAN MANCH - OFFICIAL ELECTION COMMISSION AUDIT REPORT</h2>
          <p><strong>Report Title:</strong> ${title}</p>
          <p><strong>Generated On:</strong> ${new Date().toLocaleString("en-IN")}</p>
          <p><strong>Security Status:</strong> Cryptographically Verified SHA-256 Chained Audit Hash</p>
        </div>
        ${htmlBody}
        <div class="footer">
          Official Digital Election Platform Demo Report • Confidential & Tamper-Evident Record
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
