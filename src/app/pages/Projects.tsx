import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { projects, sectors, states } from '../data/mockData';
import { ProjectCard } from '../components/ProjectCard';
import { ArrowLeft, Filter, Search, Loader2, X, SlidersHorizontal } from 'lucide-react';

const PAGE_SIZE = 12;

export function Projects() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = (location.state as { selectedState?: string })?.selectedState;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>(initialState || 'all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const activeFilterCount = [selectedSector, selectedState, selectedStatus].filter(f => f !== 'all').length + (searchQuery ? 1 : 0);

  const filteredProjects = useMemo(() => projects.filter(project => {
    const matchesSearch = searchQuery === '' ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'all' || project.sector === selectedSector;
    const matchesState = selectedState === 'all' || project.state === selectedState;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    return matchesSearch && matchesSector && matchesState && matchesStatus;
  }), [searchQuery, selectedSector, selectedState, selectedStatus]);

  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [searchQuery, selectedSector, selectedState, selectedStatus]);

  const hasMore = visibleCount < filteredProjects.length;

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    setLoading(true);
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + PAGE_SIZE, filteredProjects.length));
      setLoading(false);
    }, 400);
  }, [hasMore, loading, filteredProjects.length]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSector('all');
    setSelectedState('all');
    setSelectedStatus('all');
  };

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const filterContent = (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Sector</label>
        <select value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)}
          className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 text-sm">
          <option value="all">All Sectors</option>
          {sectors.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}
          className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 text-sm">
          <option value="all">All States</option>
          {states.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
        <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 text-sm">
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
          <option value="delayed">Delayed</option>
          <option value="not-started">Not Started</option>
        </select>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <button onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-white hover:text-green-100 mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold">All Government Projects</h1>
          <p className="text-green-100 mt-2">Browse and track projects across all sectors and locations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Desktop filters (hidden on mobile) ── */}
        <div className="hidden md:block bg-white rounded-lg border p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="font-semibold">Filter Projects</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {filterContent}
          </div>
          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {visibleProjects.length} of {filteredProjects.length} projects
            </p>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-sm text-green-600 hover:text-green-700 font-medium">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* ── Mobile filter bar + drawer ── */}
        <div className="md:hidden mb-6">
          {/* Search always visible on mobile */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg bg-white focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-green-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <p className="text-xs text-gray-500">{filteredProjects.length} projects</p>
          </div>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {selectedSector !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
                  {selectedSector}
                  <button onClick={() => setSelectedSector('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedState !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                  {selectedState}
                  <button onClick={() => setSelectedState('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedStatus !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-200">
                  {selectedStatus}
                  <button onClick={() => setSelectedStatus('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button onClick={clearFilters} className="text-xs text-red-600 font-medium px-2 py-1">
                Clear all
              </button>
            </div>
          )}

          {/* Mobile filter drawer (bottom sheet) */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 flex flex-col justify-end" onClick={() => setFiltersOpen(false)}>
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between rounded-t-2xl">
                  <h3 className="font-bold text-gray-900">Filter Projects</h3>
                  <button onClick={() => setFiltersOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  {filterContent}
                </div>
                <div className="sticky bottom-0 bg-white border-t p-4 flex gap-3">
                  <button onClick={() => { clearFilters(); setFiltersOpen(false); }}
                    className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">
                    Clear All
                  </button>
                  <button onClick={() => setFiltersOpen(false)}
                    className="flex-1 py-2.5 bg-green-700 text-white rounded-lg text-sm font-semibold">
                    Show {filteredProjects.length} Results
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Project grid ── */}
        {visibleProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map(project => (
                <ProjectCard key={project.id} project={project} onClick={() => navigate(`/projects/${project.id}`)} />
              ))}
            </div>

            <div ref={loaderRef} className="py-10 flex flex-col items-center gap-2">
              {loading && (
                <div className="flex items-center gap-2 text-green-700">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm font-medium">Loading more projects...</span>
                </div>
              )}
              {!loading && hasMore && (
                <button onClick={loadMore}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  Load More ({filteredProjects.length - visibleCount} remaining)
                </button>
              )}
              {!hasMore && filteredProjects.length > PAGE_SIZE && (
                <p className="text-sm text-gray-400">All {filteredProjects.length} projects loaded</p>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg border p-12 text-center">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="text-sm text-green-600 hover:text-green-700 font-medium">
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
