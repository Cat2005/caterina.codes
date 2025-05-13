import BlogLanding from './components/BlogLanding';
import React from 'react';
import Navbar from './components/Navbar';
const Landing: React.FC = () => {
    return (
        <div className="flex flex-col">
            <Navbar />

        <div className="pl-8 justify-start pt-[10vh] flex flex-col w-2/5 mx-auto">
            <div className="flex flex-row xl:ml-10">
                <h1 className="text-7xl font-newsreader">hi, i'm </h1>
                <h1 className="text-7xl text-[#CA0079] ml-3 font-newsreader">Cat.</h1>
            </div>

            <div className="pt-8 xl:ml-10 flex flex-row text-lg text-[#CA0079] font-newsreader">
                21 y.o CS grad, currently at Spotify :D
            </div>

            {/* <div className="pt-8 xl:ml-10 text-sm flex flex-row text-lg text-[#d8d8d8] font-newsreader">
                currently at Spotify, previously at Goldman Sachs. I like web dev, machine learning, and participating in hackathons. Aside from that, I also love to teach and learn languages!
            </div> */}

            
        </div>

            <div className="pt-28 w-2/5 mx-auto flex flex-col font-newsreader mb-[30vh]">
            <div>Recent posts:</div>
            <div className="mt-4 flex flex-row gap-2">
                <BlogLanding />
                <BlogLanding />
                <BlogLanding />
            </div>
            </div>
        
</div>
    )
}

export default Landing;