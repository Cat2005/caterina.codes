import React from "react";
import Image from "next/image";

interface ExperienceSlideProps {
  image: string;
  title?: string;
  company: string;
  description?: string;
  duration: string;
  isDegree?: boolean;
  degree?: string;
}

const ExperienceSlide: React.FC<ExperienceSlideProps> = ({
  title,
  company,
  description,
  duration,
  image,
  isDegree,
  degree,
}) => {
  const [imageLoading, setImageLoading] = React.useState(true);

  return (
    <div
      className={`p-4 rounded-lg border border-[#252525] hover:border-[#c02e7e]/30 backdrop-blur-sm bg-[#979797]/10  shadow-lg`}
    >
      <div className="flex flex-row w-full items-center">
        <div className="w-[15%] mr-4 relative">
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-solid border-[#c02e7e] border-t-transparent"></div>
            </div>
          )}
          <Image
            src={image}
            alt={company}
            width={100}
            height={100}
            onLoadingComplete={() => setImageLoading(false)}
            className={
              imageLoading
                ? "opacity-0"
                : "opacity-100 transition-opacity duration-300"
            }
          />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full items-center">
            <p
              className={`text-sm mb-1 text-white`}
              style={{ fontFamily: "Avant-Garde-Medium" }}
            >
              {company}
            </p>
            <p className="sm:text-sm mb-1.5 text-xs text-[#dddddd]">
              {duration}
            </p>
          </div>
          <p className="text-xs md:text-sm text-[#ebebeb] mt-[-5px] mb-[0.5] font-avantGardeMedium">
            {title}
          </p>
          {isDegree && (
            <p className="text-xs text-[#ebebeb] font-medium mt-[1px] mb-1 font-avantGardeMedium">
              {degree?.split(/(<pink>.*?<\/pink>)/g).map((part, i) => {
                if (part.startsWith("<pink>") && part.endsWith("</pink>")) {
                  const content = part.slice(6, -7); // Remove <pink> and </pink>
                  return (
                    <span key={i} className="text-[#CA0079]">
                      {content}
                    </span>
                  );
                }
                return part ? <span key={i}>{part}</span> : null;
              })}
            </p>
          )}
          <p className={`text-xs ${!title ? "mt-2" : ""} text-[#dddddd]`}>
            {description?.split(/(<pink>.*?<\/pink>)/g).map((part, i) => {
              if (part.startsWith("<pink>") && part.endsWith("</pink>")) {
                const content = part.slice(6, -7); // Remove <pink> and </pink>
                return (
                  <span key={i} className="text-[#CA0079]">
                    {content}
                  </span>
                );
              }
              return part ? <span key={i}>{part}</span> : null;
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSlide;
