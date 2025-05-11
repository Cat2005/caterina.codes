"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AuroraBackground from "./components/AuroraBackground";
import Landing from "./landing";
import Projects from "./Projects";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import Experience from "./Experience";
import ArrowPopUp from "./components/ArrowPopUp";

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [projectsScrollProgress, setProjectsScrollProgress] = useState(0);
  const projectsRef = useRef(null);
  const landingRef = useRef(null);
  const experienceRef = useRef(null);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  
  // Simplified intersection observer to handle sidebar visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Show sidebar if either Projects or Experience section is visible
        const isVisible = entries.some(entry => {
          const isIntersecting = entry.isIntersecting;
          // If it's the projects section, also check if it's not fully faded out
          if (entry.target.id === 'projects-section') {
            setCurrentSection('projects');
            return isIntersecting && (1 - projectsScrollProgress) > 0;
          }
          if (entry.target.id === 'experience-section') {
            setCurrentSection('experience');
          }
          return isIntersecting;
        });
        
        // Debug log
        console.log('Sidebar visibility:', isVisible);
        setShowSidebar(isVisible);
      },
      {
        threshold: 0.1,
        rootMargin: '-20% 0px'
      }
    );
    
    // Observe both Projects and Experience sections
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }
    
    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
      if (experienceRef.current) {
        observer.unobserve(experienceRef.current);
      }
    };
  }, [projectsScrollProgress]);

  // Improved scroll handler with debouncing
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Start transition after scrolling past 80% of landing section height
      const transitionStart = windowHeight * 0.8;
      const transitionEnd = windowHeight * 0.9;
      
      if (scrollY < transitionStart) {
        setScrollProgress(0);
      } else if (scrollY > transitionEnd) {
        setScrollProgress(1);
      } else {
        setScrollProgress((scrollY - transitionStart) / (transitionEnd - transitionStart));
      }
    };

    // Add debouncing to reduce performance impact
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    handleScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  // Add new scroll handler for Projects to Experience transition
  useEffect(() => {
    const handleProjectsScroll = () => {
      if (!projectsRef.current) return;
      
      const projectsElement = projectsRef.current as HTMLElement;
      const projectsRect = projectsElement.getBoundingClientRect();
      const projectsHeight = projectsRect.height;
      
      // Start fading when we're 80% through the Projects section
      const transitionStart = projectsHeight * 0.8;
      const transitionEnd = projectsHeight * 0.9;
      const scrollPosition = Math.abs(projectsRect.top);
      
      let newProgress = 0;
      if (scrollPosition < transitionStart) {
        newProgress = 0;
      } else if (scrollPosition > transitionEnd) {
        newProgress = 1;
      } else {
        newProgress = (scrollPosition - transitionStart) / (transitionEnd - transitionStart);
      }
      
      // Debug log
      console.log('Projects scroll progress:', newProgress, 'scroll position:', scrollPosition);
      setProjectsScrollProgress(newProgress);
    };

    // Add debouncing
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleProjectsScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    handleProjectsScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  return (
    <div className="relative">
      <AuroraBackground />
      <Navbar />
      {/* <ArrowPopUp text="Scroll down" /> */}
      
      {/* Fixed Sidebar */}
      {showSidebar && <SideBar currentSection={currentSection} />}
      
      {/* Landing section - normal scroll behavior */}
      <div 
        ref={landingRef}
        id="landing-section" 
        className="min-h-screen transition-opacity duration-500 ease-in-out"
        style={{ 
          opacity: 1 - scrollProgress,
          position: 'relative',
          zIndex: 10
        }}
      >
        <Landing />
      </div>
     
      {/* Projects section with fade in/out effect */}
      <div 
        ref={projectsRef}
        id="projects-section"  // Add ID for debugging
        className="w-full min-h-screen transition-opacity duration-500 ease-in-out"
        style={{ 
          opacity: scrollProgress * (1 - projectsScrollProgress),
          position: 'relative',
          zIndex: 20,
          marginTop: '-20vh',
          pointerEvents: projectsScrollProgress > 0 ? 'auto' : 'none'
        }}
      >
        <Projects />
      </div>

      {/* Experience section with fade in effect */}
      <div 
        ref={experienceRef}
        id="experience-section" 
        className="w-full min-h-screen transition-opacity duration-500 ease-in-out"
        style={{ 
          opacity: projectsScrollProgress,
          position: 'relative',
          zIndex: 30,
          marginTop: '-20vh',
          pointerEvents: projectsScrollProgress > 0 ? 'auto' : 'none'
        }}
      >
        <Experience />
      </div>
    </div>
  );
}
