import React from 'react';

interface BlogLandingProps {
    title: string;
    className?: string;
}

const BlogLanding: React.FC<BlogLandingProps> = ({ title, className = '' }) => {
    return (
        <div className={`md:p-4 p-2 pl-4 pr-4 rounded-lg transition-transform duration-200 hover:scale-[1.02] border border-[#252525] hover:border-[#c02e7e]/30 backdrop-blur-sm bg-[#979797]/10 shadow-lg flex flex-col ${className}`}>
            <h1 className="text-sm text-white decoration-[#CA0079] underline underline-offset-3">
                {title}
            </h1>
            <p className="text-xs sm:mt-2 mt-1 blur-xs text-[#dddddd]">Blah blah blah blah blah blah blah soon!</p>
        </div>
    );
};

export default BlogLanding;