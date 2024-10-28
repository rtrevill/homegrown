import {  APIProvider, AdvancedMarker, Map, Pin, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useState, useCallback, useEffect } from "react";


function LocalMap(props){
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
                <p>InfoWindow content!{name}</p>
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
                                {
                    importedMarkers ? importedMarkers.map(({key, location}) => (
                        <MarkerWithInfoWindow name={key} position={location} key={key}/>
                    )) : <></>
                }
            </Map>
        </div>
        </APIProvider>
    )
};

export default LocalMap