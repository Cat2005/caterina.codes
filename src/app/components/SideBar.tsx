import React from 'react';
import Image from 'next/image';
import PinkAsterisk from '@/app/svgs/pink-asterisk.svg';

interface SideBarProps {
    currentSection: string | null;
    sectionClicked: (section: string) => void;
}

const SideBar: React.FC<SideBarProps> = ({ currentSection, sectionClicked }) => {
    const isProjects = currentSection === 'projects';
    const isExperience = currentSection === 'experience';
    const isTeaching = currentSection === 'teaching';

    return (
        <div className="sticky top-20 flex justify-center w-full z-50">
            <div className="w-7/8 flex text-lg" style={{ fontFamily: 'Newsreader' }}>
                <div className="w-2/8 h-20 flex flex-col">
                <div className="mr-20 text-right flex flex-col gap-2  items-end">
                    <div className={`flex flew-row gap-2`}>
                        {isProjects && <Image src={PinkAsterisk} alt="Pink Asterisk" width={20} height={20} />}
                        <div className={`${isProjects ? 'text-[white]' : 'text-[#B6B6B6]'} cursor-pointer hover:text-[#CA0079] transition-colors duration-200`}
                        onClick={() => sectionClicked('projects')}

                        >Projects</div>
                    </div>
                    <div className={`flex flew-row gap-2`}>
                        {isExperience && <Image src={PinkAsterisk} alt="Pink Asterisk" width={20} height={20} />}
                        <div className={`${isExperience ? 'text-[white]' : 'text-[#B6B6B6]'} cursor-pointer hover:text-[#CA0079] transition-colors duration-200`}
                        onClick={() => sectionClicked('experience')}
                        >Experience</div>
                    </div>
                    <div className={`flex flew-row gap-2`}>
                        {isTeaching && <Image src={PinkAsterisk} alt="Pink Asterisk" width={20} height={20} />}
                        <div className={`${isTeaching ? 'text-[white]' : 'text-[#B6B6B6]'} cursor-pointer hover:text-[#CA0079] transition-colors duration-200`}
                        onClick={() => sectionClicked('teaching')}
                        >Teaching</div>
                    </div>
                </div>
                </div>
                <div className="w-5/8 h-20"></div>
            </div>
        </div>
    );
};

export default SideBar;