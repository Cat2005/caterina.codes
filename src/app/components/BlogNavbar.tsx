import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';

interface BlogNavbarProps {
  activePage?: 'posts' | 'projects';
}

const BlogNavbar: React.FC<BlogNavbarProps> = ({ activePage = 'posts' }) => {
  return (
    <div className="flex text-white justify-center items-center w-full py-16 select-none">
      <div className="flex font-newsreader justify-center items-center p-2 w-4/5 md:w-2/5 xl:w-[35%] bg-[#150D12] rounded-xl">
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
          <Link
            href="/#projects"
            className={`cursor-pointer transition-colors duration-200 ${
              activePage === 'projects' ? 'text-[#CA0079]' : 'hover:text-[#CA0079]'
            }`}
          >
            projects
          </Link>
          <Link
            href="/posts"
            className={`cursor-pointer transition-colors duration-200 ${
              activePage === 'posts' ? 'text-[#CA0079]' : 'hover:text-[#CA0079]'
            }`}
          >
            posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogNavbar;
