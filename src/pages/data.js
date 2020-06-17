/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useState, useEffect, useRef, useContext,
} from 'react'
import styled from 'styled-components'
import { TablePagination } from '@material-ui/core/'
import FirebasePaginator from '../components/Firebase/firebase-paginator'
import SEO from '../components/seo'
import Layout from '../components/layout'
import { AppCtx } from '../../provider'
import Firebase from '../components/Firebase/firebase'
import SearchBar from '../components/Others/SearchBar'
import RenderData from '../components/Tables/RenderData'
import Color from '../components/Theme/ColorPallete'
import Alert from '../components/Utils/alert'

const DownloadData = () => {
  const { user, node } = useContext(AppCtx)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [alert, setAlert] = useState({
    open: false,
    message: '',
  })
  const paginatorRef = useRef(null)
  const inputPageRef = useRef(null)

  const options = {
    pageSize: rowsPerPage,
    finite: true,
    retainLastPage: false,
    auth: user?.token || null,
  }

  useEffect(() => {
    setLoading(true)
    setPage(0)
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
        setLoading(false)
      }
    }

    paginator.on('value', firebaseCallback)

    // paginator.listen((eventName, eventPayload) => {
    //   console.log(`Fired ${eventName} with the following payload: `, eventPayload)
    // })

    return () => {
      paginator.off('value', firebaseCallback)
    }
  }, [node, user, rowsPerPage])

  const onChangeRowsPerPageHandler = ({ value }) => {
    if (loading) return
    if (value === rowsPerPage) return
    setRowsPerPage(value)
    setPage(0)
  }

  const onChangePageHandler = (_, newPage) => {
    console.log(`New Page: ${newPage} === Current Page: ${page}`)
    if (newPage < page && paginatorRef.current) {
      setLoading(true)
      paginatorRef.current.next()
    }
    if (newPage > page && paginatorRef.current) {
      setLoading(true)
      paginatorRef.current.previous()
    }
    setPage(newPage)
  }

  const goToPageHandler = () => {
    if (inputPageRef.current && inputPageRef.current.value !== '') {
      const { value } = inputPageRef.current
      const currentPage = paginatorRef.current.page.pageNumber

      if (+value === currentPage || parseInt(value, 10) === currentPage) return

      console.log({ value })
      setLoading(true)
      setPage(value - 1)
      paginatorRef.current.goToPage(value)
    } else {
      setAlert({ open: true, message: 'Invalid page number. Please try again.' })
    }
  }

  console.log({ paginatorRef })
  // console.log({ inputPageRef })

  const maxPageNum = paginatorRef.current?.pageCount || 0
  const totalNumberOfData = paginatorRef.current?.totalKeys || 0

  if (paginatorRef.current && inputPageRef.current) {
    const { pageNumber } = paginatorRef.current
    inputPageRef.current.value = pageNumber
  }

  return (
    <Layout>
      <SEO title="Data" />
      <Alert open={alert.open} setOpen={setAlert} message={alert.message} />
      <Style>
        <div className="container-sm">
          <div className="row">
            <div className="d-flex w-100 nav">
              <div className="nav-item flex-grow-1">
                <SearchBar />
              </div>
            </div>
            <div className="d-flex w-100 nav">
              <div className="nav-item d-flex">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <button
                      disabled={!!loading}
                      className={`input-group-text gotopage-btn ${loading ? 'disabled' : ''}`}
                      type="button"
                      onClick={() => goToPageHandler()}
                    >
                      Goto page
                    </button>
                  </div>
                  <input
                    placeholder="0"
                    ref={inputPageRef}
                    type="number"
                    className="form-control gotopage-input"
                    aria-label="Goto page"
                    min="1"
                    max={maxPageNum}
                    disabled={!!loading}
                  />
                  <div className="input-group-append">
                    <span className="input-group-text gotopage-maxcount">
                      {`/ ${maxPageNum || 0}`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="nav-item d-flex">
                <TablePagination
                  variant="outlined"
                  component="div"
                  labelRowsPerPage="Size"
                  rowsPerPageOptions={[10, 50, 100]}
                  page={page}
                  count={totalNumberOfData || 0}
                  rowsPerPage={rowsPerPage}
                  onChangePage={onChangePageHandler}
                  onChangeRowsPerPage={(e) => onChangeRowsPerPageHandler(e.target)}
                />
              </div>
            </div>
          </div>
          <div className="row table-row">
            <div className="data-table" style={{ color: 'black', overflowX: 'auto' }}>
              <RenderData data={data} pageSize={rowsPerPage} loading={loading} />
            </div>
          </div>
        </div>
      </Style>
    </Layout>
  )
}

const Style = styled.div`
  .input-group {
    flex-wrap: nowrap;
  }

  .input-group * {
    font-size: 0.8rem;
  }

  .page-input * {
    height: 42px;
  }

  .nav-item {
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }

  .gotopage-btn {
    background: ${Color.thirdColor};
    color: ${Color.whiteColor};
  }
  .gotopage-btn.disabled {
    cursor: not-allowed;
    pointer-events: all !important;
  }
  .gotopage-btn:hover {
    background: ${Color.secondaryColor};
    color: ${Color.blackColor};
  }
  .gotopage-input {
    background: transparent;
    color: ${Color.whiteColor};   
  }
  .gotopage-maxcount {
    background: ${Color.thirdColor};
    color: ${Color.whiteColor};
  }


  @media (max-width: 575px) {
    .nav {
      flex-direction: column;
    }
    .MuiToolbar-gutters {
      padding: 0px;
    }
    .table {
      font-size: 0.8rem;
    }
    .table-row {
      margin: 0 -10px;
    }
  }
  @media (min-width: 576px) {
    .nav-item {
      padding: 0.5rem 0px;
    }
  }

  .MuiFormControl-root * {
    color: ${Color.whiteColor};
  }
  .MuiFormLabel-root.Mui-focused, .MuiFormLabel-root.MuiSelect-filled {
    color: ${Color.secondaryColor};
  }
  .mui-formcontrol {
    width: 100%;
  }
  .MuiFormHelperText-root {
    color: ${Color.secondaryColor};
  }

  .MuiTablePagination-root {
    color: ${Color.whiteColor};
  }

  .data-table {
    width: 100%;
    min-height: 500px;
    max-height: 800px;
    overflow: auto;
  }
  .data-table::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: black;
  }

  .data-table::-webkit-scrollbar {
    width: 5px;
    background-color: black;
  }

  .data-table::-webkit-scrollbar-thumb {
    background-color: #99ddff;

    background-image: -webkit-gradient(
      linear,
      0 0,
      0 100%,
      color-stop(0.5, rgba(255, 255, 255, 0.2)),
      color-stop(0.5, transparent),
      to(transparent)
    );
  }
  thead tr:nth-child(1) th {
    background: ${Color.blackColor};
    position: sticky;
    top: 0;
    z-index: 10;
  }
`

export default DownloadData
