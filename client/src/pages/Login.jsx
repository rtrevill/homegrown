import { Button, Form, Input, Typography } from "antd";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import auth from "../utils/auth";
import { useState } from "react";
import CreateUser from "./CreateUser";

const { Title } = Typography;

const notify = {
    error1 : () =>{ toast("Incomplete details")}
}

function Login(){

    const [login, {error, data}] = useMutation(LOGIN_USER);
    const [userState, setUserState] = useState(true)

    const onFinish = async(values, event) => {
        console.log('Success:', values);
        // event.preventDefault();

        try {
            const {data} = await login({
                variables: { 
                    name: values.username,
                    password: values.password
                }
            });

            auth.login(data.login.token);
        } catch (e) {
            console.error(e)
        }

      };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        notify.error1();
      };
    

    return (
           userState ? (
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
        <Button id="newUserButton" onClick={()=>setUserState(false)}> Create New User</Button>
        <div>
            <ToastContainer />
        </div>

        </div>
        ): <CreateUser />
    )

}

export default Login