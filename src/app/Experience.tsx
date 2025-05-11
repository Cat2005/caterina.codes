
import React from 'react';
import ExperienceSlide from './components/ExperienceSlide';
const Experience = () => {
  return (
  
            <div className="flex flex-col w-full">
                <div className="fixed top-[20vh] w-2/5 left-1/2 -translate-x-1/2">
                <div className="h-screen relative">
                    <div className="">
                    <h1 className="text-6xl text-[#CA0079] ml-3 font-newsreader mb-10">
                        professional experience</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                    <ExperienceSlide 
                    title="Software Engineer Intern"
                    company="Goldman Sachs"
                    description="Worked on developing a dashboard using Prometheus, Grafana, Java, and PromQL to monitor infrastructure metrics for the generation of regulatory reports. The system was designed for the 1,000+ engineers in the Regulatory Engineering division to onboard their own frameworks and monitor their operations. It tracked key metrics such as processing lag and failure rates across clusters, ensuring better observability and faster issue resolution."
                    duration="Summer 2024"
                    />
                    <ExperienceSlide 
                    title="Tech secretary"
                    company="CompSoc"
                    description="Responsible for managing the society's technical infrastructure. This includes overseeing CompSoc's Linux servers and handling domain management. Additionally, I maintain and manage the <a href='https://infball.comp-soc.com/'> website for Infball</a>,  supporting an event with over 300 attendees with features such as integrated payment processing, QR code generation, and automated email confirmations."
                    duration="Summer 2024"
                    />
                    </div>
                </div>

                </div>

              

            </div>

  )
}

export default Experience;

