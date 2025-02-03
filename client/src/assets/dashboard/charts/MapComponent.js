import React, { useEffect, useState } from "react";
import zoomInImg from "../../img/zoom-in+.svg";
import zoomOutImg from "../../img/zoom-out-.svg";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Sphere,
  Graticule
} from "react-simple-maps";
const geoUrl = "/features.json";
const colorScale = scaleLinear().domain([ 0.29, 0.68 ]).range([ "#A9BDFF", "#3c50e0" ]);






const MapComponent = () => {

  const [data, setData] = useState([]);


  const [zoom, setZoom] = useState(1);
  const handleZoomIn = () => {
      setZoom((prevZoom) => Math.min(prevZoom * 2, 3)); // Increase zoom by a factor of 2, but no more than 4
  };
  const handleZoomOut = () => {
      setZoom((prevZoom) => Math.max(prevZoom / 2, 1)); // Decrease zoom by a factor of 2, but no less than 1
  };
  console.log()


  useEffect(() => {
      csv(`/vulnerability.csv`).then((data) => {
          setData(data);
      });
  }, []);



  return (
    <div>
      <div className="pt-lg-0 pb-lg-3 px-4">
        <ComposableMap projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}>
            
          <Sphere stroke="#FFFFFF" strokeWidth={0.5} />
          <Graticule stroke="#FFFFFF" strokeWidth={0.5} />          
          
          <ZoomableGroup zoom={zoom}>
          {  /***** Your map content goes here *****/
            data.length > 0 && (
                <Geographies geography={geoUrl}>
                {
                    ({ geographies }) => geographies.map((geo) => {

                        const d = data.find((s) => s.ISO3 === geo.id);
        
                        return (
                            <Geography key={geo.rsmKey} geography={geo} fill={d ? colorScale(d["2017"]) : "#3c50e0"} />
                        );
                    })
                }
                </Geographies>
            )
          }
          </ZoomableGroup>
        </ComposableMap>
      </div>
      <div className="d-flex position-relative top-70 column-gap-10 py-0 px-30 mb-3s">
          <button className="zoom-in bg-white d-flex px-0 border-0" onClick={handleZoomIn}>
              <img src={zoomInImg} alt="zoom-in"/>
          </button>
          <button className="zoom-out bg-white d-flex px-0 border-0" onClick={handleZoomOut}>
              <img src={zoomOutImg} alt="zoom-in"/>
          </button>
      </div>
    </div>
  );
};


export default MapComponent;














// import React, { useEffect, useState } from "react";
// import zoomInImg from "../../img/zoom-in+.svg";
// import zoomOutImg from "../../img/zoom-out-.svg";
// import { csv } from "d3-fetch";
// import { scaleLinear } from "d3-scale";
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   ZoomableGroup,
//   Sphere,
//   Graticule
// } from "react-simple-maps";
// // where geographic data is fetched
// const geoUrl = "/features.json";
// // for the color scale used to fill the map based on data values
// const colorScale = scaleLinear().domain([ 0.29, 0.68 ]).range([ "#A9BDFF", "#3c50e0" ]);



// // Create a wrapper component to capture mouse events
// const MapWrapper = ({ children }) => {
//     const [isZoomDisabled, setZoomDisabled] = useState(false);

//     // Function to handle mouse enter event and disable zoom
//     const handleMouseEnter = () => {
//         setZoomDisabled(true);
//     };

//     // Function to handle mouse leave event and enable zoom
//     const handleMouseLeave = () => {
//         setZoomDisabled(false);
//     };

//     return (
//       <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="position-static">
//           <ComposableMap>
//               {children}
//           </ComposableMap>
//       </div>
//     );
// };



// const MapComponent = () => {

//   const [data, setData] = useState([]);
//   const [zoom, setZoom] = useState(1);


//   const handleZoomIn = () => {
//       setZoom((prevZoom) => Math.min(prevZoom * 2, 4)); // Increase zoom by a factor of 2, but no more than 4
//   };
//   const handleZoomOut = () => {
//       setZoom((prevZoom) => Math.max(prevZoom / 2, 1)); // Decrease zoom by a factor of 2, but no less than 1
//   };


//   useEffect(() => {
//       csv(`/vulnerability.csv`).then((data) => {
//           setData(data);
//       });
//   }, []);



//   return (
//     <div>
//       <div className="pt-lg-0 pb-lg-3 px-4">
            
//           <MapWrapper>
//             <Sphere stroke="#FFFFFF" strokeWidth={0.5} />
//             <Graticule stroke="#FFFFFF" strokeWidth={0.5} />       
//             <ZoomableGroup zoom={zoom}>
//               {  /***** Your map content goes here *****/
//                 data.length > 0 && (
//                   // <MapWrapper>
//                     <Geographies geography={geoUrl}>
//                     {
//                         ({ geographies }) => geographies.map((geo) => {

//                             const d = data.find((s) => s.ISO3 === geo.id);
            
//                             return (
//                                 <Geography key={geo.rsmKey} geography={geo} fill={d ? colorScale(d["2017"]) : "#3c50e0"} />
//                             );
//                         })
//                     }
//                     </Geographies>
//                   // </MapWrapper>
//                 )
//               }
//             </ZoomableGroup>
//           </MapWrapper>
//         </div>       
//         <div className="d-flex position-relative top-70 column-gap-10 py-0 px-30 mb-3s">
//           <button className="zoom-in bg-white d-flex px-0 border-0" onClick={handleZoomIn}>
//               <img src={zoomInImg} alt="zoom-in"/>
//           </button>
//           <button className="zoom-out bg-white d-flex px-0 border-0" onClick={handleZoomOut}>
//               <img src={zoomOutImg} alt="zoom-in"/>
//           </button>
//       </div>
//     </div>
//   );
// };


// export default MapComponent;





