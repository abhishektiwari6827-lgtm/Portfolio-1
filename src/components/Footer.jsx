import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Abhishek Tiwari. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://github.com/devilizbusy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/abhishek-tiwariiii" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              <FaLinkedin size={24} />
            </a>
            <a href="mailto:abhishektiwari6827@gmail.com" className="hover:text-blue-400 transition-colors">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}