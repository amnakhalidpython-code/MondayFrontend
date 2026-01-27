import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
    Filter,
    Users,
    Download,
    MoreHorizontal,
    Plus,
    Settings,
    ChevronDown,
    Layout,
    Star,
    Search,
} from 'lucide-react';
import {
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';

const COLORS = {
    'Done': '#00c875', 'Working on it': '#fdab3d', 'work': '#fdab3d',
    'Stuck': '#df2f4a', 'Not Started': '#c4c4c4', 'ns': '#c4c4c4',
    '': '#c4c4c4', 'High': '#401694', 'Medium': '#5559df', 'Low': '#579bfc'
};

const DashboardReport = () => {
    const { boardId } = useParams();
    const [boardData, setBoardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoardData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/boards/${boardId}`);
                const data = await response.json();
                if (data.success) setBoardData(data.board);
            } catch (error) {
                console.error("Error loading stats:", error);
            } finally {
                setLoading(false);
            }
        };
        if (boardId) fetchBoardData();
    }, [boardId]);

    const metrics = useMemo(() => {
        if (!boardData || !boardData.items) return null;
        const items = boardData.items;
        const now = new Date();
        const stats = {
            total: items.length, inProgress: 0, stuck: 0, done: 0,
            statusDist: {}, ownerDist: {}, overdueDist: { 'Working on it': 0, 'Stuck': 0 }, dueDateDist: {}
        };

        items.forEach(item => {
            const vals = item.column_values || {};
            const status = vals.status || 'Not Started';
            if (status === 'Working on it') stats.inProgress++;
            if (status === 'Stuck') stats.stuck++;
            if (status === 'Done') stats.done++;
            stats.statusDist[status] = (stats.statusDist[status] || 0) + 1;
            const ownerName = vals.owner?.name || 'Unassigned';
            stats.ownerDist[ownerName] = (stats.ownerDist[ownerName] || 0) + 1;

            if (vals.dueDate && status !== 'Done') {
                if (new Date(vals.dueDate) < now) {
                    if (status === 'Working on it') stats.overdueDist['Working on it']++;
                    if (status === 'Stuck') stats.overdueDist['Stuck']++;
                }
            }
            if (vals.dueDate) {
                const dateStr = new Date(vals.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                if (!stats.dueDateDist[dateStr]) stats.dueDateDist[dateStr] = { date: dateStr, Stuck: 0, ns: 0, work: 0 };
                if (status === 'Stuck') stats.dueDateDist[dateStr].Stuck++;
                else if (status === 'Working on it') stats.dueDateDist[dateStr].work++;
                else if (status !== 'Done') stats.dueDateDist[dateStr].ns++;
            }
        });

        return {
            ...stats,
            pieData: Object.entries(stats.statusDist).map(([name, value]) => ({ name, value })).filter(d => d.name !== 'Not Started'),
            ownerBarData: Object.entries(stats.ownerDist).map(([name, count]) => ({ name, count })),
            overdueBarData: Object.entries(stats.overdueDist).map(([name, val]) => ({ name, val })).filter(d => d.val > 0),
            dueDateBarData: Object.values(stats.dueDateDist)
        };
    }, [boardData]);

    const StatCard = ({ title, value }) => (
        <div className="col-span-12 md:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col min-h-[160px]">
            <div className="p-3 border-b border-gray-50 flex justify-between items-center">
                <span className="text-[#323338] text-sm">{title}</span>
                <MoreHorizontal size={14} className="text-gray-400" />
            </div>
            <div className="flex-1 flex items-center justify-center text-[48px] font-light text-[#323338]">{value}</div>
        </div>
    );

    if (loading) return <div className="p-10 text-center font-sans">Loading your selections...</div>;

    // STRICT SELECTION LOGIC
    const settings = boardData?.widgetSettings || {};

    return (
        <div className="flex flex-col h-screen bg-[#f7f9fb] overflow-hidden font-sans">
            {/* Header omitted for space, same as your original */}
            <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-gray-200">
                <h1 className="text-xl font-medium text-[#323338]">{boardData?.name} stats</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">

                {/* 1. TASKS OVERVIEW */}
                {settings.tasksOverview && (
                    <div className="grid grid-cols-12 gap-5">
                        <StatCard title="All Tasks" value={metrics.total} />
                        <StatCard title="In progress" value={metrics.inProgress} />
                        <StatCard title="Stuck" value={metrics.stuck} />
                        <StatCard title="Done" value={metrics.done} />
                    </div>
                )}

                {/* 2. STATUS & OWNER ROW */}
                {(settings.tasksByStatus || settings.tasksByOwner) && (
                    <div className="grid grid-cols-12 gap-5">
                        {settings.tasksByStatus && (
                            <div className={`col-span-12 ${settings.tasksByOwner ? 'md:col-span-6' : ''} bg-white rounded-lg shadow-sm border border-gray-200 p-5`}>
                                <div className="flex justify-between items-center mb-6"><span className="text-[#323338]">Tasks by status</span><MoreHorizontal size={16} className="text-gray-400" /></div>
                                <div className="h-[280px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={metrics.pieData} cx="35%" cy="50%" outerRadius={100} dataKey="value">
                                                {metrics.pieData.map((entry, index) => <Cell key={index} fill={COLORS[entry.name] || '#c4c4c4'} strokeWidth={0} />)}
                                            </Pie>
                                            <RechartsTooltip />
                                            <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}

                        {settings.tasksByOwner && (
                            <div className={`col-span-12 ${settings.tasksByStatus ? 'md:col-span-6' : ''} bg-white rounded-lg shadow-sm border border-gray-200 p-5`}>
                                <div className="flex justify-between items-center mb-6"><span className="text-[#323338]">Tasks by owner</span><MoreHorizontal size={16} className="text-gray-400" /></div>
                                <div className="h-[280px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={metrics.ownerBarData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                            <Bar dataKey="count" fill="#579bfc" radius={[4, 4, 0, 0]} barSize={50} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* 3. OVERDUE & DUE DATE ROW */}
                {(settings.overdueTasks || settings.tasksByDueDate) && (
                    <div className="grid grid-cols-12 gap-5 pb-10">
                        {settings.overdueTasks && (
                            <div className={`col-span-12 ${settings.tasksByDueDate ? 'md:col-span-6' : ''} bg-white rounded-lg shadow-sm border border-gray-200 p-5`}>
                                <div className="mb-6"><span className="text-[#323338]">Overdue tasks</span></div>
                                <div className="h-[280px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={metrics.overdueBarData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                            <Bar dataKey="val" radius={[4, 4, 0, 0]} barSize={80}>
                                                {metrics.overdueBarData.map((entry, index) => <Cell key={index} fill={COLORS[entry.name]} />)}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}

                        {settings.tasksByDueDate && (
                            <div className={`col-span-12 ${settings.overdueTasks ? 'md:col-span-6' : ''} bg-white rounded-lg shadow-sm border border-gray-200 p-5`}>
                                <div className="mb-6"><span className="text-[#323338]">Tasks by due date</span></div>
                                <div className="h-[280px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={metrics.dueDateBarData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                                            <RechartsTooltip />
                                            <Bar dataKey="Stuck" stackId="a" fill="#df2f4a" barSize={50} />
                                            <Bar dataKey="ns" stackId="a" fill="#c4c4c4" />
                                            <Bar dataKey="work" stackId="a" fill="#fdab3d" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardReport;