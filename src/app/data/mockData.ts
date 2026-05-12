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

const projectTemplates = [
  { sector: 'Infrastructure', names: ['{lga} Road Rehabilitation', '{lga} Bridge Construction', '{lga} Drainage System Upgrade', '{lga} Market Complex Construction'], descs: ['Rehabilitation of major roads and installation of drainage systems to improve transportation.', 'Construction of a modern bridge to connect communities and improve trade routes.', 'Upgrade of the drainage infrastructure to prevent flooding during rainy season.', 'Construction of a modern market complex with storage facilities.'] },
  { sector: 'Health', names: ['{lga} Primary Health Center', '{lga} General Hospital Upgrade', '{lga} Maternal Health Clinic'], descs: ['Construction of a new primary health center to serve the local community.', 'Renovation and equipment upgrade of the general hospital.', 'Establishment of a maternal and child health clinic with modern facilities.'] },
  { sector: 'Education', names: ['{lga} Model School Construction', '{lga} School Renovation Project', '{lga} ICT Learning Center'], descs: ['Construction of a model secondary school with laboratories and library.', 'Renovation of primary and secondary schools across the LGA.', 'Establishment of an ICT learning center for digital skills training.'] },
  { sector: 'Water', names: ['{lga} Borehole Drilling Project', '{lga} Water Treatment Plant', '{lga} Rural Water Supply Scheme'], descs: ['Drilling of boreholes to provide clean water to underserved communities.', 'Construction of a water treatment plant for safe drinking water.', 'Installation of water supply infrastructure in rural areas.'] },
  { sector: 'Agriculture', names: ['{lga} Irrigation Project', '{lga} Farm Settlement Scheme', '{lga} Agro-Processing Center'], descs: ['Development of irrigation infrastructure to boost farming output.', 'Establishment of a modern farm settlement with storage facilities.', 'Construction of an agro-processing center for local farmers.'] },
  { sector: 'Power', names: ['{lga} Rural Electrification', '{lga} Solar Mini-Grid Project', '{lga} Power Distribution Upgrade'], descs: ['Extension of electricity to unserved rural communities.', 'Installation of solar mini-grids for sustainable power supply.', 'Upgrade of power distribution infrastructure to reduce outages.'] },
  { sector: 'Employment', names: ['{lga} Skills Acquisition Center', '{lga} Youth Empowerment Hub', '{lga} Vocational Training Institute'], descs: ['Establishment of a skills acquisition center for youth empowerment.', 'Construction of a youth empowerment hub for entrepreneurship training.', 'Development of a vocational training institute for technical skills.'] },
  { sector: 'Transportation', names: ['{lga} Bus Terminal Construction', '{lga} Rural Road Network', '{lga} Transport Hub Development'], descs: ['Construction of a modern bus terminal to improve public transportation.', 'Development of rural road networks connecting farming communities.', 'Establishment of an integrated transport hub for the LGA.'] },
];

const stockImages: Record<string, string[]> = {
  Infrastructure: ['https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&h=400&fit=crop'],
  Health: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&h=400&fit=crop'],
  Education: ['https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop'],
  Water: ['https://images.unsplash.com/photo-1504972090739-0e2f52b61b0e?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=600&h=400&fit=crop'],
  Agriculture: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop'],
  Power: ['https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop'],
  Employment: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop'],
  Transportation: ['https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1532939163844-547f958e91b4?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop'],
};

function generateLGAProjects(): Project[] {
  const generated: Project[] = [];
  let idCounter = 100;
  for (const state of states) {
    for (const lga of state.lgas) {
      const seed = lga.id.length * 31 + lga.name.charCodeAt(0);
      const r = (offset: number) => seededRandom(seed + offset);
      const count = Math.floor(r(1) * 3) + 2; // 2-4 projects per LGA
      for (let j = 0; j < count; j++) {
        const tplIdx = Math.floor(r(10 + j * 7) * projectTemplates.length);
        const tpl = projectTemplates[tplIdx];
        const nameIdx = Math.floor(r(20 + j * 3) * tpl.names.length);
        const descIdx = Math.floor(r(30 + j * 5) * tpl.descs.length);
        const status = lga.status;
        const progress = status === 'completed' ? 100 : status === 'in-progress' ? Math.floor(r(40 + j) * 50) + 30 : status === 'delayed' ? Math.floor(r(41 + j) * 30) + 10 : 0;
        const budget = Math.floor(r(50 + j) * 4000000000) + 500000000;
        const spent = Math.floor(budget * (progress / 100) * (0.8 + r(60 + j) * 0.4));
        const jobs = Math.floor(r(70 + j) * 2000) + 200;
        const imgs = stockImages[tpl.sector] || stockImages.Infrastructure;
        const imgIdx = Math.floor(r(80 + j) * imgs.length);
        const tags: Array<'before' | 'progress' | 'after'> = progress === 100 ? ['before', 'after'] : progress > 0 ? ['before', 'progress'] : ['before'];
        const media: MediaItem[] = tags.map((tag, mi) => ({
          id: `gen-${idCounter}-${mi}`,
          type: 'image' as MediaType,
          url: imgs[(imgIdx + mi) % imgs.length],
          caption: `${tag.charAt(0).toUpperCase() + tag.slice(1)} — ${tpl.names[nameIdx].replace('{lga}', lga.name)}`,
          date: tag === 'before' ? '2024-01-15' : tag === 'progress' ? '2025-06-20' : '2026-01-10',
          tag,
        }));
        generated.push({
          id: `proj-gen-${idCounter++}`,
          name: tpl.names[nameIdx].replace('{lga}', lga.name),
          sector: tpl.sector,
          location: lga.name + ', ' + state.name,
          state: state.name,
          lga: lga.name,
          status,
          progress,
          startDate: '2024-01-15',
          endDate: status === 'completed' ? '2025-12-30' : '2027-06-30',
          budget,
          spent,
          jobsCreated: jobs,
          description: tpl.descs[descIdx],
          media,
          impact: { beneficiaries: Math.floor(r(90 + j) * 50000) + 5000 },
        });
      }
    }
  }
  return generated;
}

const handwrittenProjects: Project[] = [
  // ─── FLAGSHIP INITIATIVE PROJECTS ───
  {
    id: 'init-001',
    name: 'Lagos-Calabar Coastal Highway',
    sector: 'Infrastructure',
    location: 'Lagos to Calabar Corridor',
    state: 'Lagos',
    status: 'in-progress',
    progress: 35,
    startDate: '2024-03-01',
    endDate: '2032-03-01',
    budget: 1500000000000,
    spent: 525000000000,
    jobsCreated: 25000,
    description: 'The Lagos-Calabar Coastal Highway is one of the most ambitious infrastructure projects in Nigeria\'s history — a 700-750km, 10-lane rigid pavement expressway that will connect nine coastal states from Lagos through Ogun, Ondo, Edo, Delta, Bayelsa, Rivers, Akwa Ibom, to Cross River. Officially commenced in March 2024 under President Bola Tinubu\'s administration, the first 47.47km phase in Lagos is being constructed by Hitech Construction Company Limited. This transformative corridor is projected to unlock massive economic potential along Nigeria\'s coastline, reduce travel time between the South-West and South-South by over 60%, create tens of thousands of direct and indirect jobs, and catalyze industrial development in previously underserved coastal communities. With an eight-year completion timeline, the highway represents a generational investment in Nigeria\'s connectivity and economic integration.',
    media: [
      { id: 'init-m1', type: 'image', url: '/images/road-construction-progress.jpeg', caption: 'Lagos-Calabar Highway construction in progress', date: '2025-06-15', tag: 'progress' },
      { id: 'init-m2', type: 'image', url: '/images/bridge-construction.jpeg', caption: 'Bridge section under construction', date: '2025-08-20', tag: 'progress' },
      { id: 'init-m3', type: 'image', url: '/images/bridge-construction-aerial.jpeg', caption: 'Aerial view of highway construction', date: '2025-10-10', tag: 'progress' },
      { id: 'init-m1v1', type: 'video', url: 'https://www.youtube.com/embed/EkaI9aWIKUE', thumbnail: '/images/road-construction-progress.jpeg', caption: 'Lagos-Calabar Highway progress update', date: '2025-09-01', tag: 'progress' },
      { id: 'init-m1v2', type: 'video', url: 'https://www.youtube.com/embed/1LjFITkQpQI', thumbnail: '/images/bridge-construction-aerial.jpeg', caption: 'Aerial flyover of Lagos-Calabar Highway', date: '2025-11-15', tag: 'progress' },
    ],
    impact: { beneficiaries: 50000000, roadsBuilt: 47 },
  },
  {
    id: 'init-002',
    name: 'Sokoto–Badagry Super Highway',
    sector: 'Infrastructure',
    location: 'Sokoto to Badagry Corridor',
    state: 'Sokoto',
    status: 'in-progress',
    progress: 15,
    startDate: '2024-06-01',
    endDate: '2034-06-01',
    budget: 2000000000000,
    spent: 300000000000,
    jobsCreated: 18000,
    description: 'The Sokoto–Badagry Superhighway is a transformative 1,068-kilometre legacy project that has been on Nigeria\'s drawing board for over 47 years. Recently reactivated under the Renewed Hope Agenda of President Bola Ahmed Tinubu, this mega-highway will serve as a critical economic artery connecting the North-West to the South-West — linking Sokoto, Kebbi, Niger, Kwara, Oyo, Ogun, and Lagos states. The project is designed to dramatically reduce the cost of transporting goods between northern agricultural zones and southern ports, foster inter-regional trade, open up vast tracts of arable land for commercial farming, and create hundreds of thousands of construction and logistics jobs across multiple states. Its completion will fundamentally reshape Nigeria\'s internal trade dynamics and reduce the economic isolation of northern communities.',
    media: [
      { id: 'init-m4', type: 'image', url: '/images/road-rehabilitation-before.jpeg', caption: 'Route survey before construction', date: '2024-05-10', tag: 'before' },
      { id: 'init-m5', type: 'image', url: '/images/road-construction-progress.jpeg', caption: 'Initial construction phase', date: '2025-03-20', tag: 'progress' },
    ],
    impact: { beneficiaries: 80000000 },
  },
  {
    id: 'init-003',
    name: 'Keffi–Akwanga–Lafia–Makurdi Road Rehabilitation',
    sector: 'Infrastructure',
    location: 'Nasarawa - Benue Corridor',
    state: 'Nasarawa',
    status: 'completed',
    progress: 100,
    startDate: '2023-01-15',
    endDate: '2025-12-30',
    budget: 350000000000,
    spent: 340000000000,
    jobsCreated: 12000,
    description: 'The rehabilitation, dualization, and expansion of the Keffi–Akwanga–Lafia–Makurdi road corridor represents one of the most significant completed infrastructure achievements under the current administration. This critical 250-kilometre artery connects Abuja to the South-East via Nasarawa and Benue states, serving as a lifeline for millions of commuters, traders, and farmers. As of early 2026, the project has fully transitioned from construction to operations, with key sections now under a 25-year concessionary maintenance phase and tolling already commenced. The completed dual carriageway has slashed travel time from over 6 hours to under 3 hours, dramatically reduced road accidents, and revitalized economic activity in communities along the corridor.',
    media: [
      { id: 'init-m6', type: 'image', url: '/images/road-rehabilitation-before.jpeg', caption: 'Road before rehabilitation', date: '2023-02-01', tag: 'before' },
      { id: 'init-m7', type: 'image', url: '/images/road-rehabilitation-after.jpeg', caption: 'Completed dual carriageway', date: '2025-11-15', tag: 'after' },
      { id: 'init-m8', type: 'image', url: '/images/transport-infrastructure.jpeg', caption: 'Toll plaza now operational', date: '2026-01-10', tag: 'after' },
    ],
    impact: { beneficiaries: 15000000, roadsBuilt: 250 },
  },
  {
    id: 'init-004',
    name: 'Benin–Asaba Expressway Reconstruction',
    sector: 'Infrastructure',
    location: 'Edo - Delta Corridor',
    state: 'Edo',
    status: 'in-progress',
    progress: 20,
    startDate: '2025-03-23',
    endDate: '2030-03-23',
    budget: 450000000000,
    spent: 90000000000,
    jobsCreated: 8000,
    description: 'The reconstruction of the 125-kilometre Benin–Asaba Expressway, officially flagged off on March 23, 2025, is a landmark project under the Highway Development and Management Initiative (HDMI). This strategic program represents a paradigm shift in how Nigeria finances and maintains its federal highways — leveraging private sector investment, expertise, and accountability to deliver world-class road infrastructure. The Benin–Asaba corridor is one of Nigeria\'s most heavily trafficked routes, connecting the South-South to the South-East, and its deterioration over decades has caused immense economic losses, countless accidents, and untold hardship for millions of daily users. The reconstructed expressway will feature modern drainage systems, service lanes, rest areas, and intelligent traffic management systems.',
    media: [
      { id: 'init-m9', type: 'image', url: '/images/road-construction-progress.jpeg', caption: 'Construction flagged off March 2025', date: '2025-03-23', tag: 'progress' },
      { id: 'init-m9v', type: 'video', url: 'https://www.youtube.com/embed/KCGfAhOnlj4', thumbnail: '/images/road-construction-progress.jpeg', caption: 'Benin-Asaba Highway flag-off ceremony', date: '2025-03-23', tag: 'progress' },
    ],
    impact: { beneficiaries: 20000000, roadsBuilt: 125 },
  },
  {
    id: 'init-005',
    name: 'Eastern Rail Corridor Modernization',
    sector: 'Transportation',
    location: 'Port Harcourt to Maiduguri',
    state: 'Rivers',
    status: 'in-progress',
    progress: 10,
    startDate: '2025-01-01',
    endDate: '2035-01-01',
    budget: 3000000000000,
    spent: 300000000000,
    jobsCreated: 30000,
    description: 'The modernization and redevelopment of Nigeria\'s Eastern Rail Corridor is a multi-billion-dollar initiative of historic proportions — aimed at restoring and upgrading a 1,443-kilometre railway network connecting Port Harcourt in the South-South to Maiduguri in the North-East. This ambitious project will link 14 states including Rivers, Abia, Enugu, Benue, Plateau, Bauchi, and Borno, revitalizing trade between three geopolitical zones that have been economically disconnected for decades due to the collapse of the old narrow-gauge railway. The modernized corridor will feature standard-gauge tracks capable of supporting high-speed passenger and heavy freight services, modern stations, and integrated logistics hubs that will transform Nigeria\'s internal supply chain and reduce the dominance of expensive and dangerous road haulage.',
    media: [
      { id: 'init-m10', type: 'image', url: '/images/transport-infrastructure.jpeg', caption: 'Rail corridor planning phase', date: '2025-02-15', tag: 'progress' },
      { id: 'init-m10v', type: 'video', url: 'https://www.youtube.com/embed/ifne4cze7dU', thumbnail: '/images/transport-infrastructure.jpeg', caption: 'Eastern Rail Corridor modernization overview', date: '2025-05-10', tag: 'progress' },
    ],
    impact: { beneficiaries: 60000000 },
  },
  {
    id: 'init-006',
    name: 'National Electricity Decentralization',
    sector: 'Power',
    location: 'Nationwide',
    state: 'Lagos',
    status: 'in-progress',
    progress: 45,
    startDate: '2023-06-01',
    endDate: '2027-12-31',
    budget: 500000000000,
    spent: 225000000000,
    jobsCreated: 15000,
    description: 'The implementation of the Electricity Act 2023 represents the most fundamental restructuring of Nigeria\'s power sector since independence — empowering states to legislate, generate, transmit, and distribute electricity independently for the first time. This decentralization breaks the decades-long federal monopoly that left Nigeria with chronic power shortages despite abundant energy resources. As of early 2026, several states including Lagos, Enugu, Edo, Ondo, and others have enacted their own electricity laws and taken regulatory control, shifting oversight from the national regulator NERC to state-level bodies. This reform is expected to attract billions in private investment, enable states to develop renewable energy solutions tailored to local needs, and ultimately deliver reliable electricity to millions of Nigerians who have lived in darkness for generations.',
    media: [
      { id: 'init-m11', type: 'image', url: '/images/power-infrastructure.jpeg', caption: 'State-level power infrastructure', date: '2025-04-10', tag: 'progress' },
      { id: 'init-m12', type: 'image', url: '/images/rural-electrification.jpeg', caption: 'Rural electrification under state control', date: '2025-09-20', tag: 'progress' },
    ],
    impact: { beneficiaries: 100000000 },
  },
  {
    id: 'init-007',
    name: 'Dangote Refinery & Local Fuel Supply Stabilization',
    sector: 'Power',
    location: 'Lekki, Lagos',
    state: 'Lagos',
    status: 'in-progress',
    progress: 85,
    startDate: '2023-01-01',
    endDate: '2026-12-31',
    budget: 7000000000000,
    spent: 5950000000000,
    jobsCreated: 50000,
    description: 'The Dangote Refinery — Africa\'s largest single-train petroleum refinery with a capacity of 650,000 barrels per day — has fundamentally transformed Nigeria\'s fuel supply landscape. For decades, Africa\'s largest oil producer paradoxically imported over 90% of its refined petroleum products, draining billions in foreign exchange and leaving the nation vulnerable to global supply disruptions. The refinery\'s progressive ramp-up since 2023 has significantly improved fuel supply stability, reduced import dependency, eased pressure on foreign exchange reserves, and created over 50,000 direct and indirect jobs. While local fuel costs remain linked to global crude oil prices, the elimination of importation logistics, shipping costs, and demurrage charges has brought meaningful relief to the downstream sector.',
    media: [
      { id: 'init-m13', type: 'image', url: '/images/power-infrastructure.jpeg', caption: 'Refinery operations', date: '2025-11-01', tag: 'progress' },
    ],
    impact: { beneficiaries: 200000000 },
  },
  {
    id: 'init-008',
    name: 'Project BRIDGE — National Fibre Optic Expansion',
    sector: 'Infrastructure',
    location: 'Nationwide',
    state: 'FCT Abuja',
    status: 'in-progress',
    progress: 12,
    startDate: '2026-01-01',
    endDate: '2030-12-31',
    budget: 800000000000,
    spent: 96000000000,
    jobsCreated: 20000,
    description: 'Project BRIDGE (Building Resilient Digital Infrastructure for Growth) is Nigeria\'s most ambitious digital infrastructure initiative — aiming to deploy 90,000 kilometres of fibre optic cable to expand the national backbone from roughly 35,000 km to over 125,000 km. Scheduled to begin roll-out in Q1 2026, this transformative project will bring high-speed broadband connectivity to every local government area in Nigeria, enabling millions of citizens, businesses, schools, and hospitals to access the digital economy for the first time. The expanded backbone will support 5G deployment, cloud computing, telemedicine, e-learning, fintech services, and smart agriculture — positioning Nigeria as Africa\'s leading digital economy and creating an estimated 20,000 direct jobs in construction, maintenance, and digital services.',
    media: [
      { id: 'init-m14', type: 'image', url: '/images/market-construction.jpeg', caption: 'Digital infrastructure deployment', date: '2026-02-15', tag: 'progress' },
    ],
    impact: { beneficiaries: 150000000 },
  },
  {
    id: 'init-009',
    name: 'National Health Fellows Programme',
    sector: 'Health',
    location: 'All 774 LGAs',
    state: 'FCT Abuja',
    status: 'in-progress',
    progress: 60,
    startDate: '2025-01-01',
    endDate: '2027-12-31',
    budget: 50000000000,
    spent: 30000000000,
    jobsCreated: 774,
    description: 'The National Health Fellows Programme (NHFP) is a groundbreaking initiative that deploys 774 young, trained Nigerians — one in each local government area — to serve as social accountability agents monitoring and improving primary healthcare center performance. Launched in early 2025 with technical support from the World Health Organization, these fellows track financial flows, monitor drug availability, assess staff attendance, document facility conditions, and report directly to the Federal Ministry of Health. The programme represents a radical shift toward data-driven, community-level accountability in healthcare delivery, ensuring that resources allocated to primary healthcare actually reach the facilities and patients they are intended for. Fellows also serve as a bridge between communities and the health system, amplifying citizen voices and driving measurable improvements in service quality.',
    media: [
      { id: 'init-m15', type: 'image', url: '/images/healthcare-facility.jpeg', caption: 'Health fellow at PHC center', date: '2025-06-20', tag: 'progress' },
      { id: 'init-m16', type: 'image', url: '/images/hospital-renovation.jpeg', caption: 'Improved healthcare facility', date: '2025-10-15', tag: 'progress' },
    ],
    impact: { beneficiaries: 50000000, hospitalsBuilt: 774 },
  },
  {
    id: 'init-010',
    name: 'Nigerian Education Loan Fund (NELFUND)',
    sector: 'Education',
    location: 'Nationwide',
    state: 'FCT Abuja',
    status: 'in-progress',
    progress: 70,
    startDate: '2024-01-01',
    endDate: '2028-12-31',
    budget: 200000000000,
    spent: 140000000000,
    jobsCreated: 5000,
    description: 'The Nigerian Education Loan Fund (NELFUND) is a landmark student financing scheme that has transformed access to tertiary education for millions of Nigerian students from low-income backgrounds. Unlike previous failed attempts at student loans, NELFUND is designed with a sustainable repayment model — students receive interest-free loans covering tuition, accommodation, and living expenses, and repayment only begins two years after graduation upon securing employment, with deductions capped at a percentage of income. As of 2026, the fund has disbursed loans to over 500,000 students across federal and state universities, polytechnics, and colleges of education. The programme has dramatically reduced dropout rates due to inability to pay fees, increased enrollment from disadvantaged communities, and is creating a more educated, skilled workforce for Nigeria\'s growing economy.',
    media: [
      { id: 'init-m17', type: 'image', url: '/images/students-loan.jpeg', caption: 'Students benefiting from NELFUND', date: '2025-03-10', tag: 'progress' },
      { id: 'init-m18', type: 'image', url: '/images/students-loan-1.jpeg', caption: 'NELFUND disbursement ceremony', date: '2025-07-22', tag: 'progress' },
      { id: 'init-m19', type: 'image', url: '/images/school-construction.jpeg', caption: 'Educational infrastructure improvement', date: '2025-09-05', tag: 'progress' },
    ],
    impact: { beneficiaries: 2000000, schoolsBuilt: 50 },
  },
  {
    id: 'init-011',
    name: 'Presidential Conditional Grant Scheme (PCGS)',
    sector: 'Employment',
    location: 'Nationwide',
    state: 'FCT Abuja',
    status: 'in-progress',
    progress: 55,
    startDate: '2024-06-01',
    endDate: '2027-06-01',
    budget: 100000000000,
    spent: 55000000000,
    jobsCreated: 1000000,
    description: 'The Presidential Conditional Grant Scheme (PCGS) and SMEDAN\'s Conditional Grant Scheme represent the largest direct cash transfer to nano and micro-businesses in Nigeria\'s history — providing ₦50,000 non-repayable grants to one million small businesses nationwide, with 70% of beneficiaries being women and youth. Unlike traditional loan programs that burden small traders with interest payments, these conditional grants require only that beneficiaries employ at least one additional person and formalize their business registration. The programme has injected over ₦50 billion directly into the grassroots economy, created an estimated one million new jobs through the employment condition, brought hundreds of thousands of informal businesses into the tax net, and provided a critical lifeline to communities hardest hit by economic reforms. Beneficiaries span market traders, artisans, food vendors, tailors, mechanics, and digital entrepreneurs across all 774 local government areas.',
    media: [
      { id: 'init-m20', type: 'image', url: '/images/youth-empowerment-program.jpeg', caption: 'Grant beneficiaries at training', date: '2025-04-18', tag: 'progress' },
      { id: 'init-m21', type: 'image', url: '/images/skills-acquisition-center.jpeg', caption: 'Skills acquisition center', date: '2025-08-12', tag: 'progress' },
      { id: 'init-m22', type: 'image', url: '/images/market-construction.jpeg', caption: 'Beneficiary businesses thriving', date: '2025-11-30', tag: 'after' },
    ],
    impact: { beneficiaries: 1000000 },
  },
  {
    id: 'init-012',
    name: 'National Food Security Emergency Response',
    sector: 'Agriculture',
    location: 'Nationwide',
    state: 'FCT Abuja',
    status: 'in-progress',
    progress: 50,
    startDate: '2023-07-13',
    endDate: '2027-12-31',
    budget: 300000000000,
    spent: 150000000000,
    jobsCreated: 40000,
    description: 'The declaration of a national emergency on food security on July 13, 2023, triggered the most comprehensive agricultural intervention in Nigeria\'s recent history. The response includes a ₦100 billion fertilizer support programme (2.15 million bags donated by the CBN to the Federal Ministry of Agriculture), massive expansion of dry-season farming, rehabilitation of irrigation infrastructure, distribution of improved seedlings to smallholder farmers, and the integration of food and water affordability into the purview of the National Security Council. As of May 2026, the administration has reaffirmed this emergency status, recognizing that food security is not merely an agricultural issue but a matter of national security. The interventions have begun yielding results — with increased domestic food production, reduced post-harvest losses through new storage facilities, and the establishment of strategic grain reserves across all six geopolitical zones.',
    media: [
      { id: 'init-m23', type: 'image', url: '/images/agricultural-project.jpeg', caption: 'Agricultural intervention program', date: '2024-08-15', tag: 'progress' },
      { id: 'init-m24', type: 'image', url: '/images/borehole-drilling.jpeg', caption: 'Water supply for farming communities', date: '2025-02-20', tag: 'progress' },
    ],
    impact: { beneficiaries: 100000000 },
  },
  {
    id: 'init-013',
    name: 'MediPool — Centralized Medicine Procurement',
    sector: 'Health',
    location: 'Nationwide',
    state: 'FCT Abuja',
    status: 'in-progress',
    progress: 30,
    startDate: '2025-05-01',
    endDate: '2030-05-01',
    budget: 150000000000,
    spent: 45000000000,
    jobsCreated: 3000,
    description: 'The Public-Private Partnership with MediPool Nigeria Limited establishes Africa\'s first National Group Purchasing Organization (GPO) for centralized procurement of medicines, vaccines, and medical supplies. Approved by the Federal Executive Council in May 2025 and operationalized via a Memorandum of Understanding in February 2026, MediPool aggregates demand from thousands of public and private health facilities to negotiate dramatically lower prices from manufacturers — potentially reducing medicine costs by 30-50%. The platform also strengthens the pharmaceutical supply chain by reducing stockouts, eliminating counterfeit drugs through end-to-end tracking, boosting local manufacturing through guaranteed volume commitments, and reducing out-of-pocket expenses for patients. This initiative addresses one of the most critical barriers to healthcare access in Nigeria — the prohibitive cost and unreliable availability of essential medicines.',
    media: [
      { id: 'init-m25', type: 'image', url: '/images/healthcare-facility.jpeg', caption: 'MediPool distribution center', date: '2026-01-10', tag: 'progress' },
      { id: 'init-m26', type: 'image', url: '/images/hospital-renovation.jpeg', caption: 'Improved medicine availability', date: '2026-03-05', tag: 'progress' },
    ],
    impact: { beneficiaries: 80000000 },
  },
  {
    id: 'init-014',
    name: 'Airport E-Gates Deployment',
    sector: 'Transportation',
    location: 'Abuja & Lagos Airports',
    state: 'FCT Abuja',
    status: 'completed',
    progress: 100,
    startDate: '2024-06-01',
    endDate: '2025-12-31',
    budget: 25000000000,
    spent: 24000000000,
    jobsCreated: 500,
    description: 'Nigeria has deployed 41 state-of-the-art electronic gates (e-gates) across its major international airports — Nnamdi Azikiwe International Airport in Abuja and Murtala Muhammed International Airport in Lagos — to fully automate immigration processing for arriving and departing travellers. These biometric verification systems use facial recognition, fingerprint scanning, and passport chip reading to clear travellers in under 30 seconds, compared to the previous average of 5-10 minutes per passenger. The deployment eliminates the human discretion that previously enabled corruption at immigration desks, dramatically reduces queues during peak hours, enhances national security through real-time database checks, and positions Nigeria\'s airports among the most technologically advanced in Africa. The system is integrated with INTERPOL databases, national watchlists, and the Nigerian Immigration Service\'s central records for comprehensive security screening.',
    media: [
      { id: 'init-m27', type: 'image', url: '/images/transport-infrastructure.jpeg', caption: 'E-gates operational at airport', date: '2025-10-01', tag: 'after' },
    ],
    impact: { beneficiaries: 10000000 },
  },
  // ─── ORIGINAL HANDWRITTEN PROJECTS ───
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

export const projects: Project[] = [
  ...handwrittenProjects,
  ...generateLGAProjects(),
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
