import BlogLanding from './components/BlogLanding';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

interface LandingProps {
    navClicked: () => void;
}




const Landing: React.FC<LandingProps> = ({ navClicked }) => {
    const [isMobile, setIsMobile] = useState(false);
    
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 500); // Adjust breakpoint as needed
        };
        
        // Check on initial load
        checkIfMobile();
        
        // Add event listener for window resize
        window.addEventListener('resize', checkIfMobile);
        
        // Clean up event listener
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);
    return (
        <div className="flex flex-col">
            <Navbar navClicked={navClicked} />

        <div className="justify-center pt-[10vh] w-full mx-auto  flex items-center flex-col">
         
            <div className="flex flex-col xl:ml-10">
                <div className="flex flex-row ">
                    <h1 className="text-[4.2rem] text-white  font-newsreader leading-none">
                        hi, i&apos;m <span className="text-[#CA0079]">Cat.</span>
                    </h1>
                </div>

                <div className="md:pt-4 text-md md:text-lg text-[#CA0079] font-newsreader">
                    22 y.o CS grad, based in London.
                </div>

                {isMobile && (
                    <div className="flex mt-22 w-full  mx-auto font-newsreader flex flex-col gap-2">
        
                    {isMobile && (
                        <div className="text-white">Posts (will be up soon!) :</div>
                    )}
                    <BlogLanding title="Predicting bicep curl failure with ML" className="h-[55px]" />
                    <BlogLanding title="Building clinically interpretable AI" className="h-[55px]" />
                    <BlogLanding title="Scaling nailpolishfinder.com" className="h-[55px]" />
                </div>
                )}

                
                
      
        </div>
        
        
            </div>
            {!isMobile && (
          
          <div className="flex flex-col items-center mt-16 mx-auto w-[450px] font-newsreader">
              <div className="w-full mx-auto text-white">Posts (will be up soon!) :</div>
          <div className="flex mt-4 w-[450px] mx-auto font-newsreader md:flex-row gap-2">
  
              
          <div className="w-1/3 ">
            <BlogLanding title="Predicting bicep curl failure with ML" className="h-[130px]" />
          </div>
          <div className="w-1/3 ">
            <BlogLanding title="Building clinically interpretable AI" className="h-[130px]" />
          </div>
          <div className="w-1/3 ">
            <BlogLanding title="Scaling nailpolishfinder.com" className="h-[130px]" />
          </div>
          </div>
          </div>
    
      )}

            {/* <div className=" w-full md:pt-28 pt-12 md:w-2/5 mx-auto flex flex-col font-newsreader mb-[30vh]">
            
            
            <div className="mt-4 flex md:flex-row flex-col gap-2 mx-auto">
            <div className="w-full mx-auto">Recent posts:</div>
                <BlogLanding />
                <BlogLanding />
                <BlogLanding />
            </div>
            </div> */}
        
</div>
    )
}

export default Landing;