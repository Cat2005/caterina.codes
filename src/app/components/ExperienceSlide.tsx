

import React from 'react';
import Image from 'next/image';

interface ExperienceSlideProps {
  image: string;
  title?: string;
  company: string;
  description?: string;
  duration: string;

}

const ExperienceSlide: React.FC<ExperienceSlideProps> = ({ title, company, description, duration, image }) => {
  return (
    <div className={`p-4 rounded-lg transition-transform duration-200 hover:scale-[1.02] border border-[#252525] hover:border-[#c02e7e]/30 backdrop-blur-sm bg-[#979797]/10  shadow-lg`}>
       <div className='flex flex-row w-full items-center'>
        <div className='w-[15%] mr-4'>
            <Image src={image} alt={company} width={100} height={100} />
        </div>

        <div className='flex flex-col w-full'>
          <div className='flex flex-row justify-between w-full items-center'>
            <p className={`text-sm text-white`} style={{fontFamily: 'Avant-Garde-Medium'}}>{company}</p>
            <p className='text-sm text-[#dddddd]'>{duration}</p>
            </div>
            <p className='text-sm text-[#ebebeb] mt-[-5px] mb-[0.5] font-avantGardeMedium'>{title}</p>
            <p className={`text-xs ${!title ? 'mt-2' : ''} text-[#dddddd]`}>{description?.split('\\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < description?.split('\\n').length - 1 && <br />}
              </React.Fragment>
            ))}</p>
        </div>
       </div>

    </div>

  )
}

export default ExperienceSlide;