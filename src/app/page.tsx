"use client"
import Image from "next/image";
import Post from "./components/post";
import { useState, useEffect } from "react";
import ExperienceCard from "./components/ExperienceCard";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import HackathonCard from "./components/HackathonCard";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [clickCount, setClickCount] = useState<number | null>(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async () => {
    const response = await fetch('/api/clicks', { method: 'POST' });
    const data = await response.json();
    setClickCount(data.clicks);
    setIsClicked(true);
  };

  function getOrdinalSuffix(n: number) {
    const j = n % 10;
    const k = n % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  }

  useEffect(() => {
    fetch('/api/clicks')
      .then(res => res.json())
      .then(data => setClickCount(data.clicks));
  }, []);

  return (
    <div className={`flex flex-col min-h-screen px-8 md:px-56 xl:px-80 ${isDarkMode ? 'bg-[#261e1f]' : 'bg-[#FFDCDF]'}`}
      style={{
        ["--selection-background" as any]: isDarkMode ? "#b1427d" : "#b1427d",
        ["--selection-text" as any]: isDarkMode ? "#FFDCDF" : "#FFDCDF"
      }}>
      <div className="absolute top-4 right-4">
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          <div className="w-16 h-8 bg-[#773035] rounded-full peer peer-checked:after:translate-x-8 
            after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white 
            after:rounded-full after:h-6 after:w-6 after:transition-all
            flex items-center justify-between px-2">
            <span className="text-sm">🌙</span>
            <span className="text-sm">☀️</span>
          </div>
        </label>
      </div>

      {/* <div className="absolute top-4 left-4">
        <button
          onClick={handleClick}
          className={`font-newsreader text-xs px-4 py-2 rounded-lg transition-all duration-200 
            ${isDarkMode 
              ? !isClicked ? 'bg-[#261e1f] text-[#773035] hover:bg-[#e7b7b7]' : 'bg-[#261e1f] text-[#261e1f] hover:text-[#773035] hover:bg-[#e7b7b7]'
              : !isClicked ? 'bg-[#FFDCDF] text-[#773035] hover:bg-[#FFC3C3]' : 'bg-[#FFDCDF] text-[#FFDCDF] hover:text-[#773035] hover:bg-[#FFC3C3]'
            }`}
        >
          {!isClicked
            ? "Click here!" 
            : <>You&apos;re the {clickCount}{getOrdinalSuffix(clickCount || 0)} person to<br/>click this button :)</>}
        </button>
      </div> */}

      <h1 className={`text-5xl font-newsreader ${isDarkMode ? 'text-[#FFDCDF]' : 'text-[#773035]'} mt-28 text-center`}>
        <span>Caterina Mammola</span>
        <span className="text-5xl text-[#c02e7e] inline ml-1">.</span>
      </h1>

      <div className="flex justify-center gap-6 mt-2">
        <div>
          <a href="https://www.linkedin.com/in/caterina-m/"  
             target="_blank" 
             rel="noopener noreferrer"
             className={`font-newsreader text-md text-[#c02e7e] transition-colors relative group`}>
            <span className="inline-flex items-center transition-transform duration-200 hover:scale-[1.07]">
              LinkedIn
              <HiArrowUpRight className="inline mb-0.5 text-xs ml-0.5" />
            </span>
            <span className="absolute left-0 right-0 bottom-0 border-b border-transparent group-hover:border-current"></span>
          </a> 
        </div>
        
        {/* <span className={`font-newsreader text-md ${isDarkMode ? 'text-[#FFDCDF]' : 'text-[#773035]'}`}>|</span> */}
        <div>
          <a href="https://github.com/Cat2005"  
             target="_blank" 
             rel="noopener noreferrer"
             className={`font-newsreader text-md text-[#c02e7e] transition-colors relative group`}>
            <span className="inline-flex items-center transition-transform duration-200 hover:scale-[1.07]">
              GitHub
              <HiArrowUpRight className="inline mb-0.5 text-xs ml-0.5" />
            </span>
            <span className="absolute left-0 right-0 bottom-0 border-b border-transparent group-hover:border-current"></span>
          </a> 
        </div>
      </div>

      <p className={`${isDarkMode ? 'text-[#FFDCDF]' : 'text-[#773035]'} mt-6 font-newsreader `}>
      Hi, I&apos;m Caterina, a 4th-year CS and AI student at the University of Edinburgh. I like web dev, machine learning, and participating in hackathons. 
      Previously, I interned at <div className='text-[#c02e7e] inline'> Goldman Sachs</div> as a Software Engineer. 
      Currently, I serve as the Tech Secretary and Sponsorship Coordinator 
      for <a href="https://comp-soc.com"  
             target="_blank" 
             rel="noopener noreferrer"
             className={`mr-1 font-newsreader text-md text-[#c02e7e] transition-colors relative group`}>
            <span className="inline-flex items-center transition-transform duration-200 hover:scale-[1.04]">
              CompSoc
              <HiArrowUpRight className="inline mb-0.5 text-xs ml-0.5" />
            </span>
            <span className="absolute left-0 right-0 bottom-0 border-b border-transparent group-hover:border-current"></span>
          </a> 
       where I manage technical infrastructure and build relationships with sponsors.
<br></br>
<br></br>
Aside from this, I love to teach. I&apos;ve taught maths and computer science for over four years and 
currently work part-time at 
<a href="https://www.codecadets.co.uk"  
             target="_blank" 
             rel="noopener noreferrer"
             className={`mr-1 font-newsreader text-md text-[#c02e7e] transition-colors relative group`}>
            <span className="inline-flex items-center transition-transform duration-200 hover:scale-[1.04]">
              Code Cadets
              <HiArrowUpRight className="inline mb-0.5 text-xs ml-0.5" />
            </span>
            <span className="absolute left-0 right-0 bottom-0 border-b border-transparent group-hover:border-current"></span>
          </a> 
teaching coding to primary school children in Edinburgh.
      </p>

      <p className={`${isDarkMode ? 'text-[#FFDCDF]' : 'text-[#773035]'} mt-4 font-newsreader text-md`}><span className="font-bold">Languages spoken: </span>English (native), Italian (native), French (fluent)</p>

      <h2 className={`text-2xl font-newsreader ${isDarkMode ? 'text-[#FFDCDF]' : 'text-[#773035]'} mt-12 mb-8 text-center`}>
        Recent Projects
      </h2>

      <Post title="Clinically interpretable XAI for Brain Tumor MRI Diagnosis" 
      type={isDarkMode ? "light" : "dark"}
      description="For my dissertation, I am exploring Explainable AI (XAI) techniques to enhance the trustworthiness of brain tumor diagnosis models. Specifically, I am building on prior work with <a href='https://github.com/yewsiang/ConceptBottleneck' rel='noopener noreferrer' target='_blank' className='text-[#c02e7e]'> concept bottleneck models</a>
      to integrate clinical concepts into the pipeline. I am collaborating with clinicians to identify key clinical concepts from medical reports, which will be incorporated into the model training process to improve interpretability." 
      image="/posts/diss.png"
      link="https://github.com/Cat2005/xai-brain-diagnosis"
      tech={["Python", "TensorFlow"]} />
 

      <Post title="CompSoc Website" 
      type={isDarkMode ? "light" : "dark"}
      description="I co-developed the new website for CompSoc, the Computer Science Society at the University of Edinburgh, alongside my friend 
      <a href='https://www.tomasmaillo.com' rel='noopener noreferrer' target='_blank' className='text-[#c02e7e]'> Tomas Maillo </a>. 
      Our goal was to create a modern and functional platform for members to easily access information. We integrated features like pulling events directly from Google Calendar to ensure the event schedule stays up-to-date and displaying the live number of members on Discord. The website gets over 7000 unique visitors per month." 
      link="https://comp-soc.com" 
      image="/posts/compsoc-website-vid.mov"
      tech={["React", "Next.js", "Tailwind"]} />

<Post title="FlatMouse" 
      type={isDarkMode ? "light" : "dark"}
      description=
      "I built a website for University of Edinburgh students to leave reviews on flats and accommodations they've lived in. The platform allows users to add detailed tags, such as mice, mould, or heating issues, to help future tenants make informed decisions. Users can explore an interactive map to view reviews and find accommodations in different areas, and even filter average ratings by letting agency." 
      link="https://flatmouse.co.uk" 
      image="/posts/flatmouse.mov"
      tech={["React", "Amazon S3", "Amazon EC2", "MongoDB", "Node.js", "Express"]} />


<Post title="Nail Polish Finder" 
      type={isDarkMode ? "light" : "dark"}
      description= "I designed a website that allows users to search through thousands of nail polishes by hex code. This was my first experience creating something for a broader, unknown internet audience. The project quickly gained traction, with some of my posts reaching 5 million views  and the site receiving more than 100,000 visits within 24 hours. The response was overwhelmingly positive—many people appreciated the functionality and left encouraging comments. I also received valuable feedback that has allowed me to iterate on the website and improve its usability."
      link="https://nailpolishfinder.com" 
      image="/posts/nailpolishfinder.mov"
      tech={["React", "Next.js", "Tailwind", "Vercel", "Python", "Selenium"]} />

      <Post title="Ray tracer in C++"
      type={isDarkMode ? "light" : "dark"}
      description="For my <a href='https://ksubr.github.io/CGR2024/#Tutorials' rel='noopener noreferrer' target='_blank' className='text-[#c02e7e]'> Computer Graphics: Rendering </a> course, I developed a ray tracer in C++. While I don't usually highlight university coursework, this one was particularly significant as it was both technically challenging and my first time using C++. The ray tracer includes advanced features such as textures, an acceleration hierarchy, bidirectional reflectance distribution functions (BRDFs), and volumetrics. This project deepened my understanding of rendering techniques and taught me how to optimize performance in a low-level programming environment. I achieved 94% for this work."
      image="/posts/raytracer-imgs.png"
      tech={["C++ (no libraries allowed)"]} />

<a href='https://github.com/Cat2005' className="text-lg" rel='noopener noreferrer' target='_blank'>
  <p className={`${isDarkMode ? 'text-[#FFDCDF]' : 'text-[#773035]'} mt-4 font-newsreader transition-transform duration-200 hover:scale-[1.05]`}>
    To see more of my work, including 5+ prize-winning hackathon projects,{' '}
    <span className="text-[#c02e7e] border-b border-current text-xl">
      check out my GitHub!
      <HiArrowUpRight className="inline mb-0.5 text-xs ml-0.5" />
    </span>
  </p>
</a>
<h2 className={`text-center text-2xl font-newsreader ${isDarkMode ? 'text-[#FFDCDF]' : 'text-[#773035]'} mt-12 mb-8`}>
        Professional Experience
      </h2>

      <ExperienceCard title="Intern, Goldman Sachs"  date="Summer 2024"
      type={isDarkMode ? "dark" : "light"}
      description="I worked on developing a dashboard using Prometheus, Grafana, Java, and PromQL to monitor infrastructure metrics for the generation of regulatory reports. The system was designed for the 1,000+ engineers in the Regulatory Engineering division to onboard their own frameworks and monitor their operations. It tracked key metrics such as processing lag and failure rates across clusters, ensuring better observability and faster issue resolution."
      tech={["Prometheus", "Grafana", "Java", "PromQL"]} />

<ExperienceCard title="Tech Secretary, CompSoc"  date="2024-ongoing"
      type={isDarkMode ? "dark" : "light"}
      description="As the Tech Secretary for CompSoc, I am responsible for managing the society's technical infrastructure. This includes overseeing CompSoc's Linux servers and handling domain management. Additionally, I maintain and manage the <a href='https://infball.comp-soc.com/'> website for Infball</a>,  supporting an event with over 300 attendees with features such as integrated payment processing, QR code generation, and automated email confirmations."
      tech={["Discord", "GitHub", "Hackathons"]} />


      <ExperienceCard title="Sponsorship Coordinator, CompSoc"  date="2024-ongoing"
      type={isDarkMode ? "dark" : "light"}
      description="As the Sponsorship Coordinator for CompSoc, I secure funding from sponsors to enable us to run events such as <a href='https://hacktheburgh.com/'>Hack The Burgh</a>and <a href='https://infball.comp-soc.com/'>Infball</a>. 
       My responsibilities include identifying potential sponsors, setting up calls with them, designing packages which suit their needs and negotiating a price. 
       Once a sponsor is signed on, I maintain a relationship with them throughout the partnership. 
      This year, I successfully secured sponsorships from 8 companies including Meta, Optiver, and Jane Street. 
       <a href='https://comp-soc.com/sponsors/'> You can see our all sponsors on this page</a> (which I designed!)"
      tech={["Prometheus", "Grafana", "Java", "PromQL"]} />


{/* <h2 className={`text-center text-2xl font-newsreader ${isDarkMode ? 'text-[#FFDCDF]' : 'text-[#773035]'} mt-8 mb-4`}>
        Hackathons
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 relative place-items-center">
        <HackathonCard 
          hackathon={{
            name: "Neuphonic Hackathon, 2nd place",
            projectTitle: "Emergency Services Text-to-Speech",
            description: "I worked to a team of 2 to develop a system enabling users to contact emergency services via text in countries where SMS emergency access isn't supported. Using Twilio API for messaging and Neuphonic API for text-to-speech and speech-to-text, we created a two-way communication tool that converts text messages into speech for operators and their responses back into text. This solution makes emergency services accessible to those unable to make voice calls.",
            image: "/posts/neuphonic.jpeg", // optional
            tech: ["Twilio API", "Neuphonic API"]
          }}
          isDarkMode={isDarkMode}
        />

        <HackathonCard 
          hackathon={{
            name: "Hack the Burgh, overall winner",
            projectTitle: "NoteVec: AI-powered note-taking app",
            description: "Project description goes here...",
            image: "/posts/nv.png" // optional
          }}
          isDarkMode={isDarkMode}
        />

<HackathonCard 
          hackathon={{
            name: "ICHack24, Marshall Wace runner-up",
            projectTitle: "NoteVec: AI-powered note-taking app",
            description: "Project description goes here...",
            image: "/posts/a.png" // optional
          }}
          isDarkMode={isDarkMode}
        />


<HackathonCard 
          hackathon={{
            name: "HackZurich, Finalist",
            projectTitle: "Migros Nudge:Real-time sustainability scoring",
            description: "Project description goes here...",
            image: "/posts/hackz.png" // optional
          }}
          isDarkMode={isDarkMode}
        />


<HackathonCard 
          hackathon={{
            name: "AthenaHack, overall winner",
            projectTitle: "NoteVec: AI-powered note-taking app",
            description: "Project description goes here...",
            image: "/path/to/image.jpg" // optional
          }}
          isDarkMode={isDarkMode}
        />
      </div> */}


     
<h2 className={`text-center text-2xl font-newsreader ${isDarkMode ? 'text-[#FFDCDF]' : 'text-[#773035]'} mt-8 mb-4`}>
        Teaching
      </h2>

    <p className={`${isDarkMode ? 'text-[#FFDCDF]' : 'text-[#773035]'} mt-2 font-newsreader mb-8`}>I also love to teach and have been teaching Maths and Computer Science on and off for the past 4 years. Below are all of my teaching experiences.</p>


    <ExperienceCard title="Hackathon Organiser, Code Cadets"  date="2024-ongoing"
      type={isDarkMode ? "dark" : "light"}
      description="This spring, I have the amazing opportunity to plan and run a hackathon for 
      children in the local Edinburgh community. I am really excited to work with <a href='https://www.codecadets.co.uk' rel='noopener noreferrer' target='_blank' className='text-[#c02e7e]'> Code Cadets</a> 
      to make this happen. Along with my co-organiser, we are responsible for everything from coming up with age-appropriate challenges
      to the organisation of the day and the prize structure. This was my first time doing
      a real deep dive into pedagogy and how best to teach computational thinking to children."
      tech={["Python", "HTML", "CSS", "JavaScript"]} />

    <ExperienceCard title="Tutor, Code Cadets"  date="2024-ongoing"
      type={isDarkMode ? "dark" : "light"}
      description="I teach coding to primary school children in Edinburgh in after-school clubs. 
      They are normally very young (5-8) years old, so we mainly teach block coding and some basic Python and HTML."
      tech={["Python", "HTML", "CSS", "JavaScript"]} />




<ExperienceCard title="AI Course Organiser and Tutor, MyTutor"  date="Summer 2023"
      type={isDarkMode ? "dark" : "light"}
      description="I created materials for and taught an introductory AI course aimed towards high school students aged 13-16, which
      I delivered over livestream on <a href='https://www.mytutor.co.uk' rel='noopener noreferrer' target='_blank' className='text-[#c02e7e]'> MyTutor's platform</a>. I created a range of resources for a total of 8 lessons to make AI more accessible to a younger audience.
      "
      tech={["Python", "HTML", "CSS", "JavaScript"]} />

            


<ExperienceCard title="Tutor and Marker, University of Edinburgh"  date="Winter 2023"
      type={isDarkMode ? "dark" : "light"}
      description="I tutored a <a href='https://opencourse.inf.ed.ac.uk/inf1a' rel='noopener noreferrer' target='_blank' className='text-[#c02e7e]'> first year course in Computer Science</a> in Functional Programming and Computational Logic. I worked with a group of 10 students to help them understand the material and mark their work each week."
      tech={["Python", "HTML", "CSS", "JavaScript"]} />


<ExperienceCard title="Private Maths Tutor, Edinburgh"  date="2021-2023"
      type={isDarkMode ? "dark" : "light"}
      description="I tutored maths to children in Edinburgh for over 2 years, teaching Nat5, Highers, and Advanced Higher Maths (Scottish curriculum).
      I have taught a range of students, from high-achieving students to those really struggling
      with maths. I learned a lot about how to teach maths to different students and how to make it more accessible."
      tech={["Python", "HTML", "CSS", "JavaScript"]} />


<ExperienceCard title="Maths Tutor, MyTutor"  date="2021-2023"
      type={isDarkMode ? "dark" : "light"}
      description="I have taught maths online for over 2 years on <a href='https://www.mytutor.co.uk' rel='noopener noreferrer' target='_blank' className='text-[#c02e7e]'> MyTutor</a>, a private tutoring company in the UK. I have taught a range of topics, including GCSE Maths, A-Level Maths, and Further Maths."
      tech={["Python", "HTML", "CSS", "JavaScript"]} />

<p className={`mb-24 text-center ${isDarkMode ? 'text-[#FFDCDF]' : 'text-[#773035]'} mt-8 font-newsreader text-md`}>
    Thanks for checking out my website ❤️ ! 
    <br></br>
    If you have any questions, please don&apos;t hesitate to <a href="mailto:caterina.mammola20@gmail.com"  
             target="_blank" 
             rel="noopener noreferrer"
             className={`mr-1 font-newsreader text-md text-[#c02e7e] transition-colors relative group`}>
            <span className="inline-flex items-center transition-transform duration-200 hover:scale-[1.02]">
              contact me on email
              <HiArrowUpRight className="inline mb-0.5 text-xs ml-0.5" />
            </span>
            <span className="absolute left-0 right-0 bottom-0 border-b border-transparent group-hover:border-current"></span>
          </a> 
    or <a href="https://www.linkedin.com/in/caterina-m/"  
             target="_blank" 
             rel="noopener noreferrer"
             className={`mr-1 font-newsreader text-md text-[#c02e7e] transition-colors relative group`}>
            <span className="inline-flex items-center transition-transform duration-200 hover:scale-[1.02]">
              LinkedIn
              <HiArrowUpRight className="inline mb-0.5 text-xs ml-0.5" />
            </span>
            <span className="absolute left-0 right-0 bottom-0 border-b border-transparent group-hover:border-current"></span>
          </a> 
  </p>
    </div>

    

  );
}
