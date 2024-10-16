import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProjects } from '../store/projectsSlice';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Projects() {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [demoError, setDemoError] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="text-center py-20">Loading projects...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  const handleDemoClick = (project) => {
    if (project.homepage) {
      setSelectedProject(project);
      setDemoError(null);
    } else {
      setDemoError("Live demo is not available for this project.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold mb-12 text-center">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
            onDemoClick={() => handleDemoClick(project)}
          />
        ))}
      </div>
      <AnimatePresence>
        {selectedProject && (
          <DemoModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
      {demoError && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-md shadow-lg flex items-center"
        >
          <AlertCircle className="mr-2" />
          {demoError}
        </motion.div>
      )}
    </div>
  );
}

function ProjectCard({ project, index, onDemoClick }) {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
        <p className="text-gray-400 mb-4 h-20 overflow-hidden">{project.description}</p>
        <div className="flex justify-between items-center">
          <a 
            href={project.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
          >
            <FaGithub size={20} className="mr-2" />
            View on GitHub
          </a>
          <button 
            onClick={onDemoClick}
            className={`
              text-green-400 hover:text-green-300 transition-colors flex items-center
              ${!project.homepage ? 'opacity-50 cursor-not-allowed hover:text-green-400' : ''}
            `}
            disabled={!project.homepage}
          >
            <ExternalLink size={20} className="mr-2" />
            Live Demo
          </button>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-900">
        <div className="flex flex-wrap gap-2">
          {project.topics && project.topics.map((topic) => (
            <span key={topic} className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function DemoModal({ project, onClose }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    setError("Failed to load the demo. The project might not be deployed or the URL might be incorrect.");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-gray-800 rounded-lg w-full max-w-4xl"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h3 className="text-xl font-semibold">{project.name} - Live Demo</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <ExternalLink size={24} />
          </button>
        </div>
        <div className="p-4">
          {loading && <div className="text-center py-20">Loading demo...</div>}
          {error && (
            <div className="text-center py-20 text-red-500">
              <AlertCircle className="mx-auto mb-4" size={48} />
              {error}
            </div>
          )}
          <iframe
            src={project.homepage}
            title={`${project.name} Demo`}
            className={`w-full h-[60vh] border-0 rounded ${loading ? 'hidden' : ''}`}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  );
}