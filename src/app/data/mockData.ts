export type Status = 'completed' | 'in-progress' | 'delayed' | 'not-started';

export type MediaType = 'image' | 'video';

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  thumbnail?: string;
  caption: string;
  date: string;
  tag?: 'before' | 'after' | 'progress';
}

export interface Project {
  id: string;
  name: string;
  sector: string;
  location: string;
  state: string;
  lga?: string;
  status: Status;
  progress: number;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  jobsCreated: number;
  description: string;
  beforeImage?: string;
  afterImage?: string;
  media: MediaItem[];
  impact: {
    beneficiaries?: number;
    roadsBuilt?: number;
    schoolsBuilt?: number;
    hospitalsBuilt?: number;
  };
}

export interface LocalGovernment {
  id: string;
  name: string;
  state: string;
  projects: number;
  completedProjects: number;
  jobsCreated: number;
  roadsCompleted: number;
  healthCenters: number;
  schoolsBuilt: number;
  studentsEnrolled: number;
  boreholesDrilled: number;
  householdsConnected: number;
  housingUnits: number;
  farmlandDeveloped: number;
  status: Status;
}

export interface State {
  id: string;
  name: string;
  zone: string;
  projects: number;
  completedProjects: number;
  inProgressProjects: number;
  delayedProjects: number;
  jobsCreated: number;
  roadsCompleted: number;
  healthCenters: number;
  schoolsBuilt: number;
  studentsEnrolled: number;
  boreholesDrilled: number;
  householdsConnected: number;
  powerSupplyHours: number;
  housingUnits: number;
  farmlandDeveloped: number;
  crimeReduction: number;
  povertyReduction: number;
  revenueGenerated: number;
  budget: number;
  spent: number;
  status: Status;
  lgas: LocalGovernment[];
}

export interface Metric {
  date: string;
  jobsCreated: number;
  foodPriceIndex: number;
  powerSupply: number;
  projectsCompleted: number;
  healthCenters: number;
  schoolsBuilt: number;
  boreholesDrilled: number;
  householdsConnected: number;
  crimeIndex: number;
  povertyIndex: number;
}

import { stateLGANames } from './lgaNames';

// Seeded random for consistent mock data
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateStateIndicators(seed: number) {
  const r = (offset: number) => seededRandom(seed + offset);
  return {
    healthCenters: Math.floor(r(20) * 80) + 15,
    schoolsBuilt: Math.floor(r(21) * 120) + 20,
    studentsEnrolled: Math.floor(r(22) * 150000) + 30000,
    boreholesDrilled: Math.floor(r(23) * 200) + 30,
    householdsConnected: Math.floor(r(24) * 50000) + 8000,
    powerSupplyHours: Math.round((r(25) * 12 + 6) * 10) / 10,
    housingUnits: Math.floor(r(26) * 3000) + 200,
    farmlandDeveloped: Math.floor(r(27) * 8000) + 1000,
    crimeReduction: Math.round((r(28) * 25 + 5) * 10) / 10,
    povertyReduction: Math.round((r(29) * 15 + 3) * 10) / 10,
    revenueGenerated: Math.floor(r(30) * 80000000000) + 10000000000,
  };
}

function generateLGAs(stateId: string, stateName: string): LocalGovernment[] {
  const names = stateLGANames[stateId];
  if (!names) return [];
  return names.map((name, i) => {
    const seed = stateId.length * 100 + i;
    const r = (offset: number) => seededRandom(seed + offset);
    const projects = Math.floor(r(1) * 20) + 8;
    const completed = Math.floor(r(2) * projects * 0.8);
    const statuses: Status[] = ['completed', 'in-progress', 'delayed', 'not-started'];
    return {
      id: name.toLowerCase().replace(/[\s/']+/g, '-').replace(/[()]/g, ''),
      name,
      state: stateName,
      projects,
      completedProjects: completed,
      jobsCreated: Math.floor(r(3) * 5000) + 1000,
      roadsCompleted: Math.floor(r(4) * 30) + 5,
      healthCenters: Math.floor(r(6) * 8) + 1,
      schoolsBuilt: Math.floor(r(7) * 12) + 2,
      studentsEnrolled: Math.floor(r(8) * 8000) + 2000,
      boreholesDrilled: Math.floor(r(9) * 20) + 3,
      householdsConnected: Math.floor(r(10) * 3000) + 500,
      housingUnits: Math.floor(r(11) * 200) + 20,
      farmlandDeveloped: Math.floor(r(12) * 500) + 50,
      status: statuses[Math.floor(r(5) * 4)] as Status,
    };
  });
}

export const sectors = [
  'Infrastructure',
  'Agriculture',
  'Power',
  'Employment',
  'Health',
  'Education',
  'Water',
  'Transportation',
];

export const states: State[] = [
  {
    id: 'lagos',
    name: 'Lagos',
    zone: 'South West',
    projects: 156,
    completedProjects: 98,
    inProgressProjects: 45,
    delayedProjects: 13,
    jobsCreated: 45000,
    roadsCompleted: 234,
    budget: 250000000000,
    spent: 178000000000,
    ...generateStateIndicators(1),
    status: 'in-progress',
    lgas: generateLGAs('lagos', 'Lagos'),
  },
  {
    id: 'kano',
    name: 'Kano',
    zone: 'North West',
    projects: 134,
    completedProjects: 87,
    inProgressProjects: 38,
    delayedProjects: 9,
    jobsCreated: 38000,
    roadsCompleted: 189,
    budget: 180000000000,
    spent: 142000000000,
    ...generateStateIndicators(2),
    status: 'in-progress',
    lgas: generateLGAs('kano', 'Kano'),
  },
  {
    id: 'rivers',
    name: 'Rivers',
    zone: 'South South',
    projects: 142,
    completedProjects: 76,
    inProgressProjects: 52,
    delayedProjects: 14,
    jobsCreated: 32000,
    roadsCompleted: 167,
    budget: 210000000000,
    spent: 156000000000,
    ...generateStateIndicators(3),
    status: 'in-progress',
    lgas: generateLGAs('rivers', 'Rivers'),
  },
  {
    id: 'kaduna',
    name: 'Kaduna',
    zone: 'North West',
    projects: 118,
    completedProjects: 82,
    inProgressProjects: 28,
    delayedProjects: 8,
    jobsCreated: 28000,
    roadsCompleted: 145,
    budget: 165000000000,
    spent: 129000000000,
    ...generateStateIndicators(4),
    status: 'completed',
    lgas: generateLGAs('kaduna', 'Kaduna'),
  },
  {
    id: 'oyo',
    name: 'Oyo',
    zone: 'South West',
    projects: 98,
    completedProjects: 61,
    inProgressProjects: 29,
    delayedProjects: 8,
    jobsCreated: 24000,
    roadsCompleted: 128,
    budget: 145000000000,
    spent: 112000000000,
    ...generateStateIndicators(5),
    status: 'in-progress',
    lgas: generateLGAs('oyo', 'Oyo'),
  },
  {
    id: 'abuja',
    name: 'FCT Abuja',
    zone: 'North Central',
    projects: 167,
    completedProjects: 112,
    inProgressProjects: 41,
    delayedProjects: 14,
    jobsCreated: 52000,
    roadsCompleted: 278,
    budget: 320000000000,
    spent: 245000000000,
    ...generateStateIndicators(6),
    status: 'in-progress',
    lgas: generateLGAs('abuja', 'FCT Abuja'),
  },
  {
    id: 'enugu',
    name: 'Enugu',
    zone: 'South East',
    projects: 89,
    completedProjects: 56,
    inProgressProjects: 25,
    delayedProjects: 8,
    jobsCreated: 19000,
    roadsCompleted: 102,
    budget: 125000000000,
    spent: 94000000000,
    status: 'in-progress',
    ...generateStateIndicators(7),
    lgas: generateLGAs('enugu', 'Enugu'),
  },
  {
    id: 'anambra',
    name: 'Anambra',
    zone: 'South East',
    projects: 95,
    completedProjects: 63,
    inProgressProjects: 28,
    delayedProjects: 4,
    jobsCreated: 22000,
    roadsCompleted: 118,
    budget: 138000000000,
    spent: 105000000000,
    status: 'in-progress',
    ...generateStateIndicators(8),
    lgas: generateLGAs('anambra', 'Anambra'),
  },
  {
    id: 'abia',
    name: 'Abia',
    zone: 'South East',
    projects: 78,
    completedProjects: 51,
    inProgressProjects: 22,
    delayedProjects: 5,
    jobsCreated: 17000,
    roadsCompleted: 95,
    budget: 115000000000,
    spent: 88000000000,
    status: 'in-progress',
    ...generateStateIndicators(9),
    lgas: generateLGAs('abia', 'Abia'),
  },
  {
    id: 'imo',
    name: 'Imo',
    zone: 'South East',
    projects: 84,
    completedProjects: 54,
    inProgressProjects: 24,
    delayedProjects: 6,
    jobsCreated: 18500,
    roadsCompleted: 98,
    budget: 120000000000,
    spent: 91000000000,
    status: 'in-progress',
    ...generateStateIndicators(10),
    lgas: generateLGAs('imo', 'Imo'),
  },
  {
    id: 'ebonyi',
    name: 'Ebonyi',
    zone: 'South East',
    projects: 72,
    completedProjects: 48,
    inProgressProjects: 19,
    delayedProjects: 5,
    jobsCreated: 15000,
    roadsCompleted: 86,
    budget: 105000000000,
    spent: 79000000000,
    status: 'in-progress',
    ...generateStateIndicators(11),
    lgas: generateLGAs('ebonyi', 'Ebonyi'),
  },
  {
    id: 'cross-river',
    name: 'Cross River',
    zone: 'South South',
    projects: 91,
    completedProjects: 58,
    inProgressProjects: 27,
    delayedProjects: 6,
    jobsCreated: 20000,
    roadsCompleted: 108,
    budget: 132000000000,
    spent: 99000000000,
    status: 'in-progress',
    ...generateStateIndicators(12),
    lgas: generateLGAs('cross-river', 'Cross River'),
  },
  {
    id: 'akwa-ibom',
    name: 'Akwa Ibom',
    zone: 'South South',
    projects: 107,
    completedProjects: 69,
    inProgressProjects: 31,
    delayedProjects: 7,
    jobsCreated: 24000,
    roadsCompleted: 126,
    budget: 155000000000,
    spent: 117000000000,
    status: 'in-progress',
    ...generateStateIndicators(13),
    lgas: generateLGAs('akwa-ibom', 'Akwa Ibom'),
  },
  {
    id: 'edo',
    name: 'Edo',
    zone: 'South South',
    projects: 98,
    completedProjects: 64,
    inProgressProjects: 28,
    delayedProjects: 6,
    jobsCreated: 21000,
    roadsCompleted: 112,
    budget: 142000000000,
    spent: 107000000000,
    status: 'in-progress',
    ...generateStateIndicators(14),
    lgas: generateLGAs('edo', 'Edo'),
  },
  {
    id: 'delta',
    name: 'Delta',
    zone: 'South South',
    projects: 104,
    completedProjects: 67,
    inProgressProjects: 30,
    delayedProjects: 7,
    jobsCreated: 23000,
    roadsCompleted: 119,
    budget: 148000000000,
    spent: 112000000000,
    status: 'in-progress',
    ...generateStateIndicators(15),
    lgas: generateLGAs('delta', 'Delta'),
  },
  {
    id: 'bayelsa',
    name: 'Bayelsa',
    zone: 'South South',
    projects: 86,
    completedProjects: 55,
    inProgressProjects: 25,
    delayedProjects: 6,
    jobsCreated: 18000,
    roadsCompleted: 97,
    budget: 128000000000,
    spent: 96000000000,
    status: 'in-progress',
    ...generateStateIndicators(16),
    lgas: generateLGAs('bayelsa', 'Bayelsa'),
  },
  {
    id: 'ogun',
    name: 'Ogun',
    zone: 'South West',
    projects: 92,
    completedProjects: 59,
    inProgressProjects: 27,
    delayedProjects: 6,
    jobsCreated: 20500,
    roadsCompleted: 115,
    budget: 135000000000,
    spent: 102000000000,
    status: 'in-progress',
    ...generateStateIndicators(17),
    lgas: generateLGAs('ogun', 'Ogun'),
  },
  {
    id: 'ondo',
    name: 'Ondo',
    zone: 'South West',
    projects: 87,
    completedProjects: 57,
    inProgressProjects: 24,
    delayedProjects: 6,
    jobsCreated: 19000,
    roadsCompleted: 104,
    budget: 130000000000,
    spent: 98000000000,
    status: 'in-progress',
    ...generateStateIndicators(18),
    lgas: generateLGAs('ondo', 'Ondo'),
  },
  {
    id: 'osun',
    name: 'Osun',
    zone: 'South West',
    projects: 83,
    completedProjects: 54,
    inProgressProjects: 23,
    delayedProjects: 6,
    jobsCreated: 18000,
    roadsCompleted: 99,
    budget: 122000000000,
    spent: 92000000000,
    status: 'in-progress',
    ...generateStateIndicators(19),
    lgas: generateLGAs('osun', 'Osun'),
  },
  {
    id: 'ekiti',
    name: 'Ekiti',
    zone: 'South West',
    projects: 76,
    completedProjects: 49,
    inProgressProjects: 21,
    delayedProjects: 6,
    jobsCreated: 16000,
    roadsCompleted: 88,
    budget: 112000000000,
    spent: 84000000000,
    status: 'in-progress',
    ...generateStateIndicators(20),
    lgas: generateLGAs('ekiti', 'Ekiti'),
  },
  {
    id: 'kwara',
    name: 'Kwara',
    zone: 'North Central',
    projects: 81,
    completedProjects: 52,
    inProgressProjects: 23,
    delayedProjects: 6,
    jobsCreated: 17500,
    roadsCompleted: 93,
    budget: 118000000000,
    spent: 89000000000,
    status: 'in-progress',
    ...generateStateIndicators(21),
    lgas: generateLGAs('kwara', 'Kwara'),
  },
  {
    id: 'niger',
    name: 'Niger',
    zone: 'North Central',
    projects: 96,
    completedProjects: 62,
    inProgressProjects: 28,
    delayedProjects: 6,
    jobsCreated: 21000,
    roadsCompleted: 114,
    budget: 140000000000,
    spent: 106000000000,
    status: 'in-progress',
    ...generateStateIndicators(22),
    lgas: generateLGAs('niger', 'Niger'),
  },
  {
    id: 'kogi',
    name: 'Kogi',
    zone: 'North Central',
    projects: 88,
    completedProjects: 57,
    inProgressProjects: 25,
    delayedProjects: 6,
    jobsCreated: 19000,
    roadsCompleted: 105,
    budget: 128000000000,
    spent: 97000000000,
    status: 'in-progress',
    ...generateStateIndicators(23),
    lgas: generateLGAs('kogi', 'Kogi'),
  },
  {
    id: 'benue',
    name: 'Benue',
    zone: 'North Central',
    projects: 93,
    completedProjects: 60,
    inProgressProjects: 27,
    delayedProjects: 6,
    jobsCreated: 20000,
    roadsCompleted: 109,
    budget: 135000000000,
    spent: 102000000000,
    status: 'in-progress',
    ...generateStateIndicators(24),
    lgas: generateLGAs('benue', 'Benue'),
  },
  {
    id: 'plateau',
    name: 'Plateau',
    zone: 'North Central',
    projects: 85,
    completedProjects: 55,
    inProgressProjects: 24,
    delayedProjects: 6,
    jobsCreated: 18500,
    roadsCompleted: 101,
    budget: 124000000000,
    spent: 94000000000,
    status: 'in-progress',
    ...generateStateIndicators(25),
    lgas: generateLGAs('plateau', 'Plateau'),
  },
  {
    id: 'nasarawa',
    name: 'Nasarawa',
    zone: 'North Central',
    projects: 79,
    completedProjects: 51,
    inProgressProjects: 22,
    delayedProjects: 6,
    jobsCreated: 17000,
    roadsCompleted: 96,
    budget: 115000000000,
    spent: 87000000000,
    status: 'in-progress',
    ...generateStateIndicators(26),
    lgas: generateLGAs('nasarawa', 'Nasarawa'),
  },
  {
    id: 'sokoto',
    name: 'Sokoto',
    zone: 'North West',
    projects: 91,
    completedProjects: 59,
    inProgressProjects: 26,
    delayedProjects: 6,
    jobsCreated: 20000,
    roadsCompleted: 107,
    budget: 133000000000,
    spent: 100000000000,
    status: 'in-progress',
    ...generateStateIndicators(27),
    lgas: generateLGAs('sokoto', 'Sokoto'),
  },
  {
    id: 'kebbi',
    name: 'Kebbi',
    zone: 'North West',
    projects: 84,
    completedProjects: 54,
    inProgressProjects: 24,
    delayedProjects: 6,
    jobsCreated: 18000,
    roadsCompleted: 98,
    budget: 122000000000,
    spent: 92000000000,
    status: 'in-progress',
    ...generateStateIndicators(28),
    lgas: generateLGAs('kebbi', 'Kebbi'),
  },
  {
    id: 'zamfara',
    name: 'Zamfara',
    zone: 'North West',
    projects: 77,
    completedProjects: 50,
    inProgressProjects: 21,
    delayedProjects: 6,
    jobsCreated: 16500,
    roadsCompleted: 89,
    budget: 112000000000,
    spent: 85000000000,
    status: 'in-progress',
    ...generateStateIndicators(29),
    lgas: generateLGAs('zamfara', 'Zamfara'),
  },
  {
    id: 'katsina',
    name: 'Katsina',
    zone: 'North West',
    projects: 97,
    completedProjects: 63,
    inProgressProjects: 28,
    delayedProjects: 6,
    jobsCreated: 21000,
    roadsCompleted: 113,
    budget: 141000000000,
    spent: 107000000000,
    status: 'in-progress',
    ...generateStateIndicators(30),
    lgas: generateLGAs('katsina', 'Katsina'),
  },
  {
    id: 'jigawa',
    name: 'Jigawa',
    zone: 'North West',
    projects: 89,
    completedProjects: 58,
    inProgressProjects: 25,
    delayedProjects: 6,
    jobsCreated: 19000,
    roadsCompleted: 104,
    budget: 130000000000,
    spent: 98000000000,
    status: 'in-progress',
    ...generateStateIndicators(31),
    lgas: generateLGAs('jigawa', 'Jigawa'),
  },
  {
    id: 'bauchi',
    name: 'Bauchi',
    zone: 'North East',
    projects: 94,
    completedProjects: 61,
    inProgressProjects: 27,
    delayedProjects: 6,
    jobsCreated: 20500,
    roadsCompleted: 110,
    budget: 137000000000,
    spent: 104000000000,
    status: 'in-progress',
    ...generateStateIndicators(32),
    lgas: generateLGAs('bauchi', 'Bauchi'),
  },
  {
    id: 'gombe',
    name: 'Gombe',
    zone: 'North East',
    projects: 81,
    completedProjects: 52,
    inProgressProjects: 23,
    delayedProjects: 6,
    jobsCreated: 17500,
    roadsCompleted: 94,
    budget: 118000000000,
    spent: 89000000000,
    status: 'in-progress',
    ...generateStateIndicators(33),
    lgas: generateLGAs('gombe', 'Gombe'),
  },
  {
    id: 'yobe',
    name: 'Yobe',
    zone: 'North East',
    projects: 73,
    completedProjects: 47,
    inProgressProjects: 20,
    delayedProjects: 6,
    jobsCreated: 15500,
    roadsCompleted: 84,
    budget: 106000000000,
    spent: 80000000000,
    status: 'in-progress',
    ...generateStateIndicators(34),
    lgas: generateLGAs('yobe', 'Yobe'),
  },
  {
    id: 'borno',
    name: 'Borno',
    zone: 'North East',
    projects: 86,
    completedProjects: 55,
    inProgressProjects: 25,
    delayedProjects: 6,
    jobsCreated: 18500,
    roadsCompleted: 99,
    budget: 125000000000,
    spent: 95000000000,
    status: 'in-progress',
    ...generateStateIndicators(35),
    lgas: generateLGAs('borno', 'Borno'),
  },
  {
    id: 'adamawa',
    name: 'Adamawa',
    zone: 'North East',
    projects: 88,
    completedProjects: 57,
    inProgressProjects: 25,
    delayedProjects: 6,
    jobsCreated: 19000,
    roadsCompleted: 103,
    budget: 128000000000,
    spent: 97000000000,
    status: 'in-progress',
    ...generateStateIndicators(36),
    lgas: generateLGAs('adamawa', 'Adamawa'),
  },
  {
    id: 'taraba',
    name: 'Taraba',
    zone: 'North East',
    projects: 82,
    completedProjects: 53,
    inProgressProjects: 23,
    delayedProjects: 6,
    jobsCreated: 17500,
    roadsCompleted: 95,
    budget: 120000000000,
    spent: 91000000000,
    status: 'in-progress',
    ...generateStateIndicators(37),
    lgas: generateLGAs('taraba', 'Taraba'),
  },
];

export const projects: Project[] = [
  {
    id: 'proj-001',
    name: 'Lagos-Ibadan Expressway Rehabilitation',
    sector: 'Infrastructure',
    location: 'Lagos-Oyo Corridor',
    state: 'Lagos',
    status: 'in-progress',
    progress: 78,
    startDate: '2024-01-15',
    endDate: '2026-12-31',
    budget: 85000000000,
    spent: 66300000000,
    jobsCreated: 8500,
    description: 'Complete rehabilitation and expansion of the Lagos-Ibadan expressway to improve interstate commerce and reduce travel time.',
    media: [
      { id: 'm1', type: 'image', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&h=500&fit=crop', caption: 'Lagos-Ibadan corridor before rehabilitation — deteriorated road surface', date: '2024-01-20', tag: 'before' },
      { id: 'm2', type: 'image', url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=500&fit=crop', caption: 'Heavy machinery at work — road construction in progress', date: '2025-11-15', tag: 'progress' },
      { id: 'm3', type: 'image', url: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=500&fit=crop', caption: 'Completed dual carriageway section of the expressway', date: '2026-02-10', tag: 'after' },
      { id: 'm4', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', thumbnail: 'https://images.unsplash.com/photo-1473042904451-00171c69419d?w=800&h=500&fit=crop', caption: 'Aerial drone flyover of completed expressway section', date: '2026-03-01', tag: 'progress' },
      { id: 'm20', type: 'image', url: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800&h=500&fit=crop', caption: 'Workers laying asphalt on the new road surface', date: '2025-08-22', tag: 'progress' },
    ],
    impact: { beneficiaries: 2000000, roadsBuilt: 127 },
  },
  {
    id: 'proj-002',
    name: 'Kano Agricultural Modernization Project',
    sector: 'Agriculture',
    location: 'Kano State',
    state: 'Kano',
    lga: 'Nassarawa',
    status: 'completed',
    progress: 100,
    startDate: '2023-03-10',
    endDate: '2025-11-30',
    budget: 12000000000,
    spent: 11800000000,
    jobsCreated: 3200,
    description: 'Modernization of agricultural infrastructure including irrigation systems, storage facilities, and farmer training centers.',
    media: [
      { id: 'm5', type: 'image', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop', caption: 'Dry farmland before irrigation modernization', date: '2023-03-15', tag: 'before' },
      { id: 'm6', type: 'image', url: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=800&h=500&fit=crop', caption: 'New irrigation channels being constructed', date: '2024-08-20', tag: 'progress' },
      { id: 'm7', type: 'image', url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=500&fit=crop', caption: 'Lush irrigated farmland after modernization', date: '2025-10-05', tag: 'after' },
      { id: 'm21', type: 'image', url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=500&fit=crop', caption: 'Farmers using new storage facilities', date: '2025-09-18', tag: 'after' },
      { id: 'm22', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', thumbnail: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=500&fit=crop', caption: 'Documentary: Kano Agricultural Transformation', date: '2025-11-01', tag: 'after' },
    ],
    impact: { beneficiaries: 45000 },
  },
  {
    id: 'proj-003',
    name: 'Port Harcourt Power Generation Expansion',
    sector: 'Power',
    location: 'Port Harcourt',
    state: 'Rivers',
    lga: 'Port Harcourt',
    status: 'in-progress',
    progress: 62,
    startDate: '2024-06-01',
    endDate: '2027-05-31',
    budget: 145000000000,
    spent: 89900000000,
    jobsCreated: 4100,
    description: 'Construction of a 500MW gas-fired power plant to improve electricity supply in the South-South region.',
    media: [
      { id: 'm8', type: 'image', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=500&fit=crop', caption: 'Empty site before power plant construction', date: '2024-06-05', tag: 'before' },
      { id: 'm9', type: 'image', url: 'https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&h=500&fit=crop', caption: 'Gas turbine installation in progress', date: '2025-09-12', tag: 'progress' },
      { id: 'm23', type: 'image', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop', caption: 'Power transmission lines being erected', date: '2025-12-05', tag: 'progress' },
      { id: 'm10', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', thumbnail: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop', caption: 'Video walkthrough of the power plant construction site', date: '2026-01-18', tag: 'progress' },
    ],
    impact: { beneficiaries: 850000 },
  },
  {
    id: 'proj-004',
    name: 'Abuja Light Rail Phase 2',
    sector: 'Transportation',
    location: 'FCT Abuja',
    state: 'FCT Abuja',
    lga: 'Abuja Municipal',
    status: 'in-progress',
    progress: 45,
    startDate: '2025-01-20',
    endDate: '2028-12-31',
    budget: 230000000000,
    spent: 103500000000,
    jobsCreated: 6700,
    description: 'Extension of the Abuja light rail network to connect suburban areas with the city center.',
    media: [
      { id: 'm24', type: 'image', url: 'https://images.unsplash.com/photo-1532939163844-547f958e91b4?w=800&h=500&fit=crop', caption: 'Rail corridor before construction began', date: '2025-01-25', tag: 'before' },
      { id: 'm11', type: 'image', url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=500&fit=crop', caption: 'Light rail track laying in progress', date: '2025-06-20', tag: 'progress' },
      { id: 'm25', type: 'image', url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=500&fit=crop', caption: 'Station platform under construction', date: '2025-10-14', tag: 'progress' },
      { id: 'm12', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=500&fit=crop', caption: 'Monthly progress update — Abuja Light Rail Phase 2', date: '2026-02-28', tag: 'progress' },
    ],
    impact: { beneficiaries: 1200000 },
  },
  {
    id: 'proj-005',
    name: 'Kaduna Teaching Hospital Upgrade',
    sector: 'Health',
    location: 'Kaduna North',
    state: 'Kaduna',
    lga: 'Kaduna North',
    status: 'completed',
    progress: 100,
    startDate: '2023-08-15',
    endDate: '2025-10-30',
    budget: 8500000000,
    spent: 8200000000,
    jobsCreated: 1200,
    description: 'Complete renovation and equipment upgrade of Kaduna Teaching Hospital including new diagnostic centers and emergency units.',
    media: [
      { id: 'm13', type: 'image', url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=500&fit=crop', caption: 'Hospital ward before renovation — outdated facilities', date: '2023-08-20', tag: 'before' },
      { id: 'm26', type: 'image', url: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=800&h=500&fit=crop', caption: 'Renovation work in progress — new wing construction', date: '2024-11-10', tag: 'progress' },
      { id: 'm14', type: 'image', url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=500&fit=crop', caption: 'Modern hospital ward with new diagnostic equipment', date: '2025-10-15', tag: 'after' },
      { id: 'm27', type: 'image', url: 'https://images.unsplash.com/photo-1551190822-a9ce113ac100?w=800&h=500&fit=crop', caption: 'New emergency unit fully operational', date: '2025-10-20', tag: 'after' },
    ],
    impact: { beneficiaries: 320000, hospitalsBuilt: 1 },
  },
  {
    id: 'proj-006',
    name: 'Oyo State Rural Electrification',
    sector: 'Power',
    location: 'Rural Oyo',
    state: 'Oyo',
    status: 'in-progress',
    progress: 58,
    startDate: '2024-04-10',
    endDate: '2026-12-31',
    budget: 18000000000,
    spent: 10440000000,
    jobsCreated: 2400,
    description: 'Installation of solar mini-grids and grid extension to 150 rural communities across Oyo State.',
    media: [
      { id: 'm28', type: 'image', url: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=800&h=500&fit=crop', caption: 'Rural community before electrification — no power lines', date: '2024-04-15', tag: 'before' },
      { id: 'm15', type: 'image', url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop', caption: 'Solar panel array installation in rural Oyo', date: '2025-03-10', tag: 'progress' },
      { id: 'm29', type: 'image', url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=500&fit=crop', caption: 'Completed solar mini-grid powering local community', date: '2025-08-22', tag: 'progress' },
      { id: 'm30', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', thumbnail: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=500&fit=crop', caption: 'Community celebrates first electricity connection', date: '2025-09-05', tag: 'progress' },
    ],
    impact: { beneficiaries: 180000 },
  },
  {
    id: 'proj-007',
    name: 'Lagos Skills Acquisition Centers',
    sector: 'Employment',
    location: 'Multiple LGAs',
    state: 'Lagos',
    lga: 'Ikeja',
    status: 'completed',
    progress: 100,
    startDate: '2023-02-01',
    endDate: '2025-06-30',
    budget: 5600000000,
    spent: 5400000000,
    jobsCreated: 8900,
    description: 'Establishment of 12 skills acquisition centers for youth training in technology, construction, and creative industries.',
    media: [
      { id: 'm16', type: 'image', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop', caption: 'Empty lot before skills center construction', date: '2023-02-10', tag: 'before' },
      { id: 'm31', type: 'image', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=500&fit=crop', caption: 'Building construction in progress', date: '2024-03-18', tag: 'progress' },
      { id: 'm17', type: 'image', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop', caption: 'Completed modern skills acquisition center', date: '2025-06-15', tag: 'after' },
      { id: 'm18', type: 'image', url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=500&fit=crop', caption: 'Youth technology training session in progress', date: '2025-05-20', tag: 'after' },
      { id: 'm32', type: 'video', url: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop', caption: 'Graduation ceremony — first batch of trainees', date: '2025-06-28', tag: 'after' },
    ],
    impact: { beneficiaries: 25000 },
  },
  {
    id: 'proj-008',
    name: 'Rivers State Water Supply Project',
    sector: 'Water',
    location: 'Multiple LGAs',
    state: 'Rivers',
    status: 'delayed',
    progress: 32,
    startDate: '2024-09-01',
    endDate: '2027-03-31',
    budget: 22000000000,
    spent: 7040000000,
    jobsCreated: 1800,
    description: 'Construction of water treatment plants and distribution networks to provide clean water to underserved communities.',
    media: [
      { id: 'm33', type: 'image', url: 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&h=500&fit=crop', caption: 'Stagnant water source — community before project', date: '2024-09-05', tag: 'before' },
      { id: 'm19', type: 'image', url: 'https://images.unsplash.com/photo-1504972090739-0e2f52b61b0e?w=800&h=500&fit=crop', caption: 'Water treatment plant foundation and piping', date: '2025-04-12', tag: 'progress' },
      { id: 'm34', type: 'image', url: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&h=500&fit=crop', caption: 'Pipe distribution network being laid', date: '2025-07-20', tag: 'progress' },
    ],
    impact: { beneficiaries: 450000 },
  },
];

export const metrics: Metric[] = [
  { date: '2025-09', jobsCreated: 12400, foodPriceIndex: 285, powerSupply: 4200, projectsCompleted: 23, healthCenters: 45, schoolsBuilt: 62, boreholesDrilled: 120, householdsConnected: 8500, crimeIndex: 78, povertyIndex: 62 },
  { date: '2025-10', jobsCreated: 14800, foodPriceIndex: 278, powerSupply: 4350, projectsCompleted: 28, healthCenters: 52, schoolsBuilt: 71, boreholesDrilled: 138, householdsConnected: 9200, crimeIndex: 75, povertyIndex: 60 },
  { date: '2025-11', jobsCreated: 16200, foodPriceIndex: 272, powerSupply: 4480, projectsCompleted: 31, healthCenters: 58, schoolsBuilt: 78, boreholesDrilled: 155, householdsConnected: 10100, crimeIndex: 72, povertyIndex: 58 },
  { date: '2025-12', jobsCreated: 18900, foodPriceIndex: 268, powerSupply: 4620, projectsCompleted: 35, healthCenters: 67, schoolsBuilt: 89, boreholesDrilled: 172, householdsConnected: 11400, crimeIndex: 69, povertyIndex: 56 },
  { date: '2026-01', jobsCreated: 21300, foodPriceIndex: 265, powerSupply: 4750, projectsCompleted: 38, healthCenters: 74, schoolsBuilt: 96, boreholesDrilled: 190, householdsConnected: 12800, crimeIndex: 66, povertyIndex: 54 },
  { date: '2026-02', jobsCreated: 19800, foodPriceIndex: 261, powerSupply: 4890, projectsCompleted: 34, healthCenters: 79, schoolsBuilt: 102, boreholesDrilled: 205, householdsConnected: 13600, crimeIndex: 64, povertyIndex: 53 },
  { date: '2026-03', jobsCreated: 22500, foodPriceIndex: 258, powerSupply: 5020, projectsCompleted: 41, healthCenters: 86, schoolsBuilt: 112, boreholesDrilled: 224, householdsConnected: 14900, crimeIndex: 61, povertyIndex: 51 },
  { date: '2026-04', jobsCreated: 24100, foodPriceIndex: 254, powerSupply: 5180, projectsCompleted: 45, healthCenters: 93, schoolsBuilt: 121, boreholesDrilled: 240, householdsConnected: 16200, crimeIndex: 58, povertyIndex: 49 },
];

export const getStateById = (id: string): State | undefined => {
  return states.find(s => s.id === id);
};

export const getLGAById = (stateId: string, lgaId: string): LocalGovernment | undefined => {
  const state = getStateById(stateId);
  return state?.lgas.find(l => l.id === lgaId);
};

export const getProjectsByState = (stateId: string): Project[] => {
  return projects.filter(p => p.state === getStateById(stateId)?.name);
};

export const getProjectsByLGA = (stateId: string, lgaId: string): Project[] => {
  const lga = getLGAById(stateId, lgaId);
  return projects.filter(p => p.lga === lga?.name);
};

export const getProjectsBySector = (sector: string): Project[] => {
  return projects.filter(p => p.sector === sector);
};

export const getNationalStats = () => {
  const totalProjects = states.reduce((sum, s) => sum + s.projects, 0);
  const completedProjects = states.reduce((sum, s) => sum + s.completedProjects, 0);
  const totalJobs = states.reduce((sum, s) => sum + s.jobsCreated, 0);
  const totalRoads = states.reduce((sum, s) => sum + s.roadsCompleted, 0);
  const totalBudget = states.reduce((sum, s) => sum + s.budget, 0);
  const totalSpent = states.reduce((sum, s) => sum + s.spent, 0);

  return {
    totalProjects,
    completedProjects,
    inProgressProjects: states.reduce((sum, s) => sum + s.inProgressProjects, 0),
    delayedProjects: states.reduce((sum, s) => sum + s.delayedProjects, 0),
    totalJobs,
    totalRoads,
    totalBudget,
    totalSpent,
    completionRate: Math.round((completedProjects / totalProjects) * 100),
    totalHealthCenters: states.reduce((sum, s) => sum + s.healthCenters, 0),
    totalSchoolsBuilt: states.reduce((sum, s) => sum + s.schoolsBuilt, 0),
    totalStudentsEnrolled: states.reduce((sum, s) => sum + s.studentsEnrolled, 0),
    totalBoreholesDrilled: states.reduce((sum, s) => sum + s.boreholesDrilled, 0),
    totalHouseholdsConnected: states.reduce((sum, s) => sum + s.householdsConnected, 0),
    totalHousingUnits: states.reduce((sum, s) => sum + s.housingUnits, 0),
    totalFarmlandDeveloped: states.reduce((sum, s) => sum + s.farmlandDeveloped, 0),
    avgPowerSupplyHours: Math.round(states.reduce((sum, s) => sum + s.powerSupplyHours, 0) / states.length * 10) / 10,
    avgCrimeReduction: Math.round(states.reduce((sum, s) => sum + s.crimeReduction, 0) / states.length * 10) / 10,
    avgPovertyReduction: Math.round(states.reduce((sum, s) => sum + s.povertyReduction, 0) / states.length * 10) / 10,
    totalRevenueGenerated: states.reduce((sum, s) => sum + s.revenueGenerated, 0),
  };
};
