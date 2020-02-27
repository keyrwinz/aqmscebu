import React, {useState, useEffect} from 'react';
import Layout from "../components/layout"
import CSVReader from 'react-csv-reader'
import ReactPaginate from 'react-paginate';

const TestData = () => {
  const [data, setData] = useState([]);
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
    <Layout>
      <div className="container-sm">
        <div className="row">
          <div className="col">
            <CSVReader onFileLoaded={data => setData(data)} />
          </div>
        </div> 
        <div className="row">
          <div className="col">
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">PPM</th>
                  <th scope="col">Temperature</th>
                  <th scope="col">Humidity</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((data, index) => {
                  let time = `${data[8]}:${data[9]}:${data[10]}`
                  return (
                  <tr key={index}>
                    <td>{data[1]}</td>
                    <td>{data[2]}</td>
                    <td>{data[3]}</td>
                    <td>{time}</td>
                  </tr>
                )})}
              </tbody>
            </table>
            <div style={{color: 'black', display: 'flex', justifyContent: 'center'}}>
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
                onClick={() => console.log('clicked')}
                subContainerClassName={'pages pagination'}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="footer borderbox">
              © {new Date().getFullYear()}, Built by
              <a href="#">{``}WAYDSB Thesis2020</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TestData