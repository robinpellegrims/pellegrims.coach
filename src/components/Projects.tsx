import Image from 'next/image'

export default function Projects() {
  const projects = [
    {
      image: "/images/pic01.jpg",
      title: "Coaching Elite Swimmers",
      description: "Between 2009 and 2021.",
      link: null
    },
    {
      image: "/images/rwanda1.jpg", 
      title: "Rwanda Epic",
      description: "Novembre 2023",
      link: "https://www.rwandanepic.com/"
    },
    {
      image: "/images/qlxnow.png",
      title: "QLX", 
      description: "Coach at QLXNOW.com",
      link: "https://qlxnow.com"
    },
    {
      image: "/images/Trainingpeaks logo.png",
      title: "Training Plans",
      description: "Swimming and running plans available on TrainingPeaks.com",
      link: "https://www.trainingpeaks.com/coach/pellegrims#trainingplans"
    },
    {
      image: "/images/rgf.jpg", 
      title: "Start 2 Swim",
      description: "Company group sessions 2024",
      link: null
    },
    {
      image: "/images/pic03.jpg",
      title: "Training camps",
      description: "On request - minimum 6 athletes", 
      link: null
    },
    {
      image: "/images/rdmlogo.png",
      title: "Roc Du Maroc",
      description: "Octobre 2022",
      link: "https://www.rocdumaroc.com/"
    },
    {
      image: "/images/pic02.jpg",
      title: "Gramchallenge",
      description: "Working as physical and mental coach at Gramchallenge.com between 2020 & 2024",
      link: "https://gramchallenge.com"
    }
  ]

  return (
    <section id="projects" className="border-t-4 border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h3 className="text-4xl font-bold text-gray-800 mb-6">Projects</h3>
        <p className="text-lg text-gray-600 mb-12">
          These are the most important projects I&apos;ve been working in the past, now, and in the future
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <article key={index} className="h-full bg-white rounded-lg border border-gray-100 p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6 h-full">
                <div className="md:w-1/2">
                  {project.link ? (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover rounded border"
                      />
                    </a>
                  ) : (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded border"
                    />
                  )}
                </div>
                <div className="md:w-1/2 flex flex-col justify-center">
                  <h4 className="text-xl font-bold text-gray-800 mb-3">
                    {project.link ? (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 transition-colors"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {project.description.includes('Gramchallenge.com') ? (
                      <>
                        Working as physical and mental coach at{' '}
                        <a 
                          href="https://www.gramchallenge.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Gramchallenge.com
                        </a>
                        {' '}between 2020 &amp; 2024
                      </>
                    ) : project.description.includes('TrainingPeaks.com') ? (
                      <>
                        Swimming and running plans available on{' '}
                        <a 
                          href="https://www.trainingpeaks.com/coach/pellegrims#trainingplans"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          TrainingPeaks.com
                        </a>
                      </>
                    ) : project.description.includes('QLXNOW.com') ? (
                      <>
                        Coach at{' '}
                        <a 
                          href="https://www.QLXNOW.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          QLXNOW.com
                        </a>
                      </>
                    ) : (
                      project.description
                    )}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}