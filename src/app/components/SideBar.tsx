import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import PinkAsteriskSVG from '@/app/components/PinkAsteriskSVG';

interface SideBarProps {
    currentSection: string | null;
    sectionClicked: (section: string) => void;
    isVisible: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ currentSection, sectionClicked, isVisible }) => {
    // Start with null to indicate we don't know yet
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 500); // Adjust breakpoint as needed
        };
        
        // Check on initial load
        checkIfMobile();
        
        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);
        
        // Clean up event listener
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const isProjects = currentSection === 'projects';
    const isExperience = currentSection === 'experience';
    const isTeaching = currentSection === 'teaching';

    // Don't render anything until we know the device type
    if (isMobile === null) {
        return null;
    }

    return (
       <>
        {/* Desktop sidebar - only in DOM when needed */}
        {!isMobile && (
            <div
                className="fixed top-20 left-0 flex justify-center w-full z-50 transition-opacity duration-300"
                style={{
                    opacity:  isVisible ? 1 : 0,
                    visibility: isVisible ? 'visible' : 'hidden',
                    pointerEvents: isVisible ? 'auto' : 'none',
                }}
            >
                <div className="w-7/8 flex text-lg" style={{ fontFamily: 'Newsreader' }}>
                    <div className="w-2/8 h-20 flex flex-col">
                    <div className="mr-20 text-right flex flex-col gap-2 items-end">
                        <div className={`flex flex-row gap-2 items-center`}>
                            {isProjects && <div className="mb-1"> <PinkAsteriskSVG/> </div>}
                            <div className={`${isProjects ? 'text-[white]' : 'text-[#B6B6B6]'} cursor-pointer hover:text-[#CA0079] transition-colors duration-200`}
                            onClick={() => sectionClicked('projects')}
                            >Projects</div>
                        </div>
                        <div className={`flex flex-row gap-2 items-center`}>
                            {isExperience && <div className="mb-1"> <PinkAsteriskSVG/> </div>}
                            <div className={`${isExperience ? 'text-[white]' : 'text-[#B6B6B6]'} cursor-pointer hover:text-[#CA0079] transition-colors duration-200`}
                            onClick={() => sectionClicked('experience')}
                            >Experience</div>
                        </div>
                        <div className={`flex flex-row gap-2 items-center`}>
                            {isTeaching && <div className="mb-1"> <PinkAsteriskSVG/> </div>}
                            <div className={`${isTeaching ? 'text-[white]' : 'text-[#B6B6B6]'} cursor-pointer hover:text-[#CA0079] transition-colors duration-200`}
                            onClick={() => sectionClicked('teaching')}
                            >Teaching</div>
                        </div>
                    </div>
                    </div>
                    <div className="w-5/8 h-20"></div>
                </div>
            </div>
        )}

        {/* Mobile sidebar - only in DOM when needed */}
        {isMobile && (
            <div
                className="fixed top-0 left-0 pt-5 pb-2 flex justify-center w-full z-50 backdrop-blur-lg bg-[#000000]/10 border-b border-[#252525] transition-opacity duration-300"
                style={{
                    opacity:  isVisible ? 1 : 0,
                    visibility: isVisible ? 'visible' : 'hidden',
                    pointerEvents: isVisible ? 'auto' : 'none',
                }}
            >
                <div className="w-full flex text-lg justify-center" style={{ fontFamily: 'Newsreader' }}>
                    <div className="w-[80%] flex flex-row justify-between">
                    <div className={`flex flex-row items-center gap-2`}>
                        {isProjects && <div className="mb-1"> <PinkAsteriskSVG/> </div>}
                        <div className={`${isProjects ? 'text-[white]' : 'text-[#B6B6B6]'} cursor-pointer hover:text-[#CA0079] transition-colors duration-200`}
                        onClick={() => sectionClicked('projects')}
                        >Projects</div>
                    </div>
                    <div className={`flex flex-row items-center gap-2`}>
                        {isExperience && <div className="mb-1"> <PinkAsteriskSVG/> </div>}
                        <div className={`${isExperience ? 'text-[white]' : 'text-[#B6B6B6]'} cursor-pointer hover:text-[#CA0079] transition-colors duration-200`}
                        onClick={() => sectionClicked('experience')}
                        >Experience</div>
                    </div>
                    <div className={`flex flex-row items-center gap-2`}>
                        {isTeaching && <div className="mb-1"> <PinkAsteriskSVG/> </div>}
                        <div className={`${isTeaching ? 'text-[white]' : 'text-[#B6B6B6]'} cursor-pointer hover:text-[#CA0079] transition-colors duration-200`}
                        onClick={() => sectionClicked('teaching')}
                        >Teaching</div>
                    </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default SideBar;