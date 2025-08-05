import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import { motion } from 'framer-motion';

const Semifooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);


  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-br from-muted/5 to-background">
      <div className="max-w-7xl mx-auto">

        {/* Notes */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { title: "New Portfolio Launch", description: "Redesigned my personal website with modern aesthetics", icon: "Globe", colorText: "text-primary" },
              { title: "Creative Project", description: "Launched an innovative web application", icon: "Rocket", colorText: "text-secondary" },
              { title: "Music Discovery", description: "Curated a new playlist of inspiring tracks", icon: "Headphones", colorText: "text-accent" }
            ].map((highlight, index) => (
                <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card/60 backdrop-blur-sm rounded-lg p-6 hover:bg-card/80 transition-all duration-300 text-center group"
                >
                    <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors duration-300">
                        <Icon name={highlight.icon} size={32} className={highlight.colorText} />
                    </div>
                        <h4 className="text-xl font-headline font-bold text-foreground mb-2">
                            {highlight.title}
                        </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        {highlight.description}
                    </p>
                </motion.div>
            ))}
        </div>

        {/* Contact */}
        <div className={`text-center transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-mystical-gradient/10 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-headline font-bold text-foreground mb-4">
              Let's Create Something Amazing
            </h3>
            <p className="text-muted-foreground mb-6">
              Ready to collaborate on your next project or just want to chat about creative ideas?
            </p>
            <Button
            variant="default"
            size="lg"
            className="bg-mystical-gradient hover:opacity-90 text-white font-cta font-bold shadow-mystical hover:shadow-glow transition-all duration-300"
            iconName="Mail"
            iconPosition="left"
            iconSize={20}
            onClick={() => window.location.href = "mailto:morton5@wisc.edu?subject=Let's Collaborate!"}
            >
            Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Semifooter;