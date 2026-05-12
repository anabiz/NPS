import { useParams, useNavigate } from 'react-router';
import { projects } from '../data/mockData';
import { EvidenceGallery } from '../components/EvidenceGallery';
import { formatCurrency, formatNumber, getStatusLabel, getStatusBgColor, getStatusTextColor } from '../utils/helpers';
import { ArrowLeft, MapPin, Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';
import { ShareButton } from '../components/ShareButton';

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
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{project.name}</h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-green-100 text-xs sm:text-sm">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{project.location}</span>
                  <span className="flex items-center gap-1"><TrendingUp className="w-4 h-4" />{project.sector}</span>
                </div>
              </div>
              <div className="shrink-0">
                <ShareButton
                  title={project.name}
                  text={`${project.name} — ${project.progress}% complete. ${formatNumber(project.jobsCreated)} jobs created. Track Nigeria's development progress.`}
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  variant="button"
                />
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
        <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
          <div className="bg-white rounded-lg border p-2.5 sm:p-4 text-center">
            <DollarSign className="w-4 h-4 text-blue-600 mx-auto mb-0.5" />
            <div className="text-xs sm:text-sm font-bold">{formatCurrency(project.budget)}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Budget</div>
          </div>
          <div className="bg-white rounded-lg border p-2.5 sm:p-4 text-center">
            <DollarSign className="w-4 h-4 text-green-600 mx-auto mb-0.5" />
            <div className="text-xs sm:text-sm font-bold">{formatCurrency(project.spent)}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Spent</div>
          </div>
          <div className="bg-white rounded-lg border p-2.5 sm:p-4 text-center">
            <Users className="w-4 h-4 text-purple-600 mx-auto mb-0.5" />
            <div className="text-xs sm:text-sm font-bold">{formatNumber(project.jobsCreated)}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Jobs</div>
          </div>
          <div className="bg-white rounded-lg border p-2.5 sm:p-4 text-center">
            <Calendar className="w-4 h-4 text-amber-600 mx-auto mb-0.5" />
            <div className="text-xs sm:text-sm font-bold">{project.progress}%</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Progress</div>
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
          <h2 className="text-lg font-bold mb-4">About This Project</h2>
          <div className="prose prose-sm sm:prose-base max-w-none text-gray-600">
            {project.description.split('. ').reduce((acc: string[][], sentence, i, arr) => {
              // Group sentences into paragraphs of 2-3 sentences
              const lastGroup = acc[acc.length - 1];
              if (lastGroup && lastGroup.length < 3) {
                lastGroup.push(sentence + (i < arr.length - 1 ? '.' : ''));
              } else {
                acc.push([sentence + (i < arr.length - 1 ? '.' : '')]);
              }
              return acc;
            }, []).map((para, i) => (
              <p key={i} className="mb-3 last:mb-0 leading-relaxed">{para.join(' ')}</p>
            ))}
          </div>
          {(project.impact.beneficiaries || project.impact.roadsBuilt || project.impact.hospitalsBuilt || project.impact.schoolsBuilt) && (
            <div className="mt-5 pt-5 border-t">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Impact Metrics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.impact.beneficiaries && (
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="text-sm sm:text-base font-bold text-green-800">{formatNumber(project.impact.beneficiaries)}</div>
                    <div className="text-[10px] sm:text-xs text-green-600">Beneficiaries</div>
                  </div>
                )}
                {project.impact.roadsBuilt && (
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-sm sm:text-base font-bold text-blue-800">{formatNumber(project.impact.roadsBuilt)} km</div>
                    <div className="text-[10px] sm:text-xs text-blue-600">Roads Built</div>
                  </div>
                )}
                {project.impact.hospitalsBuilt && (
                  <div className="bg-rose-50 rounded-lg p-3 text-center">
                    <div className="text-sm sm:text-base font-bold text-rose-800">{formatNumber(project.impact.hospitalsBuilt)}</div>
                    <div className="text-[10px] sm:text-xs text-rose-600">Health Facilities</div>
                  </div>
                )}
                {project.impact.schoolsBuilt && (
                  <div className="bg-indigo-50 rounded-lg p-3 text-center">
                    <div className="text-sm sm:text-base font-bold text-indigo-800">{formatNumber(project.impact.schoolsBuilt)}</div>
                    <div className="text-[10px] sm:text-xs text-indigo-600">Schools Built</div>
                  </div>
                )}
              </div>
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
