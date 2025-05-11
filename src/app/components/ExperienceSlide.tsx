

import React from 'react';

interface ExperienceSlideProps {
  title: string;
  company: string;
  description: string;
  duration: string;

}

const ExperienceSlide: React.FC<ExperienceSlideProps> = ({ title, company, description, duration, image }) => {
  return (
    <div className={`font-newsreader mb-12 p-4 rounded-lg transition-transform duration-200 hover:scale-[1.02] backdrop-blur-sm bg-[#333333]/20 shadow-lg`}>
        <div className="flex flex-col">
            <div className="flex flex-row items-center">
                <p className="text-2xl text-white mr-4">{company}</p>
                <p className="text-lg text-[#CA0079]">{title}</p>
            </div>
            <div className="text-white mt-4">
                {description}
            </div>
        </div>

    </div>

  )
}

export default ExperienceSlide;