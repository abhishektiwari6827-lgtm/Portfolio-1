import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProjects } from '../store/projectsSlice';
import { Github, ShoppingBag, Building, GraduationCap, LayoutDashboard, ShoppingCart, Clock, Calculator, Code } from 'lucide-react';

export default function Projects() {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);

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

  const orderedProjects = [
    'Myntra',
    'Elante_Mall',
    'Skill_Up',
    'WorkBoard',
    'E-commerce',
    ...projects.filter(project => 
      !['Myntra', 'Elante_Mall', 'Skill_Up', 'WorkBoard', 'E-commerce'].includes(project.name)
    ).map(project => project.name)
  ];

  const sortedProjects = orderedProjects
    .map(name => projects.find(project => project.name === name))
    .filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold mb-12 text-center">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProjects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const getProjectIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'myntra':
      case 'e-commerce':
        return <ShoppingBag className="w-6 h-6 mr-2" />;
      case 'elante_mall':
        return <Building className="w-6 h-6 mr-2" />;
      case 'skill_up':
        return <GraduationCap className="w-6 h-6 mr-2" />;
      case 'workboard':
        return <LayoutDashboard className="w-6 h-6 mr-2" />;
      case 'amazon':
        return <ShoppingCart className="w-6 h-6 mr-2" />;
      case 'bharat-clock':
        return <Clock className="w-6 h-6 mr-2" />;
      case 'calculator':
        return <Calculator className="w-6 h-6 mr-2" />;
      default:
        return <Code className="w-6 h-6 mr-2" />;
    }
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          {getProjectIcon(project.name)}
          {project.name}
        </h3>
        <div className="text-gray-400 mb-4">
          <p>{project.description || 'No description available.'}</p>
        </div>
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies && project.technologies.length > 0 ? (
              project.technologies.map((tech, index) => (
                <span key={index} className="bg-gray-700 text-gray-300 text-xs font-semibold px-2.5 py-0.5 rounded">
                  {tech}
                </span>
              ))
            ) : (
              <span className="text-gray-400">Not specified</span>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <a 
            href={project.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
          >
            <Github size={20} className="mr-2" />
            View on GitHub
          </a>
        </div>
      </div>
      {project.topics && project.topics.length > 0 && (
        <div className="px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {project.topics.map((topic) => (
              <span key={topic} className="bg-blue-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}