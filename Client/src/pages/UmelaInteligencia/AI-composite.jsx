import React from 'react'

import FlipText from './Header'
import FineTuningSection from './AI-concept'
import ThreeCardSection from './AI-models'
import AIFintechBlog from './AiFintechBlog'


const AiComposite = () => {
  return (
    <div>
      <FlipText/>
      <FineTuningSection/>
      <ThreeCardSection/>
      <AIFintechBlog/>
    </div>
  )
}

export default AiComposite
