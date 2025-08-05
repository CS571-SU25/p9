import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProjectsPage = () => {
  const [filters, setFilters] = useState({
    category: [],
    technology: [],
    search: ''
  });
  
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'Projects - Merlin Morton | Creative Portfolio';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore my portfolio of creative projects including web applications, design work, and innovative digital experiences.');
    }
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A modern, responsive e-commerce platform built with React and Node.js, featuring real-time inventory management and seamless checkout experience.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      category: "Web Application",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      status: "Completed",
      date: "2024",
      featured: true,
      links: {
        live: "#",
        github: "#",
        case_study: "#"
      }
    },
    {
      id: 2,
      title: "Music Visualizer",
      description: "An interactive music visualizer that creates stunning visual representations of audio in real-time using Web Audio API and Canvas.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      category: "Creative",
      technologies: ["JavaScript", "Web Audio API", "Canvas", "Three.js"],
      status: "Completed",
      date: "2024",
      featured: true,
      links: {
        live: "#",
        github: "#"
      }
    },
    {
      id: 3,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      category: "Web Application",
      technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
      status: "Completed",
      date: "2023",
      featured: false,
      links: {
        live: "#",
        github: "#"
      }
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing creative work with smooth animations and modern design principles.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      category: "Design",
      technologies: ["React", "Framer Motion", "Tailwind CSS"],
      status: "Completed",
      date: "2023",
      featured: false,
      links: {
        live: "#",
        github: "#"
      }
    },
    {
      id: 5,
      title: "AI Chat Interface",
      description: "An intelligent chat interface with natural language processing capabilities and contextual conversation memory.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      category: "AI/ML",
      technologies: ["React", "Python", "OpenAI API", "FastAPI"],
      status: "In Progress",
      date: "2024",
      featured: true,
      links: {
        github: "#"
      }
    },
    {
      id: 6,
      title: "Mobile Weather App",
      description: "A beautiful weather application with location-based forecasts, animated weather icons, and offline capability.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      category: "Mobile",
      technologies: ["React Native", "Weather API", "SQLite"],
      status: "Completed",
      date: "2023",
      featured: false,
      links: {
        github: "#"
      }
    }
  ];

  const categories = ["All", "Web Application", "Creative", "Design", "AI/ML", "Mobile"];
  const technologies = ["React", "JavaScript", "TypeScript", "Node.js", "Python", "Three.js"];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filters.category.length === 0 || filters.category.includes(project.category) || filters.category.includes("All");
    const matchesTechnology = filters.technology.length === 0 || filters.technology.some(tech => project.technologies.includes(tech));
    const matchesSearch = filters.search === '' || project.title.toLowerCase().includes(filters.search.toLowerCase()) || project.description.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesCategory && matchesTechnology && matchesSearch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date) - new Date(a.date);
      case 'title':
        return a.title.localeCompare(b.title);
      case 'category':
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const ProjectCard = ({ project, featured = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`group bg-card/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:shadow-mystical transition-all duration-300 hover:scale-105 ${featured ? 'md:col-span-2' : ''}`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${featured ? 'h-64' : 'h-48'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 right-4 flex space-x-2">
          {project.status === 'In Progress' && (
            <span className="px-2 py-1 bg-orange-500/90 text-white text-xs font-medium rounded-full">
              In Progress
            </span>
          )}
          {project.featured && (
            <span className="px-2 py-1 bg-primary/90 text-white text-xs font-medium rounded-full">
              Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-2">
            {project.links.live && (
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300">
                <Icon name="ExternalLink" size={16} className="text-white" />
              </button>
            )}
            {project.links.github && (
              <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300">
                <Icon name="Github" size={16} className="text-white" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-headline font-bold text-foreground mb-2">{project.title}</h3>
            <p className="text-sm text-primary font-cta font-medium">{project.category}</p>
          </div>
          <span className="text-sm text-muted-foreground">{project.date}</span>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map(tech => (
            <span 
              key={tech}
              className="px-2 py-1 bg-muted/50 text-foreground text-xs font-medium rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex space-x-3">
            {project.links.live && (
              <button className="text-primary hover:text-primary/80 transition-colors duration-300 flex items-center space-x-1">
                <Icon name="ExternalLink" size={16} />
                <span className="text-sm font-cta font-medium">Live Demo</span>
              </button>
            )}
            {project.links.github && (
              <button className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center space-x-1">
                <Icon name="Github" size={16} />
                <span className="text-sm font-cta font-medium">Code</span>
              </button>
            )}
          </div>
          {project.links.case_study && (
            <button className="text-secondary hover:text-secondary/80 transition-colors duration-300 flex items-center space-x-1">
              <Icon name="FileText" size={16} />
              <span className="text-sm font-cta font-medium">Case Study</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 w-56 h-56 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-headline font-bold text-foreground mb-6 tracking-tight">
                My <span className="bg-mystical-gradient bg-clip-text text-transparent">Projects</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-body mb-8 max-w-3xl mx-auto">
                A showcase of creative projects that demonstrate my passion for building 
                meaningful digital experiences through code and design.
              </p>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {/* Search */}
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  />
                </div>

                {/* View Mode */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground font-cta font-medium">View:</span>
                  <div className="flex bg-muted/30 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors duration-300 ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Icon name="Grid3x3" size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors duration-300 ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <Icon name="List" size={16} />
                    </button>
                  </div>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                >
                  <option value="recent">Most Recent</option>
                  <option value="title">Title A-Z</option>
                  <option value="category">Category</option>
                </select>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-muted-foreground font-cta font-medium">Categories:</span>
                {categories.map(category => (
                  <Button
                    key={category}
                    onClick={() => {
                      const newCategories = filters.category.includes(category) 
                        ? filters.category.filter(c => c !== category)
                        : [...filters.category.filter(c => c !== "All"), category];
                      handleFilterChange('category', newCategories);
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-cta font-medium transition-all duration-300 ${
                      filters.category.includes(category) || (category === "All" && filters.category.length === 0)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Technology Filters */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground font-cta font-medium">Technologies:</span>
                {technologies.map(tech => (
                  <Button
                    key={tech}
                    onClick={() => {
                      const newTech = filters.technology.includes(tech) 
                        ? filters.technology.filter(t => t !== tech)
                        : [...filters.technology, tech];
                      handleFilterChange('technology', newTech);
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-cta font-medium transition-all duration-300 ${
                      filters.technology.includes(tech)
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {sortedProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  featured={project.featured && viewMode === 'grid'}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-20"
            >
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-headline font-bold text-foreground mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-headline font-bold text-foreground mb-4">
              Like What You See?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I'm always excited to work on new projects and collaborate with creative people. 
              Let's build something amazing together!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 bg-mystical-gradient text-white rounded-lg font-cta font-bold hover:opacity-90 transition-opacity duration-300 flex items-center justify-center space-x-2 shadow-mystical"
                onClick={() => window.location.href = "mailto:morton5@wisc.edu?subject=Let's Start a Project!"}>
                <Icon name="Mail" size={20} />
                <span>Start a Project</span>
              </Button>
              <Button className="px-8 py-4 bg-card border border-border text-foreground rounded-lg font-cta font-medium hover:bg-muted/50 transition-colors duration-300 flex items-center justify-center space-x-2"
                onClick={() => alert("This would download my resume, but I don't want to publish it on this site.")}>
                <Icon name="Download" size={20} />
                <span>Download Resume</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Merlin Morton. All rights reserved.</p>
            <p className="text-sm mt-2">Built with passion and creativity.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectsPage;