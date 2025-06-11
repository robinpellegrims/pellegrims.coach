import Header from '@/components/Header'
import About from '@/components/About'
import Coaching from '@/components/Coaching'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="lg:mr-96">
        <About />
        <Coaching />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
