import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactPaginate from 'react-paginate'
// import styled from 'styled-components'
// import { useTable, usePagination, useSortBy } from 'react-table'

// const Styles = styled.div`
//   padding: 1rem;
//   color: white;

//   table {
//     border-spacing: 0;
//     border: 1px solid white;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid white;
//       border-right: 1px solid white;

//       :last-child {
//         border-right: 0;
//       }
//     }
//   }

//   .pagination {
//     padding: 0.5rem;
//   }
// `

// const Table = ({ sortBy, columns, data }) => {
//   const {
//     toggleSortBy,
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     prepareRow,
//     page,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     pageCount,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: 0 },
//     },
//     useSortBy,
//     usePagination
//   )

//   useEffect(() => {
//     if (sortBy.length) {
//       toggleSortBy(sortBy[0].timestamp, sortBy[0].desc, false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [sortBy]);

//   // Render UI for table
//   return (
//     <>
//       <table {...getTableProps()}>
//         <thead>
//           {headerGroups.map(headerGroup => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map(column => (
//                 // <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                 <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                   {column.render('Header')}
//                   {/* Add a sort direction indicator */}
//                   <span>
//                     {column.isSorted
//                       ? column.isSortedDesc
//                         ? ' 🔽'
//                         : ' 🔼'
//                       : ''}
//                   </span>
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {page.map((row, i) => {
//             prepareRow(row)
//             return (
//               <tr {...row.getRowProps()}>
//                 {row.cells.map(cell => {
//                   if(cell.column.Header === 'Timestamp'){
//                     cell.value = cell.value ? cell.value.toString() : null
//                   }
//                   return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                 })}
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>

//       {/* pagination */}
//       <div className="pagination">
//         <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//           {'<<'}
//         </button>{' '}
//         <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//           {'<'}
//         </button>{' '}
//         <button onClick={() => nextPage()} disabled={!canNextPage}>
//           {'>'}
//         </button>{' '}
//         <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//           {'>>'}
//         </button>{' '}
//         <span>
//           Page{' '}
//           <strong>
//             {pageIndex + 1} of {pageOptions.length}
//           </strong>{' '}
//         </span>
//         <span>
//           | Go to page:{' '}
//           <input
//             type="number"
//             defaultValue={pageIndex + 1}
//             onChange={e => {
//               const page = e.target.value ? Number(e.target.value) - 1 : 0
//               gotoPage(page)
//             }}
//             style={{ width: '100px' }}
//           />
//         </span>{' '}
//         <select
//           value={pageSize}
//           onChange={e => {
//             setPageSize(Number(e.target.value))
//           }}
//         >
//           {[10, 20, 30, 40, 50].map(pageSize => (
//             <option key={pageSize} value={pageSize}>
//               Show {pageSize}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   )
// }

// const App = ({data}) => {

//   useEffect(() => {
//     console.log('updated!')
//   }, [data])

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Air Quality Data',
//         columns: [{
//             Header: 'PM2.5',
//             accessor: 'p2'
//           }, {
//             Header: 'PM10',
//             accessor: 'p1',
//           }, {
//             Header: 'NO2',
//             accessor: 'n',
//           }, {
//             Header: 'SO2',
//             accessor: 's',
//           }, {
//             Header: 'Humidity',
//             accessor: 'h',
//           }, {
//             Header: 'Temperature',
//             accessor: 'te',
//           }, {
//             Header: 'Timestamp',
//             accessor: 'ti'
//           }
//         ],
//       }
//     ],
//     []
//   )

//   return (
//     <Styles>
//       <Table sortBy={'timestamp'} columns={columns} data={data} />
//     </Styles>
//   )
// }

// export default App

const RenderData = ({ data }) => {
  const [displayData, setDisplayData] = useState([])

  let slice = {}
  // show per page
  const perPage = 10

  useEffect(() => {
    setDisplayData(data.slice(0, perPage))
  }, [data])

  const onPageClick = (args) => {
    const { selected } = args
    const start = Math.ceil(selected * perPage)
    const end = start + perPage

    slice = { f: start, s: end }

    // if last page
    if (selected + 1 === Math.ceil(data.length / perPage)) {
      slice = { f: start, s: data.length - 1 }
    }

    setDisplayData(data.slice(slice.f, slice.s))
  }

  return (
    <>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">
              PM
              <sub>2.5</sub>
            </th>
            <th scope="col">
              PM
              <sub>10</sub>
            </th>
            <th scope="col">
              NO
              <sub>2</sub>
            </th>
            <th scope="col">
              SO
              <sub>2</sub>
            </th>
            <th scope="col">Humidity</th>
            <th scope="col">Temperature</th>
            <th scope="col">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((d, index) => {
            // let strTime = String(parseInt(d.timestamp))
            // let multiplier = strTime.length === 10 ? 1000 : 1
            const multiplier = 1000
            const epochTime = new Date(d.ti * multiplier)
            const timestamp = epochTime.toLocaleString('en-GB', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: true,
            })
            return (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={index}>
                <td>{d.p2 ? d.p2 : 'No data'}</td>
                <td>{d.p1 ? d.p1 : 'No data'}</td>
                <td>{d.n ? d.n : 'No data'}</td>
                <td>{d.s ? d.s : 'No data'}</td>
                <td>{d.h ? d.h : 'No data'}</td>
                <td>{d.te ? d.te : 'No data'}</td>
                <td>{d.ti ? timestamp : 'No data'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <ReactPaginate
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination mypagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        pageCount={data.length / 10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(args) => onPageClick(args)}
        subContainerClassName="pages pagination"
      />
    </>
  )
}

RenderData.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
}

RenderData.defaultProps = {
  data: [],
}

export default RenderData
