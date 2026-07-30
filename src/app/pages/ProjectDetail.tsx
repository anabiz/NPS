import { useParams, useNavigate } from 'react-router';
import { projects } from '../data/mockData';
import { EvidenceGallery } from '../components/EvidenceGallery';
import { formatCurrency, formatNumber, getStatusLabel, getStatusBgColor, getStatusTextColor } from '../utils/helpers';
import { ArrowLeft, MapPin, Layers, Banknote, Users, CalendarDays, TrendingUp, CheckCircle2 } from 'lucide-react';
import { ShareButton } from '../components/ShareButton';

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/projects')} className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800">
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const paragraphs = project.description.split('. ').reduce((acc: string[][], sentence, i, arr) => {
    const lastGroup = acc[acc.length - 1];
    if (lastGroup && lastGroup.length < 3) {
      lastGroup.push(sentence + (i < arr.length - 1 ? '.' : ''));
    } else {
      acc.push([sentence + (i < arr.length - 1 ? '.' : '')]);
    }
    return acc;
  }, []);

  const progressColor = project.status === 'completed'
    ? 'bg-green-700'
    : project.status === 'delayed'
    ? 'bg-red-600'
    : 'bg-amber-500';

  return (
    <div className="min-h-screen bg-stone-50">

      {/* ── Header bar ── */}
      <div className="bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-stone-400 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </button>
          <ShareButton
            title={project.name}
            text={`${project.name} — ${project.progress}% complete. ${formatNumber(project.jobsCreated)} jobs created.`}
            url={typeof window !== 'undefined' ? window.location.href : ''}
            variant="button"
          />
        </div>
      </div>

      {/* ── Title block ── */}
      <div className="bg-stone-900 text-white border-b-4 border-green-600">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-10">
          {/* Sector + status row */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="uppercase tracking-widest text-xs text-green-400 font-semibold">{project.sector}</span>
            <span className="text-stone-600">·</span>
            <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${getStatusBgColor(project.status)} ${getStatusTextColor(project.status)}`}>
              {getStatusLabel(project.status)}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
            {project.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-stone-400 text-sm">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{project.location}</span>
            <span className="flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" />
              {new Date(project.startDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
              {' — '}
              {new Date(project.endDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      {/* ── Metrics strip ── */}
      <div className="bg-white border-b border-stone-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-stone-200">
            <div className="py-4 px-4 sm:px-6">
              <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider mb-1">
                <Banknote className="w-3.5 h-3.5" /> Budget
              </div>
              <div className="text-base sm:text-lg font-bold text-stone-800">{formatCurrency(project.budget)}</div>
            </div>
            <div className="py-4 px-4 sm:px-6">
              <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider mb-1">
                <Banknote className="w-3.5 h-3.5" /> Disbursed
              </div>
              <div className="text-base sm:text-lg font-bold text-stone-800">{formatCurrency(project.spent)}</div>
            </div>
            <div className="py-4 px-4 sm:px-6">
              <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider mb-1">
                <Users className="w-3.5 h-3.5" /> Jobs Created
              </div>
              <div className="text-base sm:text-lg font-bold text-stone-800">{project.jobsCreated > 0 ? formatNumber(project.jobsCreated) : 'N/D'}</div>
            </div>
            <div className="py-4 px-4 sm:px-6">
              <div className="flex items-center gap-1.5 text-stone-400 text-xs uppercase tracking-wider mb-1">
                <TrendingUp className="w-3.5 h-3.5" /> Progress
              </div>
              <div className="text-base sm:text-lg font-bold text-stone-800">{project.progress}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left — main content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Progress bar */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Completion</span>
                <span className="text-sm font-bold text-stone-700">{project.progress}%</span>
              </div>
              <div className="w-full bg-stone-200 rounded-full h-2.5">
                <div className={`${progressColor} h-2.5 rounded-full transition-all`} style={{ width: `${project.progress}%` }} />
              </div>
            </div>

            {/* Divider */}
            <hr className="border-stone-300" />

            {/* Description */}
            <div>
              <h2 className="text-xs uppercase tracking-widest text-stone-500 font-semibold mb-4">Project Overview</h2>
              <div className="space-y-4 text-stone-700 leading-relaxed text-[15px]">
                {paragraphs.map((para, i) => (
                  <p key={i}>{para.join(' ')}</p>
                ))}
              </div>
            </div>

            {/* Evidence Gallery */}
            {project.media.length > 0 && (
              <>
                <hr className="border-stone-300" />
                <EvidenceGallery media={project.media} projectName={project.name} />
              </>
            )}
          </div>

          {/* Right — sidebar */}
          <div className="space-y-6">

            {/* Project details card */}
            <div className="bg-white border border-stone-200 rounded-sm shadow-sm">
              <div className="px-5 py-3 border-b border-stone-200 bg-stone-50">
                <h3 className="text-xs uppercase tracking-widest text-stone-500 font-semibold">Project Details</h3>
              </div>
              <dl className="divide-y divide-stone-100">
                <div className="px-5 py-3 flex justify-between gap-2">
                  <dt className="text-xs text-stone-500">Sector</dt>
                  <dd className="text-xs font-semibold text-stone-800 text-right">{project.sector}</dd>
                </div>
                <div className="px-5 py-3 flex justify-between gap-2">
                  <dt className="text-xs text-stone-500">Location</dt>
                  <dd className="text-xs font-semibold text-stone-800 text-right">{project.location}</dd>
                </div>
                <div className="px-5 py-3 flex justify-between gap-2">
                  <dt className="text-xs text-stone-500">Start Date</dt>
                  <dd className="text-xs font-semibold text-stone-800">{new Date(project.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</dd>
                </div>
                <div className="px-5 py-3 flex justify-between gap-2">
                  <dt className="text-xs text-stone-500">Target End</dt>
                  <dd className="text-xs font-semibold text-stone-800">{new Date(project.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</dd>
                </div>
                <div className="px-5 py-3 flex justify-between gap-2">
                  <dt className="text-xs text-stone-500">Status</dt>
                  <dd className={`text-xs font-semibold ${getStatusTextColor(project.status)}`}>{getStatusLabel(project.status)}</dd>
                </div>
              </dl>
            </div>

            {/* Impact metrics card */}
            {(project.impact.beneficiaries || project.impact.roadsBuilt || project.impact.hospitalsBuilt || project.impact.schoolsBuilt) && (
              <div className="bg-white border border-stone-200 rounded-sm shadow-sm">
                <div className="px-5 py-3 border-b border-stone-200 bg-stone-50">
                  <h3 className="text-xs uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Key Impact
                  </h3>
                </div>
                <dl className="divide-y divide-stone-100">
                  {project.impact.beneficiaries && (
                    <div className="px-5 py-3 flex justify-between gap-2">
                      <dt className="text-xs text-stone-500">Beneficiaries</dt>
                      <dd className="text-xs font-bold text-green-700">{formatNumber(project.impact.beneficiaries)}</dd>
                    </div>
                  )}
                  {project.impact.roadsBuilt && (
                    <div className="px-5 py-3 flex justify-between gap-2">
                      <dt className="text-xs text-stone-500">Roads Built</dt>
                      <dd className="text-xs font-bold text-blue-700">{formatNumber(project.impact.roadsBuilt)} km</dd>
                    </div>
                  )}
                  {project.impact.hospitalsBuilt && (
                    <div className="px-5 py-3 flex justify-between gap-2">
                      <dt className="text-xs text-stone-500">Health Facilities</dt>
                      <dd className="text-xs font-bold text-rose-700">{formatNumber(project.impact.hospitalsBuilt)}</dd>
                    </div>
                  )}
                  {project.impact.schoolsBuilt && (
                    <div className="px-5 py-3 flex justify-between gap-2">
                      <dt className="text-xs text-stone-500">Schools Built</dt>
                      <dd className="text-xs font-bold text-indigo-700">{formatNumber(project.impact.schoolsBuilt)}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Budget breakdown card */}
            <div className="bg-white border border-stone-200 rounded-sm shadow-sm">
              <div className="px-5 py-3 border-b border-stone-200 bg-stone-50">
                <h3 className="text-xs uppercase tracking-widest text-stone-500 font-semibold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Financials
                </h3>
              </div>
              <dl className="divide-y divide-stone-100">
                <div className="px-5 py-3 flex justify-between gap-2">
                  <dt className="text-xs text-stone-500">Total Budget</dt>
                  <dd className="text-xs font-bold text-stone-800">{formatCurrency(project.budget)}</dd>
                </div>
                <div className="px-5 py-3 flex justify-between gap-2">
                  <dt className="text-xs text-stone-500">Disbursed</dt>
                  <dd className="text-xs font-bold text-stone-800">{formatCurrency(project.spent)}</dd>
                </div>
                {project.budget > 0 && (
                  <div className="px-5 py-3">
                    <div className="flex justify-between mb-1.5">
                      <dt className="text-xs text-stone-500">Utilisation</dt>
                      <dd className="text-xs font-bold text-stone-700">{Math.round((project.spent / project.budget) * 100)}%</dd>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-1.5">
                      <div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${Math.min(100, Math.round((project.spent / project.budget) * 100))}%` }} />
                    </div>
                  </div>
                )}
              </dl>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
