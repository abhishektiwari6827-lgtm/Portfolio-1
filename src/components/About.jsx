"use client";
import { motion } from "framer-motion";
import { User, Code, Coffee, Lightbulb } from "lucide-react";

export default function About() {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Full-Stack Development",
      description: "Experienced in both frontend and backend technologies",
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Problem Solving",
      description: "Passionate about creating innovative solutions",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Continuous Learning",
      description: "Always exploring new technologies and best practices",
    },
  ];

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center flex justify-center items-center">
        <User className="mr-2" /> About Me
      </h2>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          <p className="text-lg leading-relaxed mb-6">
            👋 Hi there! I'm{" "}
            <span className="text-blue-400 font-semibold">Abhishek Tiwari</span>
            , a passionate full-stack developer from Lucknow, India. With a
            strong foundation in modern web technologies, I love crafting
            digital experiences that make a difference.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            🚀 My journey in software development has been driven by curiosity
            and a desire to solve real-world problems. From building responsive
            e-commerce platforms to creating interactive web applications, I
            enjoy every aspect of the development process.
          </p>
          <p className="text-lg leading-relaxed">
            💡 When I'm not coding, you'll find me exploring new technologies,
            contributing to open-source projects, or sharing knowledge with the
            developer community. I believe in writing clean, maintainable code
            and creating user-centric applications.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-start space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <div className="text-blue-400 mt-1">{highlight.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-400">{highlight.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">
            Let's Build Something Amazing Together!
          </h3>
          <p className="text-lg mb-6">
            I'm always excited to work on new projects and collaborate with
            fellow developers. Whether it's a startup idea or an enterprise
            solution, let's turn your vision into reality.
          </p>
          <div className="flex justify-center space-x-4">
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
              🎯 Goal-Oriented
            </span>
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
              🤝 Team Player
            </span>
            <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
              📈 Growth Mindset
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
