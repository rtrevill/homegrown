import {Button, List, Typography, Card, Modal, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { UPDATE_LOCATION_DETAILS, UPDATE_USER_DETAILS } from '../utils/mutations';
import auth from '../utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import PasswordModal from '../components/PasswordModal';

const { Option } = Select;

function Profile(){
    const [value, setValue] = useState(null);
    const [coordinates, setCoordinates] = useState({lat:0,lng:0,placeID:null})
    const {loading, error, data} = useQuery(QUERY_USER, {
        variables: {"userId": auth.getProfile().data._id},
    });
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [updateLocation, {data: data2, loading: loading2, error: error2}] = useMutation(UPDATE_LOCATION_DETAILS);
    const [updateUser, { data: data3, loading: loading3, error: error3}] = useMutation(UPDATE_USER_DETAILS);
  

    console.log(data)

    const showDrawer = () => {
      setOpenDrawer(true);
    };
    const onClose = () => {
      setOpenDrawer(false);
    };

    const updateDetails = async () => {
      // console.log(lname.value)
      try{
        await updateUser({
          variables: {
            userId: auth.getProfile().data._id,
            firstName: fname.value,
            lastName: lname.value,
            username: username.value,
            email: email.value
          }}) 
      }
      catch(error){
        toast("Email is being used by another user")
        console.log(error)
      }
      // window.location.reload()
      
      setOpenDrawer(false);
    }


    const showModal = () => {
      setOpen(true);
    };
  
    const handleOk = () => {
      setConfirmLoading(true);
      updateLocation({variables: {
        userId: auth.getProfile().data._id,
        lat: coordinates.lat,
        lng: coordinates.lng,
        placeId: coordinates.placeID,
        address: value.label
      }})
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        window.location.reload();
      }, 500);
    };
  
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setOpen(false);
    };

    
    let listData = [];

    console.log(data)

      
      error ? console.log("Error"):
      loading ? console.log("Loading"): 
      listData.push({ username: data.userDetails.username, 
                      email: data.userDetails.email,
                      first_name: data.userDetails.first_name||"",
                      last_name: data.userDetails.last_name||"",
                      default_Location: data.userDetails.produceLocation[0]?.address||""
                    });

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
          <h1>Your profile page</h1>
          <div style={{display: 'flex'}}>
          <div>
              <List
                dataSource={listData}
                renderItem={(item) => (
                  <List.Item>
                    <Card title="Username">{item.username}</Card>
                    <Card title="Email">{item.email}</Card>
                    <Card title="First Name">{item.first_name}</Card>
                    <Card title="Last Name">{item.last_name}</Card>
                    <Card title="Default Location">{item.default_Location}</Card>
                  </List.Item>
                )}
                />
          </div>
          <div></div>
          </div>
          <Button>History</Button>
          <Button type="primary" onClick={showModal}>Change Default Location</Button>
          <Button color="default" variant="solid" onClick={showDrawer} icon={<PlusOutlined />}>Update Details</Button>
          <PasswordModal announce={toast}/>
          <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <div>

            <p>
              Please select default location
            </p>  
            <div>
              <GooglePlacesAutocomplete
              apiKey="AIzaSyAjLNQI2BHb9fphLaIfxWlJ2UleP0SY8WE"
              selectProps={{
                value,
                onChange: setCoords,
              }}
              />
            </div>       
            </div>

          </Modal>
          <Drawer
        title="Update User Details"
        width={720}
        onClose={onClose}
        open={openDrawer}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={updateDetails} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form 
          layout="vertical" 
          hideRequiredMark 
          id="userForm"
          initialValues={{
            ["fname"]: listData[0].first_name,
            ["lname"]: listData[0].last_name,
            ["username"]: listData[0].username,
            ["email"]: listData[0].email
          }}
        >
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="fname"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter first name',
                  },
                ]}
              >
                                <Input placeholder={listData[0].first_name}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="lname"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter surname',
                  },
                ]}
              >
                                <Input placeholder={listData[0].last_name}/>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                name="username"
                label="User Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter username',
                  },
                ]}
              >
                                <Input placeholder={listData[0].username}/>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter email',
                  },
                ]}
              >
                                <Input placeholder={listData[0].email}/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
          </Drawer>                               
          <ToastContainer />
        </div>
        ):(
          <h1>Loading</h1>
        ) 
    )
}

export default Profile;