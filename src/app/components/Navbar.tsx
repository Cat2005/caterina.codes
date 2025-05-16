import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { FaEnvelope } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

interface NavbarProps {
    navClicked: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ navClicked }) => {
    return (
        <div className="flex justify-center items-center w-full py-16">
            <div className="flex font-newsreader justify-center items-center p-2 w-3/4 md:w-2/5 xl:w-[35%] bg-[#150D12] rounded-xl">
                <div className="flex md:gap-8 md:justify-between md:space-x-8 justify-center items-center space-x-6">
                    <div className="flex flex-row gap-2 md:gap-3 items-center">
                    <a href="https://www.linkedin.com/in/caterina-m/" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="cursor-pointer hover:text-[#CA0079] transition-colors duration-200" />
                    </a>
                    <a href="mailto:caterina.mammola20@gmail.com" target="_blank" rel="noopener noreferrer">
                        <FaEnvelope className="cursor-pointer hover:text-[#CA0079] transition-colors duration-200" />
                    </a>
                    <a href="https://github.com/Cat2005" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="cursor-pointer hover:text-[#CA0079] transition-colors duration-200" />
                    </a>
                    </div>
                    <div className="cursor-pointer hover:text-[#CA0079] transition-colors duration-200">posts</div>
                    <div className="cursor-pointer hover:text-[#CA0079] transition-colors duration-200" onClick={() => navClicked()}>projects</div>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar;