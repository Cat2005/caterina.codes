import React from 'react';
import Link from 'next/link';
import { HiArrowUpRight } from 'react-icons/hi2';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ slug, title, description, date }) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/posts/${slug}`} className="block w-full">
      <div className="border border-[#252525]/50 bg-[#979797]/7 backdrop-blur-sm rounded-lg p-4 transition-all duration-200 hover:scale-[1.02] hover:border-[#c02e7e]/30">
        <div className="flex items-center gap-1">
          <h3 className="font-newsreader text-[#ffffff] text-xl">
            {title}
          </h3>
          <HiArrowUpRight className="text-[#CA0079] text-sm" />
        </div>
        <p className="font-newsreader text-sm pt-2 text-[#acacac]">
          {description}
        </p>
        <p className="font-avantGardeMedium text-xs pt-2 text-[#777777]">
          {formattedDate}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;
