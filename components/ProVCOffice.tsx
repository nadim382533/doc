
import React, { useState, useMemo, useRef } from 'react';
import { ExpenseItem } from '../types';

interface StaffProfile {
  id: string;
  name: string;
  designation: string;
  office: string;
  phone: string;
  ipbax: string;
  email: string;
}

const staffProfiles: StaffProfile[] = [
  {
    id: 'sadiur',
    name: 'Shah Muhammad Sadiur Rahman',
    designation: 'Assistant Director',
    office: 'Office of the Honorable Pro-Vice Chancellor',
    phone: '+8801847140056',
    ipbax: '65171',
    email: 'provcoffice@daffodilvarsity.edu.bd'
  },
  {
    id: 'nadim',
    name: 'Nadim Islam',
    designation: 'Assistant Administrative Officer',
    office: 'Office of the Honorable Pro-Vice Chancellor',
    phone: '+8801847334815',
    ipbax: '65172',
    email: 'provcoffice2@daffodilvarsity.edu.bd'
  }
];

const ProVCOffice: React.FC = () => {
  const [items, setItems] = useState<ExpenseItem[]>([]);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState<string>('');
  const [preparedById, setPreparedById] = useState<string>(staffProfiles[1].id); // Default to Nadim
  const docRef = useRef<HTMLDivElement>(null);

  const preparedBy = staffProfiles.find(p => p.id === preparedById) || staffProfiles[1];
  const totalAmount = useMemo(() => items.reduce((sum, item) => sum + item.amount, 0), [items]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear());
    return `${day}/${month}/${year}`;
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    const newItem: ExpenseItem = {
      id: Math.random().toString(36).substr(2, 9),
      sl: items.length + 1,
      date: date,
      amount: parseFloat(amount),
    };

    setItems([...items, newItem]);
    setAmount('');
  };

  const removeItem = (id: string) => {
    const filtered = items.filter(i => i.id !== id);
    const reindexed = filtered.map((item, index) => ({
      ...item,
      sl: index + 1
    }));
    setItems(reindexed);
  };

  const downloadDOCX = () => {
    const headerHtml = `
      <div style="text-align: center; margin-bottom: 20pt; border-bottom: 1.5pt solid black; padding-bottom: 10pt;">
        <h1 style="font-family: Arial; font-size: 22pt; color: #003d73; margin: 0; text-transform: uppercase;">Expense Statement</h1>
        <p style="font-family: Arial; font-size: 12pt; color: #555; margin: 5pt 0 0 0; font-style: italic;">Office of the Pro Vice Chancellor</p>
      </div>
    `;

    const tableRows = items.map(item => `
      <tr>
        <td style="border: 1pt solid black; padding: 6pt; text-align: center; font-size: 10pt;">${item.sl}</td>
        <td style="border: 1pt solid black; padding: 6pt; text-align: center; font-size: 10pt;">${formatDate(item.date)}</td>
        <td style="border: 1pt solid black; padding: 6pt; text-align: right; font-size: 10pt; font-weight: bold;">${item.amount.toLocaleString()}</td>
      </tr>
    `).join('');

    const emptyRowsCount = Math.max(0, 15 - items.length);
    const emptyRows = Array.from({ length: emptyRowsCount }).map(() => `
      <tr style="height: 22pt;">
        <td style="border: 1pt solid black;"></td>
        <td style="border: 1pt solid black;"></td>
        <td style="border: 1pt solid black;"></td>
      </tr>
    `).join('');

    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <style>
          @page WordSection1 { size: 595.3pt 841.9pt; margin: 72.0pt 72.0pt 72.0pt 72.0pt; }
          div.WordSection1 { page: WordSection1; }
          table { border-collapse: collapse; width: 100%; font-family: Arial; }
        </style>
      </head>
      <body>
        <div class="WordSection1">
          ${headerHtml}
          <p style="font-size: 8pt; color: #888; text-transform: uppercase; margin-bottom: 10pt;">Statement Date: ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="border: 1pt solid black; padding: 6pt; width: 15%;">SL</th>
                <th style="border: 1pt solid black; padding: 6pt; width: 45%;">Date</th>
                <th style="border: 1pt solid black; padding: 6pt; width: 40%;">Amount (TK)</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
              ${emptyRows}
              <tr>
                <td colspan="2" style="border: 1.5pt solid black; padding: 8pt; text-align: right; font-weight: bold; font-size: 10pt;">TOTAL AMOUNT (TK)</td>
                <td style="border: 1.5pt solid black; padding: 8pt; text-align: right; font-weight: bold; font-size: 11pt; background-color: #f9f9f9;">${totalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          <div style="margin-top: 50pt; width: 250pt; border-top: 1.5pt solid black; padding-top: 10pt;">
            <p style="font-size: 9pt; font-weight: bold; text-transform: uppercase; color: #999; margin: 0 0 5pt 0;">Prepared By</p>
            <p style="font-size: 11pt; font-weight: bold; margin: 0;">${preparedBy.name}</p>
            <p style="font-size: 10pt; margin: 0;">${preparedBy.designation}</p>
            <p style="font-size: 9pt; color: #666; font-style: italic; margin: 0;">${preparedBy.office}</p>
            <p style="font-size: 8pt; color: #777; margin: 4pt 0 0 0;">Phone: ${preparedBy.phone} | IPBAX: ${preparedBy.ipbax}</p>
            <p style="font-size: 8pt; color: #777; margin: 0;">Email: ${preparedBy.email}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', content], { type: 'application/msword' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `PVC_Statement_${new Date().toISOString().split('T')[0]}.doc`;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Control Panel */}
      <div className="w-full lg:w-72 space-y-5 no-print sticky top-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-base mb-4 text-slate-800 flex items-center gap-2">
            <div className="w-1.5 h-5 bg-indigo-600 rounded-full"></div>
            Data Input
          </h3>
          <form onSubmit={handleAddItem} className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Entry Date</label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm cursor-pointer"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Amount (TK)</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-slate-400 font-bold text-sm">৳</span>
                <input 
                  type="number" 
                  step="1"
                  placeholder="0" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-base"
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-bold text-sm transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Add Entry
            </button>
          </form>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-xs mb-3 text-slate-800 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            Prepared By
          </h3>
          <select 
            value={preparedById} 
            onChange={(e) => setPreparedById(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-700 cursor-pointer"
          >
            {staffProfiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2.5">
           <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-widest">Export Options</p>
           <button onClick={downloadDOCX} className="w-full flex items-center gap-2.5 px-3 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg font-bold text-xs transition-all shadow-sm">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             Export as Word
           </button>
           <button onClick={handlePrint} className="w-full flex items-center gap-2.5 px-3 py-2 bg-slate-900 text-white hover:bg-black rounded-lg font-bold text-xs transition-all shadow-lg shadow-slate-200">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
             Print Statement
           </button>
        </div>
      </div>

      {/* Document Area */}
      <div className="flex-1 w-full flex justify-center pb-20">
        <div ref={docRef} id="pvc-document" className="bg-white w-full max-w-[720px] min-h-[1018px] p-8 md:p-12 page-shadow document-sheet border border-slate-200 relative overflow-hidden transition-all duration-300">
          
          <div className="text-center mb-10 pb-6 relative">
            <h1 className="text-4xl font-black text-[#003d73] uppercase tracking-tight mb-2">Expense Statement</h1>
            <p className="text-xl text-slate-500 font-medium italic">Office of the Pro Vice Chancellor</p>
            <div className="w-20 h-1 bg-slate-800 mx-auto mt-6 rounded-full"></div>
            <div className="absolute bottom-0 left-0 right-0 border-b-[1.5px] border-slate-800"></div>
          </div>

          <div className="mb-6 px-1 flex justify-between items-center">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Statement Date: {new Date().toLocaleDateString()}
            </div>
          </div>

          <table className="w-full border-collapse border-[1.5px] border-slate-900">
            <thead>
              <tr className="bg-white">
                <th className="border border-slate-900 py-3 px-2 w-[12%] text-center font-bold text-xs text-slate-900 uppercase">SL</th>
                <th className="border border-slate-900 py-3 px-2 w-[48%] text-center font-bold text-xs text-slate-900 uppercase">Date</th>
                <th className="border border-slate-900 py-3 px-2 w-[40%] text-right font-bold text-xs text-slate-900 uppercase">Amount (TK)</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                Array.from({ length: 15 }).map((_, i) => (
                  <tr key={`empty-${i}`} className="h-9">
                    <td className="border border-slate-900"></td>
                    <td className="border border-slate-900"></td>
                    <td className="border border-slate-900"></td>
                  </tr>
                ))
              ) : (
                <>
                  {items.map((item) => (
                    <tr key={item.id} className="group relative h-9">
                      <td className="border border-slate-900 px-2 text-center text-xs font-bold text-slate-800 relative">
                        {item.sl}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="no-print absolute left-1 top-1/2 -translate-y-1/2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-all shadow-sm z-10"
                        >
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </td>
                      <td className="border border-slate-900 px-2 text-center text-xs text-slate-700">{formatDate(item.date)}</td>
                      <td className="border border-slate-900 px-4 text-right font-bold text-slate-900 text-sm tabular-nums">
                        {item.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {items.length < 15 && Array.from({ length: 15 - items.length }).map((_, i) => (
                    <tr key={`fill-${i}`} className="h-9">
                      <td className="border border-slate-900"></td>
                      <td className="border border-slate-900"></td>
                      <td className="border border-slate-900"></td>
                    </tr>
                  ))}
                </>
              )}
              <tr className="bg-white">
                <td colSpan={2} className="border-[1.5px] border-slate-900 py-3 px-4 text-right font-black text-xs uppercase tracking-widest text-slate-800">Total Amount (TK)</td>
                <td className="border-[1.5px] border-slate-900 py-3 px-4 text-right text-lg font-black text-slate-900 tabular-nums">
                  <span className="text-sm font-medium mr-1">৳</span>{totalAmount.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Corrected Signature Block based on Screenshot */}
          <div className="mt-28 flex">
             <div className="w-64">
                <div className="border-t-[1.5px] border-slate-800 mb-2"></div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-3">Prepared By</p>
                <div className="space-y-0.5">
                  <p className="text-sm font-black text-slate-900 leading-tight">{preparedBy.name}</p>
                  <p className="text-[11px] font-bold text-slate-700">{preparedBy.designation}</p>
                  <p className="text-[10px] font-medium text-slate-500 italic">{preparedBy.office}</p>
                  <div className="text-[9px] text-slate-400 font-medium mt-2 leading-relaxed">
                    <p>Phone: {preparedBy.phone} | IPBAX: {preparedBy.ipbax}</p>
                    <p>Email: {preparedBy.email}</p>
                  </div>
                </div>
             </div>
          </div>

          <div className="absolute bottom-8 left-0 right-0 px-10 text-center text-[7px] font-bold text-slate-300 uppercase tracking-[0.5em] no-print">
            This is an official document of the Office of the Pro Vice Chancellor
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProVCOffice;
