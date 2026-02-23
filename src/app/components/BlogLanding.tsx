import React from 'react';
import Link from 'next/link';

interface BlogLandingProps {
    title: string;
    slug: string;
    description: string;
    className?: string;
}

const BlogLanding: React.FC<BlogLandingProps> = ({ title, slug, description, className = '' }) => {
    return (
        <Link href={`/posts/${slug}`} className="block">
            <div className={`md:p-4 p-2 pl-4 pr-4 rounded-lg transition-transform duration-200 hover:scale-[1.02] border border-[#252525] hover:border-[#c02e7e]/30 backdrop-blur-sm bg-[#979797]/10 shadow-lg flex flex-col overflow-hidden ${className}`}>
                <h1 className="text-sm text-white decoration-[#CA0079] underline underline-offset-3 shrink-0">
                    {title}
                </h1>
                <p
                    className="text-xs sm:mt-2 mt-1 text-[#dddddd]"
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >{description}</p>
            </div>
        </Link>
    );
};

export default BlogLanding;
