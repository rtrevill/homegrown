import { Button, Checkbox, Form, Input } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import { ToastContainer, toast } from 'react-toastify';


const returnHome = () => location.href = '/';


function CreateUser(props){
  const [createUser, { error }] = useMutation(CREATE_USER);

  const {loginSuccess} = props;

  const onFinish = async (values) => {
    if (values.password !== values.password2){
      toast("Passwords don't match")
      return 
    }    
    try{
      await createUser({variables: {
                          username: values.username, 
                          password: values.password, 
                          email: values.email, 
                          clearance: 3}});
      loginSuccess(true)
    } catch(error) {
      toast("Email is being used by another user");
    }
  };

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



    return (
        <div>
            <h1 align='center'>Create New User</h1>
            <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Confirm Password"
      name="password2"
      rules={[
        {
          required: true,
          message: 'Please confirm your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please enter email',
        }
      ]}>
        <Input 
          type="email"
          />
      </Form.Item>
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
            <button onClick={returnHome}>Home</button>
            <ToastContainer />
        </div>
    )
}

export default CreateUser;