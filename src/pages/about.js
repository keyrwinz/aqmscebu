/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/layout'
import Color from '../components/Theme/ColorPallete'
import SEO from '../components/seo'

const DownloadData = () => {
  const author = useStaticQuery(graphql`
    query AuthorQuery2 {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Download Data" />
      <Style>
        <div className="container-sm">
          <div className="row about-section">
            <center>
              <h1>Under development</h1>
            </center>
          </div>
          <div className="row">
            <div className="col">
              <div className="footer borderbox" style={{ color: 'white' }}>
                ©
                { new Date().getFullYear() }
                , Built by
                &nbsp;
                <a href="#download-data">
                  {author.site.siteMetadata.author}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Style>
    </Layout>
  )
}

const Style = styled.div`
  .about-section {
    min-height: 100vh;
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${Color.thirdColor};
    min-height: 91px;
  }

  .borderbox {
    border-radius: 3px;
    border: 1px solid ${Color.fourthColor}33;
    background: ${Color.thirdColor};
    padding: 10px;
  }
`

export default DownloadData
