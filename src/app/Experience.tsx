import React from 'react';
import ExperienceSlide from './components/ExperienceSlide';
import Divider from '@/app/svgs/divider.svg';
import Image from 'next/image';
import DividerSVG from '@/app/components/DividerSVG';

const Experience = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <div className="w-2/5 max-xl:w-2/5 xl:w-[35%] mx-auto py-[10vh]">
        <div className="">
          <h1 className="text-5xl text-[#CA0079] font-newsreader mb-10 w-1/2">
            professional experience</h1>
        </div>
        <div className="flex flex-col gap-3">
          <ExperienceSlide 
            image="/posts/spotify-logo.png"
            title="Software Engineer Intern"
            company="Spotify"
            description="To be updated soon!"
            duration="Summer 2025"
          />
          <ExperienceSlide 
            image="/posts/gs-logo.png"
            title="Software Engineer Intern"
            company="Goldman Sachs"
            description="Worked on the Regulatory Engineering team, using Prometheus, Grafana, Java, PromQL."
            duration="Summer 2024"
          />
          <ExperienceSlide 
            image="/posts/compsoc-logo.png"
            title="Tech secretary"
            company="CompSoc"
            description="Built comp-soc.com, managed Infball event website, maintained CompSoc's internal servers."
            duration="2024-2025"
          />
          <ExperienceSlide 
            image="/posts/compsoc-logo.png"
            title="Sponsorship Coordinator"
            company="CompSoc"
            description="Raised 30k in sponsorship funding, signed on 8 companies including Meta, Optiver and QRT."
            duration="2024-2025"
          />
          <div className="w-full flex justify-center mt-5 mb-5">
            <DividerSVG />
          </div>
          <ExperienceSlide 
            image="/posts/edi-logo.png"
            title="BSc Computer Science and AI"
            company="University of Edinburgh"
            description="Predicted 1st Class (81%) \n 
            Machine Learning Practical, Natural Language Understanding+, Computer Graphics, Reinforcement Learning, Foundations of Natural Language Processing."
            duration="2021-2025"
          />
        </div>
      </div>
    </div>
  )
}

export default Experience;

