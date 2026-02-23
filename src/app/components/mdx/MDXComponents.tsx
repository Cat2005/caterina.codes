import React from 'react';
import { HiArrowUpRight } from 'react-icons/hi2';
import MDXImage from './MDXImage';
import MDXVideo from './MDXVideo';

const MDXComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="font-newsreader text-3xl text-[#CA0079] mt-8 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="font-newsreader text-2xl text-[#CA0079] mt-6 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="font-newsreader text-xl text-[#CA0079] mt-4 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="font-avantGardeMedium text-[#e1e1e1] text-sm leading-relaxed mb-4">
      {children}
    </p>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#c02e7e] inline-flex items-center gap-0.5 relative group"
    >
      <span className="border-b border-transparent group-hover:border-current transition-colors">
        {children}
      </span>
      <HiArrowUpRight className="text-xs" />
    </a>
  ),
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <MDXImage src={src || ''} alt={alt || ''} />
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-[#CA0079] pl-4 my-4 italic text-[#acacac]">
      {children}
    </blockquote>
  ),
  pre: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => (
    <pre
      className="bg-[#1a1a1a] border border-[#252525] rounded-lg p-4 overflow-x-auto my-4 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
    const isInline = !props['data-language'];
    if (isInline) {
      return (
        <code className="bg-[#1a1a1a] px-1.5 py-0.5 rounded text-[#e1e1e1] text-sm font-mono">
          {children}
        </code>
      );
    }
    return (
      <code className="font-mono text-sm" {...props}>
        {children}
      </code>
    );
  },
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-outside pl-5 font-avantGardeMedium text-[#e1e1e1] text-sm mb-4 space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-outside pl-5 font-avantGardeMedium text-[#e1e1e1] text-sm mb-4 space-y-1">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-[#e1e1e1]">{children}</li>
  ),
  hr: () => <hr className="border-[#252525] my-8" />,
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold text-white">{children}</strong>
  ),
  Pink: ({ children }: { children?: React.ReactNode }) => (
    <span className="font-bold text-[#CA0079]">{children}</span>
  ),
  SignOff: () => (
    <div className="text-center text-[#CA0079] font-bold font-avantGardeMedium mt-8">
      Cat &lt;3
    </div>
  ),
  MDXImage,
  MDXVideo,
};

export default MDXComponents;
