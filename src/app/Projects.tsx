'use client'

import React, { useState, useEffect } from 'react';
import ProjectSlide from './components/ProjectSlide';
import { motion, AnimatePresence } from 'framer-motion';

const Projects: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    
    const projects = [
        {
            title: "CompSoc Website",
            description: "Co-developed + designed with <a href='https://www.tomasmaillo.com' rel='noopener noreferrer' target='_blank' className='text-[#c02e7e]'> Tomas Maillo</a>.",
            link: "https://comp-soc.com",
            image: "/posts/compsoc-img.png",
            tech: ["React", "Typescript", "Next.js", "Tailwind"]
        },
        {
            title: "Nail Polish Finder",
            description: "Took off quickly after I posted about it on Reddit on Instagram where it got 6M+ views. The website gets roughly 30k unique visitors a month nowadays. I received a lot of valuable feedback which I used to improve it, and learnt a lot about marketing+SEO!",
            link: "https://nailpolishfinder.com",
            image: "/posts/nailpolish-cut.mov",
            tech: ["React", "Typescript", "Next.js", "Tailwind", "Python", "Selenium"]
        },
        {
            title: "XAI model for Brain Tumor MRI Diagnosis",
            description: "For my dissertation, I worked on a model for brain tumor diagnosis designed to be clinically interpretable. Specifically, it builds on prior work with <a href='https://github.com/yewsiang/ConceptBottleneck' rel='noopener noreferrer' target='_blank' className='text-[#c02e7e]'> concept bottleneck models</a> to integrate clinical concepts into the pipeline, which were defined in collaboration with clinicians.",
            link: "https://github.com/Cat2005/xai-brain-diagnosis",
            image: "/posts/diss-cbm.png",
            tech: ["Python", "TensorFlow"]
        },
        {
            title: "FlatMouse",
            description: "Website for Edinburgh students to leave reviews on flats they've lived in. Users can add detailed 'issue' tags, like mice or mould, to help future tenants make informed decisions.",
            link: "https://flatmouse.co.uk",
            image: "/posts/flatmouse.mov",
            tech: ["React", "Node.js", "MongoDB",  "AWS", ]
        },
        {
            title: "Ray tracer in C++",
            description: "Made for my <a href='https://ksubr.github.io/CGR2024/#Tutorials' rel='noopener noreferrer' target='_blank' className='text-[#c02e7e]'> Computer Graphics: Rendering </a> course! While I don't usually highlight university coursework, this one was particularly significant as it was both technically challenging and my first time using C++. The ray tracer includes advanced features such as textures, an acceleration hierarchy, BRDFs and volumetrics. I achieved 94% for this work.",
            link: "https://github.com/Cat2005/raytracer",
            image: "/posts/raytracer-imgs.png",
            tech: ["C++ (no libraries allowed)"]
        }

    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const newIndex = Math.floor((scrollPosition + (windowHeight * 0.3)) / windowHeight) - 1;
            
            // Clamp the index to valid range
            const clampedIndex = Math.min(Math.max(0, newIndex), projects.length - 1);
            
            // Calculate progress within current section
            const sectionScrollPosition = scrollPosition - (clampedIndex + 1) * windowHeight;
            const progress = sectionScrollPosition / windowHeight;
            
            // Only update if we're within valid bounds
            if (clampedIndex >= 0 && clampedIndex < projects.length) {
                setScrollProgress(Math.max(0, Math.min(1, progress)));
                setActiveIndex(clampedIndex);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeIndex, projects.length]);

    return (
        <div className="flex flex-col w-full">
            <div className="h-screen relative">
                <div className="fixed top-[20vh] w-[45%] left-1/2 -translate-x-1/2">
                    {/* Progress bar */}
                    {/* <div className="absolute -right-12 top-0 h-full w-1">
                        <div className="h-full w-full bg-gray-200/20 rounded-full">
                            <motion.div 
                                className="w-full bg-[#CA0079] rounded-full origin-top"
                                style={{ 
                                    scaleY: scrollProgress,
                                    height: '100%',
                                    transformOrigin: 'top'
                                }}
                                transition={{ type: "spring", stiffness: 100 }}
                            />
                        </div> */}
                        {/* Project count indicator */}
                        {/* <div className="absolute -right-8 top-0 text-sm font-newsreader text-[#CA0079]">
                            {activeIndex + 1}/{projects.length}
                        </div>
                    </div> */}

                    <h1 className="text-5xl  max-lg:w-full lg:w-4/5 text-[#CA0079] ml-3 font-newsreader mb-10">
                        what have i been building?
                    </h1>
                    
                    {/* Wrap slides in a container */}
                    <div className="relative max-lg:w-full ">
                        {/* Current Slide */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10"
                            >
                                <ProjectSlide {...projects[activeIndex]} />
                            </motion.div>
                        </AnimatePresence>

                        {/* Next Slide (if available) */}
                        {activeIndex < projects.length - 1 && (
                            <motion.div
                                className="absolute top-full mt-4"
                                style={{
                                    opacity: scrollProgress * 0.8,
                                    filter: `blur(${1}px)`,
                                    transform: `translateY(${scrollProgress * 20}px)`
                                }}
                            >
                                <ProjectSlide {...projects[activeIndex + 1]} />
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
            {projects.map((_, index) => (
                <div key={index} className="h-screen" />
            ))}
        </div>
    );
};

export default Projects;