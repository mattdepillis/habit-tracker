import React, { Fragment, useEffect, useState } from 'react'
// import ReactMarkdown from 'react-markdown'
import Markdown from 'markdown-to-jsx'
// import styled from 'styled-components'

import AboutPageMd from '../assets/AboutPage.md'

const AboutPage = () => {
  // const [pageContent, setPageContent] = useState('')

  // console.log(AboutPageMd.text())

  // const loadPageContent = async () => {
  //   try {
  //     fetch(AboutPageMd)
  //       .then(response => response.text())
  //       .then(text => setPageContent(text))
  //   } catch (err) {
  //     console.error(`error: ${err}`)
  //   } 
  // }

  // useEffect(() => {
  //   if (pageContent === '') loadPageContent()
  // }, [pageContent])

  return(
    <Fragment>
      <Markdown children={AboutPageMd} />
      <p>The about page.</p>
    </Fragment>
  )
}

export default AboutPage