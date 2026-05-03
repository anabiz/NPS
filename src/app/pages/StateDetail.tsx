import { useParams, useNavigate } from 'react-router';
import { getStateById, getProjectsByState, states, getNationalStats } from '../data/mockData';
import { StatCard } from '../components/StatCard';
import { ProjectCard } from '../components/ProjectCard';
import { StateMap } from '../components/StateMap';
import { formatCurrency, formatNumber, getStatusLabel, getStatusColor } from '../utils/helpers';
import {
  ArrowLeft, Briefcase, CheckCircle, MapPin, TrendingUp, Users,
  Target, AlertTriangle, Clock, ChevronRight, Search, ArrowRight,
  BarChart3, Activity, Building2, Award, Heart, GraduationCap,
  Droplets, Zap, Home as HomeIcon, Wheat, Shield, TrendingDown,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export function StateDetail() {
  const { stateId } = useParams<{ stateId: string }>();
  const navigate = useNavigate();
  const state = getStateById(stateId || '');
  const stateProjects = getProjectsByState(stateId || '');
  const [lgaSearch, setLgaSearch] = useState('');
  const [lgaStatusFilter, setLgaStatusFilter] = useState<string>('all');

  if (!state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">State Not Found</h2>
          <p className="text-gray-600 mb-4">The state you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const completionRate = Math.round((state.completedProjects / state.projects) * 100);
  const budgetUtilization = Math.round((state.spent / state.budget) * 100);
  const nationalStats = getNationalStats();

  // State ranking
  const stateRank = [...states]
    .sort((a, b) => (b.completedProjects / b.projects) - (a.completedProjects / a.projects))
    .findIndex(s => s.id === state.id) + 1;

  // Zone comparison
  const zoneStates = states.filter(s => s.zone === state.zone);
  const zoneAvgCompletion = Math.round(
    zoneStates.reduce((sum, s) => sum + (s.completedProjects / s.projects) * 100, 0) / zoneStates.length
  );
  const zoneAvgJobs = Math.round(zoneStates.reduce((sum, s) => sum + s.jobsCreated, 0) / zoneStates.length);
  const nationalAvgCompletion = nationalStats.completionRate;

  // Status donut
  const statusData = [
    { name: 'Completed', value: state.completedProjects, color: '#22c55e' },
    { name: 'In Progress', value: state.inProgressProjects, color: '#f59e0b' },
    { name: 'Delayed', value: state.delayedProjects, color: '#ef4444' },
  ];

  // LGA status distribution
  const lgaStatusCounts = {
    completed: state.lgas.filter(l => l.status === 'completed').length,
    'in-progress': state.lgas.filter(l => l.status === 'in-progress').length,
    delayed: state.lgas.filter(l => l.status === 'delayed').length,
    'not-started': state.lgas.filter(l => l.status === 'not-started').length,
  };

  // Top LGAs
  const topLgas = [...state.lgas]
    .sort((a, b) => {
      const rA = a.projects > 0 ? a.completedProjects / a.projects : 0;
      const rB = b.projects > 0 ? b.completedProjects / b.projects : 0;
      return rB - rA;
    })
    .slice(0, 6);

  // LGA bar chart data (top 10 by projects)
  const lgaChartData = [...state.lgas]
    .sort((a, b) => b.projects - a.projects)
    .slice(0, 10)
    .map(l => ({ name: l.name.length > 10 ? l.name.slice(0, 9) + '…' : l.name, projects: l.projects, completed: l.completedProjects }));

  // Filtered LGAs
  const filteredLgas = useMemo(() => {
    return state.lgas.filter(l => {
      const matchSearch = l.name.toLowerCase().includes(lgaSearch.toLowerCase());
      const matchStatus = lgaStatusFilter === 'all' || l.status === lgaStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [state.lgas, lgaSearch, lgaStatusFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to National Dashboard
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-4 h-4 rounded-full ${getStatusColor(state.status)} ring-2 ring-white/30`} />
                <h1 className="text-3xl md:text-4xl font-bold">{state.name} State</h1>
              </div>
              <p className="text-green-100 mt-1">{state.zone} • {getStatusLabel(state.status)}</p>
              <p className="text-green-50 text-sm mt-3 max-w-xl">
                {state.lgas.length} Local Government Areas • {formatNumber(state.projects)} projects • {formatCurrency(state.budget)} total budget
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
                <div className="text-xl sm:text-2xl font-bold">{completionRate}%</div>
                <div className="text-green-100 text-xs mt-0.5">Completion</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
                <div className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-1">
                  <Award className="w-4 h-4" />#{stateRank}
                </div>
                <div className="text-green-100 text-xs mt-0.5">National Rank</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
                <div className="text-xl sm:text-2xl font-bold">{state.lgas.length}</div>
                <div className="text-green-100 text-xs mt-0.5">LGAs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Projects" value={formatNumber(state.projects)} subtitle={`${completionRate}% completion rate`} icon={Briefcase} color="blue" />
          <StatCard title="Completed Projects" value={formatNumber(state.completedProjects)} subtitle={`${state.inProgressProjects} in progress`} icon={CheckCircle} color="green" />
          <StatCard title="Jobs Created" value={formatNumber(state.jobsCreated)} subtitle="Employment impact" icon={Users} color="purple" />
          <StatCard title="Roads Completed" value={formatNumber(state.roadsCompleted)} subtitle="Infrastructure delivery" icon={TrendingUp} color="amber" />
        </div>

        {/* Budget + Status Donut */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-lg border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-bold">Budget Overview</h2>
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
                  <div className="text-sm sm:text-lg font-bold text-gray-900">{formatCurrency(state.budget)}</div>
                  <div className="text-xs text-gray-500">Total Budget</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm sm:text-lg font-bold text-green-700">{formatCurrency(state.spent)}</div>
                  <div className="text-xs text-gray-500">Amount Spent</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm sm:text-lg font-bold text-blue-700">{formatCurrency(state.budget - state.spent)}</div>
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
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={68} dataKey="value" strokeWidth={2} stroke="#fff">
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

        {/* Zone Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg border p-5">
            <div className="text-sm text-gray-500 mb-1">State Completion Rate</div>
            <div className="text-3xl font-bold">{completionRate}%</div>
            <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${completionRate}%` }} />
            </div>
          </div>
          <div className="bg-white rounded-lg border p-5">
            <div className="text-sm text-gray-500 mb-1">{state.zone} Average</div>
            <div className="text-3xl font-bold">{zoneAvgCompletion}%</div>
            <div className="mt-2 text-xs">
              {completionRate >= zoneAvgCompletion
                ? <span className="text-green-600 font-medium">+{completionRate - zoneAvgCompletion}% above zone avg</span>
                : <span className="text-red-600 font-medium">{completionRate - zoneAvgCompletion}% below zone avg</span>
              }
            </div>
          </div>
          <div className="bg-white rounded-lg border p-5">
            <div className="text-sm text-gray-500 mb-1">National Average</div>
            <div className="text-3xl font-bold">{nationalAvgCompletion}%</div>
            <div className="mt-2 text-xs">
              {completionRate >= nationalAvgCompletion
                ? <span className="text-green-600 font-medium">+{completionRate - nationalAvgCompletion}% above national avg</span>
                : <span className="text-red-600 font-medium">{completionRate - nationalAvgCompletion}% below national avg</span>
              }
            </div>
          </div>
        </div>

        {/* Governance Indicators */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold">Governance Performance Indicators</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-rose-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-rose-600" />
                <span className="text-xs text-gray-500">Health Centers</span>
              </div>
              <div className="text-xl font-bold">{formatNumber(state.healthCenters)}</div>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span className="text-xs text-gray-500">Schools Built</span>
              </div>
              <div className="text-xl font-bold">{formatNumber(state.schoolsBuilt)}</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-gray-500">Students Enrolled</span>
              </div>
              <div className="text-xl font-bold">{formatNumber(state.studentsEnrolled)}</div>
            </div>
            <div className="p-3 bg-cyan-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-4 h-4 text-cyan-600" />
                <span className="text-xs text-gray-500">Boreholes Drilled</span>
              </div>
              <div className="text-xl font-bold">{formatNumber(state.boreholesDrilled)}</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span className="text-xs text-gray-500">Households Connected</span>
              </div>
              <div className="text-xl font-bold">{formatNumber(state.householdsConnected)}</div>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-amber-600" />
                <span className="text-xs text-gray-500">Avg Power Supply</span>
              </div>
              <div className="text-xl font-bold">{state.powerSupplyHours} hrs/day</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <HomeIcon className="w-4 h-4 text-orange-600" />
                <span className="text-xs text-gray-500">Housing Units</span>
              </div>
              <div className="text-xl font-bold">{formatNumber(state.housingUnits)}</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Wheat className="w-4 h-4 text-emerald-600" />
                <span className="text-xs text-gray-500">Farmland Developed</span>
              </div>
              <div className="text-xl font-bold">{formatNumber(state.farmlandDeveloped)} ha</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-slate-600" />
                <span className="text-xs text-gray-500">Crime Reduction</span>
              </div>
              <div className="text-xl font-bold">{state.crimeReduction}%</div>
            </div>
            <div className="p-3 bg-teal-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingDown className="w-4 h-4 text-teal-600" />
                <span className="text-xs text-gray-500">Poverty Reduction</span>
              </div>
              <div className="text-xl font-bold">{state.povertyReduction}%</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="w-4 h-4 text-green-600" />
                <span className="text-xs text-gray-500">Revenue (IGR)</span>
              </div>
              <div className="text-xl font-bold">{formatCurrency(state.revenueGenerated)}</div>
            </div>
          </div>
        </div>

        {/* Performance Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-green-800">{formatNumber(state.completedProjects)} Completed</div>
              <div className="text-xs text-green-600 mt-0.5">Successfully delivered projects</div>
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-amber-800">{formatNumber(state.inProgressProjects)} In Progress</div>
              <div className="text-xs text-amber-600 mt-0.5">Under active implementation</div>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-sm font-semibold text-red-800">{formatNumber(state.delayedProjects)} Delayed</div>
              <div className="text-xs text-red-600 mt-0.5">Require attention</div>
            </div>
          </div>
        </div>

        {/* State Map + Top LGAs */}
        {state.lgas.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            <div className="xl:col-span-2">
              <StateMap state={state} />
            </div>

            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center gap-2 mb-5">
                <Award className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-bold">Top Performing LGAs</h2>
              </div>
              <div className="space-y-2">
                {topLgas.map((lga, i) => {
                  const rate = lga.projects > 0 ? Math.round((lga.completedProjects / lga.projects) * 100) : 0;
                  return (
                    <div
                      key={lga.id}
                      onClick={() => navigate(`/state/${stateId}/lga/${lga.id}`)}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <span className="text-sm font-bold text-gray-400 w-5">{i + 1}</span>
                      <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(lga.status)}`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{lga.name}</div>
                        <div className="text-xs text-gray-500">{formatNumber(lga.jobsCreated)} jobs</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">{rate}%</div>
                        <div className="text-xs text-gray-500">{lga.completedProjects}/{lga.projects}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </div>
                  );
                })}
              </div>

              {/* LGA Status Distribution */}
              <div className="mt-5 pt-4 border-t">
                <div className="text-xs font-medium text-gray-500 mb-2">LGA Status Distribution</div>
                <div className="flex rounded-full overflow-hidden h-3">
                  {lgaStatusCounts.completed > 0 && (
                    <div className="bg-green-500" style={{ width: `${(lgaStatusCounts.completed / state.lgas.length) * 100}%` }} />
                  )}
                  {lgaStatusCounts['in-progress'] > 0 && (
                    <div className="bg-amber-500" style={{ width: `${(lgaStatusCounts['in-progress'] / state.lgas.length) * 100}%` }} />
                  )}
                  {lgaStatusCounts.delayed > 0 && (
                    <div className="bg-red-500" style={{ width: `${(lgaStatusCounts.delayed / state.lgas.length) * 100}%` }} />
                  )}
                  {lgaStatusCounts['not-started'] > 0 && (
                    <div className="bg-gray-400" style={{ width: `${(lgaStatusCounts['not-started'] / state.lgas.length) * 100}%` }} />
                  )}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
                  {lgaStatusCounts.completed > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" />{lgaStatusCounts.completed} Completed</span>}
                  {lgaStatusCounts['in-progress'] > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" />{lgaStatusCounts['in-progress']} In Progress</span>}
                  {lgaStatusCounts.delayed > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" />{lgaStatusCounts.delayed} Delayed</span>}
                  {lgaStatusCounts['not-started'] > 0 && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-400" />{lgaStatusCounts['not-started']} Not Started</span>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LGA Projects Bar Chart */}
        {lgaChartData.length > 0 && (
          <div className="bg-white rounded-lg border p-6 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold">Top LGAs by Project Count</h2>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={lgaChartData} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={10} angle={-30} textAnchor="end" height={50} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="projects" fill="#3b82f6" name="Total Projects" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#22c55e" name="Completed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* LGA Grid with Search/Filter */}
        {state.lgas.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
              <h2 className="text-2xl font-bold">Local Government Areas ({state.lgas.length})</h2>
              <div className="flex gap-2 flex-wrap">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search LGA..."
                    value={lgaSearch}
                    onChange={e => setLgaSearch(e.target.value)}
                    className="pl-9 pr-3 py-2 border rounded-lg text-sm w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                {(['all', 'completed', 'in-progress', 'delayed'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setLgaStatusFilter(status)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      lgaStatusFilter === status ? 'bg-green-600 text-white' : 'bg-white border hover:bg-gray-50'
                    }`}
                  >
                    {status === 'all' ? 'All' : getStatusLabel(status)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLgas.map(lga => {
                const lgaRate = lga.projects > 0 ? Math.round((lga.completedProjects / lga.projects) * 100) : 0;
                return (
                  <div
                    key={lga.id}
                    onClick={() => navigate(`/state/${stateId}/lga/${lga.id}`)}
                    className="bg-white rounded-lg border p-5 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <h3 className="font-semibold text-sm">{lga.name}</h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        lga.status === 'completed' ? 'bg-green-100 text-green-700' :
                        lga.status === 'in-progress' ? 'bg-amber-100 text-amber-700' :
                        lga.status === 'delayed' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {getStatusLabel(lga.status)}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Completion</span>
                        <span className="font-medium">{lgaRate}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{
                            width: `${lgaRate}%`,
                            backgroundColor: lgaRate >= 70 ? '#22c55e' : lgaRate >= 40 ? '#f59e0b' : '#ef4444',
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-xs text-gray-500">Projects</div>
                        <div className="font-bold">{lga.projects}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Completed</div>
                        <div className="font-bold text-green-600">{lga.completedProjects}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Jobs</div>
                        <div className="font-bold">{formatNumber(lga.jobsCreated)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Roads</div>
                        <div className="font-bold">{lga.roadsCompleted}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredLgas.length === 0 && (
              <div className="bg-white rounded-lg border p-12 text-center">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No LGAs match your search or filter.</p>
              </div>
            )}
          </div>
        )}

        {/* Projects */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Projects in {state.name}</h2>
            <button
              onClick={() => navigate('/projects', { state: { selectedState: state.name } })}
              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1 text-sm"
            >
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          {stateProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stateProjects.slice(0, 6).map(project => (
                <ProjectCard key={project.id} project={project} onClick={() => navigate(`/projects/${project.id}`)} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-12 text-center">
              <Building2 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No Projects Found</h3>
              <p className="text-gray-500 text-sm">No projects are currently assigned to this state in the database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
