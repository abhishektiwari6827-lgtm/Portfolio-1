"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { fetchProjects } from "../store/projectsSlice";
import {
  ExternalLink,
  AlertCircle,
  Eye,
  Code,
  Star,
  Calendar,
  GitBranch,
} from "lucide-react";
import {
  FaGithub,
  FaReact,
  FaJsSquare,
  FaCss3Alt,
  FaHtml5,
  FaBootstrap,
} from "react-icons/fa";
import { SiRedux, SiTailwindcss, SiDjango } from "react-icons/si";
import React from "react";

export default function Projects() {
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector((state) => state.projects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [demoError, setDemoError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);

  const enhancedProjects = [
    {
      id: 1,
      name: "Myntra Clone",
      description:
        "A fully responsive e-commerce fashion website clone with modern UI/UX, product catalog, shopping cart, and user authentication features.",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop&crop=center",
      demo: "https://Abhishek6827.github.io/Myntra/",
      github: "https://github.com/Abhishek6827/Myntra",
      tech: ["React", "Redux", "CSS", "JavaScript"],
      category: "E-commerce",
      featured: true,
      stars: 12,
      lastUpdated: "2025-01-15",
    },
    {
      id: 2,
      name: "Amazon Clone",
      description:
        "A comprehensive Amazon-inspired e-commerce platform with product listings, search functionality, and responsive design.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop&crop=center",
      demo: "https://Abhishek6827.github.io/Amazon-Clone/",
      github: "https://github.com/Abhishek6827/Amazon-Clone",
      tech: ["React", "JavaScript", "CSS", "HTML"],
      category: "E-commerce",
      featured: false,
      stars: 8,
      lastUpdated: "2025-01-10",
    },
    {
      id: 3,
      name: "Skill Up",
      description:
        "An educational platform for skill development with course listings, progress tracking, and interactive learning modules.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop&crop=center",
      demo: "https://Abhishek6827.github.io/Skill_Up/",
      github: "https://github.com/Abhishek6827/Skill_Up",
      tech: ["React", "Bootstrap", "JavaScript"],
      category: "Education",
      featured: true,
      stars: 10,
      lastUpdated: "2025-01-20",
    },

    {
      id: 4,
      name: "Bharat Clock",
      description:
        "A beautiful digital clock application showing Indian time zones with elegant design and smooth animations.",
      image:
        "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=500&h=300&fit=crop&crop=center",
      demo: "https://Abhishek6827.github.io/Bharat-Clock/",
      github: "https://github.com/Abhishek6827/Bharat-Clock",
      tech: ["JavaScript", "CSS", "HTML"],
      category: "Utility",
      featured: false,
      stars: 5,
      lastUpdated: "2023-12-20",
    },
    {
      id: 5,
      name: "Calculator",
      description:
        "A modern calculator application with scientific functions, memory operations, and responsive design.",
      image:
        "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&h=300&fit=crop&crop=center",
      demo: "https://Abhishek6827.github.io/Calculator/",
      github: "https://github.com/Abhishek6827/Calculator",
      tech: ["JavaScript", "CSS", "HTML"],
      category: "Utility",
      featured: false,
      stars: 3,
      lastUpdated: "2023-11-15",
    },
    {
      id: 6,
      name: "Elante Mall",
      description:
        "A shopping mall website with store directory, event listings, and interactive mall map functionality.",
      image:
        "https://images.unsplash.com/photo-1555529902-5261145633bf?w=500&h=300&fit=crop&crop=center",
      demo: "https://Abhishek6827.github.io/Elante_Mall/",
      github: "https://github.com/Abhishek6827/Elante_Mall",
      tech: ["React", "CSS", "JavaScript"],
      category: "Business",
      featured: false,
      stars: 7,
      lastUpdated: "2025-01-05",
    },
    {
      id: 7,
      name: "Kanban_WorkBoard",
      description:
        "A project management dashboard with task tracking, team collaboration features, and intuitive drag-and-drop interface.",
      image:
        "https://images.unsplash.com/photo-1611224923853-0139583c060f?w=500&h=300&fit=crop&crop=center",
      demo: "https://Abhishek6827.github.io/Kanban_WorkBoard/",
      github: "https://github.com/Abhishek6827/Kanban_WorkBoard",
      tech: ["Django", "React", "Redux", "Tailwind CSS"],
      category: "Productivity",
      featured: true,
      stars: 15,
      lastUpdated: "2025-08-30",
    },
    {
      id: 8,
      name: "Market Seasonality Calendar",
      description:
        "A calendar application highlighting seasonal market trends and patterns for traders and investors.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop&crop=center",
      demo: "https://abhishek6827.github.io/Market-Seasonality-Explorer/",
      github: "https://github.com/Abhishek6827/Market-Seasonality-Explorer",
      tech: ["React", "Tailwind CSS", "Recharts", "Binance API"],
      category: "Productivity",
      featured: true,
      stars: 15,
      lastUpdated: "2025-08-30",
    },
  ];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  const categories = [
    "all",
    "E-commerce",
    "Productivity",
    "Utility",
    "Business",
    "Education",
  ];

  const filteredProjects =
    filter === "all"
      ? enhancedProjects
      : enhancedProjects.filter((project) => project.category === filter);

  const featuredProjects = enhancedProjects.filter(
    (project) => project.featured
  );

  const handleDemoClick = (project) => {
    if (project.demo) {
      setSelectedProject(project);
      setDemoError(null);
    } else {
      setDemoError("Live demo is not available for this project.");
      setTimeout(() => setDemoError(null), 3000);
    }
  };

  const getTechIcon = (tech) => {
    const iconMap = {
      React: <FaReact className="text-blue-400" />,
      Redux: <SiRedux className="text-purple-400" />,
      JavaScript: <FaJsSquare className="text-yellow-400" />,
      CSS: <FaCss3Alt className="text-blue-500" />,
      HTML: <FaHtml5 className="text-orange-500" />,
      Bootstrap: <FaBootstrap className="text-purple-500" />,
      "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
      Django: <SiDjango className="text-green-600" />,
    };
    return iconMap[tech] || <Code className="text-gray-400" />;
  };

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
          />
          <span className="ml-3 text-lg">Loading projects...</span>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-red-500">
          <AlertCircle size={48} className="mx-auto mb-4" />
          <p className="text-lg">Error loading projects: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          My Projects
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore my portfolio of web applications, from e-commerce platforms to
          productivity tools, each built with modern technologies and best
          practices.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <h3 className="text-2xl font-semibold mb-8 text-center">
          Featured Projects
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              index={index}
              onDemoClick={() => handleDemoClick(project)}
              onHover={setHoveredProject}
              isHovered={hoveredProject === project.id}
              getTechIcon={getTechIcon}
            />
          ))}
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              filter === category
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onDemoClick={() => handleDemoClick(project)}
              onHover={setHoveredProject}
              isHovered={hoveredProject === project.id}
              getTechIcon={getTechIcon}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <DemoModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {demoError && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-red-500 text-white p-4 rounded-lg shadow-xl flex items-center max-w-sm z-50"
          >
            <AlertCircle className="mr-3 flex-shrink-0" size={20} />
            <span className="text-sm">{demoError}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const FeaturedProjectCard = React.forwardRef(
  ({ project, index, onDemoClick, onHover, isHovered, getTechIcon }, ref) => {
    return (
      <motion.div
        ref={ref}
        className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onHoverStart={() => onHover(project.id)}
        onHoverEnd={() => onHover(null)}
        whileHover={{ y: -8, scale: 1.02 }}
      >
        <div className="relative overflow-hidden">
          <img
            src={
              project.image ||
              "/placeholder.svg?height=192&width=400&query=project showcase"
            }
            alt={project.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute top-4 left-4">
            <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center">
              <Star size={12} className="mr-1" />
              Featured
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
            <div className="flex space-x-2">
              <motion.button
                onClick={onDemoClick}
                className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex-1 justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye size={16} />
                <span>Live Demo</span>
              </motion.button>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub size={16} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Star size={14} />
              <span>{project.stars}</span>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="flex items-center space-x-1 bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-medium"
              >
                {getTechIcon(tech)}
                <span>{tech}</span>
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                +{project.tech.length - 3} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center">
              <Calendar size={12} className="mr-1" />
              {new Date(project.lastUpdated).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <GitBranch size={12} className="mr-1" />
              {project.category}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }
);

const ProjectCard = React.forwardRef(
  ({ project, index, onDemoClick, onHover, isHovered, getTechIcon }, ref) => {
    return (
      <motion.div
        ref={ref}
        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onHoverStart={() => onHover(project.id)}
        onHoverEnd={() => onHover(null)}
        whileHover={{ y: -5 }}
      >
        <div className="relative overflow-hidden">
          <img
            src={
              project.image ||
              "/placeholder.svg?height=160&width=400&query=project showcase"
            }
            alt={project.name}
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center space-x-1 text-gray-400 text-sm">
              <Star size={12} />
              <span>{project.stars}</span>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-4 h-12 overflow-hidden">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-4">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="flex items-center space-x-1 bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-medium"
              >
                {getTechIcon(tech)}
                <span>{tech}</span>
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <motion.button
              onClick={onDemoClick}
              className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={16} />
              <span>View Demo</span>
            </motion.button>

            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={16} />
              <span>Code</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    );
  }
);

function DemoModal({ project, onClose }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  const handleIframeError = () => {
    setLoading(false);
    setError(
      "Failed to load the demo. The project might not be deployed or the URL might be incorrect."
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div>
            <h3 className="text-2xl font-semibold text-white">
              {project.name}
            </h3>
            <p className="text-gray-400 text-sm mt-1">Live Demo Preview</p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink size={16} />
              <span>Open in New Tab</span>
            </motion.a>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <ExternalLink size={24} className="rotate-45" />
            </button>
          </div>
        </div>

        <div className="relative" style={{ height: "70vh" }}>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
              />
              <span className="ml-3 text-white">Loading demo...</span>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <AlertCircle className="text-red-500 mb-4" size={48} />
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Open in New Tab
              </motion.a>
            </div>
          )}

          <iframe
            src={project.demo}
            title={`${project.name} Demo`}
            className={`w-full h-full border-0 ${
              loading || error ? "hidden" : ""
            }`}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
