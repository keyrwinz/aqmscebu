import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
    }}
    >
      <SEO title="404: Not found" />
      <h1>PAGE NOT FOUND</h1>
      <p>
        You just hit a route that doesn&#39;t exist...
        <span role="img" aria-label="Sad Face">😢</span>
      </p>

    </div>
  </Layout>
)

export default NotFoundPage
