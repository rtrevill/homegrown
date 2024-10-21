import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Modal, Input, Space } from 'antd';
import { CHANGE_PASSWORD } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import auth from "../utils/auth";


function PasswordModal (props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwords, setPasswords] = useState({original: "", newFirst: "", NewSecond: ""})
    const [changePass, {data, loading, error}] = useMutation(CHANGE_PASSWORD);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = async () => {
        if (passwords.newFirst !== passwords.NewSecond){
            return toast("New Passwords Don't Match")
        }
        try{
            await changePass({variables: {
                userId: auth.getProfile().data._id,
                original: passwords.original,
                newpword: passwords.NewSecond
            }}).then((res)=>{
                props.announce("Password Successfully Changed");
                setPasswords({original: "", newFirst: "", NewSecond: ""});
                setIsModalOpen(false);
            })
        }catch(error){
            console.log(error)
        }
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const handleOldPasswordChange = (e) => {
        if (passwords.original !== e.target.value) {
            setPasswords({...passwords, 
                [e.target.id]: e.target.value
            })
        }
    }


    return (
        <>
            <Button color="danger" variant="solid" onClick={showModal}>
                Change Password
            </Button>
            <Modal title="Change Password" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Space direction="horizontal">
                        <Input.Password
                        id="original"
                        placeholder="Existing Password"
                        visibilityToggle={{
                            visible: passwordVisible,
                            onVisibleChange: setPasswordVisible,
                        }}
                        value={passwords.original}
                        onChange={handleOldPasswordChange}
                        />
                    <Button
                        style={{
                            width: 80,
                        }}
                        onClick={() => setPasswordVisible((prevState) => !prevState)}
                        >
                        {passwordVisible ? 'Hide' : 'Show'}
                    </Button>
                </Space>

                <Space direction="vertical">
                    <Input.Password
                        id="newFirst"
                        placeholder="New Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={handleOldPasswordChange}
                    />
                    <Input.Password
                        id="NewSecond"
                        placeholder="Confirm New Password"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        onChange={handleOldPasswordChange}
                    />
                </Space>
            </Modal>
        </>
    );
};

export default PasswordModal