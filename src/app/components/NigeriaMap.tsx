import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { states, State } from '../data/mockData';
import { getStatusColor, formatNumber } from '../utils/helpers';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import nigeriaTopoData from '../data/geo/nigeria-states.json';

// Map Highcharts hc-key codes to our state IDs
const hcKeyToStateId: Record<string, string> = {
  'ng-ri': 'rivers',
  'ng-kt': 'katsina',
  'ng-so': 'sokoto',
  'ng-za': 'zamfara',
  'ng-yo': 'yobe',
  'ng-ke': 'kebbi',
  'ng-ad': 'adamawa',
  'ng-bo': 'borno',
  'ng-ak': 'akwa-ibom',
  'ng-ab': 'abia',
  'ng-im': 'imo',
  'ng-by': 'bayelsa',
  'ng-be': 'benue',
  'ng-cr': 'cross-river',
  'ng-ta': 'taraba',
  'ng-kw': 'kwara',
  'ng-la': 'lagos',
  'ng-ni': 'niger',
  'ng-fc': 'abuja',
  'ng-og': 'ogun',
  'ng-on': 'ondo',
  'ng-ek': 'ekiti',
  'ng-os': 'osun',
  'ng-oy': 'oyo',
  'ng-an': 'anambra',
  'ng-ba': 'bauchi',
  'ng-go': 'gombe',
  'ng-de': 'delta',
  'ng-ed': 'edo',
  'ng-en': 'enugu',
  'ng-eb': 'ebonyi',
  'ng-kd': 'kaduna',
  'ng-ko': 'kogi',
  'ng-pl': 'plateau',
  'ng-na': 'nasarawa',
  'ng-ji': 'jigawa',
  'ng-kn': 'kano',
};

const WIDTH = 800;
const HEIGHT = 700;

export function NigeriaMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  const { geojson, pathGenerator } = useMemo(() => {
    const topo = nigeriaTopoData as unknown as Topology;
    const geo = feature(topo, topo.objects.default) as any;

    const projection = geoMercator().fitSize([WIDTH, HEIGHT], geo);
    const pathGen = geoPath().projection(projection);

    return { geojson: geo, pathGenerator: pathGen };
  }, []);

  const getStateData = (hcKey: string): State | undefined => {
    const stateId = hcKeyToStateId[hcKey];
    if (!stateId) return undefined;
    return states.find((s) => s.id === stateId);
  };

  const colorMap: Record<string, string> = {
    'green-500': '#22c55e',
    'amber-500': '#f59e0b',
    'red-500': '#ef4444',
    'gray-400': '#9ca3af',
  };

  const getFillColor = (stateData?: State) => {
    if (!stateData) return '#d1d5db';
    const tailwindClass = getStatusColor(stateData.status).replace('bg-', '');
    return colorMap[tailwindClass] || '#d1d5db';
  };

  const handleMouseMove = (e: React.MouseEvent<SVGElement>) => {
    const svg = e.currentTarget.closest('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const hoveredData = hoveredState ? getStateData(hoveredState) : null;

  return (
    <div className="bg-white rounded-lg border p-3 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Interactive Nigeria Map</h2>

      <div className="relative">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto" style={{ maxHeight: '600px' }}>
          {geojson.features.map((feat: any) => {
            const hcKey = feat.properties['hc-key'];
            const stateData = getStateData(hcKey);
            const isHovered = hoveredState === hcKey;
            const d = pathGenerator(feat);
            if (!d) return null;

            const centroid = pathGenerator.centroid(feat);

            return (
              <g key={hcKey}>
                <path
                  d={d}
                  fill={getFillColor(stateData)}
                  stroke="#ffffff"
                  strokeWidth={isHovered ? 2.5 : 1}
                  opacity={isHovered ? 1 : 0.85}
                  className="cursor-pointer transition-all duration-150"
                  onMouseEnter={() => setHoveredState(hcKey)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => stateData && navigate(`/state/${stateData.id}`)}
                />
                <text
                  x={centroid[0]}
                  y={centroid[1]}
                  fontSize="9"
                  fill="#1f2937"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none select-none"
                  style={{ fontWeight: 600 }}
                >
                  {stateData?.name.split(' ')[0] || feat.properties.name}
                </text>
              </g>
            );
          })}
        </svg>

        {hoveredData && (
          <div
            className="absolute bg-white border rounded-lg shadow-lg p-3 pointer-events-none z-10 text-sm"
            style={{ left: `${tooltipPos.x + 12}px`, top: `${tooltipPos.y + 12}px` }}
          >
            <div className="font-semibold mb-2">{hoveredData.name}</div>
            <div className="space-y-1 text-xs text-gray-600">
              <div>Projects: {hoveredData.projects}</div>
              <div>Jobs: {formatNumber(hoveredData.jobsCreated)}</div>
              <div>Roads: {formatNumber(hoveredData.roadsCompleted)}</div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-4 pt-3 sm:pt-4 border-t mt-4 sm:mt-6">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
          <span className="text-xs sm:text-sm text-gray-600">Completed</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500" />
          <span className="text-xs sm:text-sm text-gray-600">In Progress</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
          <span className="text-xs sm:text-sm text-gray-600">Delayed</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-400" />
          <span className="text-xs sm:text-sm text-gray-600">Not Started</span>
        </div>
      </div>
    </div>
  );
}
