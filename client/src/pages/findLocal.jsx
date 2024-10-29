import { Button, Form, InputNumber } from "antd";
import { FIND_PROD_LOCATIONS } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import LocalMap from "../components/LocalMap";
import ProducerModal from "../components/ProducerModal";



function FindLocal (){
    const [locat, setlocat] = useState({currentlocat: [], radius: 0})
    const [filteredData, setFilteredData] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [getLocations, {loading, error, data}] = useLazyQuery(FIND_PROD_LOCATIONS)

    const showModal = (Id) => {
        setIsModalOpen(true);
        console.log(Id)
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };


    useEffect(()=>{
        setFilteredData([])
        if (data){
            data.findProdLocations.forEach((locality)=>{
                let newLocality = JSON.parse(JSON.stringify(locality))
                const filteredProduce = locality.userRef?.currentproduce.filter((prod) => prod.location===locality._id);
                newLocality.userRef.currentproduce = filteredProduce
                setFilteredData((prevstate) => [...prevstate, newLocality])
            })

        }else return
    },[data])

    const findProduce = async (values) => {
        setlocat({...locat, radius: values.kmRadius})
    }

    useEffect(()=>{
        async function getData(){
            await getLocations({
                variables: {
                    radius: locat.radius
                }
            })
        }
        getData()
    },[locat])

    return(
        <div>
            <LocalMap 
                produce={filteredData}
                showModal={showModal}
            />
            <h3> Local Produce</h3>
            <Form
                onFinish={findProduce}
            >
                <Form.Item 
                    label="RadiusInput" 
                    name="kmRadius" 
                    placeholder="Search Radius" 
                    >
                    <InputNumber />
                </Form.Item>
                <Button type="primary" htmlType="submit">Return Local Produce</Button>
            </Form>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <ProducerModal 
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
            />
        </div>
    )
};

export default FindLocal