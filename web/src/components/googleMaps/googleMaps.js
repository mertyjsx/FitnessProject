import React, { useEffect, useState } from "react";
import {
  GoogleMap,

  InfoWindow, Marker, withGoogleMap,
  withScriptjs
} from "react-google-maps";
import {
  geocodeByAddress,

  getLatLng
} from 'react-places-autocomplete';


function Map(props) {
  const [selectedPark, setSelectedPark] = useState(null);
  const [centerLocation, centerLocationSet] = useState({ lat: 28.5383355, lng: -81.3792365 });
  const [markArray, setmarkArray] = useState([])
  const [open, setopen] = useState(true)

  const DetermineMarks = async () => {
    let MarkArray = []

    props.props.filteredResult && props.props.filteredResult.map(async item => {

      await geocodeByAddress(`${item.businessCity} ${item.businessZip}, USA`)
        .then(async results => getLatLng(results[0]))
        .then(latLng => {

          MarkArray.push({ location: latLng, name: item.firstName, lastname: item.lastName, city: item.businessCity })



        })
        .catch(error => console.error('Error', error));


    }
    )

    console.log(MarkArray)


  }

  async function processArray() {
    // map array to promises
    let MarkArray = []
    const promises = props.props.filteredResult && props.props.filteredResult.map(async item =>


      geocodeByAddress(`${item.businessCity} ${item.businessZip}, USA`)
        .then(async results => getLatLng(results[0]))
        .then(latLng => {

          MarkArray.push({ location: latLng, name: item.firstName, lastname: item.lastName, city: item.businessCity })



        }).catch(error => console.error('Error', error))



    )






    // wait until all promises are resolved
    await Promise.all(promises);
    setmarkArray(MarkArray);

  }





  useEffect(() => {









    if (markArray.length > 0) {

      centerLocationSet(markArray[0].location)


    }



  }, [markArray])

  useEffect(() => {





    processArray()







  }, [])


  console.log(markArray)
  console.log(centerLocation)
  return (


    <GoogleMap
      defaultZoom={10}
      defaultCenter={centerLocation}
      center={centerLocation}
    >
      {markArray.map(item => {



        return (


          <Marker
            key={item.name}
            position={item.location}
            onClick={() => {

              setSelectedPark(item);
            }}
          >

            {selectedPark === item &&
              <InfoWindow
                key={selectedPark.name}

                onCloseClick={() => {
                  setSelectedPark(null);

                }}



              >
                <div onClick={() => setopen(false)}>

                  <h3> {selectedPark.name}</h3>
                  <h3> {selectedPark.lastname}</h3>
                  <h3>  {selectedPark.city}</h3>
                </div>


              </InfoWindow>


            }


          </Marker>



        )
      }




      )}








    </GoogleMap>
  );









}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function App(props) {
  return (


    <MapWrapped
      props={props}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBffpI8hvEPuICCsaEkV6dIl-gOW-4E49w`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />

  );
}