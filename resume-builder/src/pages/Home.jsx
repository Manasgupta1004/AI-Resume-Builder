import React from 'react'
import Banner from '../components/home/Banner'
import Hero from '../components/home/Hero'
import Feature from '../components/home/features'
import Testimonial from '../components/home/testimonial'
import Calltoaction from '../components/home/calltoaction'
import Footer from '../components/home/footer'
const Home = () => {
  return (
    <div>
      <Banner />
      <Hero />
      <Feature />
      <Testimonial />
      <Calltoaction />
      <Footer />
    </div>
  )
}

export default Home
