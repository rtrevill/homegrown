import {Button, List, Typography } from 'antd'
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import auth from '../utils/auth';


function Profile(){
    const [value, setValue] = useState(null);
    const [coordinates, setCoordinates] = useState({lat:0,lng:0,placeID:null})
    // const [listData, setListData] = useState({username:"",email:""})
    const {loading, error, data} = useQuery(QUERY_USER, {
        variables: {"id": auth.getProfile().data._id},
    });
    
    let listData = [];
    
    console.log(listData);
    // const fillListData = (queryData)=>{
    //     console.log(queryData.userDetails)
    //     // listData.push(queryData.userDetails)
    // }


    error ? console.log("Error"):
    loading ? console.log("Loading"): 
    listData.push(data.userDetails.username, data.userDetails.email);

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
        <div style={{display: 'flex'}}>
        <div>
            <List 
                itemLayout="horizontal"
                dataSource={listData}
                renderItem={(item, index) => (
                    <List.Item>
                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                    </List.Item>
                  )}
            />
                
        </div>
        <div></div>
        </div>
        <Button>Local products for sale</Button>
        <Button>Advertise new produce</Button>
        <Button>History</Button>

        </div>
    )
}

export default Profile;