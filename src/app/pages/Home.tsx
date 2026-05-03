import { useNavigate } from 'react-router';
import { NigeriaMap } from '../components/NigeriaMap';
import { StatCard } from '../components/StatCard';
import { ProjectCard } from '../components/ProjectCard';
import { getNationalStats, projects, sectors, states, metrics } from '../data/mockData';
import { formatCurrency, formatNumber, getStatusColor, getStatusLabel } from '../utils/helpers';
import {
  Briefcase, CheckCircle, FolderOpen, TrendingUp, Users, Building,
  Zap, MapPin, ArrowRight, BarChart3, Clock, AlertTriangle, Target,
  ChevronRight, Activity, Heart, GraduationCap, Droplets, Home as HomeIcon,
  Wheat, Shield, TrendingDown,
} from 'lucide-react';
import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis,
  Tooltip, PieChart, Pie, Cell,
} from 'recharts';

export function Home() {
  const navigate = useNavigate();
  const stats = getNationalStats();
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const featuredProjects = selectedSector === 'all'
    ? projects.slice(0, 6)
    : projects.filter(p => p.sector === selectedSector).slice(0, 6);

  const budgetUtilization = Math.round((stats.totalSpent / stats.totalBudget) * 100);

  // Zone performance data
  const zones = ['North West', 'North East', 'North Central', 'South West', 'South South', 'South East'];
  const zoneData = zones.map(zone => {
    const zoneStates = states.filter(s => s.zone === zone);
    const totalProj = zoneStates.reduce((s, st) => s + st.projects, 0);
    const completedProj = zoneStates.reduce((s, st) => s + st.completedProjects, 0);
    const jobs = zoneStates.reduce((s, st) => s + st.jobsCreated, 0);
    return { zone, states: zoneStates.length, totalProj, completedProj, jobs, rate: totalProj > 0 ? Math.round((completedProj / totalProj) * 100) : 0 };
  });

  // Sector breakdown
  const sectorData = sectors.map(sector => {
    const sectorProjects = projects.filter(p => p.sector === sector);
    return { name: sector, count: sectorProjects.length, completed: sectorProjects.filter(p => p.status === 'completed').length };
  }).sort((a, b) => b.count - a.count);

  // Top performing states
  const topStates = [...states]
    .sort((a, b) => {
      const rateA = a.projects > 0 ? a.completedProjects / a.projects : 0;
      const rateB = b.projects > 0 ? b.completedProjects / b.projects : 0;
      return rateB - rateA;
    })
    .slice(0, 8);

  // Status distribution for donut
  const statusData = [
    { name: 'Completed', value: stats.completedProjects, color: '#22c55e' },
    { name: 'In Progress', value: stats.inProgressProjects, color: '#f59e0b' },
    { name: 'Delayed', value: stats.delayedProjects, color: '#ef4444' },
  ];

  // Recent trends
  const latestMetric = metrics[metrics.length - 1];
  const prevMetric = metrics[metrics.length - 2];
  const jobsTrend = ((latestMetric.jobsCreated - prevMetric.jobsCreated) / prevMetric.jobsCreated * 100).toFixed(1);
  const powerTrend = ((latestMetric.powerSupply - prevMetric.powerSupply) / prevMetric.powerSupply * 100).toFixed(1);
  const priceTrend = ((latestMetric.foodPriceIndex - prevMetric.foodPriceIndex) / prevMetric.foodPriceIndex * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/15 rounded-lg">
                  <Building className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">Nigeria National Performance Scorecard</h1>
                  <p className="text-green-100 mt-1 text-sm sm:text-base">Real-time transparency into government performance across all 36 states + FCT</p>
                </div>
              </div>
              <p className="text-green-50 text-sm max-w-2xl mt-4">
                Tracking {formatNumber(stats.totalProjects)} projects across {states.length} states, with {formatCurrency(stats.totalBudget)} in total budget allocation. Empowering citizens with data-driven accountability.
              </p>
            </div>

            {/* Hero quick stats */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:w-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-2xl font-bold">{stats.completionRate}%</div>
                <div className="text-green-100 text-xs mt-1">Completion Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-2xl font-bold">{formatNumber(stats.totalJobs)}</div>
                <div className="text-green-100 text-xs mt-1">Jobs Created</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-2xl font-bold">{formatNumber(stats.totalRoads)}</div>
                <div className="text-green-100 text-xs mt-1">Roads Completed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="text-2xl font-bold">{states.length}</div>
                <div className="text-green-100 text-xs mt-1">States Covered</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Projects"
            value={formatNumber(stats.totalProjects)}
            subtitle={`${stats.completionRate}% completion rate`}
            icon={FolderOpen}
            color="blue"
          />
          <StatCard
            title="Completed Projects"
            value={formatNumber(stats.completedProjects)}
            subtitle="Successfully delivered"
            icon={CheckCircle}
            color="green"
            trend={{ value: 12, positive: true }}
          />
          <StatCard
            title="Jobs Created"
            value={formatNumber(stats.totalJobs)}
            subtitle="Across all sectors"
            icon={Users}
            color="purple"
            trend={{ value: 8, positive: true }}
          />
          <StatCard
            title="Total Budget"
            value={formatCurrency(stats.totalBudget)}
            subtitle={`${formatCurrency(stats.totalSpent)} spent`}
            icon={Briefcase}
            color="amber"
          />
        </div>

        {/* Governance Indicators */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold">National Governance Indicators</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-3 bg-rose-50 rounded-lg text-center">
              <Heart className="w-5 h-5 text-rose-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">{formatNumber(stats.totalHealthCenters)}</div>
              <div className="text-xs text-gray-500">Health Centers Built</div>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg text-center">
              <GraduationCap className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">{formatNumber(stats.totalSchoolsBuilt)}</div>
              <div className="text-xs text-gray-500">Schools Built</div>
            </div>
            <div className="p-3 bg-cyan-50 rounded-lg text-center">
              <Droplets className="w-5 h-5 text-cyan-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">{formatNumber(stats.totalBoreholesDrilled)}</div>
              <div className="text-xs text-gray-500">Boreholes Drilled</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg text-center">
              <Zap className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">{formatNumber(stats.totalHouseholdsConnected)}</div>
              <div className="text-xs text-gray-500">Households Connected</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg text-center">
              <Wheat className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">{formatNumber(stats.totalFarmlandDeveloped)} ha</div>
              <div className="text-xs text-gray-500">Farmland Developed</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg text-center">
              <HomeIcon className="w-5 h-5 text-orange-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">{formatNumber(stats.totalHousingUnits)}</div>
              <div className="text-xs text-gray-500">Housing Units</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg text-center">
              <GraduationCap className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">{formatNumber(stats.totalStudentsEnrolled)}</div>
              <div className="text-xs text-gray-500">Students Enrolled</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg text-center">
              <Shield className="w-5 h-5 text-slate-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">{stats.avgCrimeReduction}%</div>
              <div className="text-xs text-gray-500">Avg Crime Reduction</div>
            </div>
            <div className="p-3 bg-teal-50 rounded-lg text-center">
              <TrendingDown className="w-5 h-5 text-teal-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">{stats.avgPovertyReduction}%</div>
              <div className="text-xs text-gray-500">Avg Poverty Reduction</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <Briefcase className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <div className="text-lg font-bold text-gray-900">{formatCurrency(stats.totalRevenueGenerated)}</div>
              <div className="text-xs text-gray-500">Revenue Generated (IGR)</div>
            </div>
          </div>
        </div>

        {/* Budget + Status Donut Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-bold">National Budget Overview</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Budget Utilization</span>
                  <span className="font-semibold">{budgetUtilization}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-green-600 h-4 rounded-full transition-all" style={{ width: `${budgetUtilization}%` }} />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm sm:text-lg font-bold text-gray-900">{formatCurrency(stats.totalBudget)}</div>
                  <div className="text-xs text-gray-500">Total Budget</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm sm:text-lg font-bold text-green-700">{formatCurrency(stats.totalSpent)}</div>
                  <div className="text-xs text-gray-500">Amount Spent</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm sm:text-lg font-bold text-blue-700">{formatCurrency(stats.totalBudget - stats.totalSpent)}</div>
                  <div className="text-xs text-gray-500">Remaining</div>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <div className="text-sm sm:text-lg font-bold text-amber-700">{budgetUtilization}%</div>
                  <div className="text-xs text-gray-500">Utilization</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold">Project Status</h2>
            </div>
            <div className="flex justify-center">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" strokeWidth={2} stroke="#fff">
                    {statusData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatNumber(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {statusData.map(s => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-gray-600">{s.name}</span>
                  </div>
                  <span className="font-semibold">{formatNumber(s.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Trends */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-600">Jobs Created (Monthly)</span>
              </div>
              <span className={`text-xs font-semibold ${Number(jobsTrend) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Number(jobsTrend) > 0 ? '+' : ''}{jobsTrend}%
              </span>
            </div>
            <div className="text-2xl font-bold mb-2">{formatNumber(latestMetric.jobsCreated)}</div>
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={metrics}>
                <Line type="monotone" dataKey="jobsCreated" stroke="#16a34a" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Power Supply (MW)</span>
              </div>
              <span className={`text-xs font-semibold ${Number(powerTrend) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                +{powerTrend}%
              </span>
            </div>
            <div className="text-2xl font-bold mb-2">{formatNumber(latestMetric.powerSupply)}</div>
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={metrics}>
                <Line type="monotone" dataKey="powerSupply" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-gray-600">Food Price Index</span>
              </div>
              <span className={`text-xs font-semibold ${Number(priceTrend) < 0 ? 'text-green-600' : 'text-red-600'}`}>
                {priceTrend}%
              </span>
            </div>
            <div className="text-2xl font-bold mb-2">{latestMetric.foodPriceIndex}</div>
            <ResponsiveContainer width="100%" height={60}>
              <LineChart data={metrics}>
                <Line type="monotone" dataKey="foodPriceIndex" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Map + Zone Performance side by side */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          <div className="xl:col-span-2">
            <NigeriaMap />
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-5">
              <MapPin className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold">Performance by Zone</h2>
            </div>
            <div className="space-y-4">
              {zoneData.map(z => (
                <div key={z.zone}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{z.zone}</span>
                    <span className="text-xs text-gray-500">{z.rate}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 mb-1">
                    <div
                      className="h-2.5 rounded-full transition-all"
                      style={{
                        width: `${z.rate}%`,
                        backgroundColor: z.rate >= 65 ? '#22c55e' : z.rate >= 50 ? '#f59e0b' : '#ef4444',
                      }}
                    />
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>{z.states} states</span>
                    <span>{formatNumber(z.totalProj)} projects</span>
                    <span>{formatNumber(z.jobs)} jobs</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/analytics')}
              className="mt-5 w-full flex items-center justify-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium py-2 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              View Full Analytics
            </button>
          </div>
        </div>

        {/* Sector Breakdown + Top States */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sector Breakdown */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold">Sector Breakdown</h2>
            </div>
            <div className="space-y-3">
              {sectorData.map(s => {
                const maxCount = Math.max(...sectorData.map(d => d.count));
                return (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="text-xs sm:text-sm text-gray-600 w-20 sm:w-28 shrink-0 truncate">{s.name}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-blue-500 rounded-full"
                        style={{ width: `${maxCount > 0 ? (s.count / maxCount) * 100 : 0}%` }}
                      />
                      <div
                        className="absolute inset-y-0 left-0 bg-green-500 rounded-full"
                        style={{ width: `${maxCount > 0 ? (s.completed / maxCount) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-8 text-right">{s.count}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 mt-4 pt-3 border-t text-xs text-gray-500">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Total</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500" /> Completed</div>
            </div>
          </div>

          {/* Top Performing States */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-5">
              <Target className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-bold">Top Performing States</h2>
            </div>
            <div className="space-y-2">
              {topStates.map((st, i) => {
                const rate = st.projects > 0 ? Math.round((st.completedProjects / st.projects) * 100) : 0;
                return (
                  <div
                    key={st.id}
                    onClick={() => navigate(`/state/${st.id}`)}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(st.status)}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{st.name}</div>
                      <div className="text-xs text-gray-500">{st.zone}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">{rate}%</div>
                      <div className="text-xs text-gray-500">{st.completedProjects}/{st.projects}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-green-800">{formatNumber(stats.completedProjects)} Projects Completed</div>
              <div className="text-xs text-green-600 mt-0.5">Successfully delivered across all states</div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-amber-800">{formatNumber(stats.inProgressProjects)} Projects In Progress</div>
              <div className="text-xs text-amber-600 mt-0.5">Currently under active implementation</div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-red-800">{formatNumber(stats.delayedProjects)} Projects Delayed</div>
              <div className="text-xs text-red-600 mt-0.5">Require attention and intervention</div>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Featured Projects</h2>
              <p className="text-gray-600 mt-1">Track government projects across all sectors</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedSector('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedSector === 'all' ? 'bg-green-600 text-white' : 'bg-white border hover:bg-gray-50'
                }`}
              >
                All Sectors
              </button>
              {sectors.slice(0, 4).map(sector => (
                <button
                  key={sector}
                  onClick={() => setSelectedSector(sector)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSector === sector ? 'bg-green-600 text-white' : 'bg-white border hover:bg-gray-50'
                  }`}
                >
                  {sector}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} onClick={() => navigate(`/projects/${project.id}`)} />
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/projects')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
