import React from 'react';

const Navbar: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full py-16">
            <div className="flex font-newsreader justify-center items-center space-x-4 p-2 w-2/5 bg-[#150D12] rounded-xl">
                <div className="flex gap-8">
                    <div className="cursor-pointer">home</div>
                    <div className="cursor-pointer">projects</div>
                    <div className="cursor-pointer">posts</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;