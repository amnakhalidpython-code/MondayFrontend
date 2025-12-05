import React from 'react'
import FrontPage from '../components/Front'
import Partners from '../components/Partners'
import OnePlatform from "../components/OnePlateform.jsx";
import WorkChallenges from '../components/WorkChalleges.jsx';
import MultipliedByAI from '../components/MultipliedbyAI.jsx';

const HomePage = () => {
  return (
    <div>
      <FrontPage />
      <Partners />
      <OnePlatform />
      <WorkChallenges />
      <MultipliedByAI />
    </div>
  )
}

export default HomePage;
