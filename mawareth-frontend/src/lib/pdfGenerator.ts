import { EstateCalculation, formatCurrency, formatPercentage, formatFraction } from "./shariaCalculator";

export function generatePDF(calculation: EstateCalculation) {
  // Create PDF content as HTML that can be printed
  const pdfContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Estate Calculation - Mawareth</title>
      <style>
        @page {
          size: A4;
          margin: 2cm;
        }
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          text-align: center;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .header h1 {
          color: #2563eb;
          margin: 0;
          font-size: 32px;
        }
        .header p {
          color: #666;
          margin: 5px 0;
        }
        .summary {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          text-align: center;
        }
        .summary .amount {
          font-size: 36px;
          font-weight: bold;
          color: #2563eb;
          margin: 10px 0;
        }
        .heir-section {
          margin-bottom: 30px;
        }
        .heir-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 15px;
          page-break-inside: avoid;
        }
        .heir-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e5e7eb;
        }
        .heir-name {
          font-size: 20px;
          font-weight: bold;
          color: #1f2937;
          margin: 0;
        }
        .heir-relationship {
          color: #6b7280;
          font-size: 14px;
          text-transform: capitalize;
        }
        .heir-amount {
          text-align: right;
        }
        .heir-amount .amount {
          font-size: 24px;
          font-weight: bold;
          color: #2563eb;
        }
        .heir-amount .fraction {
          color: #6b7280;
          font-size: 14px;
        }
        .legal-basis {
          background: #f9fafb;
          padding: 15px;
          border-radius: 6px;
          border-left: 4px solid #2563eb;
        }
        .legal-basis strong {
          color: #1f2937;
        }
        .legal-basis p {
          margin: 5px 0;
          color: #4b5563;
          font-size: 14px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
        .disclaimer {
          background: #fef3c7;
          border: 1px solid #fbbf24;
          padding: 15px;
          border-radius: 8px;
          margin-top: 30px;
          page-break-inside: avoid;
        }
        .disclaimer strong {
          color: #92400e;
        }
        .disclaimer p {
          margin: 5px 0;
          font-size: 13px;
          color: #78350f;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
        }
        th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        th {
          background: #f9fafb;
          font-weight: bold;
          color: #1f2937;
        }
        @media print {
          body {
            padding: 0;
          }
          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Mawareth</h1>
        <p>Sharia Inheritance Calculation Report</p>
        <p>Date: ${new Date(calculation.calculationDate).toLocaleDateString('en-EG', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
      </div>

      <div class="summary">
        <h2>Estate Summary</h2>
        <div class="amount">${formatCurrency(calculation.totalEstate)}</div>
        <p>Total Estate Value</p>
        <p>${calculation.results.length} Beneficiaries</p>
      </div>

      <div class="heir-section">
        <h2>Inheritance Distribution</h2>
        
        ${calculation.results.map(result => `
          <div class="heir-card">
            <div class="heir-header">
              <div>
                <h3 class="heir-name">${result.name}</h3>
                <p class="heir-relationship">${result.relationship}</p>
              </div>
              <div class="heir-amount">
                <div class="amount">${formatCurrency(result.amount)}</div>
                <div class="fraction">${formatFraction(result.share)} • ${formatPercentage(result.percentage)}</div>
              </div>
            </div>
            <div class="legal-basis">
              <strong>Legal Basis:</strong>
              <p>${result.basis}</p>
            </div>
          </div>
        `).join('')}
      </div>

      ${calculation.remainingEstate > 0 ? `
        <div class="heir-card" style="background: #fef3c7; border-color: #fbbf24;">
          <div class="heir-header">
            <div>
              <h3 class="heir-name">Remaining Estate</h3>
              <p class="heir-relationship">Unclaimed Share</p>
            </div>
            <div class="heir-amount">
              <div class="amount">${formatCurrency(calculation.remainingEstate)}</div>
            </div>
          </div>
          <p style="margin: 10px 0; color: #78350f;">
            This remaining amount should be distributed according to state laws or the deceased's will.
          </p>
        </div>
      ` : ''}

      <table>
        <thead>
          <tr>
            <th>Beneficiary</th>
            <th>Relationship</th>
            <th>Share</th>
            <th>Percentage</th>
            <th>Amount (EGP)</th>
          </tr>
        </thead>
        <tbody>
          ${calculation.results.map(result => `
            <tr>
              <td>${result.name}</td>
              <td style="text-transform: capitalize;">${result.relationship}</td>
              <td>${formatFraction(result.share)}</td>
              <td>${formatPercentage(result.percentage)}</td>
              <td>${formatCurrency(result.amount)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="disclaimer">
        <strong>Legal Disclaimer</strong>
        <p>
          This calculation is prepared according to Sharia inheritance principles (Faraid) and Egyptian inheritance law. 
          The distribution follows the guidelines specified in the Holy Quran and authenticated Hadith.
        </p>
        <p>
          <strong>Important:</strong> This document is for informational purposes only and should be verified by a qualified 
          Islamic scholar and legal professional before submission to any Egyptian court or official authority. 
          Mawareth is not responsible for any legal consequences arising from the use of this calculation.
        </p>
        <p>
          For official legal proceedings, please consult with:
        </p>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>A certified Islamic inheritance scholar (Faqih)</li>
          <li>A licensed Egyptian attorney specializing in inheritance law</li>
          <li>The Egyptian Ministry of Justice for official documentation</li>
        </ul>
      </div>

      <div class="footer">
        <p><strong>Mawareth</strong> - Simplifying Inheritance in Egypt</p>
        <p>This document was generated on ${new Date().toLocaleDateString('en-EG')} at ${new Date().toLocaleTimeString('en-EG')}</p>
        <p>© ${new Date().getFullYear()} Mawareth. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;

  // Open print dialog with the PDF content
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
    }, 250);
  }
}
