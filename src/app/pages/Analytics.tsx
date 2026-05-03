import { useNavigate } from 'react-router';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { metrics, getNationalStats, states, sectors, projects } from '../data/mockData';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';

export function Analytics() {
  const navigate = useNavigate();
  const stats = getNationalStats();

  const sectorData = sectors.map(sector => ({
    sector,
    projects: projects.filter(p => p.sector === sector).length,
    completed: projects.filter(p => p.sector === sector && p.status === 'completed').length,
  }));

  const zoneData = [
    { zone: 'North West', states: states.filter(s => s.zone === 'North West').length, projects: states.filter(s => s.zone === 'North West').reduce((sum, s) => sum + s.projects, 0) },
    { zone: 'North East', states: states.filter(s => s.zone === 'North East').length, projects: states.filter(s => s.zone === 'North East').reduce((sum, s) => sum + s.projects, 0) },
    { zone: 'North Central', states: states.filter(s => s.zone === 'North Central').length, projects: states.filter(s => s.zone === 'North Central').reduce((sum, s) => sum + s.projects, 0) },
    { zone: 'South West', states: states.filter(s => s.zone === 'South West').length, projects: states.filter(s => s.zone === 'South West').reduce((sum, s) => sum + s.projects, 0) },
    { zone: 'South South', states: states.filter(s => s.zone === 'South South').length, projects: states.filter(s => s.zone === 'South South').reduce((sum, s) => sum + s.projects, 0) },
    { zone: 'South East', states: states.filter(s => s.zone === 'South East').length, projects: states.filter(s => s.zone === 'South East').reduce((sum, s) => sum + s.projects, 0) },
  ];

  const latestMetric = metrics[metrics.length - 1];
  const previousMetric = metrics[metrics.length - 2];

  const jobsTrend = ((latestMetric.jobsCreated - previousMetric.jobsCreated) / previousMetric.jobsCreated * 100).toFixed(1);
  const priceTrend = ((latestMetric.foodPriceIndex - previousMetric.foodPriceIndex) / previousMetric.foodPriceIndex * 100).toFixed(1);
  const powerTrend = ((latestMetric.powerSupply - previousMetric.powerSupply) / previousMetric.powerSupply * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-green-100 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">Performance Analytics</h1>
          <p className="text-green-100 mt-2">Real-time insights and trends across key indicators</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Jobs Created (Monthly)</h3>
              <div className={`flex items-center gap-1 ${Number(jobsTrend) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Number(jobsTrend) > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm font-medium">{jobsTrend}%</span>
              </div>
            </div>
            <div className="text-3xl font-bold">{latestMetric.jobsCreated.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">April 2026</p>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Food Price Index</h3>
              <div className={`flex items-center gap-1 ${Number(priceTrend) < 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Number(priceTrend) < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                <span className="text-sm font-medium">{Math.abs(Number(priceTrend))}%</span>
              </div>
            </div>
            <div className="text-3xl font-bold">{latestMetric.foodPriceIndex}</div>
            <p className="text-sm text-gray-500 mt-1">{Number(priceTrend) < 0 ? 'Decreasing' : 'Increasing'}</p>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Power Supply (MW)</h3>
              <div className={`flex items-center gap-1 ${Number(powerTrend) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Number(powerTrend) > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm font-medium">{powerTrend}%</span>
              </div>
            </div>
            <div className="text-3xl font-bold">{latestMetric.powerSupply.toLocaleString()}</div>
            <p className="text-sm text-gray-500 mt-1">Current output</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Jobs Created Over Time</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={metrics} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="jobsCreated" stroke="#16a34a" strokeWidth={2} name="Jobs Created" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Food Price Index Trend</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={metrics} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="foodPriceIndex" stroke="#f59e0b" strokeWidth={2} name="Food Price Index" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Power Supply Trend (MW)</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={metrics} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="powerSupply" stroke="#3b82f6" strokeWidth={2} name="Power Supply (MW)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Monthly Project Completions</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={metrics} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend />
                <Bar dataKey="projectsCompleted" fill="#16a34a" name="Projects Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Projects by Sector</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectorData} layout="horizontal" margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" fontSize={11} />
                <YAxis dataKey="sector" type="category" width={80} fontSize={10} />
                <Tooltip />
                <Legend />
                <Bar dataKey="projects" fill="#3b82f6" name="Total Projects" />
                <Bar dataKey="completed" fill="#16a34a" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg border p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Projects by Geopolitical Zone</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={zoneData} margin={{ left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="zone" fontSize={10} angle={-20} textAnchor="end" height={50} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend />
                <Bar dataKey="projects" fill="#8b5cf6" name="Total Projects" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
