import React from 'react'
import Markdown from 'markdown-to-jsx'
// import styled from 'styled-components'

import AboutPageMd from '../assets/AboutPage.md'
import PageContent from '../containers/PageContent'

const AboutPage = () => {
  return(
    <PageContent>
      <Markdown children={AboutPageMd} />
    </PageContent>
  )
}

export default AboutPage