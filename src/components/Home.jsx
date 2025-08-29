"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mail, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import SkillsComponent from "./Skills";
import ExperienceComponent from "./Experience";

export default function Home() {
  return (
    <div className="space-y-20">
      <Hero />
      <SkillsComponent />
      <ExperienceComponent />
    </div>
  );
}

function Hero() {
  const featuredProjects = [
    {
      name: "Myntra Clone",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop&crop=center",
      demo: "https://Abhishek6827.github.io/Myntra-Clone/",
      github: "https://github.com/Abhishek6827/Myntra-Clone",
      tech: ["React", "Redux", "CSS"],
      description: "Fashion e-commerce platform with modern UI",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Amazon Clone",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop&crop=center",
      demo: "https://Abhishek6827.github.io/Amazon-Clone/",
      github: "https://github.com/Abhishek6827/Amazon-Clone",
      tech: ["React", "JavaScript", "CSS"],
      description: "E-commerce platform with advanced features",
      color: "from-orange-500 to-amber-500",
    },
    {
      name: "WorkBoard",
      image:
        "https://images.unsplash.com/photo-1611224923853-0139583c060f?w=500&h=300&fit=crop&crop=center",
      demo: "https://Abhishek6827.github.io/WorkBoard/",
      github: "https://github.com/Abhishek6827/WorkBoard",
      tech: ["React", "Redux", "Tailwind"],
      description: "Project management dashboard with collaboration tools",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Bharat Clock",
      image:
        "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&h=300&fit=crop&crop=center",
      demo: "https://Abhishek6827.github.io/Bharat-Clock/",
      github: "https://github.com/Abhishek6827/Bharat-Clock",
      tech: ["JavaScript", "CSS", "HTML"],
      description: "Beautiful digital clock with Indian time zones",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Calculator",
      image:
        "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=500&h=300&fit=crop&crop=center",
      demo: "https://Abhishek6827.github.io/Calculator/",
      github: "https://github.com/Abhishek6827/Calculator",
      tech: ["JavaScript", "CSS", "HTML"],
      description: "Modern calculator with scientific functions",
      color: "from-purple-500 to-violet-500",
    },
  ];

  const [currentProject, setCurrentProject] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [direction, setDirection] = useState(1);

  const INTERVAL_TIME = 6000; // 6 seconds

  // Enhanced auto-switching with progress indicator
  useEffect(() => {
    if (!isAutoPlaying) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentProject((current) => {
            const next = (current + 1) % featuredProjects.length;
            setDirection(1);
            return next;
          });
          return 0;
        }
        return prev + 100 / (INTERVAL_TIME / 100);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isAutoPlaying, featuredProjects.length]);

  // Enhanced project selection with direction tracking
  const handleProjectSelect = useCallback(
    (index) => {
      setDirection(index > currentProject ? 1 : -1);
      setCurrentProject(index);
      setProgress(0);
      setIsAutoPlaying(false);
      setImageLoaded(false);
      // Resume auto-play after 15 seconds of manual selection
      setTimeout(() => setIsAutoPlaying(true), 15000);
    },
    [currentProject]
  );

  // Navigation functions for previous/next
  const goToPrevious = useCallback(() => {
    const prevIndex =
      currentProject === 0 ? featuredProjects.length - 1 : currentProject - 1;
    handleProjectSelect(prevIndex);
  }, [currentProject, featuredProjects.length, handleProjectSelect]);

  const goToNext = useCallback(() => {
    const nextIndex = (currentProject + 1) % featuredProjects.length;
    handleProjectSelect(nextIndex);
  }, [currentProject, featuredProjects.length, handleProjectSelect]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === " ") {
        e.preventDefault();
        setIsAutoPlaying(!isAutoPlaying);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goToPrevious, goToNext, isAutoPlaying]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen opacity-30 blur-3xl"
          initial={{ scale: 0 }}
          animate={{
            scale: [1, 1.3, 1.1],
            x: [-20, 20, -10],
            y: [-10, 10, -5],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen opacity-20 blur-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: [1.2, 0.8, 1], x: [10, -15, 5], y: [5, -10, 0] }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-400 rounded-full mix-blend-screen opacity-25 blur-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: [0.8, 1.2, 0.9], x: [-5, 15, -8], y: [8, -12, 3] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl lg:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 text-transparent bg-clip-text">
                Abhishek Tiwari
              </h1>
              <div className="text-xl lg:text-2xl text-gray-300 mb-6 h-16">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Full-Stack Developer | React Enthusiast | Problem Solver
                </motion.p>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-lg text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Crafting digital experiences with modern web technologies.
                Passionate about creating scalable solutions that make a
                difference.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center lg:justify-start space-x-6"
            >
              <motion.a
                href="https://github.com/Abhishek6827"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub
                  size={24}
                  className="text-white group-hover:text-blue-400 transition-colors"
                />
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  GitHub
                </span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/abhishek-tiwariiii"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin
                  size={24}
                  className="text-white group-hover:text-blue-400 transition-colors"
                />
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  LinkedIn
                </span>
              </motion.a>
              <motion.a
                href="mailto:abhishektiwari6827@gmail.com"
                className="group relative p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail
                  size={24}
                  className="text-white group-hover:text-blue-400 transition-colors"
                />
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Email
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 relative overflow-hidden">
              {/* Enhanced header with progress bar */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  Featured Projects
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    {featuredProjects.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleProjectSelect(index)}
                        className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentProject
                            ? "bg-blue-400 w-6"
                            : "bg-gray-600 hover:bg-gray-500"
                        }`}
                      >
                        {index === currentProject && isAutoPlaying && (
                          <div
                            className="absolute inset-0 bg-blue-300 rounded-full transition-all duration-100"
                            style={{ width: `${progress}%` }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      isAutoPlaying
                        ? "bg-blue-500 text-white"
                        : "bg-gray-600 text-gray-300"
                    }`}
                  >
                    {isAutoPlaying ? "⏸" : "▶"}
                  </button>
                </div>
              </div>

              {/* Enhanced project carousel with navigation */}
              <div className="relative group">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentProject}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                    }}
                    className="relative"
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={
                          featuredProjects[currentProject].image ||
                          "/placeholder.svg?height=192&width=400&query=project showcase" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                        alt={featuredProjects[currentProject].name}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(false)}
                      />

                      {/* Loading state */}
                      {!imageLoaded && (
                        <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Navigation arrows */}
                      <button
                        onClick={goToPrevious}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <ChevronRight size={16} />
                      </button>

                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <motion.a
                            href={featuredProjects[currentProject].demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full text-sm transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Eye size={14} />
                            <span>Live Demo</span>
                          </motion.a>
                          <motion.a
                            href={featuredProjects[currentProject].github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-sm transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaGithub size={14} />
                            <span>Code</span>
                          </motion.a>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {featuredProjects[currentProject].name}
                      </h4>
                      <p className="text-gray-400 text-sm mb-3">
                        {featuredProjects[currentProject].description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {featuredProjects[currentProject].tech.map((tech) => (
                          <span
                            key={tech}
                            className={`bg-gradient-to-r ${featuredProjects[currentProject].color} bg-opacity-20 text-white px-2 py-1 rounded text-xs font-medium`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Keyboard navigation hint */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Use ← → keys to navigate • Space to pause/play
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
