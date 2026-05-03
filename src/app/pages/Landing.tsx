import { useNavigate } from 'react-router';
import { getNationalStats, projects, states } from '../data/mockData';
import { formatCurrency, formatNumber } from '../utils/helpers';
import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import {
  ArrowRight, BarChart3, Eye, Shield, MapPin, Users, Briefcase,
  CheckCircle, Building2, Heart, GraduationCap, Droplets, Zap,
  ChevronRight, Play,
} from 'lucide-react';
import { CoatOfArms } from '../components/CoatOfArms';

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' } }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number = 0) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' } }),
};

export function Landing() {
  const navigate = useNavigate();
  const stats = getNationalStats();
  const featured = projects.slice(0, 3);

  const zones = ['North West', 'North East', 'North Central', 'South West', 'South South', 'South East'];
  const zoneData = zones.map(zone => {
    const zs = states.filter(s => s.zone === zone);
    return { zone, states: zs.length, projects: zs.reduce((a, s) => a + s.projects, 0), jobs: zs.reduce((a, s) => a + s.jobsCreated, 0) };
  });

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-br from-green-800 via-green-700 to-emerald-700 text-white overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                <CoatOfArms className="w-20 h-20 sm:w-24 sm:h-24 mx-auto lg:mx-0 mb-6" />
              </motion.div>

              <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={1}
                className="text-green-200 text-sm sm:text-base font-medium tracking-widest uppercase mb-3"
              >
                Federal Republic of Nigeria
              </motion.p>

              <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={2}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              >
                National Performance{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-emerald-300">
                  Scorecard
                </span>
              </motion.h1>

              <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={3}
                className="text-green-100 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              >
                Empowering every Nigerian with real-time, transparent access to government performance data across all 36 states and the FCT. Track projects, verify evidence, and hold your government accountable.
              </motion.p>

              <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-4 bg-white text-green-800 rounded-xl font-bold text-lg hover:bg-green-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Explore Dashboard
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  View Projects
                </button>
              </motion.div>
            </div>

            {/* Right — animated stat cards */}
            <motion.div
              initial="hidden" animate="visible"
              className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-sm lg:max-w-md"
            >
              {[
                { label: 'Total Projects', value: stats.totalProjects, icon: Briefcase, color: 'from-blue-500/20 to-blue-600/20' },
                { label: 'Jobs Created', value: stats.totalJobs, icon: Users, color: 'from-purple-500/20 to-purple-600/20' },
                { label: 'States Covered', value: 37, icon: MapPin, color: 'from-amber-500/20 to-amber-600/20' },
                { label: 'Completion Rate', value: stats.completionRate, icon: CheckCircle, color: 'from-emerald-500/20 to-emerald-600/20', suffix: '%' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={scaleIn}
                  custom={i + 2}
                  className={`bg-gradient-to-br ${item.color} backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5`}
                >
                  <item.icon className="w-6 h-6 text-white/70 mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold">
                    <AnimatedCounter target={item.value} suffix={item.suffix} />
                  </div>
                  <div className="text-green-200 text-xs sm:text-sm mt-1">{item.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full"><path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="white"/></svg>
        </div>
      </section>

      {/* ─── HEADLINE NUMBERS ─── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {[
              { label: 'Roads Completed', value: stats.totalRoads, icon: Building2, color: 'text-blue-600 bg-blue-50' },
              { label: 'Health Centers', value: stats.totalHealthCenters, icon: Heart, color: 'text-rose-600 bg-rose-50' },
              { label: 'Schools Built', value: stats.totalSchoolsBuilt, icon: GraduationCap, color: 'text-indigo-600 bg-indigo-50' },
              { label: 'Boreholes Drilled', value: stats.totalBoreholesDrilled, icon: Droplets, color: 'text-cyan-600 bg-cyan-50' },
              { label: 'Households Connected', value: stats.totalHouseholdsConnected, icon: Zap, color: 'text-amber-600 bg-amber-50' },
              { label: 'Housing Units', value: stats.totalHousingUnits, icon: Building2, color: 'text-orange-600 bg-orange-50' },
              { label: 'Total Budget', value: 0, icon: Briefcase, color: 'text-green-600 bg-green-50', display: formatCurrency(stats.totalBudget) },
              { label: 'Revenue (IGR)', value: 0, icon: BarChart3, color: 'text-teal-600 bg-teal-50', display: formatCurrency(stats.totalRevenueGenerated) },
            ].map((item, i) => (
              <motion.div key={item.label} variants={fadeUp} custom={i * 0.5}
                className="text-center p-4 sm:p-6 rounded-2xl border hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-3`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  {item.display || <AnimatedCounter target={item.value} />}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Three simple steps to track your government's performance and hold leaders accountable.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { step: '01', title: 'Track Projects', desc: 'Browse thousands of government projects across infrastructure, health, education, agriculture, and more. Filter by state, sector, or status.', icon: BarChart3, color: 'bg-green-600' },
              { step: '02', title: 'View Evidence', desc: 'See real before & after photos, progress images, and video documentation for every project. Verify with your own eyes.', icon: Eye, color: 'bg-blue-600' },
              { step: '03', title: 'Hold Accountable', desc: 'Share project data on social media, compare state performance, and demand transparency from your elected officials.', icon: Shield, color: 'bg-purple-600' },
            ].map((item, i) => (
              <motion.div key={item.step} variants={fadeUp} custom={i}
                className="relative bg-white rounded-2xl p-8 border hover:shadow-xl transition-all group"
              >
                <div className="text-6xl font-black text-gray-100 absolute top-4 right-6">{item.step}</div>
                <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Real projects, real impact. See what your government is delivering across Nigeria.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {featured.map((p, i) => (
              <motion.div key={p.id} variants={fadeUp} custom={i}
                onClick={() => navigate(`/projects/${p.id}`)}
                className="rounded-2xl border overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
              >
                {p.media[0] && (
                  <div className="relative h-48 overflow-hidden">
                    <img src={p.media[0].url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {p.media[0].type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center"><Play className="w-6 h-6 text-white ml-0.5" /></div>
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="text-white text-xs font-medium bg-white/20 px-2 py-1 rounded">{p.sector}</span>
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">{p.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm font-semibold text-green-700">
                      {p.progress}% complete
                    </div>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3}
            className="text-center mt-10"
          >
            <button onClick={() => navigate('/projects')}
              className="px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
            >
              View All Projects <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── ZONE HIGHLIGHTS ─── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Performance Across All Zones</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Development is reaching every corner of Nigeria. Explore performance by geopolitical zone.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {zoneData.map((z, i) => (
              <motion.div key={z.zone} variants={scaleIn} custom={i}
                className="bg-white rounded-2xl border p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{z.zone}</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">{z.states} states</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{formatNumber(z.projects)}</div>
                    <div className="text-xs text-gray-500">Projects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">{formatNumber(z.jobs)}</div>
                    <div className="text-xs text-gray-500">Jobs Created</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── PRESIDENTIAL MANDATE ─── */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-white rounded-full" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} custom={0}>
              <CoatOfArms className="w-16 h-16 mx-auto mb-6 opacity-60" />
            </motion.div>
            <motion.blockquote variants={fadeUp} custom={1}
              className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed mb-8 italic text-gray-200"
            >
              "Our administration is committed to transparency and accountability. Every naira spent must be accounted for, every project must deliver value, and every Nigerian must have access to the truth about how their government is performing."
            </motion.blockquote>
            <motion.div variants={fadeUp} custom={2}>
              <div className="w-16 h-0.5 bg-green-500 mx-auto mb-4" />
              <p className="text-green-400 font-semibold text-lg">The Renewed Hope Agenda</p>
              <p className="text-gray-400 text-sm mt-1">Federal Government of Nigeria</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Ready to Track Your Government?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1}
              className="text-gray-600 text-lg max-w-2xl mx-auto mb-10"
            >
              Access real-time data on {formatNumber(stats.totalProjects)} projects across {states.length} states. Your right to know. Your power to demand accountability.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button onClick={() => navigate('/dashboard')}
                className="px-10 py-4 bg-green-700 text-white rounded-xl font-bold text-lg hover:bg-green-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Go to Dashboard <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => navigate('/analytics')}
                className="px-10 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-5 h-5" /> View Analytics
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── MINI FOOTER ─── */}
      <div className="bg-gray-900 text-gray-400 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <CoatOfArms className="w-6 h-6 opacity-50" />
            <span className="text-xs">&copy; {new Date().getFullYear()} Federal Government of Nigeria</span>
          </div>
          <span className="text-xs text-gray-500">Renewed Hope Agenda &middot; Transparency &middot; Accountability &middot; Good Governance</span>
        </div>
      </div>
    </div>
  );
}
