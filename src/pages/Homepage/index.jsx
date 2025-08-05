import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Semifooter from './components/Semifooter';

import { Link } from 'react-router-dom';

const Homepage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Set page title
    document.title = 'Merlin Morton';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Welcome to my personal portfolio - showcasing creative development, innovative projects, and musical passion.');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    { name: 'Frontend Development', icon: 'Code', color: 'from-blue-500 to-cyan-500' },
    { name: 'UI/UX Design', icon: 'Palette', color: 'from-purple-500 to-pink-500' },
    { name: 'Music Production', icon: 'Music', color: 'from-green-500 to-emerald-500' },
    { name: 'Creative Projects', icon: 'Lightbulb', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-accent/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-primary/30 shadow-mystical">
              <img 
                src="https://avatars.githubusercontent.com/u/217490010" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6 tracking-tight">
              Hi, I'm <span className="bg-mystical-gradient bg-clip-text text-transparent">Merlin</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-body mb-8 max-w-3xl mx-auto">
              Creative developer, designer, and music enthusiast crafting digital experiences 
              that blend innovation with artistic expression.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${skill.color} rounded-full text-white font-cta font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                >
                  <Icon name={skill.icon} size={20} />
                  <span>{skill.name}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/about">
                <button className="px-8 py-4 bg-mystical-gradient text-white rounded-lg font-cta font-bold hover:opacity-90 transition-opacity duration-300 flex items-center justify-center space-x-2 shadow-mystical">
                  <Icon name="User" size={20} />
                  <span>About Me</span>
                </button>
              </Link>
              <Link to="/projects">
                <button className="px-8 py-4 bg-card border border-border text-foreground rounded-lg font-cta font-medium hover:bg-muted/50 transition-colors duration-300 flex items-center justify-center space-x-2">
                  <Icon name="FolderOpen" size={20} />
                  <span>View Projects</span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-headline font-bold text-foreground mb-4">
              Explore My World
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover my journey, projects, and musical passion through these curated sections.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* About Me Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 hover:shadow-mystical transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Icon name="User" size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-headline font-bold text-foreground mb-4 text-center">About Me</h3>
              <p className="text-muted-foreground text-center mb-6">
                Learn about my background, journey, and the passions that drive my creative work.
              </p>
              <div className="text-center">
                <Link to="/about" className="text-primary font-cta font-medium group-hover:underline">
                  Discover My Story →
                </Link>
              </div>
            </motion.div>

            {/* Projects Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 hover:shadow-mystical transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Icon name="FolderOpen" size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-headline font-bold text-foreground mb-4 text-center">Projects</h3>
              <p className="text-muted-foreground text-center mb-6">
                Explore my portfolio of creative projects, from web applications to digital art.
              </p>
              <div className="text-center">
                <Link to="/projects" className="text-primary font-cta font-medium group-hover:underline">
                  View Portfolio →
                </Link>
              </div>
            </motion.div>

            {/* Music Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group bg-card/80 backdrop-blur-sm border border-border rounded-xl p-8 hover:shadow-mystical transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                <Icon name="Music" size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-headline font-bold text-foreground mb-4 text-center">Music</h3>
              <p className="text-muted-foreground text-center mb-6">
                Listen to my curated playlists and discover the music that inspires my creativity.
              </p>
              <div className="text-center">
                <Link to="/song-selector" className="text-primary font-cta font-medium group-hover:underline">
                  Explore Sounds →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Semifooter */}
      <Semifooter/>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Merlin Morton. All rights reserved.</p>
            <p className="text-sm mt-2">Crafted with passion and creativity.</p>
            <div className="flex justify-center space-x-6 mt-4">
              {[['Github', 'https://github.com/merlin-morton'], ['Linkedin', 'https://www.linkedin.com/in/williamhgates/'], ['Twitter', 'https://x.com/elonmusk'], ['Instagram', 'https://www.instagram.com/placeholdernyc']]
              .map(social => (
                <button key={social[0]} onClick={() => window.open(`${social[1]}`, "_blank")} className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  <Icon name={social[0]} size={20} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;