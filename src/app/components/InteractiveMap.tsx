import { useState } from 'react';
import { useNavigate } from 'react-router';
import { states } from '../data/mockData';
import { getStatusColor, formatNumber } from '../utils/helpers';
import { MapPin } from 'lucide-react';

export function InteractiveMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const navigate = useNavigate();

  const zones = {
    'North West': states.filter(s => s.zone === 'North West'),
    'North East': states.filter(s => s.zone === 'North East'),
    'North Central': states.filter(s => s.zone === 'North Central'),
    'South West': states.filter(s => s.zone === 'South West'),
    'South South': states.filter(s => s.zone === 'South South'),
    'South East': states.filter(s => s.zone === 'South East'),
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-blue-600" />
        <h2 className="font-semibold">Interactive Performance Map</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {Object.entries(zones).map(([zone, zoneStates]) => (
          <div key={zone} className="border rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-3">{zone}</h3>
            <div className="space-y-2">
              {zoneStates.map(state => (
                <div
                  key={state.id}
                  onMouseEnter={() => setHoveredState(state.id)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => navigate(`/state/${state.id}`)}
                  className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(state.status)}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{state.name}</div>
                    {hoveredState === state.id && (
                      <div className="text-xs text-gray-500 mt-1 space-y-0.5">
                        <div>Projects: {state.projects}</div>
                        <div>Jobs: {formatNumber(state.jobsCreated)}</div>
                        <div>Roads: {formatNumber(state.roadsCompleted)}</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-gray-600">Completed / On Track</span>
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
