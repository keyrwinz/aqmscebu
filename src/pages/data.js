import React, {
  useState, useEffect, useRef, useContext,
} from 'react'
import styled from 'styled-components'
import { TablePagination, IconButton } from '@material-ui/core/'
import ResetIcon from '@material-ui/icons/Autorenew'
import FirebasePaginator from '../components/Firebase/firebase-paginator'
import SEO from '../components/seo'
import Layout from '../components/layout'
import { AppCtx } from '../../provider'
import Firebase from '../components/Firebase/firebase'
import SignInModal from '../components/Feedback/SignInModal'
import SearchBar from '../components/Others/SearchBar'
import Switch from '../components/Switch'
import RenderData from '../components/Tables/RenderData'
import Color from '../components/Theme/ColorPallete'
import Alert from '../components/Utils/alert'

const DownloadData = () => {
  const { user, node } = useContext(AppCtx)
  const [loading, setLoading] = useState(true)
  const [reset, setReset] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [alert, setAlert] = useState({
    open: false,
    message: '',
  })

  // Refs
  const paginatorRef = useRef(null)
  const inputPageRef = useRef(null)

  // Sign-in Modal
  const [modalState, setModalState] = useState(false)
  const setModalStateHandler = () => setModalState(true)

  // Switch for realtime mode
  const [realtimeMode, setRealtimeMode] = useState(false)
  const setRealtimeModeHandler = (_, isRealtimeMode) => {
    if (isRealtimeMode) {
      console.log({ isRealtimeMode })
    }
    setRealtimeMode(isRealtimeMode)
    setAlert({ open: true, message: 'Realtime mode is currently in development', severity: 'info' })
  }

  useEffect(() => {
    if (user === null) setModalState(true)
    else setModalState(false)

    setLoading(true)
    setPage(0)

    const firebaseDB = Firebase.database()
    const nodeRef = firebaseDB.ref(`aqmnodes/${node}/states`)
    const options = {
      pageSize: rowsPerPage,
      finite: true,
      retainLastPage: false,
      auth: user?.token || null,
    }
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
    return () => {
      paginator.off('value', firebaseCallback)
    }
  }, [node, user, rowsPerPage, reset])

  /**
   * CHANGING ROW SIZE HANDLER
   */
  const onChangeRowsPerPageHandler = ({ value }) => {
    if (loading) return
    if (value === rowsPerPage) return
    setRowsPerPage(value)
    setPage(0)
  }

  /**
   * GOTO PAGE HANDLER
   */
  const maxPageNum = paginatorRef.current?.pageCount || 0
  const totalNumberOfData = paginatorRef.current?.totalKeys || 0
  const goToPageHandler = () => {
    if (inputPageRef.current && inputPageRef.current.value !== '') {
      const { value } = inputPageRef.current
      const currentPage = paginatorRef.current.page.pageNumber

      // set page input validation
      if (+value === currentPage || parseInt(value, 10) === currentPage) return
      if ((+value > maxPageNum || parseInt(value, 10) > maxPageNum)
          || (+value <= 0 || parseInt(value, 10) <= 0)) {
        setAlert({ open: true, message: `Page must only be in 1 to ${maxPageNum} range.` })
        return
      }

      setAlert({ ...alert, open: false })
      setLoading(true)
      setPage(value - 1)
      paginatorRef.current.goToPage(value)
    } else {
      setAlert({ open: true, message: 'Invalid page number. Please try again.' })
    }
  }
  // ON GOTO PAGE INPUT -> 'ENTER' EVENT
  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') goToPageHandler()
  }

  /**
   * NEXT & PREVIOUS PAGE HANDLER
   */
  const onChangePageHandler = (_, newPage) => {
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

  /**
   * RESET HANDLER
   */
  const onResetHandler = () => {
    if (paginatorRef.current && !realtimeMode) {
      setReset(!reset)
    } else {
      console.log('Reset for realtime mode')
    }
  }

  // console.log({ paginatorRef })

  if (paginatorRef.current && inputPageRef.current) {
    const { pageNumber } = paginatorRef.current
    inputPageRef.current.value = pageNumber || 0
  }

  return (
    <Layout>
      <SEO title="Data" />
      <Alert open={alert.open} setOpen={setAlert} message={alert.message} severity={alert.severity || 'warning'} />
      <SignInModal
        open={modalState}
        setOpen={setModalState}
        title="You are not authenticated"
        description="Sign in now to view data"
      />
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
                    onKeyDown={handleKeyDown}
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
              <div className="nav-item d-flex" style={{ flexGrow: 1, color: Color.whiteColor }}>
                <IconButton aria-label="close" onClick={onResetHandler}>
                  <ResetIcon color="secondary" />
                </IconButton>
                <Switch
                  style={{ margin: '0px 0px 0px auto', paddingRight: '10px' }}
                  label="Realtime Mode"
                  state={realtimeMode}
                  setState={setRealtimeModeHandler}
                />
              </div>
            </div>
          </div>
          <div className="row table-row">
            <div className="data-table" style={{ color: 'black', overflowX: 'auto' }}>
              <RenderData
                data={data}
                pageSize={rowsPerPage}
                loading={loading}
                notAuth={user === null}
                showModal={setModalStateHandler}
              />
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
