import {Button, List, Typography, Card } from 'antd'
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import auth from '../utils/auth';


function Profile(){
    const [value, setValue] = useState(null);
    const [coordinates, setCoordinates] = useState({lat:0,lng:0,placeID:null})
    const {loading, error, data} = useQuery(QUERY_USER, {
        variables: {"id": auth.getProfile().data._id},
    });
    
    let listData = [];
      
      error ? console.log("Error"):
      loading ? console.log("Loading"): 
      listData.push({username: data.userDetails.username, email: data.userDetails.email});

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
        data ? (
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
          <div style={{display: 'flex'}}>
          <div>
              <List
                dataSource={listData}
                renderItem={(item) => (
                  <List.Item>
                    <Card title="Username">{item.username}</Card>
                    <Card title="Email">{item.email}</Card>
                  </List.Item>
                )}
                />
          </div>
          <div></div>
          </div>
          <Button>Local products for sale</Button>
          <Button>Advertise new produce</Button>
          <Button>History</Button>
          <Button>Set default location</Button>

        </div>
        ):(
          <h1>Loading</h1>
        ) 
    )
}

export default Profile;