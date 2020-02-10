// import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';



// const ApexChart = ({title, unit}) => {

//   const data = [
//     [1484418600000, 23],
//     [1484505000000, 20],
//     [1484591400000, 21],
//     [1484677800000, 19],
//     [1484764200000, 22],
//     [1484850600000, 20],
//     [1484937000000, 21],
//     [1485023400000, 18],
//     [1485109800000, 29],
//     [1485196200000, 19],
//     [1485282600000, 23],
//     [1485369000000, 21]
//   ]

//   const graphData = {
//     series: [{
//       name: 'XYZ MOTORS',
//       data: data
//     }],
//     options: {
//       chart: {
//         type: 'area',
//         stacked: false,
//         height: 350,
//         foreColor: 'red',
//         zoom: {
//           type: 'x',
//           enabled: true,
//           autoScaleYaxis: true
//         },
//         toolbar: {
//           autoSelected: 'zoom'
//         }
//       },
//       dataLabels: {
//         enabled: true
//       },
//       markers: {
//         size: 0,
//       },
//       title: {
//         text: title || 'No title',
//         align: 'left',
//         style: {
//           fontSize:  '14px',
//           fontWeight:  'bold',
//           fontFamily:  undefined,
//           color:  'red'
//         },
//       },
//       fill: {
//         type: 'gradient',
//         gradient: {
//           shadeIntensity: 1,
//           inverseColors: false,
//           opacityFrom: 0.5,
//           opacityTo: 0,
//           stops: [0, 90, 100]
//         },
//       },
//       yaxis: {
//         labels: {
//           formatter: function (val) {
//             return (val / 1000000).toFixed(0);
//           },
//         },
//         title: {
//           text: unit || 'No unit'
//         },
//       },
//       xaxis: {
//         type: 'datetime',
//       },
//       tooltip: {
//         style: {
//           fontSize: '12px',
//           fontFamily: undefined,
//           color: 'red',
//           fontColor: 'red'
//         },
//         x: {
//             show: true,
//             color: 'red'
//         },
//         shared: false,
//         y: {
//           formatter: function (val) {
//             return val
//           }
//         }
//       }
//     },
//   };
  

//   return (
//     <div id="chart">
//       <ReactApexChart options={graphData.options} series={graphData.series} type="area" height={350} />
//     </div>
//   )
// }

// export default ApexChart;
