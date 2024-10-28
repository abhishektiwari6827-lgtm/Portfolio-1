import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

// Import images
import reactImage from '../images/React.png';
import quizarioImage from '../images/Quizario.png';
import internshipImage from '../images/internship.png';

const certifications = [
  {
    id: 1,
    title: "React and Redux Certification",
    issuer: "Complete Coding",
    date: "09 October 2024",
    image: reactImage
  },
  {
    id: 2,
    title: "Quizario Project",
    issuer: "Specialisation in domain",
    date: "05 January 2024",
    image: quizarioImage
  },
  {
    id: 3,
    title: "Full Stack Development Internship",
    issuer: "Hoping Minds",
    date: "16 May 2024",
    image: internshipImage
  }
];

export default function Certifications() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-12 text-center">My Certifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certifications.map((cert, index) => (
          <CertificationCard key={cert.id} certification={cert} index={index} />
        ))}
      </div>
    </div>
  );
}

function CertificationCard({ certification, index }) {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative h-48">
        <img 
          src={certification.image} 
          alt={`${certification.title} Certificate`} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          <Award className="w-6 h-6 mr-2 text-yellow-500" />
          {certification.title}
        </h3>
        <p className="text-gray-400 mb-2">{certification.issuer}</p>
        <p className="text-sm text-gray-500">Completed on {certification.date}</p>
      </div>
    </motion.div>
  );
}