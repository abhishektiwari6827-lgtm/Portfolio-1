import React from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Briefcase, Star } from 'lucide-react';
import { FaReact, FaBootstrap, FaJava, FaHtml5, FaCss3Alt, FaGitAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiRedux, SiDjango, SiJavascript, SiTailwindcss, SiPostgresql } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';

export default function Home() {
  return (
    <div className="space-y-20">
      <Hero />
      <About />
      <Skills />
      <Experience />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative text-center py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/2 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen opacity-30 blur-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.3, 1.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-screen opacity-20 blur-3xl"
          initial={{ scale: 0 }}
          animate={{ scale: [1.2, 0.8, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Abhishek Tiwari
        </h1>
        <p className="text-2xl text-gray-300 mb-8">
          Software Engineer | React | Redux | Bootstrap | Django | JavaScript
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://github.com/devilizbusy" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaGithub size={32} />
          </a>
          <a href="https://www.linkedin.com/in/abhishek-tiwariiii" target="_blank" rel="noopener noreferrer" className="text-white">
            <FaLinkedin size={32} />
          </a>
          <a href="mailto:abhishektiwari6827@gmail.com" className="text-white">
            <Mail size={32} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center flex justify-center items-center">
        <User className="mr-2" /> About Me
      </h2>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <p className="text-lg leading-relaxed">
          As a postgraduate student with a strong foundation in programming, I bring a high level of responsibility and organization to all my endeavors. My academic background, combined with practical experience in various programming projects, has honed my skills and reinforced my commitment to excellence. I am dedicated to continuous learning and consistently strive to contribute effectively to team efforts and innovative solutions.
        </p>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    { name: 'React', icon: <FaReact size={24} /> },
    { name: 'Redux', icon: <SiRedux size={24} /> },
    { name: 'Bootstrap', icon: <FaBootstrap size={24} /> },
    { name: 'Django', icon: <SiDjango size={24} /> },
    { name: 'JavaScript', icon: <SiJavascript size={24} /> },
    { name: 'Java', icon: <FaJava size={24} /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={24} /> },
    { name: 'HTML/CSS', icon: <div className="flex"><FaHtml5 size={24} /><FaCss3Alt size={24} className="ml-1" /></div> },
    { name: 'PostgreSQL', icon: <SiPostgresql size={24} /> },
    { name: 'Git', icon: <FaGitAlt size={24} /> },
    { name: 'RESTful APIs', icon: <TbApi size={24} /> },
  ];

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center flex justify-center items-center">
        <Star className="mr-2" /> Skills
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="bg-gray-800 p-4 rounded-lg shadow-lg flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {skill.icon}
            <span>{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const experiences = [
    {
      title: 'Web Developer',
      company: 'Quizario',
      period: '11/2023 - 01/2024',
      responsibilities: [
        'Assigned, coordinated, and reviewed work of programming personnel.',
        'Consulted with managerial and technical personnel to clarify program intent and suggest changes.',
      ],
    },
    {
      title: 'FSD Developer Intern',
      company: 'Hoping Minds',
      period: '01/2024 - 06/2024',
      responsibilities: [
        'Increased program accuracy by correcting errors and rechecking outputs.',
        'Wrote, analyzed, and rewrote programs using workflow charts and diagrams.',
      ],
    },
  ];

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center flex justify-center items-center">
        <Briefcase className="mr-2" /> Experience
      </h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.title}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-2">{exp.title} - {exp.company}</h3>
            <p className="text-gray-400 mb-4">{exp.period}</p>
            <ul className="list-disc list-inside space-y-2">
              {exp.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}