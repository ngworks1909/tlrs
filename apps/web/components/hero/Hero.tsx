import React from 'react'
import Services from './Services'
import Footer from '@/components/footer/Footer'
import ExploreButton from './ExploreButton'
import { fetchServices } from '@/actions/fetchServices'



export default async function Hero() {
  const services = await fetchServices()
  return (
    <main>
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Tailored Perfection, Just for You
            </h1>
            <p className="mt-6 text-xl">
            Experience the art of bespoke tailoring with Tlrs
            </p>
            <div className="mt-10">
              <ExploreButton/>
            </div>
          </div>
        </section>
        <section id="services" className="py-10 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
          </div>
          <Services services = {services} />
        </section>

        <Footer/>
    </main>
  )
}
