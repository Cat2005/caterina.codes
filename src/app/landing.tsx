import BlogLanding from './components/BlogLanding';
import React from 'react';

const Landing: React.FC = () => {
    return (
        <div className="flex flex-col">

        <div className="pl-8 justify-start pt-[30vh] flex flex-col w-2/5 mx-auto ">
            <div className="flex flex-row">
                <h1 className="text-7xl font-newsreader">hi, i'm </h1>
                <h1 className="text-7xl text-[#CA0079] ml-3 font-newsreader">Cat.</h1>
            </div>

            <div className="pt-8 flex flex-row text-lg text-[#CA0079] font-newsreader">
                21 y.o who loves building stuff :D
            </div>

            
        </div>

            <div className="pt-28 w-2/5 mx-auto flex flex-col font-newsreader">
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