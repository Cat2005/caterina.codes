'use client'

import React from 'react';
import ProjectSlide from './components/ProjectSlide';
import { HiArrowUpRight } from 'react-icons/hi2';

const Projects: React.FC = () => {
    const projects = [
        
        {
            title: "Nail Polish Finder",
            description: "Took off quickly after I posted about it on Reddit on Instagram where it got 6M+ views. The website gets roughly 30k unique visitors a month nowadays. I received a lot of valuable feedback which I used to improve it, and learnt a lot about marketing+SEO!",
            link: "https://nailpolishfinder.com",
            image: "/posts/nailpolish-cut.mov",
            tech: ["React", "Typescript", "Next.js", "Python"]
        },
        {
            title: "CompSoc Website",
            description: "Co-developed + designed with <a href='https://www.tomasmaillo.com' rel='noopener noreferrer' target='_blank' className='text-[#c02e7e]'> Tomas Maillo</a>. We integrated features like pulling events directly from Google Calendar to ensure the event schedule stays up-to-date and displaying the live number of members on Discord. The website gets over 7000 unique visitors per month.",
            link: "https://comp-soc.com",
            image: "/posts/compsoc-img.png",
            tech: ["React", "Typescript", "Next.js", "Tailwind"]
        },
        {
            title: "XAI model for Brain Tumor MRI Diagnosis",
            description: "For my dissertation, I worked on a model for brain tumor diagnosis designed to be clinically interpretable. Specifically, it builds on prior work with <a href='https://github.com/yewsiang/ConceptBottleneck' rel='noopener noreferrer' target='_blank' className='text-[#c02e7e]'> concept bottleneck models</a> to integrate clinical concepts into the pipeline, which were defined in collaboration with clinicians.",
            link: "https://github.com/Cat2005/xai-brain-diagnosis",
            image: "/posts/diss-cbm.png",
            tech: ["Python", "TensorFlow"]
        },
        {
            title: "FlatMouse",
            description: "Website for Edinburgh students to leave reviews on flats they've lived in. Users can add detailed 'issue' tags, like mice or mould, to help future tenants make informed decisions.",
            link: "https://flatmouse.co.uk",
            image: "/posts/flatmouse.mov",
            tech: ["React", "Node.js", "MongoDB",  "AWS", ]
        },
        {
            title: "Ray tracer in C++",
            description: "Made for my <a href='https://ksubr.github.io/CGR2024/#Tutorials' rel='noopener noreferrer' target='_blank' className='text-[#c02e7e]'> Computer Graphics: Rendering </a> course! While I don't usually highlight university coursework, this one was particularly significant as it was both technically challenging and my first time using C++. The ray tracer includes advanced features such as textures, an acceleration hierarchy, BRDFs and volumetrics. I achieved 94% for this work.",
            link: "https://github.com/Cat2005/raytracer",
            image: "/posts/raytracer-imgs.png",
            tech: ["C++ (no libraries allowed)"]
        }

    ];

    return (
        <div className="flex flex-col w-full mb-[20vh]">
            {/* Section title */}
            <div className="flex flex-col items-center">
                <div className="w-[85%] sm:w-[42%]  xl:w-[35%] pt-[10vh]">
                    <h1 className="text-5xl  w-7/8 lg:w-4/5 text-[#CA0079] font-newsreader mb-6 md:mb-10">
                        what have i been building?
                    </h1>
                </div>
            </div>

            {/* All project slides – no animation, no blur */}
            {projects.map((project, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div className="w-[85%] sm:w-[42%] xl:w-[35%]">
                        <ProjectSlide {...project} />
                    </div>
                </div>
            ))}
             <a href="https://github.com/Cat2005" rel='noopener noreferrer' target='_blank' className='z-50 block'>
                <div className="flex flex-col items-center group">
                    <div className="w-[85%] sm:w-[42%]  xl:w-[35%] text-sm text-[#acacac] text-center group-hover:cursor-pointer group-hover:scale-[1.02] transition-transform duration-200" style={{fontFamily: 'Avant-Garde-Medium'}}>
                        these are just some recent projects I&apos;ve worked on - I have many more projects, including 5+ hackathon winning projects{' '}
                        <span className="text-[#c02e7e] border-b border-current text-sm">
                            on my GitHub!
                            <HiArrowUpRight className="inline mb-0.5 text-xs ml-0.5" />
                        </span>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default Projects;