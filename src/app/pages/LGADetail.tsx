import { useParams, useNavigate } from 'react-router';
import { getLGAById, getProjectsByLGA } from '../data/mockData';
import { ProjectCard } from '../components/ProjectCard';
import { formatNumber, getStatusLabel, getStatusColor } from '../utils/helpers';
import { ArrowLeft, Briefcase, CheckCircle, Users, Building2, Heart, GraduationCap, Droplets, Zap, Home as HomeIcon, Wheat } from 'lucide-react';

export function LGADetail() {
  const { stateId, lgaId } = useParams<{ stateId: string; lgaId: string }>();
  const navigate = useNavigate();
  const lga = getLGAById(stateId || '', lgaId || '');
  const lgaProjects = getProjectsByLGA(stateId || '', lgaId || '');

  if (!lga) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">LGA Not Found</h2>
          <p className="text-gray-600 mb-4">The local government area you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate(`/state/${stateId}`)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Back to State
          </button>
        </div>
      </div>
    );
  }

  const completionRate = Math.round((lga.completedProjects / lga.projects) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(`/state/${stateId}`)}
            className="flex items-center gap-2 text-white hover:text-green-100 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to {lga.state} State
          </button>
          <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${getStatusColor(lga.status)}`} />
            <div>
              <h1 className="text-3xl font-bold">{lga.name} LGA</h1>
              <p className="text-green-100 mt-1">{lga.state} State • {getStatusLabel(lga.status)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border p-6">
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600 w-fit mb-4"><Briefcase className="w-5 h-5" /></div>
            <h3 className="text-2xl font-bold">{lga.projects}</h3>
            <p className="text-sm text-gray-600">Total Projects</p>
            <p className="text-xs text-gray-500 mt-1">{completionRate}% completion rate</p>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <div className="p-3 rounded-lg bg-green-50 text-green-600 w-fit mb-4"><CheckCircle className="w-5 h-5" /></div>
            <h3 className="text-2xl font-bold">{lga.completedProjects}</h3>
            <p className="text-sm text-gray-600">Completed Projects</p>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600 w-fit mb-4"><Users className="w-5 h-5" /></div>
            <h3 className="text-2xl font-bold">{formatNumber(lga.jobsCreated)}</h3>
            <p className="text-sm text-gray-600">Jobs Created</p>
          </div>
          <div className="bg-white rounded-lg border p-6">
            <div className="p-3 rounded-lg bg-amber-50 text-amber-600 w-fit mb-4"><Building2 className="w-5 h-5" /></div>
            <h3 className="text-2xl font-bold">{lga.roadsCompleted}</h3>
            <p className="text-sm text-gray-600">Roads Completed</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6 mb-8">
          <h2 className="text-lg font-bold mb-4">Development Indicators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-3 bg-rose-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1"><Heart className="w-4 h-4 text-rose-600" /><span className="text-xs text-gray-500">Health Centers</span></div>
              <div className="text-xl font-bold">{lga.healthCenters}</div>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1"><GraduationCap className="w-4 h-4 text-indigo-600" /><span className="text-xs text-gray-500">Schools Built</span></div>
              <div className="text-xl font-bold">{lga.schoolsBuilt}</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1"><GraduationCap className="w-4 h-4 text-blue-600" /><span className="text-xs text-gray-500">Students Enrolled</span></div>
              <div className="text-xl font-bold">{formatNumber(lga.studentsEnrolled)}</div>
            </div>
            <div className="p-3 bg-cyan-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1"><Droplets className="w-4 h-4 text-cyan-600" /><span className="text-xs text-gray-500">Boreholes Drilled</span></div>
              <div className="text-xl font-bold">{lga.boreholesDrilled}</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1"><Zap className="w-4 h-4 text-yellow-600" /><span className="text-xs text-gray-500">Households Connected</span></div>
              <div className="text-xl font-bold">{formatNumber(lga.householdsConnected)}</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1"><HomeIcon className="w-4 h-4 text-orange-600" /><span className="text-xs text-gray-500">Housing Units</span></div>
              <div className="text-xl font-bold">{lga.housingUnits}</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-2 mb-1"><Wheat className="w-4 h-4 text-emerald-600" /><span className="text-xs text-gray-500">Farmland Developed</span></div>
              <div className="text-xl font-bold">{lga.farmlandDeveloped} ha</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Projects in {lga.name}</h2>
          {lgaProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lgaProjects.map(project => (
                <ProjectCard key={project.id} project={project} onClick={() => navigate(`/projects/${project.id}`)} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-12 text-center">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Found</h3>
              <p className="text-gray-600">There are currently no projects specifically assigned to this LGA in our database.</p>
              <button
                onClick={() => navigate('/projects')}
                className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
