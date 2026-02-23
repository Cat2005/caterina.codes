import BlogLanding from './components/BlogLanding';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';

interface LandingProps {
    navClicked: () => void;
}

interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
}

const Landing: React.FC<LandingProps> = ({ navClicked }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 500);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(() => setPosts([]));
    }, []);

    const hasPosts = posts.length > 0;

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
                    22 y.o CS grad, currently at Spotify.
                </div>

                {isMobile && hasPosts && (
                    <div className="flex mt-22 w-full  mx-auto font-newsreader flex flex-col gap-2">
                        <div className="text-white">Recent posts:</div>
                        {posts.map((post) => (
                            <BlogLanding
                                key={post.slug}
                                title={post.title}
                                slug={post.slug}
                                description={post.description}
                                className="h-[55px]"
                            />
                        ))}
                    </div>
                )}

            </div>


            </div>
            {!isMobile && hasPosts && (

          <div className="flex flex-col items-center mt-16 mx-auto w-[500px] font-newsreader">
              <div className="w-full mx-auto text-white">Recent posts:</div>
          <div className="flex mt-4 w-[500px] mx-auto font-newsreader md:flex-row gap-2">
              {posts.map((post) => (
                  <div key={post.slug} className="w-1/3">
                      <BlogLanding
                          title={post.title}
                          slug={post.slug}
                          description={post.description}
                          className="h-[130px]"
                      />
                  </div>
              ))}
          </div>
          </div>

      )}

</div>
    )
}

export default Landing;
