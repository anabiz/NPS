import { useNavigate } from 'react-router';
import { getNationalStats, projects, states } from '../data/mockData';
import { formatCurrency, formatNumber } from '../utils/helpers';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import {
  ArrowRight, BarChart3, Eye, Shield, MapPin, Users, Briefcase,
  CheckCircle, Building2, Heart, GraduationCap, Droplets, Zap,
  Play, Menu, X,
} from 'lucide-react';
import { CoatOfArms } from '../components/CoatOfArms';

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const inc = target / 50;
    const t = setInterval(() => {
      cur += inc;
      if (cur >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(cur));
    }, 30);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export function Landing() {
  const nav = useNavigate();
  const stats = getNationalStats();
  const featured = projects.slice(0, 3);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const zones = ['North West', 'North East', 'North Central', 'South West', 'South South', 'South East'].map(zone => {
    const zs = states.filter(s => s.zone === zone);
    return { zone, count: zs.length, projects: zs.reduce((a, s) => a + s.projects, 0), jobs: zs.reduce((a, s) => a + s.jobsCreated, 0) };
  });

  // Before/after project
  const baProject = projects.find(p => p.media.some(m => m.tag === 'before') && p.media.some(m => m.tag === 'after'));
  const beforeImg = baProject?.media.find(m => m.tag === 'before');
  const afterImg = baProject?.media.find(m => m.tag === 'after');

  return (
    <div className="min-h-screen bg-white">
      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-12 sm:h-16">
          <div className="flex items-center gap-2">
            <img src="/renewed-hope-logo.png" alt="Renewed Hope" className="h-10 sm:h-12 w-auto" />
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-bold text-gray-900">Nigeria NPS</div>
              <div className="text-[10px] text-gray-500">National Performance Scorecard</div>
            </div>
            <span className="sm:hidden text-xs font-bold text-gray-900">Nigeria NPS</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <button onClick={() => nav('/dashboard')} className="hover:text-green-700 transition-colors">Dashboard</button>
            <button onClick={() => nav('/projects')} className="hover:text-green-700 transition-colors">Projects</button>
            <button onClick={() => nav('/analytics')} className="hover:text-green-700 transition-colors">Analytics</button>
            <button onClick={() => nav('/dashboard')} className="px-5 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors text-sm font-semibold">Get Started</button>
          </div>
          <button className="md:hidden p-1.5" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 py-2 space-y-1">
            <button onClick={() => { nav('/dashboard'); setMenuOpen(false); }} className="block w-full text-left py-2.5 text-sm font-medium text-gray-700">Dashboard</button>
            <button onClick={() => { nav('/projects'); setMenuOpen(false); }} className="block w-full text-left py-2.5 text-sm font-medium text-gray-700">Projects</button>
            <button onClick={() => { nav('/analytics'); setMenuOpen(false); }} className="block w-full text-left py-2.5 text-sm font-medium text-gray-700">Analytics</button>
            <button onClick={() => { nav('/dashboard'); setMenuOpen(false); }} className="block w-full text-center py-2.5 mt-1 bg-green-700 text-white rounded-lg text-sm font-semibold">Get Started</button>
          </div>
        )}
      </nav>

      {/* ── FLAG STRIPE ── */}
      <div className="fixed top-12 sm:top-16 left-0 right-0 z-40 h-0.5 sm:h-1 flex">
        <div className="flex-1 bg-green-700" /><div className="flex-1 bg-white" /><div className="flex-1 bg-green-700" />
      </div>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[100svh] flex flex-col overflow-hidden pt-12 sm:pt-16">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=1920&q=80&fit=crop" alt="" className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center text-white py-6 sm:py-10">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <img src="/renewed-hope-logo.png" alt="Renewed Hope" className="h-20 sm:h-32 lg:h-36 w-auto mx-auto mb-4 sm:mb-6 drop-shadow-xl" />
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              className="text-white/60 text-[10px] sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-3">
              Federal Republic of Nigeria
            </motion.p>

            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
              className="w-14 sm:w-20 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mb-4 sm:mb-6" />

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] mb-3 sm:mb-5 tracking-tight">
              National Performance<br />Scorecard
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }}
              className="text-white/60 text-xs sm:text-base lg:text-lg max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
              Real-time transparency into government performance. Track {formatNumber(stats.totalProjects)} projects across all 36 states and the FCT.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center px-4 sm:px-0">
              <button onClick={() => nav('/dashboard')}
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-sm sm:text-base shadow-lg transition-colors flex items-center justify-center gap-2">
                Explore Dashboard <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => nav('/projects')}
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/20 rounded-lg font-semibold text-sm sm:text-base transition-colors flex items-center justify-center gap-2">
                View Projects
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom stat strip — always 4 cols */}
        <div className="relative bg-green-800/95 backdrop-blur">
          <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-5 grid grid-cols-4 gap-2 sm:gap-4 text-white text-center">
            {[
              { l: 'Projects', v: stats.totalProjects, i: Briefcase },
              { l: 'Jobs', v: stats.totalJobs, i: Users },
              { l: 'States', v: 37, i: MapPin },
              { l: 'Done', v: stats.completionRate, i: CheckCircle, s: '%' },
            ].map(x => (
              <div key={x.l}>
                <x.i className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-300 mx-auto mb-0.5 sm:mb-1" />
                <div className="text-base sm:text-2xl font-bold leading-tight"><Counter target={x.v} suffix={x.s} /></div>
                <div className="text-green-200/60 text-[9px] sm:text-xs">{x.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDICATORS ── */}
      <section className="py-10 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead label="Key Indicators" title="National Development at a Glance" />
          {/* Mobile: horizontal scroll */}
          <div className="flex gap-3 overflow-x-auto pb-2 sm:hidden snap-x snap-mandatory -mx-1 px-1">
            {[
              { l: 'Roads', v: stats.totalRoads, I: Building2, c: 'text-blue-700 bg-blue-50' },
              { l: 'Health', v: stats.totalHealthCenters, I: Heart, c: 'text-rose-700 bg-rose-50' },
              { l: 'Schools', v: stats.totalSchoolsBuilt, I: GraduationCap, c: 'text-indigo-700 bg-indigo-50' },
              { l: 'Boreholes', v: stats.totalBoreholesDrilled, I: Droplets, c: 'text-cyan-700 bg-cyan-50' },
              { l: 'Power', v: stats.totalHouseholdsConnected, I: Zap, c: 'text-amber-700 bg-amber-50' },
              { l: 'Housing', v: stats.totalHousingUnits, I: Building2, c: 'text-orange-700 bg-orange-50' },
              { l: 'Budget', v: 0, I: Briefcase, c: 'text-green-700 bg-green-50', d: formatCurrency(stats.totalBudget) },
              { l: 'Revenue', v: 0, I: BarChart3, c: 'text-teal-700 bg-teal-50', d: formatCurrency(stats.totalRevenueGenerated) },
            ].map(x => (
              <div key={x.l} className="snap-start shrink-0 w-[120px] bg-gray-50 text-center p-3 rounded-xl">
                <div className={`w-9 h-9 rounded-lg ${x.c} flex items-center justify-center mx-auto mb-1.5`}><x.I className="w-4 h-4" /></div>
                <div className="text-sm font-bold text-gray-900 truncate">{x.d || formatNumber(x.v)}</div>
                <div className="text-[10px] text-gray-500">{x.l}</div>
              </div>
            ))}
          </div>
          {/* Desktop: grid */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
            className="hidden sm:grid grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {[
              { l: 'Roads Completed', v: stats.totalRoads, I: Building2, c: 'text-blue-700 bg-blue-50' },
              { l: 'Health Centers', v: stats.totalHealthCenters, I: Heart, c: 'text-rose-700 bg-rose-50' },
              { l: 'Schools Built', v: stats.totalSchoolsBuilt, I: GraduationCap, c: 'text-indigo-700 bg-indigo-50' },
              { l: 'Boreholes Drilled', v: stats.totalBoreholesDrilled, I: Droplets, c: 'text-cyan-700 bg-cyan-50' },
              { l: 'Households Connected', v: stats.totalHouseholdsConnected, I: Zap, c: 'text-amber-700 bg-amber-50' },
              { l: 'Housing Units', v: stats.totalHousingUnits, I: Building2, c: 'text-orange-700 bg-orange-50' },
              { l: 'Total Budget', v: 0, I: Briefcase, c: 'text-green-700 bg-green-50', d: formatCurrency(stats.totalBudget) },
              { l: 'Revenue (IGR)', v: 0, I: BarChart3, c: 'text-teal-700 bg-teal-50', d: formatCurrency(stats.totalRevenueGenerated) },
            ].map((x, i) => (
              <motion.div key={x.l} variants={fade} custom={i * 0.4}
                className="bg-gray-50 text-center p-5 rounded-xl hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-lg ${x.c} flex items-center justify-center mx-auto mb-2`}><x.I className="w-5 h-5" /></div>
                <div className="text-xl font-bold text-gray-900">{x.d || <Counter target={x.v} />}</div>
                <div className="text-xs text-gray-500 mt-0.5">{x.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-10 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead label="Transparency" title="How It Works" />
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { n: '01', t: 'Track Projects', d: 'Browse projects across all sectors. Filter by state, sector, or status.', I: BarChart3 },
              { n: '02', t: 'Verify Evidence', d: 'See before & after photos, progress images, and video documentation.', I: Eye },
              { n: '03', t: 'Demand Accountability', d: 'Share data on social media and hold elected officials accountable.', I: Shield },
            ].map((x, i) => (
              <motion.div key={x.n} variants={fade} custom={i}
                className="bg-white rounded-xl p-5 sm:p-7 border border-gray-200 hover:shadow-lg transition-all relative overflow-hidden group">
                <div className="absolute -top-1 -right-1 text-5xl sm:text-7xl font-black text-gray-100 group-hover:text-green-50 transition-colors">{x.n}</div>
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-700 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                    <x.I className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">{x.t}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{x.d}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      {baProject && beforeImg && afterImg && (
        <section className="py-10 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHead label="Evidence" title="See the Transformation" />
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-center">
              <motion.div variants={fade} custom={0} className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900">{baProject.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{baProject.description}</p>
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <span className="font-semibold text-green-700">{baProject.progress}% Complete</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600">{formatNumber(baProject.jobsCreated)} jobs</span>
                </div>
                <button onClick={() => nav(`/projects/${baProject.id}`)}
                  className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm hover:text-green-800 transition-colors">
                  View Full Project <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
              <motion.div variants={fade} custom={1} className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="relative rounded-lg sm:rounded-xl overflow-hidden aspect-[4/3]">
                  <img src={beforeImg.url} alt="Before" className="w-full h-full object-cover" />
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-2 py-0.5 bg-red-600 text-white text-[10px] sm:text-xs font-bold rounded">BEFORE</div>
                </div>
                <div className="relative rounded-lg sm:rounded-xl overflow-hidden aspect-[4/3]">
                  <img src={afterImg.url} alt="After" className="w-full h-full object-cover" />
                  <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-2 py-0.5 bg-green-600 text-white text-[10px] sm:text-xs font-bold rounded">AFTER</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── FEATURED PROJECTS ── */}
      <section className="py-10 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead label="Impact" title="Featured Projects" />
          {/* Mobile: horizontal scroll, Desktop: grid */}
          <div className="flex gap-4 overflow-x-auto pb-3 sm:hidden snap-x snap-mandatory -mx-1 px-1">
            {featured.map(p => (
              <div key={p.id} onClick={() => nav(`/projects/${p.id}`)}
                className="snap-start shrink-0 w-[280px] bg-white rounded-xl border overflow-hidden cursor-pointer">
                {p.media[0] && (
                  <div className="relative h-36 overflow-hidden">
                    <img src={p.media[0].url} alt={p.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 text-[10px] font-semibold bg-green-700 text-white px-2 py-0.5 rounded">{p.sector}</span>
                  </div>
                )}
                <div className="p-3.5">
                  <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">{p.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5"><div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${p.progress}%` }} /></div>
                    <span className="text-[10px] font-semibold text-green-700">{p.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="hidden sm:grid grid-cols-2 md:grid-cols-3 gap-6">
            {featured.map((p, i) => (
              <motion.div key={p.id} variants={fade} custom={i}
                onClick={() => nav(`/projects/${p.id}`)}
                className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                {p.media[0] && (
                  <div className="relative h-44 overflow-hidden">
                    <img src={p.media[0].url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {p.media[0].type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center"><div className="w-11 h-11 bg-black/50 rounded-full flex items-center justify-center"><Play className="w-5 h-5 text-white ml-0.5" /></div></div>
                    )}
                    <span className="absolute top-3 left-3 text-xs font-semibold bg-green-700 text-white px-2.5 py-1 rounded">{p.sector}</span>
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1.5 group-hover:text-green-700 transition-colors">{p.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{p.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5"><div className="bg-green-600 h-1.5 rounded-full" style={{ width: `${p.progress}%` }} /></div>
                    <span className="text-xs font-semibold text-green-700">{p.progress}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} custom={3} className="text-center mt-8 sm:mt-10">
            <button onClick={() => nav('/projects')} className="px-6 sm:px-7 py-2.5 sm:py-3 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center gap-2 text-sm">
              View All Projects <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── ZONES ── */}
      <section className="py-10 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead label="Coverage" title="All Six Geopolitical Zones" />
          {/* Mobile: 2 cols compact, Desktop: 3 cols */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {zones.map((z, i) => {
              const zoneStates = states.filter(s => s.zone === z.zone);
              const completionRate = z.projects > 0 ? Math.round((zoneStates.reduce((a, s) => a + s.completedProjects, 0) / z.projects) * 100) : 0;
              return (
                <motion.div key={z.zone} variants={fade} custom={i}
                  onClick={() => nav('/dashboard')}
                  className="rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all cursor-pointer p-3 sm:p-5">
                  <div className="flex items-center justify-between mb-2 sm:mb-4">
                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-900 text-xs sm:text-sm leading-tight truncate">{z.zone}</h3>
                      <span className="text-[10px] text-gray-400">{z.count} states</span>
                    </div>
                    <div className="text-right shrink-0 ml-2">
                      <div className="text-sm sm:text-lg font-bold text-gray-900">{completionRate}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1 sm:h-1.5 mb-2 sm:mb-4">
                    <div className="h-full rounded-full" style={{ width: `${completionRate}%`, backgroundColor: completionRate >= 65 ? '#16a34a' : completionRate >= 45 ? '#d97706' : '#dc2626' }} />
                  </div>
                  <div className="grid grid-cols-2 gap-1 sm:gap-2 text-center">
                    <div><div className="text-xs sm:text-sm font-bold text-gray-900">{formatNumber(z.projects)}</div><div className="text-[9px] sm:text-[10px] text-gray-400">Projects</div></div>
                    <div><div className="text-xs sm:text-sm font-bold text-green-700">{formatNumber(z.jobs)}</div><div className="text-[9px] sm:text-[10px] text-gray-400">Jobs</div></div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── MANDATE ── */}
      <section className="relative py-12 sm:py-28 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-green-900/85" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center text-white">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fade} custom={0}><img src="/renewed-hope-logo.png" alt="Renewed Hope" className="h-10 sm:h-14 w-auto mx-auto mb-4 sm:mb-5 opacity-70" /></motion.div>
            <motion.blockquote variants={fade} custom={1} className="text-sm sm:text-xl md:text-2xl font-light leading-relaxed mb-4 sm:mb-6 text-white/90 italic px-2">
              "Every naira spent must be accounted for, every project must deliver value, and every Nigerian must have access to the truth."
            </motion.blockquote>
            <motion.div variants={fade} custom={2}>
              <div className="w-10 sm:w-12 h-px bg-yellow-400 mx-auto mb-2 sm:mb-3" />
              <p className="text-yellow-300 font-semibold text-xs sm:text-sm">The Renewed Hope Agenda</p>
              <p className="text-white/50 text-[10px] sm:text-xs mt-0.5">Federal Government of Nigeria</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 sm:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fade} custom={0}><img src="/renewed-hope-logo.png" alt="Renewed Hope" className="h-8 sm:h-10 w-auto mx-auto mb-2 sm:mb-3 opacity-20" /></motion.div>
            <motion.h2 variants={fade} custom={1} className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
              Ready to Track Your Government?
            </motion.h2>
            <motion.p variants={fade} custom={2} className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto mb-6 sm:mb-8">
              {formatNumber(stats.totalProjects)} projects. {states.length} states. Your right to know.
            </motion.p>
            <motion.div variants={fade} custom={3} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center px-4 sm:px-0">
              <button onClick={() => nav('/dashboard')} className="px-6 sm:px-8 py-3 sm:py-3.5 bg-green-700 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-green-800 transition-colors shadow-md flex items-center justify-center gap-2">
                Go to Dashboard <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => nav('/analytics')} className="px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-green-700 text-green-700 rounded-lg font-semibold text-sm sm:text-base hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                <BarChart3 className="w-4 h-4" /> Analytics
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Copyright */}
      <div className="bg-gray-100 border-t py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Federal Government of Nigeria. All rights reserved.</p>
          <p className="text-xs text-gray-400">Renewed Hope Agenda &middot; Transparency &middot; Accountability &middot; Good Governance</p>
        </div>
      </div>
    </div>
  );
}

function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="text-center mb-6 sm:mb-10">
      <p className="text-green-700 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-1">{label}</p>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">{title}</h2>
      <div className="w-10 sm:w-12 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto" />
    </motion.div>
  );
}
