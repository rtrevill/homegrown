import {Button } from 'antd'
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';

function Profile(){
    const [value, setValue] = useState(null);
    const [coordinates, setCoordinates] = useState({lat:0,lng:0,placeID:null})

    // console.log(value, coordinates);

const setCoords = (placeID) => {
    setValue(placeID)
    geocodeByPlaceId(placeID.value.place_id)
    .then(results => {
                    const newLat = results[0].geometry.location.lat();
                    const newLng = results[0].geometry.location.lng()
                    setCoordinates({lat: newLat, lng: newLng, placeID: placeID.value.place_id})
    })
    .catch(error => console.error(error));
}

    return(
        <div>
  <div>
    <GooglePlacesAutocomplete
      apiKey="AIzaSyAjLNQI2BHb9fphLaIfxWlJ2UleP0SY8WE"
      selectProps={{
        value,
        onChange: setCoords,
      }}
    />
  </div>
  <div style={{color: 'white'}}>
    latitude: {coordinates.lat}
    <br></br>
    longitude: {coordinates.lng}

  </div>

        <h1>This is your profile page</h1>
        <Button>Local products for sale</Button>
        <Button>Advertise new produce</Button>
        <Button>History</Button>

        </div>
    )
}

export default Profile;