import { Button, Input, Form, InputNumber } from "antd";
import { FIND_PROD_LOCATIONS } from "../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import LocalMap from "../components/LocalMap";



function FindLocal (){
    const [locat, setlocat] = useState({currentlocat: [], radius: 0})
    const [filteredData, setFilteredData] = useState([])

    const [getLocations, {loading, error, data}] = useLazyQuery(FIND_PROD_LOCATIONS)

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
                // locations={data}
                produce={filteredData}
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
        </div>
    )
};

export default FindLocal