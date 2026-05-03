import { Project } from '../data/mockData';
import { formatCurrency, formatNumber, getStatusBgColor, getStatusLabel, getStatusTextColor } from '../utils/helpers';
import { Calendar, DollarSign, MapPin, TrendingUp, Users, Camera, Play } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
    >
      {/* Thumbnail */}
      {project.media.length > 0 && (
        <div className="relative h-40 bg-gray-100">
          <img
            src={project.media[0].type === 'video' ? (project.media[0].thumbnail || project.media[0].url) : project.media[0].url}
            alt={project.media[0].caption}
            className="w-full h-full object-cover"
          />
          {project.media[0].type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 text-white ml-0.5" />
              </div>
            </div>
          )}
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            <Camera className="w-3 h-3" />
            {project.media.length}
          </div>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold mb-1">{project.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{project.location}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBgColor(project.status)} ${getStatusTextColor(project.status)}`}>
            {getStatusLabel(project.status)}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <div>
              <div className="text-xs text-gray-500">Budget</div>
              <div className="text-sm font-medium">{formatCurrency(project.budget)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <div>
              <div className="text-xs text-gray-500">Jobs Created</div>
              <div className="text-sm font-medium">{formatNumber(project.jobsCreated)}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(project.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>{project.sector}</span>
            </div>
          </div>
          <ShareButton
            title={project.name}
            text={`${project.name} — ${project.progress}% complete. Track Nigeria's development.`}
            url={typeof window !== 'undefined' ? `${window.location.origin}/projects/${project.id}` : ''}
            variant="icon"
          />
        </div>
      </div>
    </div>
  );
}
