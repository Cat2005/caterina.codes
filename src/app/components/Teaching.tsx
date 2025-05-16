import ExperienceSlide from "./ExperienceSlide";



const Teaching = () => {
    return (
        <div className="flex flex-col w-full min-h-screen">
      <div className="w-[80%] sm:w-[50%] md:w-2/5 xl:w-[35%] mx-auto py-[10vh]">
      <div className="">
          <h1 className="text-5xl text-[#CA0079] font-newsreader mb-6 w-3/4 md:w-1/2">
            i also love to teach!</h1>
        </div>


        <div className="text-[#d8d8d8] mb-4 text-sm" style={{fontFamily: 'Avant-Garde-Medium'}}>
        I have been teaching maths and computer science on and off for the past 4 years. 
        Below are all of my teaching experiences.
        </div>

        <div className="flex flex-col gap-3">
        <ExperienceSlide
        image="/posts/codecadets-logo.png"
        title="Coding Tutor"
        company="Code Cadets"
        description="Worked in after-school coding clubs for children aged 5-10, teaching block coding and basic Python and HTML."
        duration="2024 - 2025"
        />

        <ExperienceSlide
        image="/posts/mytutor-logo.png"
        title="Livestream AI Tutor"
        company="MyTutor"
        description="Designed and taught an introductory AI course for students aged 13-16, delivered as weekly livestream lessons."
        duration="2023"
        />

        <ExperienceSlide
        image="/posts/edi-logo.png"
        title="Course Tutor"
        company="School of Informatics"
        description="Taught a first year course in Functional Programming and Computational Logic. Lead tutorials and marked assignments."
        duration="2023"
            />

        <ExperienceSlide
        image="/posts/mytutor-logo.png"
        title="Maths Tutor"
        company="MyTutor"
        description="Tutored maths online for over 2 years, teaching GCSE Maths, A-Level Maths, and Further Maths."
        duration="2021 - 2023"
        />

        <ExperienceSlide
        image="/posts/private-logo.png"
        company="Self-employed Maths Tutor"
        description="Taught students in my local area, aged 13-18. Some of my students were high-achievers, but most really struggled with maths. I learned a lot about how to explain things better and improve their confidence."
        duration="2021 - 2023"
        />

       
       
      </div>
    </div>
    </div>
    )
}

export default Teaching;