/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import moment from 'moment'
import FirebasePaginator from 'firebase-paginator'
import Firebase from '../components/Firebase/firebase'
import Nodes from '../components/GoogleMap/AqmsNodes'
import Layout from '../components/layout'
import Color from '../components/Theme/ColorPallete'
import RenderData from '../components/RenderData'
import SEO from '../components/seo'
// import FirestoreData from '../../TEMP_FOLDER/uscsc.json'

const DownloadData = () => {
  const author = useStaticQuery(graphql`
    query AuthorQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)
  console.log('RENDERED!')

  const [data, setData] = useState([])
  const [node, setNode] = useState('usc-mc')
  const [pageSize, setPageSize] = useState(3)
  const paginatorRef = useRef()

  const options = {
    pageSize,
    finite: true,
    retainLastPage: false,
  }

  console.log({ paginatorRef })

  useEffect(() => {
    const firebaseDB = Firebase.database()
    const nodeRef = firebaseDB.ref(`aqmnodes/${node}/states`)
    const paginator = new FirebasePaginator(nodeRef, options)
    paginatorRef.current = paginator

    const firebaseCallback = () => {
      const { collection } = paginator
      if (Object.keys(collection).length !== 0) {
        const entries = Object.entries(collection).reverse()
        const response = entries.map((d) => d[1])
        setData(response)
      }
    }

    paginator.on('value', firebaseCallback)

    // paginator.listen((eventName, eventPayload) => {
    //   console.log(`Fired ${eventName} with the following payload: `, eventPayload)
    // })

    return () => {
      paginator.off('value', firebaseCallback)
    }
  }, [node])

  const onChangeHandler = (value) => setNode(value)
  const onPrevHandler = () => {
    if (paginatorRef.current) {
      paginatorRef.current.previous()
    }
  }
  const onNextHandler = () => {
    if (paginatorRef.current) {
      paginatorRef.current.next()
    }
  }

  let isLastPage = null
  if (paginatorRef.current) {
    isLastPage = paginatorRef.current.isLastPage
  }

  return (
    <Layout>
      <SEO title="Download Data" />
      <Style>
        <div className="container-sm">
          <div className="row">
            <div className="d-flex bd-highlight w-100">
              <div className="p-2 flex-grow-1 bd-highlight">
                <div className="input-group w-25">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="nodeSelection">Node</label>
                  </div>
                  <select
                    className="custom-select"
                    id="nodeSelection"
                    onChange={(e) => onChangeHandler(e.target.value)}
                    value={node}
                  >
                    { Nodes.nodesLoc.map((loc, index) => (
                      <option
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        value={loc.id}
                      >
                        {loc.text}
                      </option>
                    )) }
                  </select>
                </div>
              </div>
              <div className="p-2 bd-highlight">
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      className="page-link"
                      type="button"
                      aria-label="Previous"
                      onClick={() => onNextHandler()}
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="p-2 bd-highlight">
                <ul className="pagination">
                  <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
                    <button
                      style={{ background: `${isLastPage ? 'black' : ''}` }}
                      className="page-link"
                      type="button"
                      aria-label="Next"
                      onClick={() => onPrevHandler()}
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginRight: '-10px' }}>
            <div className="col" style={{ color: 'black', overflowX: 'auto' }}>
              <RenderData data={data} pageSize={pageSize} />
            </div>
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
  .customSelect {
    width: 200px;
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
