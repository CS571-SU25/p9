import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Set page title
    document.title = 'About Me - Merlin Morton';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about my journey as a creative developer, my passions, skills, and the experiences that shape my work.');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovators Inc.",
      period: "2022 - Present",
      description: "Leading frontend development projects with React, creating user-centric applications.",
      icon: "Code"
    },
    {
      title: "UI/UX Designer",
      company: "Creative Studio",
      period: "2020 - 2022",
      description: "Designed intuitive interfaces and user experiences for web and mobile applications.",
      icon: "Palette"
    },
    {
      title: "Freelance Developer",
      company: "Independent",
      period: "2018 - 2020",
      description: "Built custom websites and applications for various clients across different industries.",
      icon: "Freelance"
    }
  ];

  const skills = [
    { category: "Frontend", items: ["React", "JavaScript", "TypeScript", "Next.js", "Tailwind CSS"], color: "from-blue-500 to-cyan-500" },
    { category: "Design", items: ["Figma", "Adobe Creative Suite", "UI/UX Design", "Prototyping", "Motion Graphics"], color: "from-purple-500 to-pink-500" },
    { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "API Development"], color: "from-green-500 to-emerald-500" },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Vercel", "VS Code"], color: "from-orange-500 to-red-500" }
  ];

  const interests = [
    { name: "Music Production", icon: "Music", description: "Creating electronic and ambient music in my home studio" },
    { name: "Photography", icon: "Camera", description: "Capturing moments and exploring creative composition" },
    { name: "Gaming", icon: "Gamepad2", description: "Enjoying strategy games and indie titles" },
    { name: "Travel", icon: "Plane", description: "Exploring new cultures and finding inspiration worldwide" },
    { name: "Reading", icon: "BookOpen", description: "Science fiction, philosophy, and design books" },
    { name: "Cooking", icon: "ChefHat", description: "Experimenting with international cuisines" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10"></div>
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&h=1080&fit=crop')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="w-40 h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-primary/30 shadow-mystical">
                <img 
                  src="https://avatars.githubusercontent.com/u/217490010" 
                  alt="About me" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-headline font-bold mb-6 tracking-tight">
                About <span className="bg-mystical-gradient bg-clip-text text-transparent">Me</span>
              </h1>
              
              <p className="text-xl text-muted-foreground font-body mb-8 max-w-3xl mx-auto leading-relaxed">
                I'm a passionate creative developer who bridges the gap between beautiful design and 
                functional technology. My journey combines technical expertise with artistic vision 
                to create meaningful digital experiences.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                {['Creative Problem Solver', 'Tech Enthusiast', 'Music Lover', 'Lifelong Learner'].map((trait, index) => (
                  <motion.div
                    key={trait}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg"
                  >
                    <Icon name={index === 0 ? 'Lightbulb' : index === 1 ? 'Zap' : index === 2 ? 'Music' : 'GraduationCap'} size={16} className="text-primary" />
                    <span className="text-sm font-cta font-medium text-foreground">{trait}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-headline font-bold text-foreground mb-8 text-center">
              My Story
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  My journey into technology began during college when I discovered the perfect 
                  intersection of creativity and logic in web development. What started as curiosity 
                  about how websites work evolved into a deep passion for crafting digital experiences 
                  that people love to use.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Over the years, I've had the privilege of working with diverse teams and clients, 
                  from startups to established companies. Each project has taught me something new 
                  and reinforced my belief that great technology should be both powerful and accessible.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you'll find me producing music, exploring new places, or 
                  diving into a good book. These experiences outside of tech constantly inspire my 
                  work and help me approach problems with fresh perspectives.
                </p>
              </div>
              
              <div className="relative">
                <div className="w-full h-80 rounded-xl overflow-hidden shadow-mystical">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                    alt="Working" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-headline font-bold text-foreground mb-4">
              Professional Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key experiences that have shaped my career and expertise.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-0.5"></div>
              
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform md:-translate-x-2 z-10"></div>
                  
                  {/* Content Card */}
                  <div className={`ml-20 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg hover:shadow-mystical transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon name={exp.icon} size={20} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-headline font-bold text-foreground text-lg mb-1">{exp.title}</h3>
                          <p className="text-primary font-cta font-medium mb-2">{exp.company}</p>
                          <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                          <p className="text-muted-foreground text-sm">{exp.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
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
              Skills & Expertise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {skills.map((skillSet, index) => (
              <motion.div
                key={skillSet.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-card/80 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${skillSet.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon name="Code" size={20} className="text-white" />
                </div>
                <h3 className="font-headline font-bold text-foreground text-lg mb-4">{skillSet.category}</h3>
                <div className="space-y-2">
                  {skillSet.items.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests & Hobbies */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-headline font-bold text-foreground mb-4">
              Beyond the Code
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passions and interests that fuel my creativity and keep me inspired.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6 hover:bg-card/80 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={interest.icon} size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-headline font-bold text-foreground mb-2">{interest.name}</h3>
                    <p className="text-muted-foreground text-sm">{interest.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Philosophy */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-headline font-bold text-foreground mb-8">
              My Philosophy
            </h2>
            
            <blockquote className="text-xl md:text-2xl text-muted-foreground font-body italic mb-8 leading-relaxed">
              "I believe design is an act of attunement - a quiet choreography of function and feeling, where form follows empathy and elegance emerges from restraint. 
              I am captivated by the dance between clarity and complexity, the beauty of things that simply make sense.
              I find solace in not knowing, in the invitation to keep learning, to stretch toward meaning without the need to possess it. I am at ease with the present, yet always enchanted by the horizon."
            </blockquote>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects"><Button className="px-8 py-4 bg-mystical-gradient text-white rounded-lg font-cta font-bold hover:opacity-90 transition-opacity duration-300 flex items-center justify-center space-x-2 shadow-mystical">
                <Icon name="FolderOpen" size={20} />
                <span>View My Work</span>
              </Button></Link>
              <Button className="px-8 py-4 bg-card border border-border text-foreground rounded-lg font-cta font-medium hover:bg-muted/50 transition-colors duration-300 flex items-center justify-center space-x-2"
                onClick={() => window.location.href = "mailto:morton5@wisc.edu?subject=Let's Connect!"}
                >
                <Icon name="Mail" size={20} />
                <span>Let's Connect</span>
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
            <p className="text-sm mt-2">Thanks for taking the time to learn about me!</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;