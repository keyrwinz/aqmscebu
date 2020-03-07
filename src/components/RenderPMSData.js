import React, {useState, useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components'
import { useTable, usePagination, useSortBy } from 'react-table'

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
//             accessor: 'pm25'
//           }, {
//             Header: 'PM10',
//             accessor: 'pm10',
//           }, {
//             Header: 'NO2',
//             accessor: 'no2',
//           }, {
//             Header: 'SO2',
//             accessor: 'so2',
//           }, {
//             Header: 'Humidity',
//             accessor: 'humidity',
//           }, {
//             Header: 'Temperature',
//             accessor: 'temp',
//           }, {
//             Header: 'Timestamp',
//             accessor: 'timestamp'
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


const RenderData = ({data}) => {
  const [displayData, setDisplayData] = useState([]);
  
  let slice = {};
  const perPage = 20

  useEffect(() => {
    setDisplayData(data.slice(0, perPage));
  }, [data])

  const onPageClick = args => {
    let selected = args.selected;
    let start = Math.ceil(selected * perPage);
    let end = start + perPage

    slice = {f: start, s: end}

    //if last page
    if(selected + 1 == Math.ceil(data.length/perPage)){
      slice = {f: start, s: data.length - 1}
    }

    setDisplayData(data.slice(slice.f, slice.s))
  }

  return (
    <>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">PM<sub>1</sub></th>
            <th scope="col">PM<sub>25</sub></th>
            <th scope="col">PM<sub>10</sub></th>
            <th scope="col">Index</th>
            <th scope="col">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          { displayData.map((d,index) => {
            let epoch_time = new Date(d.timestamp)
            var timestamp = epoch_time.toLocaleString('en-GB', 
              { month: 'short', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true } );
            return(
              <tr key={index}>
                <td>{d.pm1 ? d.pm1 : 'No data'}</td>
                <td>{d.pm25 ? d.pm25.toFixed(2) : 'No data'}</td>
                <td>{d.pm10 ? d.pm10.toFixed(2) : 'No data'}</td>
                <td>{d.index ? d.index : 'No data'}</td>
                <td>{d.timestamp ? timestamp : 'No data'}</td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
      <ReactPaginate
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        pageCount={data.length / 20}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(args) => onPageClick(args)}
        subContainerClassName={'pages pagination'}
      />
    </>
  )
}

export default RenderData