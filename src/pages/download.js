/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import FirebasePaginator from 'firebase-paginator'
import Firebase from '../components/Firebase/firebase'
import Nodes from '../components/GoogleMap/AqmsNodes'
import Layout from '../components/layout'
import Color from '../components/Theme/ColorPallete'
import RenderData from '../components/RenderData'
import SEO from '../components/seo'

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
  const [pageSize, setPageSize] = useState(10)
  const paginatorRef = useRef(null)
  const inputPageRef = useRef(null)

  const options = {
    pageSize,
    finite: true,
    retainLastPage: false,
  }

  useEffect(() => {
    const firebaseDB = Firebase.database()
    const nodeRef = firebaseDB.ref('aqmnodes/test-data/states')
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

  const goToPageHandler = () => {
    if (inputPageRef.current && inputPageRef.current.value !== '') {
      const { value } = inputPageRef.current
      console.log({ value })
      paginatorRef.current.goToPage(value)
    } else {
      // eslint-disable-next-line no-alert
      alert('Invalid page number. Please try again.')
    }
  }

  const onNextHandler = () => {
    if (paginatorRef.current) {
      paginatorRef.current.next()
    }
  }

  console.log({ paginatorRef })
  // console.log({ inputPageRef })

  let GotoPageButton = (
    <button
      className="input-group-text"
      type="button"
      disabled
    >
      Goto page
    </button>
  )

  let disableFirstPageBtn = 'disabled'
  let disableLastPageBtn = 'disabled'
  let pageCounter = 0
  if (paginatorRef.current) {
    const { isLastPage, pageCount, pageNumber } = paginatorRef.current
    disableLastPageBtn = isLastPage ? 'disabled' : ''
    disableFirstPageBtn = pageNumber === 1 ? 'disabled' : ''
    pageCounter = pageCount

    if (inputPageRef.current) {
      inputPageRef.current.removeAttribute('disabled')
      inputPageRef.current.value = paginatorRef.current.pageNumber
    }

    GotoPageButton = (
      <button
        className="input-group-text blue"
        type="button"
        onClick={() => goToPageHandler()}
      >
        Goto page
      </button>
    )
  }

  return (
    <Layout>
      <SEO title="Download Data" />
      <Style>
        <div className="container-sm">
          <div className="row">
            <div className="d-flex bd-highlight w-100 headers">
              <div className="p-2 flex-grow-1 bd-highlight">
                <div className="input-group custom-select-group">
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
              <div className="p-2 d-flex">
                <div className="bd-highlight">
                  <ul className="pagination">
                    <li className={`page-item ${disableFirstPageBtn}`}>
                      <button
                        style={{ background: `${disableFirstPageBtn}` }}
                        className="page-link"
                        type="button"
                        aria-label="Previous"
                        onClick={() => onNextHandler()}
                      >
                        <strong aria-hidden="true">&laquo;</strong>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="input-group page-input">
                  <div className="input-group-prepend">
                    {GotoPageButton}
                  </div>
                  <input
                    ref={inputPageRef}
                    type="number"
                    className="form-control"
                    aria-label="Goto page"
                    min="1"
                    max={pageCounter}
                    disabled
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">
                      {`/ ${pageCounter}`}
                    </span>
                  </div>
                </div>
                <div className="bd-highlight">
                  <ul className="pagination">
                    <li className={`page-item ${disableLastPageBtn}`}>
                      <button
                        style={{ background: `${disableLastPageBtn}` }}
                        className="page-link"
                        type="button"
                        aria-label="Next"
                        onClick={() => onPrevHandler()}
                      >
                        <strong aria-hidden="true">&raquo;</strong>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ marginRight: '-10px' }}>
            <div className="col data-table" style={{ color: 'black', overflowX: 'auto' }}>
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
  .blue {
    color: #007bff;
  }

  .custom-select-group {
    max-width: 250px;
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

  ul {
    margin-left: 0;
  }

  .input-group {
    flex-wrap: nowrap;
  }

  .input-group * {
    font-size: 0.8rem;
  }

  .page-input {
    max-width: 300px;
    margin: 0 5px;
  }

  .page-input * {
    height: 42px;
  }

  .page-link strong {
    font-family: -webkit-pictograph;
  }

  @media (max-width: 575px) {
    .headers {
      flex-direction: column;
    }
    .table {
      font-size: 0.8rem;
    }
  }
`

export default DownloadData
