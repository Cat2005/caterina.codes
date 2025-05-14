"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AuroraBackground from "./components/AuroraBackground";
import Landing from "./landing";
import Projects from "./Projects";
import SideBar from "./components/SideBar";
import Experience from "./Experience";
import ArrowPopUp from "./components/ArrowPopUp";
import Teaching from "./components/Teaching";
import { HiArrowUpRight } from "react-icons/hi2";

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [projectsScrollProgress, setProjectsScrollProgress] = useState(0);
  const [experienceScrollProgress, setExperienceScrollProgress] = useState(0);
  const projectsRef = useRef<HTMLDivElement>(null);
  const landingRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const teachingRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  
  // Function to handle section clicks in sidebar
  const sectionClicked = (section: string) => {
    if (section === 'projects' && projectsRef.current) {
      // Scroll to projects section
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'experience' && experienceRef.current) {
      // Scroll to experience section
      experienceRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'landing' && landingRef.current) {
      // Scroll to landing section
      landingRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'teaching' && teachingRef.current) {
      // Scroll to teaching section
      teachingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navClicked = () => {
     projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Simplified intersection observer to handle sidebar visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Track which sections are currently intersecting
        const intersectingEntries = entries.filter(entry => entry.isIntersecting);
        
        // Determine current section based on which one has more visibility
        if (intersectingEntries.length > 0) {
          // Find the entry with the highest intersection ratio
          const mostVisibleEntry = intersectingEntries.reduce((prev, current) => 
            (current.intersectionRatio > prev.intersectionRatio) ? current : prev
          );
          
          if (mostVisibleEntry.target.id === 'projects-section' && scrollProgress > 0.9) {
            setCurrentSection('projects');
          } else if (mostVisibleEntry.target.id === 'experience-section') {
            setCurrentSection('experience');
          } else if (mostVisibleEntry.target.id === 'teaching-section') {
            setCurrentSection('teaching');
          }
        }
        
        // Show sidebar if we're past the landing section (scrollProgress > 0.9)
        // This ensures the sidebar stays visible when scrolling between Projects and Experience
        const isVisible = scrollProgress > 0.9 || intersectingEntries.some(entry => 
          entry.target.id === 'experience-section' && entry.isIntersecting
        );
        
        // Debug log
        console.log('Sidebar visibility:', isVisible, 'Current section:', currentSection, 'scrollProgress:', scrollProgress);
        setShowSidebar(isVisible);
      },
      {
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],  // Multiple thresholds for better ratio detection
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
    if (teachingRef.current) {
      observer.observe(teachingRef.current);
    }
    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
      if (experienceRef.current) {
        observer.unobserve(experienceRef.current);
      }
      if (teachingRef.current) {
        observer.unobserve(teachingRef.current);
      }
    };
  }, [projectsScrollProgress, experienceScrollProgress, scrollProgress]);

  // Improved scroll handler with debouncing
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Start transition after scrolling past 80% of landing section height
      const transitionStart = windowHeight * 0.6;
      const transitionEnd = windowHeight * 0.85;
      
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

  // Add new scroll handler for Experience to Teaching transition
  useEffect(() => {
    const handleExperienceScroll = () => {
      if (!experienceRef.current) return;
      
      const experienceElement = experienceRef.current as HTMLElement;
      const experienceRect = experienceElement.getBoundingClientRect();
      const experienceHeight = experienceRect.height;
      
      // Start fading when we're 80% through the Experience section
      const transitionStart = experienceHeight * 0.4;
      const transitionEnd = experienceHeight * 0.75;
      const scrollPosition = Math.abs(experienceRect.top);
      
      let newProgress = 0;
      if (scrollPosition < transitionStart) {
        newProgress = 0;
      } else if (scrollPosition > transitionEnd) {
        newProgress = 1;
      } else {
        newProgress = (scrollPosition - transitionStart) / (transitionEnd - transitionStart);
      }
      
      // Debug log
      console.log('Experience scroll progress:', newProgress, 'scroll position:', scrollPosition);
      setExperienceScrollProgress(newProgress);
    };

    // Add debouncing
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleExperienceScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    handleExperienceScroll(); // Initialize on mount
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  return (
    <div className="relative">
      <AuroraBackground />
      
      {/* <ArrowPopUp text="Scroll down" /> */}
      
      {/* Fixed Sidebar */}
      {showSidebar && <SideBar currentSection={currentSection} sectionClicked={sectionClicked} />}
      
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
        
        <Landing navClicked={navClicked} />
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
          pointerEvents: scrollProgress > 0 ? 'auto' : 'none'
        }}
      >
        <Projects />
      </div>

      {/* Experience section with fade in/out effect */}
      <div 
        ref={experienceRef}
        id="experience-section" 
        className="w-full min-h-screen transition-opacity duration-500 ease-in-out"
        style={{ 
          opacity: projectsScrollProgress * (1 - experienceScrollProgress),
          position: 'relative',
          zIndex: 30,
          marginTop: '-20vh',
          pointerEvents: projectsScrollProgress > 0 ? 'auto' : 'none'
        }}
      >
        <Experience />
      </div>

      {/* Teaching section with fade in effect */}
      <div
        ref={teachingRef}
        id="teaching-section"
        className="w-full min-h-screen transition-opacity duration-500 ease-in-out"
        style={{ 
          opacity: experienceScrollProgress,
          position: 'relative',
          zIndex: 40,
          pointerEvents: experienceScrollProgress > 0 ? 'auto' : 'none'
        }}>
        <Teaching />
      </div>

      <div className="flex justify-center items-center w-full mt-6 flex-col mb-20">
        <div className="w-[35%] max-xl:w-[35%] xl:w-[35%] mx-auto flex flex-col gap-6 text-[#e1e1e1]">
        <div className="font-newsreader  text-center text-md" style={{fontFamily: 'Avant-Garde-Medium'}}>
          that's it! if you want to know more, you can 
          <a href="mailto:caterina.mammola20@gmail.com"  
             target="_blank" 
             rel="noopener noreferrer"
             className={`mr-1 text-[#c02e7e] transition-colors relative group`}>
            <span className="inline-flex items-center transition-transform duration-200 hover:scale-[1.02]">
            check out some of my posts!
              <HiArrowUpRight className="inline mb-0.5 text-xs ml-0.5" />
            </span>
            <span className="absolute left-0 right-0 bottom-0 border-b border-transparent group-hover:border-current"></span>
          </a> 
          
        </div>
        <div className="font-newsreader text-center text-md" style={{fontFamily: 'Avant-Garde-Medium'}}>
        if you have any questions, please don&apos;t hesitate to <a href="mailto:caterina.mammola20@gmail.com"  
             target="_blank" 
             rel="noopener noreferrer"
             className={`mr-1 text-[#c02e7e] transition-colors relative group`}>
            <span className="inline-flex items-center transition-transform duration-200 hover:scale-[1.02]">
              contact me on email
              <HiArrowUpRight className="inline mb-0.5 text-xs ml-0.5" />
            </span>
            <span className="absolute left-0 right-0 bottom-0 border-b border-transparent group-hover:border-current"></span>
          </a> 
    or <a href="https://www.linkedin.com/in/caterina-m/"  
             target="_blank" 
             rel="noopener noreferrer"
             className={`mr-1 text-[#c02e7e] transition-colors relative group`}>
            <span className="inline-flex items-center transition-transform duration-200 hover:scale-[1.02]">
              LinkedIn
              <HiArrowUpRight className="inline mb-0.5 text-xs ml-0.5" />
            </span>
            <span className="absolute left-0 right-0 bottom-0 border-b border-transparent group-hover:border-current"></span>
          </a> 
          
        </div>

        <div className=" text-center text-[#c02e7e]" style={{fontFamily: 'Avant-Garde-Medium'}}>
        Cat &lt;3
          
        </div>
        </div> 
      </div>
    </div>


  
  );
}
