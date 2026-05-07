import { useNavigate } from 'react-router';
import { NigeriaMap } from '../components/NigeriaMap';
import { StatCard } from '../components/StatCard';
import { ProjectCard } from '../components/ProjectCard';
import { getNationalStats, projects, sectors, states, metrics } from '../data/mockData';
import { formatCurrency, formatNumber, getStatusColor } from '../utils/helpers';
import {
  Briefcase, CheckCircle, FolderOpen, TrendingUp, Users, Building,
  Zap, MapPin, ArrowRight, BarChart3, Clock, AlertTriangle, Target,
  ChevronRight, Activity, Heart, GraduationCap, Droplets, Home as HomeIcon,
  Wheat, Shield, TrendingDown,
} from 'lucide-react';
import { useState } from 'react';
import {
  LineChart, Line, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip,
} from 'recharts';

export function Home() {
  const navigate = useNavigate();
  const stats = getNationalStats();
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const featuredProjects = selectedSector === 'all'
    ? projects.slice(0, 6)
    : projects.filter(p => p.sector === selectedSector).slice(0, 6);

  const budgetUtilization = Math.round((stats.totalSpent / stats.totalBudget) * 100);

  const zones = ['North West', 'North East', 'North Central', 'South West', 'South South', 'South East'];
  const zoneData = zones.map(zone => {
    const zoneStates = states.filter(s => s.zone === zone);
    const totalProj = zoneStates.reduce((s, st) => s + st.projects, 0);
    const completedProj = zoneStates.reduce((s, st) => s + st.completedProjects, 0);
    const jobs = zoneStates.reduce((s, st) => s + st.jobsCreated, 0);
    return { zone, states: zoneStates.length, totalProj, completedProj, jobs, rate: totalProj > 0 ? Math.round((completedProj / totalProj) * 100) : 0 };
  });

  const sectorData = sectors.map(sector => {
    const sp = projects.filter(p => p.sector === sector);
    return { name: sector, count: sp.length, completed: sp.filter(p => p.status === 'completed').length };
  }).sort((a, b) => b.count - a.count);

  const topStates = [...states]
    .sort((a, b) => (b.completedProjects / b.projects) - (a.completedProjects / a.projects))
    .slice(0, 8);

  const statusData = [
    { name: 'Completed', value: stats.completedProjects, color: '#22c55e' },
    { name: 'In Progress', value: stats.inProgressProjects, color: '#f59e0b' },
    { name: 'Delayed', value: stats.delayedProjects, color: '#ef4444' },
  ];

  const latestMetric = metrics[metrics.length - 1];
  const prevMetric = metrics[metrics.length - 2];
  const jobsTrend = ((latestMetric.jobsCreated - prevMetric.jobsCreated) / prevMetric.jobsCreated * 100).toFixed(1);
  const powerTrend = ((latestMetric.powerSupply - prevMetric.powerSupply) / prevMetric.powerSupply * 100).toFixed(1);
  const priceTrend = ((latestMetric.foodPriceIndex - prevMetric.foodPriceIndex) / prevMetric.foodPriceIndex * 100).toFixed(1);

  const indicators = [
    { l: 'Health Centers', v: formatNumber(stats.totalHealthCenters), I: Heart, c: 'text-rose-600 bg-rose-50' },
    { l: 'Schools Built', v: formatNumber(stats.totalSchoolsBuilt), I: GraduationCap, c: 'text-indigo-600 bg-indigo-50' },
    { l: 'Boreholes', v: formatNumber(stats.totalBoreholesDrilled), I: Droplets, c: 'text-cyan-600 bg-cyan-50' },
    { l: 'Power Connected', v: formatNumber(stats.totalHouseholdsConnected), I: Zap, c: 'text-yellow-600 bg-yellow-50' },
    { l: 'Farmland', v: `${formatNumber(stats.totalFarmlandDeveloped)} ha`, I: Wheat, c: 'text-emerald-600 bg-emerald-50' },
    { l: 'Housing', v: formatNumber(stats.totalHousingUnits), I: HomeIcon, c: 'text-orange-600 bg-orange-50' },
    { l: 'Students', v: formatNumber(stats.totalStudentsEnrolled), I: GraduationCap, c: 'text-blue-600 bg-blue-50' },
    { l: 'Crime Reduction', v: `${stats.avgCrimeReduction}%`, I: Shield, c: 'text-slate-600 bg-slate-50' },
    { l: 'Poverty Reduction', v: `${stats.avgPovertyReduction}%`, I: TrendingDown, c: 'text-teal-600 bg-teal-50' },
    { l: 'Revenue (IGR)', v: formatCurrency(stats.totalRevenueGenerated), I: Briefcase, c: 'text-green-600 bg-green-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
          {/* Mobile: stacked, Desktop: side by side */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/15 rounded-lg shrink-0">
                  <Building className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  Renewed Hope Performance Scorecard
                </h1>
              </div>
              <p className="text-green-100 text-xs sm:text-sm max-w-2xl">
                Tracking {formatNumber(stats.totalProjects)} projects across {states.length} states with {formatCurrency(stats.totalBudget)} in total budget.
              </p>
            </div>

            {/* Quick stats — always 2x2 grid */}
            <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-3">
              {[
                { v: `${stats.completionRate}%`, l: 'Completion' },
                { v: formatNumber(stats.totalJobs), l: 'Jobs' },
                { v: formatNumber(stats.totalRoads), l: 'Roads' },
                { v: String(states.length), l: 'States' },
              ].map(s => (
                <div key={s.l} className="bg-white/10 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 text-center lg:text-left lg:min-w-[130px]">
                  <div className="text-lg sm:text-2xl font-bold leading-tight">{s.v}</div>
                  <div className="text-green-200 text-[10px] sm:text-xs">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">

        {/* Stat Cards — 2 cols on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <StatCard title="Total Projects" value={formatNumber(stats.totalProjects)} subtitle={`${stats.completionRate}% rate`} icon={FolderOpen} color="blue" />
          <StatCard title="Completed" value={formatNumber(stats.completedProjects)} subtitle="Delivered" icon={CheckCircle} color="green" trend={{ value: 12, positive: true }} />
          <StatCard title="Jobs Created" value={formatNumber(stats.totalJobs)} subtitle="All sectors" icon={Users} color="purple" trend={{ value: 8, positive: true }} />
          <StatCard title="Total Budget" value={formatCurrency(stats.totalBudget)} subtitle={`${formatCurrency(stats.totalSpent)} spent`} icon={Briefcase} color="amber" />
        </div>

        {/* Governance Indicators — horizontal scroll on mobile, grid on desktop */}
        <div className="bg-white rounded-lg border p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base sm:text-lg font-bold">Governance Indicators</h2>
          </div>
          {/* Mobile: horizontal scroll */}
          <div className="flex gap-3 overflow-x-auto pb-2 sm:hidden snap-x snap-mandatory -mx-1 px-1">
            {indicators.map(x => (
              <div key={x.l} className="snap-start shrink-0 w-[130px] p-3 bg-gray-50 rounded-xl text-center">
                <div className={`w-9 h-9 rounded-lg ${x.c} flex items-center justify-center mx-auto mb-1.5`}><x.I className="w-4 h-4" /></div>
                <div className="text-sm font-bold text-gray-900 truncate">{x.v}</div>
                <div className="text-[10px] text-gray-500 truncate">{x.l}</div>
              </div>
            ))}
          </div>
          {/* Desktop: grid */}
          <div className="hidden sm:grid grid-cols-3 lg:grid-cols-5 gap-4">
            {indicators.map(x => (
              <div key={x.l} className="p-3 bg-gray-50 rounded-xl text-center">
                <div className={`w-10 h-10 rounded-lg ${x.c} flex items-center justify-center mx-auto mb-1.5`}><x.I className="w-5 h-5" /></div>
                <div className="text-lg font-bold text-gray-900">{x.v}</div>
                <div className="text-xs text-gray-500">{x.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget + Donut — stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg border p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-green-600" />
              <h2 className="text-base sm:text-lg font-bold">Budget Overview</h2>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Utilization</span>
              <span className="font-semibold">{budgetUtilization}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mb-4">
              <div className="bg-green-600 h-full rounded-full" style={{ width: `${budgetUtilization}%` }} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
              {[
                { l: 'Budget', v: formatCurrency(stats.totalBudget), bg: 'bg-gray-50' },
                { l: 'Spent', v: formatCurrency(stats.totalSpent), bg: 'bg-green-50' },
                { l: 'Remaining', v: formatCurrency(stats.totalBudget - stats.totalSpent), bg: 'bg-blue-50' },
                { l: 'Utilization', v: `${budgetUtilization}%`, bg: 'bg-amber-50' },
              ].map(t => (
                <div key={t.l} className={`text-center p-2.5 sm:p-3 ${t.bg} rounded-lg`}>
                  <div className="text-xs sm:text-sm font-bold text-gray-900">{t.v}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">{t.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-5 h-5 text-blue-600" />
              <h2 className="text-base sm:text-lg font-bold">Project Status</h2>
            </div>
            {/* Mobile: horizontal bar, Desktop: donut */}
            <div className="sm:hidden space-y-2.5">
              {statusData.map(s => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />{s.name}</div>
                    <span className="font-semibold">{formatNumber(s.value)}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${(s.value / stats.totalProjects) * 100}%`, backgroundColor: s.color }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden sm:block">
              <div className="flex justify-center">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart><Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={68} dataKey="value" strokeWidth={2} stroke="#fff">
                    {statusData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie><Tooltip formatter={(v: number) => formatNumber(v)} /></PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {statusData.map(s => (
                  <div key={s.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} /><span className="text-gray-600">{s.name}</span></div>
                    <span className="font-semibold">{formatNumber(s.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trends — horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-2 sm:pb-0 sm:grid sm:grid-cols-3 snap-x snap-mandatory">
          {[
            { l: 'Jobs (Monthly)', v: formatNumber(latestMetric.jobsCreated), t: jobsTrend, k: 'jobsCreated', c: '#16a34a', I: Users, ic: 'text-green-600' },
            { l: 'Power (MW)', v: formatNumber(latestMetric.powerSupply), t: powerTrend, k: 'powerSupply', c: '#3b82f6', I: Zap, ic: 'text-blue-600' },
            { l: 'Food Price Index', v: String(latestMetric.foodPriceIndex), t: priceTrend, k: 'foodPriceIndex', c: '#f59e0b', I: TrendingUp, ic: 'text-amber-600', inv: true },
          ].map(x => (
            <div key={x.l} className="snap-start shrink-0 w-[260px] sm:w-auto bg-white rounded-lg border p-4 sm:p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5"><x.I className={`w-4 h-4 ${x.ic}`} /><span className="text-xs sm:text-sm font-medium text-gray-600">{x.l}</span></div>
                <span className={`text-xs font-semibold ${(x.inv ? Number(x.t) < 0 : Number(x.t) > 0) ? 'text-green-600' : 'text-red-600'}`}>
                  {Number(x.t) > 0 ? '+' : ''}{x.t}%
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold mb-2">{x.v}</div>
              <ResponsiveContainer width="100%" height={50}>
                <LineChart data={metrics}><Line type="monotone" dataKey={x.k} stroke={x.c} strokeWidth={2} dot={false} /></LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>

        {/* Map + Zone */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2"><NigeriaMap /></div>
          <div className="bg-white rounded-lg border p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-purple-600" />
              <h2 className="text-base sm:text-lg font-bold">Performance by Zone</h2>
            </div>
            <div className="space-y-3.5">
              {zoneData.map(z => (
                <div key={z.zone}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs sm:text-sm font-medium">{z.zone}</span>
                    <span className="text-xs text-gray-500">{z.rate}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                    <div className="h-2 rounded-full" style={{ width: `${z.rate}%`, backgroundColor: z.rate >= 65 ? '#22c55e' : z.rate >= 50 ? '#f59e0b' : '#ef4444' }} />
                  </div>
                  <div className="flex gap-2 text-[10px] sm:text-xs text-gray-500">
                    <span>{z.states} states</span><span>{formatNumber(z.totalProj)} proj</span><span>{formatNumber(z.jobs)} jobs</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/analytics')}
              className="mt-4 w-full flex items-center justify-center gap-2 text-xs sm:text-sm text-green-600 font-medium py-2 border border-green-200 rounded-lg hover:bg-green-50 transition-colors">
              <BarChart3 className="w-4 h-4" /> Full Analytics
            </button>
          </div>
        </div>

        {/* Sector + Top States */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h2 className="text-base sm:text-lg font-bold">Sector Breakdown</h2>
            </div>
            <div className="space-y-2.5">
              {sectorData.map(s => {
                const max = Math.max(...sectorData.map(d => d.count));
                return (
                  <div key={s.name} className="flex items-center gap-2 sm:gap-3">
                    <span className="text-[10px] sm:text-xs text-gray-600 w-16 sm:w-24 shrink-0 truncate">{s.name}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-blue-500 rounded-full" style={{ width: `${max > 0 ? (s.count / max) * 100 : 0}%` }} />
                      <div className="absolute inset-y-0 left-0 bg-green-500 rounded-full" style={{ width: `${max > 0 ? (s.completed / max) * 100 : 0}%` }} />
                    </div>
                    <span className="text-xs font-semibold w-6 text-right">{s.count}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 mt-3 pt-2 border-t text-[10px] sm:text-xs text-gray-500">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500" />Total</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" />Done</div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-green-600" />
              <h2 className="text-base sm:text-lg font-bold">Top States</h2>
            </div>
            <div className="space-y-1">
              {topStates.map((st, i) => {
                const rate = Math.round((st.completedProjects / st.projects) * 100);
                return (
                  <div key={st.id} onClick={() => navigate(`/state/${st.id}`)}
                    className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(st.status)}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm font-medium truncate">{st.name}</div>
                      <div className="text-[10px] text-gray-500 hidden sm:block">{st.zone}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs sm:text-sm font-bold">{rate}%</div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { I: CheckCircle, c: 'green', v: stats.completedProjects, l: 'Completed', d: 'Delivered across all states' },
            { I: Clock, c: 'amber', v: stats.inProgressProjects, l: 'In Progress', d: 'Under implementation' },
            { I: AlertTriangle, c: 'red', v: stats.delayedProjects, l: 'Delayed', d: 'Need attention' },
          ].map(a => (
            <div key={a.l} className={`bg-${a.c}-50 border border-${a.c}-200 rounded-lg p-3 sm:p-4 flex items-start gap-2.5`}>
              <a.I className={`w-4 h-4 sm:w-5 sm:h-5 text-${a.c}-600 mt-0.5 shrink-0`} />
              <div>
                <div className={`text-xs sm:text-sm font-semibold text-${a.c}-800`}>{formatNumber(a.v)} {a.l}</div>
                <div className={`text-[10px] sm:text-xs text-${a.c}-600`}>{a.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Projects */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Featured Projects</h2>
              <p className="text-gray-600 text-xs sm:text-sm mt-0.5">Track projects across all sectors</p>
            </div>
            {/* Horizontal scroll sector pills on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 max-w-full">
              <button onClick={() => setSelectedSector('all')}
                className={`shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${selectedSector === 'all' ? 'bg-green-600 text-white' : 'bg-white border hover:bg-gray-50'}`}>
                All
              </button>
              {sectors.slice(0, 5).map(s => (
                <button key={s} onClick={() => setSelectedSector(s)}
                  className={`shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${selectedSector === s ? 'bg-green-600 text-white' : 'bg-white border hover:bg-gray-50'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {featuredProjects.map(p => (
              <ProjectCard key={p.id} project={p} onClick={() => navigate(`/projects/${p.id}`)} />
            ))}
          </div>

          <div className="flex justify-center">
            <button onClick={() => navigate('/projects')}
              className="px-6 py-2.5 sm:py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 text-sm">
              View All Projects <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
