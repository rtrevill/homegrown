import {  APIProvider, AdvancedMarker, Map, Pin, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useState, useCallback, useEffect } from "react";


function LocalMap(props){
    const [importedMarkers, setImportedMarkers] = useState([]);


    // console.log(importedMarkers)
    // console.log(props.produce[0]._id)


    useEffect(()=> {
        const rejigLocations = props.produce.map((location)=>{
            return(
                {
                    key: location.address,
                    location: {lat: location.latitude, lng: location.longitude},
                    produce: location.userRef.currentproduce,
                    id: location._id
                }
            )
        })
        setImportedMarkers(rejigLocations)
    },[props.produce])

    const MarkerWithInfoWindow = ({name, position, produce, locationId}) => {
        // `markerRef` and `marker` are needed to establish the connection between
        // the marker and infowindow (if you're using the Marker component, you
        // can use the `useMarkerRef` hook instead).
        // console.log(id)
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
                <p>{name}</p>
                <ul>
                  {
                    produce.map((item)=>{ 
                      return(
                        <li>{item.producetype.produce} - {item.producetype.variant}</li>
                      )
                    })
                  }  
                </ul>
                <a onClick={()=>props.showModal(locationId)}>More info</a>
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
                    importedMarkers ? importedMarkers.map(({key, location, produce, id}) => (
                        <MarkerWithInfoWindow 
                          name={key} 
                          position={location} 
                          produce={produce}
                          locationId={id}
                          key={key}/>
                    )) : <></>
                }
            </Map>
        </div>
        </APIProvider>
    )
};

export default LocalMap