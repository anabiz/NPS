import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { State, LocalGovernment } from '../data/mockData';
import { getStatusColor, formatNumber } from '../utils/helpers';
import { geoMercator, geoPath, geoContains } from 'd3-geo';
import { Delaunay } from 'd3-delaunay';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import nigeriaTopoData from '../data/geo/nigeria-states.json';

const stateIdToHcKey: Record<string, string> = {
  rivers: 'ng-ri', katsina: 'ng-kt', sokoto: 'ng-so', zamfara: 'ng-za',
  yobe: 'ng-yo', kebbi: 'ng-ke', adamawa: 'ng-ad', borno: 'ng-bo',
  'akwa-ibom': 'ng-ak', abia: 'ng-ab', imo: 'ng-im', bayelsa: 'ng-by',
  benue: 'ng-be', 'cross-river': 'ng-cr', taraba: 'ng-ta', kwara: 'ng-kw',
  lagos: 'ng-la', niger: 'ng-ni', abuja: 'ng-fc', ogun: 'ng-og',
  ondo: 'ng-on', ekiti: 'ng-ek', osun: 'ng-os', oyo: 'ng-oy',
  anambra: 'ng-an', bauchi: 'ng-ba', gombe: 'ng-go', delta: 'ng-de',
  edo: 'ng-ed', enugu: 'ng-en', ebonyi: 'ng-eb', kaduna: 'ng-kd',
  kogi: 'ng-ko', plateau: 'ng-pl', nasarawa: 'ng-na', jigawa: 'ng-ji',
  kano: 'ng-kn',
};

const WIDTH = 600;
const HEIGHT = 500;

const colorMap: Record<string, string> = {
  'green-500': '#22c55e',
  'amber-500': '#f59e0b',
  'red-500': '#ef4444',
  'gray-400': '#9ca3af',
};

function getFillColor(status: string) {
  const tc = getStatusColor(status as any).replace('bg-', '');
  return colorMap[tc] || '#d1d5db';
}

// Seeded random to get consistent LGA point placement
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// Generate seed points inside the state polygon for Voronoi
function generatePointsInPolygon(
  geoFeature: any,
  count: number,
  bbox: [number, number, number, number],
  seed: number
): [number, number][] {
  const points: [number, number][] = [];
  let attempts = 0;
  const [x0, y0, x1, y1] = bbox;
  while (points.length < count && attempts < count * 200) {
    const px = x0 + seededRandom(seed + attempts * 2) * (x1 - x0);
    const py = y0 + seededRandom(seed + attempts * 2 + 1) * (y1 - y0);
    if (geoContains(geoFeature, [px, py])) {
      points.push([px, py]);
    }
    attempts++;
  }
  return points;
}

interface StateMapProps {
  state: State;
}

export function StateMap({ state }: StateMapProps) {
  const [hoveredLga, setHoveredLga] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const { lgaRegions, statePath, pathGenerator } = useMemo(() => {
    const topo = nigeriaTopoData as unknown as Topology;
    const geo = feature(topo, topo.objects.default) as any;
    const hcKey = stateIdToHcKey[state.id];
    const stateFeature = geo.features.find((f: any) => f.properties['hc-key'] === hcKey);
    if (!stateFeature) return { lgaRegions: [], statePath: '', pathGenerator: null };

    const projection = geoMercator().fitSize([WIDTH - 40, HEIGHT - 40], stateFeature);
    projection.translate([
      (projection.translate()[0] ?? 0) + 20,
      (projection.translate()[1] ?? 0) + 20,
    ]);
    const pathGen = geoPath().projection(projection);
    const stateD = pathGen(stateFeature) || '';

    const lgaCount = state.lgas.length;
    if (lgaCount === 0) return { lgaRegions: [], statePath: stateD, pathGenerator: pathGen };

    // Get geographic bbox of the state
    const coords: number[][] = [];
    const extractCoords = (c: any) => {
      if (typeof c[0] === 'number') coords.push(c);
      else c.forEach(extractCoords);
    };
    extractCoords(stateFeature.geometry.coordinates);
    const lons = coords.map((c) => c[0]);
    const lats = coords.map((c) => c[1]);
    const bbox: [number, number, number, number] = [
      Math.min(...lons), Math.min(...lats),
      Math.max(...lons), Math.max(...lats),
    ];

    // Generate Voronoi seed points inside the state
    const seed = state.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const points = generatePointsInPolygon(stateFeature, lgaCount, bbox, seed);

    if (points.length < lgaCount) {
      // Fallback: just show the state outline
      return { lgaRegions: [], statePath: stateD, pathGenerator: pathGen };
    }

    // Project points to SVG space
    const projectedPoints = points.map((p) => projection(p) as [number, number]);

    // Create Voronoi diagram
    const delaunay = Delaunay.from(projectedPoints);
    const voronoi = delaunay.voronoi([0, 0, WIDTH, HEIGHT]);

    // Get state boundary as projected polygon points for clipping
    const statePathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    statePathEl.setAttribute('d', stateD);

    // Build LGA regions by clipping Voronoi cells to state boundary using SVG clipPath approach
    const regions = state.lgas.map((lga, i) => {
      const cell = voronoi.cellPolygon(i);
      if (!cell) return null;
      const cellPath = 'M' + cell.map((p) => p.join(',')).join('L') + 'Z';
      const centroid = projectedPoints[i];
      return { lga, cellPath, centroid };
    }).filter(Boolean) as { lga: LocalGovernment; cellPath: string; centroid: [number, number] }[];

    return { lgaRegions: regions, statePath: stateD, pathGenerator: pathGen };
  }, [state]);

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    const svg = e.currentTarget.closest('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const hoveredLgaData = hoveredLga
    ? state.lgas.find((l) => l.id === hoveredLga)
    : null;

  const clipId = `state-clip-${state.id}`;

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-bold mb-4">{state.name} State — Local Government Areas</h2>

      <div className="relative">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto" style={{ maxHeight: '500px' }}>
          <defs>
            <clipPath id={clipId}>
              <path d={statePath} />
            </clipPath>
          </defs>

          {/* State background */}
          <path d={statePath} fill="#f3f4f6" stroke="#9ca3af" strokeWidth="2" />

          {lgaRegions.length > 0 ? (
            <g clipPath={`url(#${clipId})`}>
              {lgaRegions.map(({ lga, cellPath, centroid }) => {
                const isHovered = hoveredLga === lga.id;
                return (
                  <g key={lga.id}>
                    <path
                      d={cellPath}
                      fill={getFillColor(lga.status)}
                      stroke="#ffffff"
                      strokeWidth={isHovered ? 2.5 : 1}
                      opacity={isHovered ? 1 : 0.8}
                      className="cursor-pointer transition-all duration-150"
                      onMouseEnter={() => setHoveredLga(lga.id)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={() => setHoveredLga(null)}
                      onClick={() => navigate(`/state/${state.id}/lga/${lga.id}`)}
                    />
                    <text
                      x={centroid[0]}
                      y={centroid[1]}
                      fontSize="8"
                      fill="#1f2937"
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="pointer-events-none select-none"
                      style={{ fontWeight: 600 }}
                    >
                      {lga.name.length > 12 ? lga.name.slice(0, 11) + '…' : lga.name}
                    </text>
                  </g>
                );
              })}
            </g>
          ) : (
            <text x={WIDTH / 2} y={HEIGHT / 2} textAnchor="middle" fontSize="14" fill="#6b7280">
              No LGA data available
            </text>
          )}

          {/* State border on top */}
          <path d={statePath} fill="none" stroke="#374151" strokeWidth="2" />
        </svg>

        {hoveredLgaData && (
          <div
            className="absolute bg-white border rounded-lg shadow-lg p-3 pointer-events-none z-10 text-sm"
            style={{ left: `${tooltipPos.x + 12}px`, top: `${tooltipPos.y + 12}px` }}
          >
            <div className="font-semibold mb-2">{hoveredLgaData.name}</div>
            <div className="space-y-1 text-xs text-gray-600">
              <div>Projects: {hoveredLgaData.projects}</div>
              <div>Completed: {hoveredLgaData.completedProjects}</div>
              <div>Jobs: {formatNumber(hoveredLgaData.jobsCreated)}</div>
              <div>Roads: {hoveredLgaData.roadsCompleted}</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4 pt-4 border-t mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-gray-600">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-sm text-gray-600">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm text-gray-600">Delayed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gray-400" />
          <span className="text-sm text-gray-600">Not Started</span>
        </div>
      </div>
    </div>
  );
}
