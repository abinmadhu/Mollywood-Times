import React from 'react'
import HeroSection from '../components/HeroSection'
import styles from '../style'
import FeaturedSection from '../components/FeaturedSection'
import TrailerSection from '../components/TrailerSection'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <TrailerSection/>
    </div>
  )
}

export default Home