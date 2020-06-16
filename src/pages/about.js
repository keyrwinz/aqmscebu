import React from 'react'
import styled from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/seo'

const DownloadData = () => (
  <Layout>
    <SEO title="Download Data" />
    <Style>
      <div className="container-sm">
        <div className="row about-section">
          <center>
            <h1>Under development</h1>
          </center>
        </div>
      </div>
    </Style>
  </Layout>
)

const Style = styled.div`
  .about-section {
    min-height: 100vh;
  }
`

export default DownloadData
