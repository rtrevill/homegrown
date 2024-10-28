import {  APIProvider, AdvancedMarker, Map, Pin, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useState, useCallback, useEffect } from "react";


const locations = [
    {key: 'operaHouse', location: { lat: -33.8567844, lng: 151.213108  }},
    {key: 'tarongaZoo', location: { lat: -33.8472767, lng: 151.2188164 }},
    {key: 'manlyBeach', location: { lat: -33.8209738, lng: 151.2563253 }},
    {key: 'hyderPark', location: { lat: -33.8690081, lng: 151.2052393 }},
    {key: 'theRocks', location: { lat: -33.8587568, lng: 151.2058246 }},
    {key: 'circularQuay', location: { lat: -33.858761, lng: 151.2055688 }},
    {key: 'harbourBridge', location: { lat: -33.852228, lng: 151.2038374 }},
    {key: 'kingsCross', location: { lat: -33.8737375, lng: 151.222569 }},
    {key: 'botanicGardens', location: { lat: -33.864167, lng: 151.216387 }},
    {key: 'museumOfSydney', location: { lat: -33.8636005, lng: 151.2092542 }},
    {key: 'maritimeMuseum', location: { lat: -33.869395, lng: 151.198648 }},
    {key: 'kingStreetWharf', location: { lat: -33.8665445, lng: 151.1989808 }},
    {key: 'aquarium', location: { lat: -33.869627, lng: 151.202146 }},
    {key: 'darlingHarbour', location: { lat: -33.87488, lng: 151.1987113 }},
    {key: 'barangaroo', location: { lat: - 33.8605523, lng: 151.1972205 }},
  //   {key: 'uluru', location: {lat: -25.344, lng: 131.031}}
  ];

  const markers = [
    {
      id: 1,
      name: "Chicago, Illinois",
      position: { lat: 41.881832, lng: -87.623177 }
    },
    {
      id: 2,
      name: "Denver, Colorado",
      position: { lat: 39.739235, lng: -104.99025 }
    },
    {
      id: 3,
      name: "Los Angeles, California",
      position: { lat: 34.052235, lng: -118.243683 }
    },
    {
      id: 4,
      name: "New York, New York",
      position: { lat: 40.712776, lng: -74.005974 }
    }
  ];
  


function LocalMap(props){
    const [activeMarker, setActiveMarker] = useState(null);
    const [importedMarkers, setImportedMarkers] = useState([]);


    console.log(importedMarkers)

    useEffect(()=> {
        console.log(props.locations?.findProdLocations)
        const rejigLocations = props.locations?.findProdLocations.map((location)=>{
            return(
                {
                    key: location.address,
                    location: {lat: location.latitude, lng: location.longitude}
                }
            )
        })
        console.log(rejigLocations)
        setImportedMarkers(rejigLocations)
    },[props.locations])

    const MarkerWithInfoWindow = ({name, position}) => {
        // `markerRef` and `marker` are needed to establish the connection between
        // the marker and infowindow (if you're using the Marker component, you
        // can use the `useMarkerRef` hook instead).
        const [markerRef, marker] = useAdvancedMarkerRef();
      
        const [infoWindowShown, setInfoWindowShown] = useState(false);
      
        // clicking the marker will toggle the infowindow
        const handleMarkerClick = useCallback(
          () => setInfoWindowShown(isShown => !isShown),
          []
        );
      
        // if the maps api closes the infowindow, we have to synchronize our state
        const handleClose = useCallback(() => setInfoWindowShown(false), []);
      
        return (
          <>
            <AdvancedMarker
              ref={markerRef}
              position={position}
              onClick={handleMarkerClick}
            />
      
            {infoWindowShown && (
              <InfoWindow anchor={marker} onClose={handleClose}>
                <h2>InfoWindow content!{name}</h2>
                <p>Some arbitrary html to be rendered into the InfoWindow.</p>
                <a href="http://www.google.com.au">Click Here!!</a>
              </InfoWindow>
            )}
          </>
        );
      };
    

    return(
        <APIProvider apiKey={'AIzaSyAjLNQI2BHb9fphLaIfxWlJ2UleP0SY8WE'} onLoad={() => console.log('Maps API has loaded.')}>
        <h3>Maps Here</h3>
        <div style={{width: 600, height: 400}}>
            <Map
                        defaultZoom={13}
                        defaultCenter={ { lat: -36.4412949, lng: 146.4325216 } }
                        mapId='c5f3ac66e27bd3fc'
                        onCameraChanged={ (ev) =>
                            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
                        }            
            >
                {/* {
                    locations.map(({key, location}) => (
                        <MarkerWithInfoWindow name={key} position={location} key={key}/>
                    ))
                } */}
                                {
                    importedMarkers ? importedMarkers.map(({key, location}) => (
                        <MarkerWithInfoWindow name={key} position={location} key={key}/>
                    )) : <></>
                }

                {/* {
                    markers.map(({id, name, position})=> (
                        <AdvancedMarker
                            key={id}
                            position={position}
                            title={name}
                        >
                            <Pin background={'#cf34eb'} glyphColor={'#000'} borderColor={'#000'} /> 
                        </AdvancedMarker>
                    ))
                } */}
            </Map>
        </div>
        </APIProvider>
    )
};

export default LocalMap