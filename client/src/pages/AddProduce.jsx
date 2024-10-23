import { Button, Form, Input, Space, Typography } from 'antd';
import { ADD_PRODUCE } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import auth from '../utils/auth';


const { Title } = Typography;


const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

function AddProduce(){
    const [form] = Form.useForm();
    const [addNewProduce, {data, error, loading}] = useMutation(ADD_PRODUCE);

    useEffect(()=>{
        auth.getProfile().data.clearance!==1 ? 
        window.location.replace('/'):{}
    },[])

      const onFinish = async(values) => {
        try{
            await addNewProduce({variables: values});
            toast("Success");
            // form.resetFields();
        }catch(error){
            toast(error.message)
        }

        };
      const onReset = () => {
        form.resetFields();
      };

    return(
        <div>
        <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        style={{
          minWidth: 600,
          maxWidth: 800,
        }}
      >
        <Title
            style={{textAlign: 'center'}}
            italic={true}
        >Add New Produce</Title>

        <Form.Item
          name="produce"
          label="Produce"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="variant"
          label="Variant"
          rules={[
            {
              required: false,
            },
          ]}
        >
        <Input />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
    <ToastContainer />
    </div>
    )
}

export default AddProduce