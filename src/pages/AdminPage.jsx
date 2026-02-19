import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import { useProgressStore } from '../stores/useProgressStore';
import { useStageStore } from '../stores/useStageStore';

export default function AdminPage() {
    const navigate = useNavigate();
    const { user, logout, getStudentsByCourse } = useAuthStore();
    const { courses } = useStageStore();
    const { submissions } = useProgressStore();
    const [currentView, setCurrentView] = useState('dashboard');
    const [searchTerm, setSearchTerm] = useState('');

    // --- Data Aggregation for Dashboard ---
    const totalLearners = courses.reduce((acc, course) => acc + getStudentsByCourse(course.id).length, 0);
    const totalClasses = 34; // Placeholder or derived from missions
    const pointsIssued = "1.5M"; // Placeholder
    const courseCompletion = "78%"; // Placeholder

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display">
            {/* Sidebar Navigation */}
            <aside className="w-64 flex-shrink-0 flex flex-col bg-admin-primary h-full transition-all duration-300 z-20 shadow-xl relative overflow-y-auto">
                <div className="p-6 flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                        <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>stadia_controller</span>
                    </div>
                    <div>
                        <h1 className="text-white text-xl font-bold tracking-tight">ADMIN PAGE</h1>
                        <p className="text-white/70 text-xs font-medium uppercase tracking-wider">Gamified Portal</p>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
                    {/* Dashboard (Active) */}
                    <button
                        onClick={() => setCurrentView('dashboard')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-all group ${currentView === 'dashboard'
                            ? 'bg-admin-secondary shadow-lg shadow-admin-secondary/20'
                            : 'hover:bg-white/10 text-white/80 hover:text-white'
                            }`}
                    >
                        <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                        <span className="text-white font-semibold">Dashboard</span>
                    </button>
                    {/* Learners */}
                    <button
                        onClick={() => setCurrentView('learners')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-all group ${currentView === 'learners'
                            ? 'bg-admin-secondary shadow-lg shadow-admin-secondary/20'
                            : 'hover:bg-white/10 text-white/80 hover:text-white'
                            }`}
                    >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform text-white">school</span>
                        <span className={`font-medium ${currentView === 'learners' ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>Learners</span>
                    </button>
                    {/* Class (Project Classes) */}
                    <button
                        onClick={() => setCurrentView('class')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-all group ${currentView === 'class'
                            ? 'bg-admin-secondary shadow-lg shadow-admin-secondary/20'
                            : 'hover:bg-white/10 text-white/80 hover:text-white'
                            }`}
                    >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform text-white">menu_book</span>
                        <span className={`font-medium ${currentView === 'class' ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>Class</span>
                    </button>
                    {/* Analytics */}
                    <button
                        onClick={() => setCurrentView('analytics')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-all group ${currentView === 'analytics'
                            ? 'bg-admin-secondary shadow-lg shadow-admin-secondary/20'
                            : 'hover:bg-white/10 text-white/80 hover:text-white'
                            }`}
                    >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform text-white">insights</span>
                        <span className={`font-medium ${currentView === 'analytics' ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>Analytics</span>
                    </button>
                    {/* Settings */}
                    <button
                        onClick={() => setCurrentView('settings')}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left transition-all group ${currentView === 'settings'
                            ? 'bg-admin-secondary shadow-lg shadow-admin-secondary/20'
                            : 'hover:bg-white/10 text-white/80 hover:text-white'
                            }`}
                    >
                        <span className="material-symbols-outlined group-hover:scale-110 transition-transform text-white">settings</span>
                        <span className={`font-medium ${currentView === 'settings' ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>Settings</span>
                    </button>
                </nav>

                <div className="p-4 mt-auto border-t border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className="h-10 w-10 rounded-full bg-cover bg-center border-2 border-white/30"
                            style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=Admin+User&background=random')" }}
                        ></div>
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-semibold">{user?.name || 'Administrator'}</span>
                            <span className="text-white/60 text-xs text-left">@{user?.adminId || 'admin'}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => { logout(); navigate('/'); }}
                        className="w-full py-2.5 bg-white/5 hover:bg-admin-secondary text-white text-sm font-medium rounded-xl border border-white/10 hover:border-admin-secondary transition-all flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-admin-secondary/20"
                    >
                        <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform text-white/70 group-hover:text-white">logout</span>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Top Header */}
                <header className="h-20 border-b border-white/5 bg-background-dark/80 backdrop-blur-md flex items-center justify-between px-8 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-white tracking-tight">
                            {currentView.charAt(0).toUpperCase() + currentView.slice(1)} Overview
                        </h2>
                    </div>
                    <div className="flex items-center gap-6">
                        {/* Search */}
                        <div className="relative w-96 group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-admin-secondary transition-colors">
                                <span className="material-symbols-outlined text-[20px]">search</span>
                            </div>
                            <input
                                className="block w-full pl-10 pr-3 py-2.5 bg-admin-card-dark border-none rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-admin-secondary/50 transition-all"
                                placeholder="Search learners, classes, or reports..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button className="relative p-2.5 rounded-xl bg-admin-card-dark hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[22px]">notifications</span>
                                <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-admin-pink border-2 border-admin-card-dark"></span>
                            </button>
                            <button className="p-2.5 rounded-xl bg-admin-card-dark hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-[22px]">help</span>
                            </button>
                        </div>
                        <button className="flex items-center gap-2 bg-admin-primary hover:bg-admin-primary/90 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg shadow-admin-primary/20">
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            <span>Create Class</span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto space-y-8">

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Card 1 */}
                            <div className="bg-admin-card-dark rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-admin-secondary/30 transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-white">groups</span>
                                </div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Total Learners</p>
                                <div className="flex items-end gap-3">
                                    <h3 className="text-3xl font-bold text-white">{totalLearners}</h3>
                                    <div className="flex items-center text-admin-green text-xs font-bold bg-admin-green/10 px-2 py-1 rounded-full mb-1">
                                        <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
                                        12%
                                    </div>
                                </div>
                                <div className="mt-4 w-full bg-gray-700/30 rounded-full h-1.5">
                                    <div className="bg-gradient-to-r from-admin-secondary to-purple-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="bg-admin-card-dark rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-admin-green/30 transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-admin-green">donut_large</span>
                                </div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Course Completion</p>
                                <div className="flex items-end gap-3">
                                    <h3 className="text-3xl font-bold text-white">{courseCompletion}</h3>
                                    <div className="flex items-center text-admin-green text-xs font-bold bg-admin-green/10 px-2 py-1 rounded-full mb-1">
                                        <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
                                        5%
                                    </div>
                                </div>
                                <div className="mt-4 w-full bg-gray-700/30 rounded-full h-1.5">
                                    <div className="bg-admin-green h-1.5 rounded-full" style={{ width: '78%' }}></div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="bg-admin-card-dark rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-admin-pink/30 transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-admin-pink">swords</span>
                                </div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Active Classes</p>
                                <div className="flex items-end gap-3">
                                    <h3 className="text-3xl font-bold text-white">{totalClasses}</h3>
                                    <div className="flex items-center text-admin-pink text-xs font-bold bg-admin-pink/10 px-2 py-1 rounded-full mb-1">
                                        <span className="material-symbols-outlined text-[14px] mr-0.5">priority_high</span>
                                        2 new
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-1">
                                    <div className="h-1.5 w-1/3 bg-admin-pink rounded-full"></div>
                                    <div className="h-1.5 w-1/3 bg-admin-pink/50 rounded-full"></div>
                                    <div className="h-1.5 w-1/3 bg-gray-700/30 rounded-full"></div>
                                </div>
                            </div>

                            {/* Card 4 */}
                            <div className="bg-admin-card-dark rounded-2xl p-6 border border-white/5 relative overflow-hidden group hover:border-admin-yellow/30 transition-all">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <span className="material-symbols-outlined text-6xl text-admin-yellow">database</span>
                                </div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Points Issued</p>
                                <div className="flex items-end gap-3">
                                    <h3 className="text-3xl font-bold text-white">{pointsIssued}</h3>
                                    <div className="flex items-center text-admin-green text-xs font-bold bg-admin-green/10 px-2 py-1 rounded-full mb-1">
                                        <span className="material-symbols-outlined text-[14px] mr-0.5">trending_up</span>
                                        15%
                                    </div>
                                </div>
                                <div className="mt-4 w-full bg-gray-700/30 rounded-full h-1.5">
                                    <div className="bg-admin-yellow h-1.5 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Charts & Activity Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Chart Area */}
                            <div className="lg:col-span-2 bg-admin-card-dark rounded-2xl border border-white/5 p-6 flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Learner Engagement</h3>
                                        <p className="text-sm text-gray-400">Daily active users over time</p>
                                    </div>
                                    <div className="flex bg-background-dark rounded-lg p-1 border border-white/5">
                                        <button className="px-3 py-1 text-xs font-medium text-white bg-white/10 rounded shadow-sm">30 Days</button>
                                        <button className="px-3 py-1 text-xs font-medium text-gray-400 hover:text-white transition-colors">90 Days</button>
                                    </div>
                                </div>
                                {/* Chart Placeholder using SVG */}
                                <div className="flex-1 w-full min-h-[300px] relative">
                                    <div className="absolute inset-0 flex items-end justify-between px-2 pb-6">
                                        {/* Y-Axis Lines (Background) */}
                                        <div className="absolute inset-0 flex flex-col justify-between px-2 pb-8 pointer-events-none">
                                            <div className="w-full h-px bg-white/5"></div>
                                            <div className="w-full h-px bg-white/5"></div>
                                            <div className="w-full h-px bg-white/5"></div>
                                            <div className="w-full h-px bg-white/5"></div>
                                            <div className="w-full h-px bg-white/5"></div>
                                        </div>
                                        {/* Data Visualization (Curved Line) */}
                                        <svg className="absolute inset-0 w-full h-full pb-8 overflow-visible" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="gradientArea" x1="0" x2="0" y1="0" y2="1">
                                                    <stop offset="0%" stopColor="#00f5d4" stopOpacity="0.2"></stop>
                                                    <stop offset="100%" stopColor="#00f5d4" stopOpacity="0"></stop>
                                                </linearGradient>
                                            </defs>
                                            <path d="M0,250 C100,220 200,280 300,180 C400,80 500,150 600,100 C700,50 800,120 1000,80 L1000,300 L0,300 Z" fill="url(#gradientArea)"></path>
                                            <path d="M0,250 C100,220 200,280 300,180 C400,80 500,150 600,100 C700,50 800,120 1000,80" fill="none" stroke="#00f5d4" strokeLinecap="round" strokeWidth="3"></path>
                                        </svg>
                                    </div>
                                    {/* X-Axis Labels */}
                                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 font-medium px-2">
                                        <span>Mon</span>
                                        <span>Tue</span>
                                        <span>Wed</span>
                                        <span>Thu</span>
                                        <span>Fri</span>
                                        <span>Sat</span>
                                        <span>Sun</span>
                                    </div>
                                </div>
                            </div>

                            {/* Top Gamification */}
                            <div className="bg-admin-card-dark rounded-2xl border border-white/5 p-6 flex flex-col">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold text-white">Top Classes</h3>
                                    <a href="#" className="text-admin-secondary text-sm font-medium hover:underline">View All</a>
                                </div>
                                <div className="space-y-4">
                                    {/* Quest Item 1 */}
                                    <div className="flex items-center gap-4 p-3 rounded-xl bg-background-dark border border-white/5 hover:border-admin-secondary/30 transition-colors group cursor-pointer">
                                        <div className="w-10 h-10 rounded-lg bg-admin-pink/20 flex items-center justify-center text-admin-pink">
                                            <span className="material-symbols-outlined">rocket_launch</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white text-sm font-semibold group-hover:text-admin-secondary transition-colors">Onboarding Mission</h4>
                                            <p className="text-gray-500 text-xs">980 Participants</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-admin-green text-sm font-bold">95%</span>
                                        </div>
                                    </div>
                                    {/* Quest Item 2 */}
                                    <div className="flex items-center gap-4 p-3 rounded-xl bg-background-dark border border-white/5 hover:border-admin-secondary/30 transition-colors group cursor-pointer">
                                        <div className="w-10 h-10 rounded-lg bg-admin-secondary/20 flex items-center justify-center text-admin-secondary">
                                            <span className="material-symbols-outlined">code</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white text-sm font-semibold group-hover:text-admin-secondary transition-colors">Python Basics</h4>
                                            <p className="text-gray-500 text-xs">450 Participants</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-admin-green text-sm font-bold">72%</span>
                                        </div>
                                    </div>
                                    {/* Quest Item 3 */}
                                    <div className="flex items-center gap-4 p-3 rounded-xl bg-background-dark border border-white/5 hover:border-admin-secondary/30 transition-colors group cursor-pointer">
                                        <div className="w-10 h-10 rounded-lg bg-admin-yellow/20 flex items-center justify-center text-admin-yellow">
                                            <span className="material-symbols-outlined">security</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white text-sm font-semibold group-hover:text-admin-secondary transition-colors">Cyber Awareness</h4>
                                            <p className="text-gray-500 text-xs">320 Participants</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-admin-yellow text-sm font-bold">45%</span>
                                        </div>
                                    </div>
                                    {/* Quest Item 4 */}
                                    <div className="flex items-center gap-4 p-3 rounded-xl bg-admin-primary/20 hover:border-admin-secondary/30 transition-colors group cursor-pointer">
                                        <div className="w-10 h-10 rounded-lg bg-admin-primary/20 flex items-center justify-center text-admin-primary">
                                            <span className="material-symbols-outlined">psychology</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-white text-sm font-semibold group-hover:text-admin-secondary transition-colors">Soft Skills 101</h4>
                                            <p className="text-gray-500 text-xs">210 Participants</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-admin-yellow text-sm font-bold">58%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Table */}
                        <div className="bg-admin-card-dark rounded-2xl border border-white/5 overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h3 className="text-lg font-bold text-white">Recent User Activity</h3>
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-400 bg-background-dark hover:text-white rounded border border-white/5 hover:border-white/20 transition-all">
                                        <span className="material-symbols-outlined text-[16px]">filter_list</span>
                                        Filter
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-400 bg-background-dark hover:text-white rounded border border-white/5 hover:border-white/20 transition-all">
                                        <span className="material-symbols-outlined text-[16px]">download</span>
                                        Export
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                                            <th className="px-6 py-4 font-semibold">User</th>
                                            <th className="px-6 py-4 font-semibold">Class / Action</th>
                                            <th className="px-6 py-4 font-semibold">Points Earned</th>
                                            <th className="px-6 py-4 font-semibold">Date & Time</th>
                                            <th className="px-6 py-4 font-semibold text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-sm">
                                        {/* Static rows for demo, replace with real data when available */}
                                        <tr className="group hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=Sarah+Jenkins&background=random')" }}></div>
                                                    <div>
                                                        <p className="font-medium text-white">Sarah Jenkins</p>
                                                        <p className="text-xs text-gray-500">Design Team</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">Completed <span className="text-white font-medium">Design Thinking Module 1</span></td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1 text-admin-yellow font-medium">
                                                    <span className="material-symbols-outlined text-[16px]">monetization_on</span>
                                                    +250
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400">Oct 24, 2:30 PM</td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-admin-green/10 text-admin-green border border-admin-green/20">
                                                    Completed
                                                </span>
                                            </td>
                                        </tr>
                                        {/* More static rows... */}
                                        <tr className="group hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://ui-avatars.com/api/?name=Michael+Chen&background=random')" }}></div>
                                                    <div>
                                                        <p className="font-medium text-white">Michael Chen</p>
                                                        <p className="text-xs text-gray-500">Engineering</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">Started <span className="text-white font-medium">Advanced Kubernetes</span></td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1 text-gray-500 font-medium">
                                                    <span className="material-symbols-outlined text-[16px]">monetization_on</span>
                                                    0
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400">Oct 24, 1:45 PM</td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-admin-pink/10 text-admin-pink border border-admin-pink/20">
                                                    In Progress
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
