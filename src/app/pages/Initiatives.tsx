import { useState } from 'react';
import { useNavigate } from 'react-router';
import { flagshipSectors } from '../data/initiatives';
import { ArrowLeft, ChevronDown, ChevronUp, TrendingUp, Landmark, Zap, Wifi, Wheat, Heart, GraduationCap } from 'lucide-react';

const sectorIcons: Record<string, any> = {
  economy: TrendingUp,
  infrastructure: Landmark,
  power: Zap,
  digital: Wifi,
  agriculture: Wheat,
  health: Heart,
  education: GraduationCap,
};

export function Initiatives() {
  const navigate = useNavigate();
  const [activeSector, setActiveSector] = useState(flagshipSectors[0].id);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sector = flagshipSectors.find(s => s.id === activeSector)!;
  const SectorIcon = sectorIcons[activeSector] || TrendingUp;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
          <button onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-500 hover:text-green-700 mb-4 transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <img src="/renewed-hope-logo.png" alt="Renewed Hope" className="h-10 sm:h-12 w-auto" />
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Flagship Initiatives</h1>
              <p className="text-gray-500 text-xs sm:text-sm mt-0.5">Key policy reforms under the Renewed Hope Agenda</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-20 bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sectors</p>
              </div>
              <nav className="p-2">
                {flagshipSectors.map(s => {
                  const Icon = sectorIcons[s.id] || TrendingUp;
                  const isActive = activeSector === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => { setActiveSector(s.id); setExpandedId(null); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left text-sm transition-colors mb-0.5 ${
                        isActive ? 'bg-green-50 text-green-800 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className="truncate">{s.name}</span>
                      <span className={`ml-auto text-xs shrink-0 ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                        {s.initiatives.length}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Mobile sector tabs */}
          <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory -mx-1 px-1">
            {flagshipSectors.map(s => {
              const Icon = sectorIcons[s.id] || TrendingUp;
              return (
                <button
                  key={s.id}
                  onClick={() => { setActiveSector(s.id); setExpandedId(null); }}
                  className={`shrink-0 snap-start flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeSector === s.id
                      ? 'bg-green-700 text-white'
                      : 'bg-white border border-gray-200 text-gray-600'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {s.name}
                </button>
              );
            })}
          </div>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {/* Sector header */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-green-50 rounded-xl flex items-center justify-center">
                  <SectorIcon className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">{sector.name}</h2>
                  <p className="text-xs sm:text-sm text-gray-500">{sector.initiatives.length} initiative{sector.initiatives.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="mt-3 w-12 h-0.5 bg-gradient-to-r from-green-600 to-transparent rounded" />
            </div>

            {/* Initiative cards */}
            <div className="space-y-3">
              {sector.initiatives.map((init, i) => {
                const isExpanded = expandedId === init.id;
                return (
                  <div
                    key={init.id}
                    className={`bg-white rounded-xl border transition-all ${
                      isExpanded ? 'border-green-200 shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : init.id)}
                      className="w-full text-left px-4 py-4 sm:px-5 sm:py-4 flex items-start gap-3"
                    >
                      <span className="shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <h3 className="flex-1 text-sm sm:text-base font-medium text-gray-900 leading-snug pr-2">
                        {init.title}
                      </h3>
                      <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isExpanded ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-5">
                        <div className="ml-9 sm:ml-10 border-l-2 border-green-100 pl-4">
                          <p className="text-sm text-gray-600 leading-relaxed">{init.description}</p>

                          {init.videos && init.videos.length > 0 && (
                            <div className="mt-5">
                              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Video Evidence</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {init.videos.map((url, vi) => {
                                  const videoId = url.includes('youtu.be/') ? url.split('youtu.be/')[1] : url.split('v=')[1];
                                  return (
                                    <div key={vi} className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                                      <iframe
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        title={`${init.title} - Video ${vi + 1}`}
                                        className="w-full aspect-video"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
