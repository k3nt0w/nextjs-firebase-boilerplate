import React from 'react'
import { ExNextPageContext } from 'next'
import { authorize } from 'src/modules/services'

type Props = {}

const About = (_: Props) => {
  return <div>About page</div>
}

About.getInitialProps = async ({ req, res, store }: ExNextPageContext): Promise<void> => {
  await authorize(req, res, store)
}

export default About