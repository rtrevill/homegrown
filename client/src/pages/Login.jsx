import { Button, Form, Input, Typography } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Title } = Typography;

const notify = {
    error1 : () =>{ toast("Incomplete details")}
}



const onFinish = (values) => {
    console.log('Success:', values);
  };

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    notify.error1();
  };


function Login(){

    return (
        <div style={{width: 600}}>
            <Title align='center'>Login Page</Title>
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
        <a href='/newuser'>Create a new user</a>
        <div>
            <ToastContainer />
        </div>

        </div>
    )

}

export default Login