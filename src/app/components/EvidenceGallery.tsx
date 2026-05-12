import { useState } from 'react';
import { MediaItem } from '../data/mockData';
import { X, ChevronLeft, ChevronRight, Play, Image, Video, Camera } from 'lucide-react';

interface EvidenceGalleryProps {
  media: MediaItem[];
  projectName?: string;
}

const tagColors: Record<string, string> = {
  before: 'bg-red-100 text-red-700',
  after: 'bg-green-100 text-green-700',
  progress: 'bg-blue-100 text-blue-700',
};

export function EvidenceGallery({ media, projectName }: EvidenceGalleryProps) {
  const [filter, setFilter] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = filter === 'all' ? media : media.filter(m => (filter === 'video' ? m.type === 'video' : m.tag === filter));
  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  const navigate = (dir: -1 | 1) => {
    if (lightboxIndex === null) return;
    const next = lightboxIndex + dir;
    if (next >= 0 && next < filtered.length) setLightboxIndex(next);
  };

  if (media.length === 0) return null;

  const hasBeforeAfter = media.some(m => m.tag === 'before') && media.some(m => m.tag === 'after');
  const beforeImg = media.find(m => m.tag === 'before');
  const afterImg = media.find(m => m.tag === 'after');

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold">Evidence & Documentation</h2>
        </div>
        <span className="text-xs text-gray-500">{media.length} item{media.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Before / After comparison */}
      {hasBeforeAfter && beforeImg && afterImg && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Before & After Comparison</h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="relative group cursor-pointer" onClick={() => setLightboxIndex(media.indexOf(beforeImg))}>
              <img src={beforeImg.url} alt={beforeImg.caption} className="w-full h-32 sm:h-48 object-cover rounded-lg" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-700">Before</div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg p-2">
                <p className="text-white text-xs">{beforeImg.caption}</p>
                <p className="text-white/70 text-xs">{new Date(beforeImg.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="relative group cursor-pointer" onClick={() => setLightboxIndex(media.indexOf(afterImg))}>
              <img src={afterImg.url} alt={afterImg.caption} className="w-full h-32 sm:h-48 object-cover rounded-lg" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-700">After</div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent rounded-b-lg p-2">
                <p className="text-white text-xs">{afterImg.caption}</p>
                <p className="text-white/70 text-xs">{new Date(afterImg.date).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {(['all', 'before', 'progress', 'after', 'video'] as const).map(t => {
          const count = t === 'all' ? media.length : t === 'video' ? media.filter(m => m.type === 'video').length : media.filter(m => m.tag === t).length;
          if (count === 0 && t !== 'all') return null;
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                filter === t ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {t === 'video' ? <Video className="w-3 h-3" /> : <Image className="w-3 h-3" />}
              {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)} ({count})
            </button>
          );
        })}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((item, i) => (
          <div
            key={item.id}
            className="relative group cursor-pointer rounded-lg overflow-hidden aspect-[4/3]"
            onClick={() => setLightboxIndex(i)}
          >
            <img
              src={item.type === 'video' ? (item.thumbnail || item.url) : item.url}
              alt={item.caption}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-white ml-0.5" />
                </div>
              </div>
            )}
            {item.tag && (
              <div className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-xs font-semibold ${tagColors[item.tag] || ''}`}>
                {item.tag.charAt(0).toUpperCase() + item.tag.slice(1)}
              </div>
            )}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs line-clamp-2">{item.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-sm">No media matches this filter.</div>
      )}

      {/* Lightbox */}
      {lightboxItem && lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setLightboxIndex(null)}>
          <button className="absolute top-3 right-3 text-white/80 hover:text-white z-10" onClick={() => setLightboxIndex(null)}>
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {lightboxIndex > 0 && (
            <button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 rounded-full p-1.5 sm:p-2"
              onClick={e => { e.stopPropagation(); navigate(-1); }}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {lightboxIndex < filtered.length - 1 && (
            <button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 rounded-full p-1.5 sm:p-2"
              onClick={e => { e.stopPropagation(); navigate(1); }}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          <div className="max-w-4xl max-h-[85vh] w-full mx-2 sm:mx-4" onClick={e => e.stopPropagation()}>
            {lightboxItem.type === 'video' ? (
              lightboxItem.url.includes('youtube.com/embed') ? (
                <iframe
                  src={lightboxItem.url + '?autoplay=1'}
                  title={lightboxItem.caption}
                  className="w-full aspect-video rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={lightboxItem.url}
                  controls
                  autoPlay
                  className="w-full max-h-[70vh] rounded-lg bg-black"
                />
              )
            ) : (
              <img
                src={lightboxItem.url}
                alt={lightboxItem.caption}
                className="w-full max-h-[70vh] object-contain rounded-lg"
              />
            )}
            <div className="mt-3 text-center">
              <p className="text-white text-sm">{lightboxItem.caption}</p>
              <div className="flex items-center justify-center gap-3 mt-1">
                <span className="text-white/60 text-xs">{new Date(lightboxItem.date).toLocaleDateString()}</span>
                {lightboxItem.tag && (
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${tagColors[lightboxItem.tag]}`}>
                    {lightboxItem.tag.charAt(0).toUpperCase() + lightboxItem.tag.slice(1)}
                  </span>
                )}
                <span className="text-white/60 text-xs">{lightboxIndex + 1} / {filtered.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
