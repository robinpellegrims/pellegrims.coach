import Image from 'next/image'
import type { Locale } from '@/lib/i18n'
import type { TranslationKey } from '@/lib/translations'

type Props = {
  locale: Locale
  t: TranslationKey
}

export default function Projects({ t }: Props) {
  const projects = [
    {
      image: "/images/pic01.jpg",
      title: t.projects.items.eliteSwimmers.title,
      description: t.projects.items.eliteSwimmers.description,
      link: null
    },
    {
      image: "/images/rwanda1.jpg", 
      title: t.projects.items.rwanda.title,
      description: t.projects.items.rwanda.description,
      link: "https://www.rwandanepic.com/"
    },
    {
      image: "/images/qlxnow.png",
      title: t.projects.items.qlx.title, 
      description: t.projects.items.qlx.description,
      link: "https://qlxnow.com"
    },
    {
      image: "/images/Trainingpeaks logo.png",
      title: t.projects.items.trainingPlans.title,
      description: t.projects.items.trainingPlans.description,
      link: "https://www.trainingpeaks.com/coach/pellegrims#trainingplans"
    },
    {
      image: "/images/rgf.jpg", 
      title: t.projects.items.startToSwim.title,
      description: t.projects.items.startToSwim.description,
      link: null
    },
    {
      image: "/images/pic03.jpg",
      title: t.projects.items.trainingCamps.title,
      description: t.projects.items.trainingCamps.description, 
      link: null
    },
    {
      image: "/images/rdmlogo.png",
      title: t.projects.items.rocDuMaroc.title,
      description: t.projects.items.rocDuMaroc.description,
      link: "https://www.rocdumaroc.com/"
    },
    {
      image: "/images/pic02.jpg",
      title: t.projects.items.gramchallenge.title,
      description: t.projects.items.gramchallenge.description,
      link: "https://gramchallenge.com"
    }
  ]

  return (
    <section id="projects" className="border-t-4 border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h3 className="text-4xl font-bold text-gray-800 mb-6">{t.projects.title}</h3>
        <p className="text-lg text-gray-600 mb-12">
          {t.projects.intro}
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
                        {t.projects.linkTexts.workingAsCoach}{' '}
                        <a 
                          href="https://www.gramchallenge.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Gramchallenge.com
                        </a>
                        {' '}{t.projects.linkTexts.between2020And2024}
                      </>
                    ) : project.description.includes('TrainingPeaks.com') ? (
                      <>
                        {t.projects.linkTexts.plansAvailableOn}{' '}
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
                        {t.projects.linkTexts.coachAt}{' '}
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