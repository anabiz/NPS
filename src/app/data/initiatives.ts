export interface Initiative {
  id: string;
  title: string;
  description: string;
  videos?: string[];
}

export interface Sector {
  id: string;
  name: string;
  initiatives: Initiative[];
}

export const flagshipSectors: Sector[] = [
  {
    id: 'economy',
    name: 'Economy & Finance',
    initiatives: [
      {
        id: 'subsidy-removal',
        title: 'Removal of petrol subsidy to reduce government expenditure and fiscal leakages',
        description: 'The removal of the petrol subsidy in Nigeria, initiated on May 29, 2023, is a landmark economic reform designed to end the long-standing fiscal strain caused by subsidizing fuel consumption, which previously encouraged massive smuggling and corruption. As of early 2026, the government maintains that the policy is necessary for economic stability, having significantly reduced the government\'s fiscal burden and re-directed resources toward infrastructure and social investment, despite substantial short-term economic hardship and high inflation.',
      },
      {
        id: 'fx-unification',
        title: 'Unification of Nigeria\'s foreign exchange windows to create a market-driven exchange rate system',
        description: 'Nigeria initiated a major foreign exchange (FX) reform in mid-2023, unifying its multiple exchange rate windows into a single, market-driven system based on the "willing buyer, willing seller" model. This policy aims to eliminate arbitrage, enhance transparency, attract foreign investment, and reduce government intervention, with the official rate now closely aligned with the parallel market.',
      },
      {
        id: 'revenue-increase',
        title: 'Increase in government revenue and reduction in fiscal deficit',
        description: 'Increasing government revenue while reducing the fiscal deficit is a critical economic imperative, largely driven by tax reforms, economic diversification, and disciplined public spending. As of May 2026, strategies focus on maximizing revenue from non-oil sectors to reduce reliance on borrowing, combating rising debt servicing costs which have reached nearly 80-90% of revenue.',
      },
      {
        id: 'fx-reserves',
        title: 'Improvement in foreign exchange reserves and clearing of FX backlog liabilities',
        description: 'As of early May 2026, Nigeria\'s foreign exchange (FX) landscape has experienced a significant turnaround, characterized by a robust rise in external reserves and the successful settlement of inherited FX backlogs. Gross external reserves surged to $50.45 billion as of February 2026, marking the highest level in 13 years. The CBN has successfully cleared the estimated $7 billion inherited foreign exchange backlog, removing a significant hurdle for investor confidence. The reserves provide roughly 9.68 months of import cover, substantially exceeding the international benchmark.',
      },
      {
        id: 'tax-reform',
        title: 'Tax reform initiatives and signing of tax administration reform bills',
        description: 'On June 26, 2025, President Bola Ahmed Tinubu signed four major tax reform bills into law, marking the most comprehensive overhaul of the country\'s tax system in decades. The Nigeria Tax Act 2025 consolidates multiple legacy statutes into a single law. Small companies with annual gross turnovers of ₦100 million or less are fully exempt from Companies Income Tax. Individuals earning ₦800,000 or less annually are exempt from income tax. Full implementation began January 1, 2026.',
      },
      {
        id: 'monetary-policy',
        title: 'Efforts to tighten monetary policy and stabilize inflation',
        description: 'Efforts to tighten monetary policy and stabilize inflation involve the Central Bank implementing contractionary measures to cool the economy, reduce demand, and bring rising prices under control. Key strategies include raising interest rates, open market operations, quantitative tightening, increasing reserve requirements, and adopting an Inflation Targeting Framework.',
      },
      {
        id: 'oil-production',
        title: 'Increase in oil production toward about 1.8 million barrels per day',
        description: 'Nigeria\'s daily crude oil production has risen to approximately 1.84 million barrels per day (mbpd) as of early April 2026, according to the Nigerian Upstream Petroleum Regulatory Commission (NUPRC). The increase is driven by improved security in the Niger Delta, leading to reduced theft, and increased activity by Joint Venture and Production Sharing Contract partners. The government is pushing for a further increase to 2 million barrels per day.',
      },
    ],
  },
  {
    id: 'infrastructure',
    name: 'Infrastructure & Transportation',
    initiatives: [
      {
        id: 'lagos-calabar',
        title: 'Commencement of the Lagos-Calabar Coastal Highway project',
        description: 'Construction of the 700-750km Lagos-Calabar Coastal Highway officially commenced in March 2024 under the administration of President Bola Tinubu, with the first 47.47km phase (Section 1) in Lagos being built by Hitech Construction Company Limited. The project, aimed at connecting nine coastal states, is designed as a rigid pavement, 10-lane highway with a projected eight-year completion timeline.',
        videos: ['https://youtu.be/EkaI9aWIKUE', 'https://youtu.be/1LjFITkQpQI'],
      },
      {
        id: 'sokoto-badagry',
        title: 'Advancement of the Sokoto–Badagry Super Highway project',
        description: 'The Sokoto–Badagry Superhighway is a transformative 1,068-kilometre legacy project currently under construction in Nigeria. Conceived over 47 years ago, it was recently reactivated under the Renewed Hope Agenda of President Bola Ahmed Tinubu to connect the North-West and South-West regions.',
      },
      {
        id: 'keffi-makurdi',
        title: 'Rehabilitation and commissioning of the Keffi–Akwanga–Lafia–Makurdi road corridor',
        description: 'The rehabilitation, dualization, and expansion of the Keffi–Akwanga–Lafia–Makurdi road corridor—a critical 250 km artery connecting Abuja to the South-East via Nasarawa and Benue states—has largely been completed, with key sections under a 25-year concessionary maintenance phase. As of early 2026, the project has transitioned from construction to operations, including the commencement of tolling.',
      },
      {
        id: 'benin-asaba',
        title: 'Flag-off of the Benin–Asaba Highway under the Highway Development and Management Initiative',
        description: 'The reconstruction of the 125-kilometre Benin–Asaba Expressway was officially flagged off on March 23, 2025. This landmark project is a core component of the Highway Development and Management Initiative (HDMI), a strategic program designed to modernize federal highways through private sector investment.',
        videos: ['https://youtu.be/KCGfAhOnlj4'],
      },
      {
        id: 'rail-modernization',
        title: 'Rail modernization and proposed redevelopment of eastern rail corridors',
        description: 'The modernization and redevelopment of Nigeria\'s Eastern Rail Corridor is a multi-billion-dollar initiative aimed at restoring a 1,443-kilometre network connecting Port Harcourt to Maiduguri. The project is designed to revitalize trade between the South-East, South-South, and North-East regions by linking 14 states.',
        videos: ['https://youtu.be/ifne4cze7dU'],
      },
      {
        id: 'ppp-infrastructure',
        title: 'Increased use of Public-Private Partnerships (PPP) for infrastructure financing',
        description: 'Public-Private Partnerships (PPPs) are increasingly utilized to bridge the global $4.3 trillion annual infrastructure financing gap. By leveraging private capital and expertise, governments aim to deliver essential services—such as transport, energy, and water—more efficiently than through traditional procurement.',
      },
    ],
  },
  {
    id: 'power',
    name: 'Power & Energy',
    initiatives: [
      {
        id: 'electricity-act',
        title: 'Implementation of the Electricity Act 2023 allowing states to generate and distribute electricity independently',
        description: 'The Electricity Act 2023 has initiated the decentralization of Nigeria\'s power sector, empowering states to legislate, generate, transmit, and distribute electricity independently. As of early 2026, several states including Lagos, Enugu, Edo, and others have taken regulatory control, shifting oversight from NERC to state-level.',
      },
      {
        id: 'niep',
        title: 'Launch of the National Integrated Electricity Policy roadmap',
        description: 'The Federal Executive Council (FEC) of Nigeria officially approved the National Integrated Electricity Policy (NIEP) and Strategic Implementation Plan (SIP) on May 5-6, 2025, marking a significant shift in the country\'s power sector strategy. Developed to replace the outdated 2001 policy, this roadmap aims to operationalize the Electricity Act 2023 and address structural inefficiencies.',
      },
      {
        id: 'energy-investment',
        title: 'Efforts to attract private investment into the energy sector',
        description: 'Efforts to attract private investment into the energy sector, particularly in Nigeria, are focused on structural reforms, including a ₦4 trillion power sector reset, tariff discipline, and debt resolution to create a bankable market. Key strategies include implementing cost-reflective tariffs, enhancing metering, and leveraging blended finance to mitigate risks and support infrastructure upgrades.',
      },
      {
        id: 'local-refining',
        title: 'Improved fuel supply stability linked to local refining capacity',
        description: 'As of early 2026, increased local refining capacity—primarily driven by the Dangote Refinery—has significantly improved fuel supply stability in Nigeria, reducing reliance on imports and easing foreign exchange pressure. However, this capacity does not fully prevent price volatility, as local fuel costs remain linked to global crude oil prices.',
      },
    ],
  },
  {
    id: 'digital',
    name: 'Digital Economy & Technology',
    initiatives: [
      {
        id: 'digital-fdi',
        title: 'Growth in foreign direct investment into Nigeria\'s digital economy sector',
        description: 'Nigeria\'s digital economy sector has witnessed a massive surge in foreign direct investment (FDI), highlighted by a ninefold increase from $22 million in Q1 2023 to $191 million in Q1 2024. Growth continued into Q2 2024, with a 356% increase year-on-year to $114 million, driven by government policy reforms, the 3MTT workforce program, and AI initiatives.',
      },
      {
        id: 'fibre-optic',
        title: 'Proposed national fibre optic expansion project to improve broadband access nationwide',
        description: 'The Nigerian government is accelerating its national fibre optic expansion project, branded as Project BRIDGE (Building Resilient Digital Infrastructure for Growth), aiming to deploy 90,000 km of fibre optic cable to expand the national backbone from roughly 35,000 km to over 125,000 km. This project is scheduled to begin roll-out in Q1 2026.',
      },
      {
        id: 'e-government',
        title: 'Expansion of digital government initiatives including e-visa systems and biometric passport processing',
        description: 'Digital government initiatives are expanding rapidly in 2026, driven by a global shift toward secure, paperless, and instantaneous travel processes. Key developments center on mandatory electronic visas (e-visas) and the integration of biometric, contactless technology for passports.',
      },
      {
        id: 'e-gates',
        title: 'Deployment of e-gates at major airports for automated immigration processing',
        description: 'Nigeria is deploying 41 e-gates across major international airports to automate immigration, targeting under 30-second clearance for travellers. Operational at Abuja (Nnamdi Azikiwe) and Lagos (Murtala Muhammed), these gates use biometric verification to increase security, reduce queues, and minimize human interaction for improved transparency.',
      },
    ],
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Food Security',
    initiatives: [
      {
        id: 'food-emergency',
        title: 'Declaration of a state of emergency on food security and food production',
        description: 'In Nigeria, President Bola Tinubu declared a national emergency on food security on July 13, 2023, as a response to surging food prices and the removal of the fuel subsidy. As of May 2026, the administration has reaffirmed this emergency, integrating food and water affordability into the purview of the National Security Council.',
      },
      {
        id: 'fertilizer-support',
        title: 'Fertilizer support intervention reportedly worth over ₦100 billion for farmers',
        description: 'The Central Bank of Nigeria (CBN) has donated 2.15 million bags of fertilizer, valued at over ₦100 billion, to the Federal Ministry of Agriculture and Food Security (FMAFS). This intervention, announced in March 2024, aims to boost food production and mitigate rising food inflation across Nigeria.',
      },
    ],
  },
  {
    id: 'health',
    name: 'Health Sector',
    initiatives: [
      {
        id: 'health-fellows',
        title: 'Launch of the National Health Fellows Programme across all 774 LGAs',
        description: 'The National Health Fellows Programme (NHFP) is an initiative launched by President Bola Tinubu to deploy 774 young Nigerians—one in each local government area—to monitor and improve primary healthcare (PHC) center performance. Launched in early 2025 and supported by WHO, fellows work as social accountability agents to track finances and improve healthcare delivery.',
      },
      {
        id: 'medipool',
        title: 'Push for healthcare PPP projects such as MediPool for centralized procurement of medicines and vaccines',
        description: 'The Nigerian government has formalised a Public-Private Partnership (PPP) with MediPool Nigeria Limited to establish a National Group Purchasing Organization (GPO), designed to centralize the procurement of medicines and vaccines, significantly lower costs, and enhance supply chain efficiency. Approved by FEC in May 2025 and operationalised via an MoU in February 2026.',
      },
      {
        id: 'primary-healthcare',
        title: 'Increased federal attention on primary healthcare delivery',
        description: 'The Federal Government of Nigeria is implementing a major, data-driven overhaul of its primary healthcare (PHC) system, aiming to transition from 1,800 functional centers in 2023 to 17,000 by 2027. This initiative, part of the "Renewed Hope" agenda, focuses on shifting financing directly to facilities and strengthening accountability.',
      },
    ],
  },
  {
    id: 'education',
    name: 'Education & Youth Development',
    initiatives: [
      {
        id: 'nelfund',
        title: 'Student loan implementation through the Nigerian Education Loan Fund (NELFUND)',
        description: 'The Nigerian Education Loan Fund (NELFUND) is a landmark student loan scheme providing accessible financing for Nigerian students in tertiary institutions, enabling them to fund their education and repay after graduation upon securing employment.',
      },
      {
        id: 'youth-cabinet',
        title: 'Appointment of younger Nigerians into cabinet and agency leadership positions',
        description: 'As of May 2026, the administration of President Bola Tinubu has focused on increasing youth representation in the cabinet and, more heavily, in the leadership of federal agencies, aimed at fostering innovation and digital transformation. A significant number of young technocrats and professionals under 50 have been appointed to run key agencies.',
      },
      {
        id: 'msme-grants',
        title: 'Expansion of youth-focused MSME grants and loan programs',
        description: 'Significant expansion of youth-focused Micro, Small, and Medium Enterprise (MSME) grants and loan programs is currently underway in Nigeria as of early 2026, aimed at strengthening entrepreneurship, reducing unemployment, and providing alternatives to high-interest lenders.',
      },
      {
        id: 'conditional-grants',
        title: 'Entrepreneurship and conditional grant schemes for small businesses',
        description: 'The Presidential Conditional Grant Scheme (PCGS) and SMEDAN\'s Conditional Grant Scheme (CGS) in Nigeria provide ₦50,000 non-repayable grants to nano-businesses. Targeting 1 million small businesses nationwide (with 70% for women/youth), the program requires beneficiaries to employ one person and formalize their business to boost grassroots economic growth.',
      },
    ],
  },
];
