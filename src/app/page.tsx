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
  const [scrollProgress, setScrollProgress] = useState(0.1);
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
      let yOffset;
      if (window.innerWidth > 500) {
        yOffset = 7; // Adjust this value as needed (negative values scroll less)
      } else {
        yOffset = 55; // Adjust this value as needed (negative values scroll less)
      }
      const y = projectsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    } else if (section === 'experience' && experienceRef.current) {
      // Scroll to experience section
      let yOffset;
      if (window.innerWidth > 500) {
        yOffset = -2; // Adjust this value as needed (negative values scroll less)
      } else {
        yOffset = -25; // Adjust this value as needed (negative values scroll less)
      }
      const y = experienceRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    } else if (section === 'landing' && landingRef.current) {
      // Scroll to landing section
      landingRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'teaching' && teachingRef.current) {
      // Scroll to teaching section with an offset to prevent scrolling too far
      let yOffset;
      if (window.innerWidth > 500) { 
        yOffset = -90; // Adjust this value as needed (negative values scroll less)
      } else {
        yOffset = -100; // Adjust this value as needed (negative values scroll less)
      }
      const y = teachingRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  const navClicked = () => {
    if (projectsRef.current) {
      let yOffset;
      if (window.innerWidth > 500) {
        yOffset = 80; // Adjust this value as needed
      } else {
        yOffset = -10; // Adjust this value as needed
      }
      const y = projectsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
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
          
          if (mostVisibleEntry.target.id === 'projects-section' && scrollProgress > 0.95) {
            setCurrentSection('projects');
          } else if (mostVisibleEntry.target.id === 'experience-section') {
            setCurrentSection('experience');
          } else if (mostVisibleEntry.target.id === 'teaching-section') {
            setCurrentSection('teaching');
          }
        }
        
        // Show sidebar if we're past the landing section (scrollProgress > 0.9)
        // This ensures the sidebar stays visible when scrolling between Projects and Experience
        const isVisible = scrollProgress > 0.45 || intersectingEntries.some(entry => 
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

  // Replace the three separate useEffect scroll handlers with one combined handler
  useEffect(() => {
    const handleScroll = () => {
      // Landing to Projects transition
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const transitionStart = windowHeight * 0.6;
      const transitionEnd = windowHeight * 0.85;
      
      let newScrollProgress = scrollProgress;
      if (scrollY < transitionStart) {
        newScrollProgress = 0.1;
      } else if (scrollY > transitionEnd) {
        newScrollProgress = 1;
      } else {
        newScrollProgress = (scrollY - transitionStart) / (transitionEnd - transitionStart);
      }
      
      // Only update state if value changed significantly
      if (Math.abs(newScrollProgress - scrollProgress) > 0.01) {
        setScrollProgress(newScrollProgress);
      }
      
      // Projects section handling
      if (projectsRef.current) {
        const projectsElement = projectsRef.current as HTMLElement;
        const projectsRect = projectsElement.getBoundingClientRect();
        const projectsHeight = projectsRect.height;
        const projectsTransitionStart = projectsHeight * 0.5;
        const projectsTransitionEnd = projectsHeight * 0.9;
        const projectsScrollPosition = Math.abs(projectsRect.top);
        
        let newProjectsProgress = projectsScrollProgress;
        if (projectsScrollPosition < projectsTransitionStart) {
          newProjectsProgress = 0.1;
        } else if (projectsScrollPosition > projectsTransitionEnd) {
          newProjectsProgress = 1;
        } else {
          newProjectsProgress = (projectsScrollPosition - projectsTransitionStart) / 
                               (projectsTransitionEnd - projectsTransitionStart);
        }
        
        // Only update state if value changed significantly
        if (Math.abs(newProjectsProgress - projectsScrollProgress) > 0.01) {
          setProjectsScrollProgress(newProjectsProgress);
        }
      }
      
      // Experience section handling
      if (experienceRef.current) {
        const experienceElement = experienceRef.current as HTMLElement;
        const experienceRect = experienceElement.getBoundingClientRect();
        const experienceHeight = experienceRect.height;
        const experienceTransitionStart = experienceHeight * 0.4;
        const experienceTransitionEnd = experienceHeight * 0.75;
        const experienceScrollPosition = Math.abs(experienceRect.top);
        
        let newExperienceProgress = experienceScrollProgress;
        if (experienceScrollPosition < experienceTransitionStart) {
          newExperienceProgress = 0;
        } else if (experienceScrollPosition > experienceTransitionEnd) {
          newExperienceProgress = 1;
        } else {
          newExperienceProgress = (experienceScrollPosition - experienceTransitionStart) / 
                                   (experienceTransitionEnd - experienceTransitionStart);
        }
        
        // Only update state if value changed significantly
        if (Math.abs(newExperienceProgress - experienceScrollProgress) > 0.01) {
          setExperienceScrollProgress(newExperienceProgress);
        }
      }
    };

    // Add debouncing with requestAnimationFrame
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
  }, [scrollProgress, projectsScrollProgress, experienceScrollProgress]);

  return (
    <div className="relative">
      <AuroraBackground />
      
      {/* <ArrowPopUp text="Scroll down" /> */}
      
      {/* Fixed Sidebar */}
      <SideBar
        currentSection={currentSection}
        sectionClicked={sectionClicked}
        isVisible={showSidebar}
      />
      
      {/* Landing section - normal scroll behavior */}

      <div 
        ref={landingRef}
        id="landing-section" 
        className="min-h-screen transition-opacity duration-500 ease-in-out"
        style={{ 
          opacity: 0.1 + 0.9 * (1 - scrollProgress),
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
          // Force lower opacity when landing is visible
          opacity: landingRef.current && landingRef.current.getBoundingClientRect().bottom > 0 ?
                   0.1 + 0.9 * scrollProgress : // When landing is visible, use scroll-based opacity
                   currentSection === 'projects' ? 
                   1 : // Fully visible when it's the current section
                   (experienceRef.current && experienceRef.current.getBoundingClientRect().top < window.innerHeight) ?
                   0.1 + 0.9 * (1 - projectsScrollProgress) : // Scrolling back up from Experience
                   0.1 + 0.9 * scrollProgress * (1 - projectsScrollProgress), // Normal scrolling down
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
          opacity: currentSection === 'experience' ?
                   1 : // Fully visible when it's the current section
                   0.1 + 0.9 * projectsScrollProgress * (1 - experienceScrollProgress),
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
          opacity: currentSection === 'teaching' ?
                   1 : // Fully visible when it's the current section
                   0.1 + 0.9 * experienceScrollProgress,
          position: 'relative',
          zIndex: 40,
          pointerEvents: experienceScrollProgress > 0 ? 'auto' : 'none'
        }}>
        <Teaching />
      </div>

      <div className="flex justify-center items-center w-full md:mt-18 mt-16 flex-col mb-20">
        <div className="w-[85%] sm:w-[50%] md:w-[35%]  xl:w-[35%] mx-auto flex flex-col gap-6 text-[#e1e1e1]">
        <div className="font-newsreader  text-center text-sm sm:text-base" style={{fontFamily: 'Avant-Garde-Medium'}}>
          that&apos;s it! if you want to know more, you can{` `}
          <a href="https://caterina.codes/posts"  
             target="_blank" 
             rel="noopener noreferrer"
             className={`mr-1 text-[#c02e7e] transition-colors relative group`}>
            <span className="inline-flex items-center transition-transform duration-200 hover:scale-[1.02]">
            check out some of my posts!
              <HiArrowUpRight className="inline mb-0.5 ml-0.5" />
            </span>
            <span className="absolute left-0 right-0 bottom-0 border-b border-transparent group-hover:border-current"></span>
          </a> 
          
        </div>
        <div className="font-newsreader text-center text-sm sm:text-base" style={{fontFamily: 'Avant-Garde-Medium'}}>
        if you have any questions, please don&apos;t hesitate to <a href="mailto:caterina.mammola20@gmail.com"  
             target="_blank" 
             rel="noopener noreferrer"
             className={`mr-1 text-[#c02e7e] transition-colors relative group`}>
            <span className="inline-flex items-center transition-transform duration-200 hover:scale-[1.02]">
              contact me on email
              <HiArrowUpRight className="inline mb-0.5 ml-0.5" />
            </span>
            <span className="absolute left-0 right-0 bottom-0 border-b border-transparent group-hover:border-current"></span>
          </a> 
    or <a href="https://www.linkedin.com/in/caterina-m/"  
             target="_blank" 
             rel="noopener noreferrer"
             className={`mr-1 text-[#c02e7e] transition-colors relative group`}>
            <span className="inline-flex items-center transition-transform duration-200 hover:scale-[1.02]">
              LinkedIn
              <HiArrowUpRight className="inline mb-0.5 ml-0.5" />
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
