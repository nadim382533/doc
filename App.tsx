
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ProVCOffice from './components/ProVCOffice';
import { AppSection } from './types';

const Dashboard: React.FC = () => (
  <div className="space-y-6 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { label: 'Total Budget', val: '৳4,50,000', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-emerald-50 text-emerald-600' },
        { label: 'Monthly Expense', val: '৳1,24,500', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'bg-indigo-50 text-indigo-600' },
        { label: 'Pending Approvals', val: '12', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-amber-50 text-amber-600' },
        { label: 'Active Projects', val: '08', icon: 'M13 10V3L4 14h7v7l9-11h-7z', color: 'bg-rose-50 text-rose-600' },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} /></svg>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">{stat.label}</p>
            <p className="text-2xl font-black text-slate-800">{stat.val}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Office Activity Overview</h3>
        <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200">
           <img src="https://picsum.photos/600/300?grayscale" className="opacity-30 mix-blend-multiply h-full w-full object-cover rounded-xl" alt="chart placeholder" />
           <div className="absolute font-bold text-slate-400">Activity Analytics</div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Notifications</h3>
        <div className="space-y-4">
          {[1, 2, 3].map(j => (
            <div key={j} className="flex gap-4 items-start p-3 hover:bg-slate-50 rounded-xl transition-colors">
              <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0 overflow-hidden border border-slate-100">
                <img src={`https://picsum.photos/40/40?random=${j}`} alt="user" />
              </div>
              <div>
                <p className="text-sm text-slate-800"><span className="font-bold">Registrar Office</span> updated the annual budget document.</p>
                <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard />;
      case 'pro-vc-statement': return <ProVCOffice />;
      default: return (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          <p className="text-lg">Section under development.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="sidebar-container no-print">
        <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      </div>
      
      <main className="main-content flex-1 ml-64 p-8 min-h-screen transition-all">
        {/* Header (No Print) */}
        <header className="flex justify-between items-center mb-8 no-print max-w-7xl mx-auto">
          <div>
            <nav className="flex text-[10px] text-slate-400 font-black uppercase tracking-widest gap-2 mb-1">
              <span>Admin</span>
              <span className="text-slate-200">/</span>
              <span className="text-indigo-600">{activeSection.replace('-', ' ')}</span>
            </nav>
            <h1 className="text-4xl font-black text-slate-900 leading-tight">Pro VC Suite</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black">
                A
              </div>
              <p className="text-sm font-bold text-slate-700 hidden md:block">Prof. Ahmed</p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
