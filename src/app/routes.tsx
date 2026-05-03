import { createBrowserRouter } from 'react-router';
import { Landing } from './pages/Landing';
import { Home } from './pages/Home';
import { StateDetail } from './pages/StateDetail';
import { LGADetail } from './pages/LGADetail';
import { Projects } from './pages/Projects';
import { Analytics } from './pages/Analytics';
import { Layout } from './components/Layout';
import { ProjectDetail } from './pages/ProjectDetail';

export const router = createBrowserRouter([
  { path: '/', Component: Landing },
  {
    path: '/',
    Component: Layout,
    children: [
      { path: 'dashboard', Component: Home },
      { path: 'projects', Component: Projects },
      { path: 'projects/:projectId', Component: ProjectDetail },
      { path: 'analytics', Component: Analytics },
      { path: 'state/:stateId', Component: StateDetail },
      { path: 'state/:stateId/lga/:lgaId', Component: LGADetail },
      { path: '*', Component: NotFound },
    ],
  },
]);

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors inline-block"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
