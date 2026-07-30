import { useState } from 'react';
import { MediaItem } from '../data/mockData';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface EvidenceGalleryProps {
  media: MediaItem[];
  projectName?: string;
}

const tagStyle: Record<string, string> = {
  before: 'bg-red-700 text-white',
  after: 'bg-emerald-700 text-white',
  progress: 'bg-amber-600 text-white',
};

const tagLabel: Record<string, string> = { before: 'Before', after: 'After', progress: 'Progress' };

export function EvidenceGallery({ media, projectName }: EvidenceGalleryProps) {
  const images = media.filter(m => m.type === 'image');
  const videos = media.filter(m => m.type === 'video');

  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState<{ list: MediaItem[]; index: number } | null>(null);

  if (media.length === 0) return null;

  const featured = images[activeImg];
  const lbItem = lightbox ? lightbox.list[lightbox.index] : null;

  const lbNav = (dir: -1 | 1) => {
    if (!lightbox) return;
    const next = lightbox.index + dir;
    if (next >= 0 && next < lightbox.list.length) setLightbox({ ...lightbox, index: next });
  };

  return (
    <div>
      {/* ── Section header ── */}
      <div className="flex items-baseline justify-between border-b border-stone-300 pb-2 mb-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-stone-500">
          Evidence &amp; Documentation
        </h2>
        <span className="text-[10px] text-stone-400">{media.length} item{media.length !== 1 ? 's' : ''}</span>
      </div>

      {/* ── Images ── */}
      {images.length > 0 && (
        <div className="mb-6">

          {/* Hero */}
          <div
            className="relative w-full overflow-hidden cursor-pointer bg-stone-200 border border-stone-300"
            style={{ aspectRatio: '16/9' }}
            onClick={() => setLightbox({ list: images, index: activeImg })}
          >
            <img
              key={featured.id}
              src={featured.url}
              alt={featured.caption}
              className="w-full h-full object-cover"
            />
            {featured.tag && (
              <span className={`absolute top-0 left-0 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 ${tagStyle[featured.tag]}`}>
                {tagLabel[featured.tag]}
              </span>
            )}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/65 to-transparent px-4 py-3">
              <p className="text-white text-xs sm:text-sm leading-snug">{featured.caption}</p>
              <p className="text-white/50 text-[10px] mt-0.5">
                {new Date(featured.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-1.5 mt-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImg(i)}
                  className={`relative shrink-0 overflow-hidden border transition-all ${
                    i === activeImg
                      ? 'border-emerald-600 opacity-100'
                      : 'border-stone-300 opacity-50 hover:opacity-80'
                  }`}
                  style={{ width: 64, height: 44 }}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                  {img.tag && (
                    <span className={`absolute bottom-0 inset-x-0 text-center text-[7px] font-bold uppercase py-0.5 ${tagStyle[img.tag]}`}>
                      {tagLabel[img.tag]}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Videos ── */}
      {videos.length > 0 && (
        <div>
          <div className="flex items-baseline gap-2 border-b border-stone-300 pb-2 mb-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500">Video Documentation</h3>
            <span className="text-[10px] text-stone-400">{videos.length} clip{videos.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {videos.map((vid, i) => (
              <button
                key={vid.id}
                onClick={() => setLightbox({ list: videos, index: i })}
                className="group relative w-full overflow-hidden bg-stone-900 border border-stone-300 text-left"
                style={{ aspectRatio: '16/9' }}
              >
                {vid.thumbnail && (
                  <img
                    src={vid.thumbnail}
                    alt={vid.caption}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
                  />
                )}
                {/* Play */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 border border-white/60 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <Play className="w-4 h-4 text-white ml-0.5" />
                  </div>
                </div>
                {/* Caption */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
                  <p className="text-white text-xs line-clamp-2 leading-snug">{vid.caption}</p>
                  <p className="text-white/40 text-[10px] mt-0.5">
                    {new Date(vid.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Lightbox ── */}
      {lbItem && lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col" onClick={() => setLightbox(null)}>

          {/* Top bar */}
          <div
            className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 shrink-0"
            onClick={e => e.stopPropagation()}
          >
            <span className="text-white/40 text-xs uppercase tracking-widest truncate max-w-[60%]">{projectName}</span>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-white/40 text-xs">{lightbox.index + 1} / {lightbox.list.length}</span>
              <button onClick={() => setLightbox(null)} className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Media area */}
          <div
            className="flex-1 flex items-center justify-center relative px-10 sm:px-16 min-h-0 py-4"
            onClick={e => e.stopPropagation()}
          >
            {lightbox.index > 0 && (
              <button
                onClick={() => lbNav(-1)}
                className="absolute left-2 sm:left-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/15 p-2 border border-white/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            <div className="w-full max-w-4xl">
              {lbItem.type === 'video' ? (
                lbItem.url.includes('youtube.com/embed') ? (
                  <iframe
                    src={`${lbItem.url}?autoplay=1`}
                    title={lbItem.caption}
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video src={lbItem.url} controls autoPlay className="w-full max-h-[55vh] bg-black" />
                )
              ) : (
                <img src={lbItem.url} alt={lbItem.caption} className="w-full max-h-[55vh] object-contain" />
              )}

              {/* Caption row */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-start justify-between gap-4">
                <div>
                  <p className="text-white/90 text-sm leading-snug">{lbItem.caption}</p>
                  <p className="text-white/35 text-[10px] mt-1 uppercase tracking-wide">
                    {new Date(lbItem.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                {lbItem.tag && (
                  <span className={`shrink-0 text-[10px] font-bold uppercase tracking-widest px-2 py-1 ${tagStyle[lbItem.tag]}`}>
                    {tagLabel[lbItem.tag]}
                  </span>
                )}
              </div>
            </div>

            {lightbox.index < lightbox.list.length - 1 && (
              <button
                onClick={() => lbNav(1)}
                className="absolute right-2 sm:right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/15 p-2 border border-white/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Filmstrip */}
          {lightbox.list.length > 1 && (
            <div
              className="shrink-0 px-4 py-3 border-t border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex gap-1.5 overflow-x-auto justify-center" style={{ scrollbarWidth: 'none' }}>
                {lightbox.list.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={() => setLightbox({ ...lightbox, index: i })}
                    className={`relative shrink-0 overflow-hidden border transition-all ${
                      i === lightbox.index ? 'border-emerald-500 opacity-100' : 'border-white/10 opacity-35 hover:opacity-60'
                    }`}
                    style={{ width: 52, height: 36 }}
                  >
                    <img
                      src={item.type === 'video' ? (item.thumbnail ?? '') : item.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
