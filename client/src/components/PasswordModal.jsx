import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Modal, Input, Space } from 'antd';

function PasswordModal () {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwords, setPasswords] = useState({original: "", newFirst: "", NewSecond: ""})

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
        // console.log(passwords)
      setIsModalOpen(false);
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