import { useParams, useNavigate } from 'react-router';
import { projects } from '../data/mockData';
import { EvidenceGallery } from '../components/EvidenceGallery';
import { formatCurrency, formatNumber, getStatusLabel, getStatusBgColor, getStatusTextColor } from '../utils/helpers';
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/projects')} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{project.name}</h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-green-100 text-xs sm:text-sm">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{project.location}</span>
                <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" />{project.sector}</span>
              </div>
            </div>
            <span className={`self-start px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusBgColor(project.status)} ${getStatusTextColor(project.status)}`}>
              {getStatusLabel(project.status)}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
          <div className="bg-white rounded-lg border p-3 sm:p-5 text-center">
            <DollarSign className="w-5 h-5 text-blue-600 mx-auto mb-1" />
            <div className="text-base sm:text-xl font-bold">{formatCurrency(project.budget)}</div>
            <div className="text-xs text-gray-500">Budget</div>
          </div>
          <div className="bg-white rounded-lg border p-3 sm:p-5 text-center">
            <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <div className="text-base sm:text-xl font-bold">{formatCurrency(project.spent)}</div>
            <div className="text-xs text-gray-500">Spent</div>
          </div>
          <div className="bg-white rounded-lg border p-3 sm:p-5 text-center">
            <Users className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <div className="text-base sm:text-xl font-bold">{formatNumber(project.jobsCreated)}</div>
            <div className="text-xs text-gray-500">Jobs Created</div>
          </div>
          <div className="bg-white rounded-lg border p-3 sm:p-5 text-center">
            <Calendar className="w-5 h-5 text-amber-600 mx-auto mb-1" />
            <div className="text-base sm:text-xl font-bold">{project.progress}%</div>
            <div className="text-xs text-gray-500">Progress</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Project Progress</span>
            <span className="font-semibold">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-green-600 h-4 rounded-full transition-all" style={{ width: `${project.progress}%` }} />
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-500">
            <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
            <span>End: {new Date(project.endDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg border p-6 mb-8">
          <h2 className="text-lg font-bold mb-3">About This Project</h2>
          <p className="text-gray-600">{project.description}</p>
          {project.impact.beneficiaries && (
            <div className="mt-4 pt-4 border-t text-sm text-gray-500">
              Estimated beneficiaries: {formatNumber(project.impact.beneficiaries)}
            </div>
          )}
        </div>

        {/* Evidence Gallery */}
        {project.media.length > 0 && (
          <div className="mb-8">
            <EvidenceGallery media={project.media} projectName={project.name} />
          </div>
        )}
      </div>
    </div>
  );
}
