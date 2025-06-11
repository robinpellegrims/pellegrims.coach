import { FaCalendarAlt, FaBiking, FaVideo, FaMedal, FaSwimmer, FaSun } from 'react-icons/fa'
import type { Locale } from '@/lib/i18n'
import type { TranslationKey } from '@/lib/translations'

type Props = {
  locale: Locale
  t: TranslationKey
}

export default function Coaching({ t }: Props) {
  const services = [
    {
      icon: <FaCalendarAlt className="text-white" />,
      key: t.coaching.services.swimmingTraining
    },
    {
      icon: <FaBiking className="text-white" />,
      key: t.coaching.services.triathlonTraining
    },
    {
      icon: <FaVideo className="text-white" />,
      key: t.coaching.services.swimmingTechnique
    },
    {
      icon: <FaMedal className="text-white" />,
      key: t.coaching.services.swimmingTechniqueClubs
    },
    {
      icon: <FaSwimmer className="text-white" />,
      key: t.coaching.services.adults
    },
    {
      icon: <FaSun className="text-white" />,
      key: t.coaching.services.trainingCamp
    }
  ]

  return (
    <section id="coaching" className="border-t-4 border-gray-200">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h3 className="text-4xl font-bold text-gray-800 mb-6">{t.coaching.title}</h3>
        <p className="text-lg text-gray-600 mb-12">
          {t.coaching.intro}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-lg">
                {service.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 leading-tight">{service.key}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
