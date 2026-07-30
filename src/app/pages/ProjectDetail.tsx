import { useParams, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { projects } from '../data/mockData';
import { EvidenceGallery } from '../components/EvidenceGallery';
import { formatCurrency, formatNumber, getStatusLabel, getStatusTextColor } from '../utils/helpers';
import { ArrowLeft, MapPin, CalendarDays, Banknote, Users, TrendingUp, Layers } from 'lucide-react';
import { ShareButton } from '../components/ShareButton';
import type { Status, Project } from '../data/mockData';

const sectorFallback: Record<string, string> = {
  Infrastructure: '/images/transport-infrastructure.jpeg',
  Agriculture: '/images/agricultural-project.jpeg',
  Health: '/images/healthcare-facility.jpeg',
  Education: '/images/school-construction.jpeg',
  Power: '/images/power-infrastructure.jpeg',
  Water: '/images/water-treatment-plant.jpeg',
  Employment: '/images/skills-acquisition-center.jpeg',
  Transportation: '/images/transport-infrastructure.jpeg',
};

function heroImage(project: Project): string {
  const first = project.media.find(m => m.type === 'image');
  return first?.url ?? sectorFallback[project.sector] ?? '/images/transport-infrastructure.jpeg';
}

function progressColor(status: Status) {
  if (status === 'completed') return 'bg-emerald-600';
  if (status === 'delayed') return 'bg-red-600';
  return 'bg-amber-500';
}

function statusDot(status: Status) {
  if (status === 'completed') return 'bg-emerald-500';
  if (status === 'delayed') return 'bg-red-500';
  if (status === 'in-progress') return 'bg-amber-400';
  return 'bg-stone-400';
}

function nd(val: number) {
  return val === 0 ? 'N/D' : formatCurrency(val);
}

function ndNum(val: number) {
  return val === 0 ? 'N/D' : formatNumber(val);
}

export function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-stone-500 mb-4">Project not found.</p>
          <button onClick={() => navigate('/projects')} className="px-4 py-2 bg-stone-900 text-white text-sm">
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const image = heroImage(project);
  const shareText = `${project.name} — ${project.progress}% complete. Track Nigeria's development progress.`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Inject OG meta tags so social platforms scrape the correct image when the link is shared
  useEffect(() => {
    const setMeta = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property='${property}']`);
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    const absImage = image.startsWith('http') ? image : `${window.location.origin}${image}`;
    setMeta('og:title', project.name);
    setMeta('og:description', shareText);
    setMeta('og:image', absImage);
    setMeta('og:url', shareUrl);
    setMeta('og:type', 'article');
  }, [project.id]);

  const utilisation = project.budget > 0 ? Math.round((project.spent / project.budget) * 100) : null;

  const paragraphs = project.description
    .split(/(?<=[.!?])\s+/)
    .reduce<string[][]>((acc, s) => {
      const last = acc[acc.length - 1];
      if (last && last.length < 3) { last.push(s); } else { acc.push([s]); }
      return acc;
    }, []);

  const kpis = [
    { icon: <Banknote className="w-3.5 h-3.5" />, label: 'Budget', value: nd(project.budget) },
    { icon: <Banknote className="w-3.5 h-3.5" />, label: 'Disbursed', value: nd(project.spent) },
    { icon: <Users className="w-3.5 h-3.5" />, label: 'Jobs Created', value: ndNum(project.jobsCreated) },
    { icon: <TrendingUp className="w-3.5 h-3.5" />, label: 'Progress', value: `${project.progress}%` },
  ];

  return (
    <div className="min-h-screen bg-stone-100">

      {/* ── Sticky bar ── */}
      <div className="sticky top-16 z-40 bg-stone-900/95 backdrop-blur border-b border-white/10 overflow-visible">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-2.5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-white/60 hover:text-white text-xs tracking-wide uppercase transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Projects</span>
          </button>
          <span className="text-white/50 text-xs font-medium truncate max-w-[50%] sm:max-w-xs text-center">{project.name}</span>
          <div className="sm:hidden">
            <ShareButton title={project.name} text={shareText} url={shareUrl} image={image} variant="icon" />
          </div>
          <div className="hidden sm:block">
            <ShareButton title={project.name} text={shareText} url={shareUrl} image={image} variant="button" />
          </div>
        </div>
      </div>

      {/* ── Masthead ── */}
      <header
        className="relative border-b-4 border-emerald-500"
        style={{ backgroundImage: `url('${heroImage(project)}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-stone-950/75" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Title block */}
          <div className="py-5 sm:py-8">
            <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
              <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">{project.sector}</span>
              <span className="text-white/30 text-xs">·</span>
              <span className={`flex items-center gap-1.5 text-xs font-medium ${getStatusTextColor(project.status)}`}>
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${statusDot(project.status)}`} />
                {getStatusLabel(project.status)}
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-3 sm:mb-4">
              {project.name}
            </h1>

            <div className="flex flex-wrap gap-3 sm:gap-4 text-white/60 text-xs">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {project.location}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                {new Date(project.startDate).getFullYear()} – {new Date(project.endDate).getFullYear()}
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 shrink-0" />
                {project.sector}
              </span>
            </div>
          </div>

          {/* KPI strip — 2×2 on mobile, 4 cols on sm+ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-white/10 divide-y sm:divide-y-0 divide-x divide-white/10">
            {kpis.map(({ icon, label, value }, i) => (
              <div
                key={label}
                className={`py-3 sm:py-4 px-3 sm:px-5 text-center ${i % 2 === 0 ? '' : ''}`}
              >
                <div className="flex items-center justify-center gap-1 text-white/40 mb-1">{icon}</div>
                <div className="text-white font-bold text-sm sm:text-base leading-none">{value}</div>
                <div className="text-white/40 text-[10px] mt-1 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">

          {/* ── Sidebar — shown FIRST on mobile, right on desktop ── */}
          <aside className="order-first lg:order-last space-y-4 sm:space-y-6">

            {/* Project Details */}
            <div className="bg-white border border-stone-200">
              <div className="px-4 sm:px-5 py-3 border-b border-stone-200 bg-stone-50">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-stone-500">Project Details</h3>
              </div>
              {/* 2-col grid on mobile for compact display */}
              <dl className="grid grid-cols-2 sm:grid-cols-1 divide-y-0 sm:divide-y divide-stone-100">
                {[
                  { label: 'Sector', value: project.sector },
                  { label: 'Location', value: project.location },
                  { label: 'State', value: project.state },
                  { label: 'Start', value: new Date(project.startDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) },
                  { label: 'Target End', value: new Date(project.endDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) },
                  { label: 'Status', value: getStatusLabel(project.status), colored: true },
                ].map(({ label, value, colored }) => (
                  <div key={label} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 border-b border-stone-100">
                    <dt className="text-[10px] sm:text-xs text-stone-400 shrink-0 uppercase tracking-wide sm:normal-case sm:tracking-normal">{label}</dt>
                    <dd className={`text-xs font-semibold sm:text-right ${colored ? getStatusTextColor(project.status) : 'text-stone-800'}`}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Key Impact */}
            {(project.impact.beneficiaries || project.impact.roadsBuilt || project.impact.hospitalsBuilt || project.impact.schoolsBuilt || project.jobsCreated > 0) && (
              <div className="bg-white border border-stone-200">
                <div className="px-4 sm:px-5 py-3 border-b border-stone-200 bg-stone-50">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-stone-500">Key Impact</h3>
                </div>
                <dl className="grid grid-cols-2 sm:grid-cols-1 divide-stone-100">
                  {[
                    project.impact.beneficiaries ? { label: 'Beneficiaries', value: formatNumber(project.impact.beneficiaries) } : null,
                    project.impact.roadsBuilt ? { label: 'Road Length', value: `${project.impact.roadsBuilt} km` } : null,
                    project.impact.hospitalsBuilt ? { label: 'Health Facilities', value: String(project.impact.hospitalsBuilt) } : null,
                    project.impact.schoolsBuilt ? { label: 'Schools Built', value: String(project.impact.schoolsBuilt) } : null,
                    project.jobsCreated > 0 ? { label: 'Jobs Created', value: formatNumber(project.jobsCreated) } : null,
                  ].filter(Boolean).map(row => (
                    <div key={row!.label} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5 sm:gap-3 px-4 sm:px-5 py-2.5 sm:py-3 border-b border-stone-100">
                      <dt className="text-[10px] sm:text-xs text-stone-400 uppercase tracking-wide sm:normal-case sm:tracking-normal">{row!.label}</dt>
                      <dd className="text-xs font-bold text-stone-800 sm:text-right">{row!.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Financials */}
            <div className="bg-white border border-stone-200">
              <div className="px-4 sm:px-5 py-3 border-b border-stone-200 bg-stone-50">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-stone-500">Financials</h3>
              </div>
              <dl>
                <div className="flex justify-between items-baseline gap-3 px-4 sm:px-5 py-2.5 sm:py-3 border-b border-stone-100">
                  <dt className="text-xs text-stone-400">Total Budget</dt>
                  <dd className="text-xs font-bold text-stone-800">{nd(project.budget)}</dd>
                </div>
                <div className="flex justify-between items-baseline gap-3 px-4 sm:px-5 py-2.5 sm:py-3 border-b border-stone-100">
                  <dt className="text-xs text-stone-400">Disbursed</dt>
                  <dd className="text-xs font-bold text-stone-800">{nd(project.spent)}</dd>
                </div>
                {utilisation !== null && (
                  <div className="px-4 sm:px-5 py-3">
                    <div className="flex justify-between mb-1.5">
                      <dt className="text-xs text-stone-400">Utilisation</dt>
                      <dd className="text-xs font-bold text-stone-800">{utilisation}%</dd>
                    </div>
                    <div className="h-1.5 bg-stone-200 overflow-hidden">
                      <div className="h-full bg-emerald-600" style={{ width: `${Math.min(utilisation, 100)}%` }} />
                    </div>
                  </div>
                )}
              </dl>
            </div>

            <p className="text-[10px] text-stone-400 leading-relaxed px-1">
              N/D — Not disclosed in available public sources. Figures drawn from FEC briefings, ministry statements and news reporting. Not independently audited.
            </p>
          </aside>

          {/* ── Main content ── */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">

            {/* Progress bar */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">Implementation Progress</span>
                <span className="text-sm font-bold text-stone-800">{project.progress}%</span>
              </div>
              <div className="h-2 bg-stone-300 overflow-hidden">
                <div
                  className={`h-full transition-all ${progressColor(project.status)}`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-1.5 text-[10px] text-stone-400">
                <span>{new Date(project.startDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
                <span>{new Date(project.endDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>

            <hr className="border-stone-300" />

            {/* Description */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-4">Project Overview</h2>
              <div className="space-y-4">
                {paragraphs.map((para, i) => (
                  <p key={i} className="text-stone-700 leading-relaxed text-sm sm:text-base">
                    {para.join(' ')}
                  </p>
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
        </div>
      </main>
    </div>
  );
}
