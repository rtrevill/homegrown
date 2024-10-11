import { Button, Checkbox, Form, Input } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';


const returnHome = () => location.href = '/';


function CreateUser(){
  const [createUser, { error }] = useMutation(CREATE_USER);

  const onFinish = async (values) => {
    console.log('Success');
    await createUser({variables: {username: values.username, password: values.password}});
  };

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };



    return (
        <div>
            <h1>Create New User</h1>
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
        </div>
    )
}

export default CreateUser;