import { Button, Input, Typography, Select, Space } from 'antd'
import { FIND_PRODUCE, QUERY_USER } from '../utils/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import auth from '../utils/auth';

const { TextArea } = Input;


function AdvertiseNew(props){
    const [returnedProduce, setReturnedProduce] = useState([]);
    const [produce, setProduce] = useState([]);
    const [variants, setVariants] = useState([]);
    const [selectedProdVar, setSelectedProdVar] = useState({produce: "", variant: "", location: ""})
    const [location, setLocation] = useState([])
    const [getProduce, {loading, error, data}] = useLazyQuery(FIND_PRODUCE);
    const {loading: loading2, error: error2, data: data2} = useQuery(QUERY_USER, {
        variables: {userId: auth.getProfile().data._id}
    });

    console.log(selectedProdVar)
    // console.log(location)

    const setProd = (e) => {

        e.target.id=="Produce Selector" ? setSelectedProdVar({...selectedProdVar, produce: e.target.value}):
        setSelectedProdVar({...selectedProdVar, variant: e.target.value})
    }

    const determineVariants = () => {
        const narrowedSearch = returnedProduce.filter((entry) => entry.produce===selectedProdVar.produce);
        const filteredForVariants = narrowedSearch.map((each) => {return each.variant})
        console.log(narrowedSearch, filteredForVariants);
        setVariants(filteredForVariants);
        setSelectedProdVar({...selectedProdVar, variant: filteredForVariants[0]})
    }

    let shortenedArray = [];

    const neatenArray = () => {
        returnedProduce.forEach((object) => {
            shortenedArray.push(object.produce)
            setProduce([...new Set(shortenedArray)])
        })
    }

    async function findProduce(e){
        if (e.target.value===""){
            setProduce([])
            setVariants([])
            return
        }
            const searchProduce = await getProduce({variables: {string: e.target.value}})
            const searchResponse = searchProduce.data.findProduce;
            setReturnedProduce(searchResponse);
    }

    const clearForms = async () => {
        document.getElementById("Searchbar").value="";
        setProduce([]);
    }

    useEffect(()=>{
        if(selectedProdVar.produce===""){
            return
        }
        else{
            console.log("Random", selectedProdVar.produce)
            determineVariants();
        }
    },[selectedProdVar.produce])


    useEffect(() => {
        setSelectedProdVar({...selectedProdVar, produce: produce[0]})
    },[produce])

    useEffect(() => {
        neatenArray()
    }, [returnedProduce])

    useEffect(() => {
        clearForms()
    },[props.trigger])

    useEffect(() => {
            setLocation(data2?.userDetails.produceLocation.map((location) => ({...location, value: location._id, label: location.address})))
            console.log(data2?.userDetails)
    },[data2])

    const addToList = () => {
        if (selectedProdVar.produce===""){
            return
        }
        const productNotes = document.getElementById("ExtraNotes").value
        const produceObject = returnedProduce.find((object) => object.produce===selectedProdVar.produce&&object.variant===selectedProdVar.variant)
        let data = JSON.parse(JSON.stringify(produceObject));
        data["Notes"] = productNotes;
        data["Location"] = selectedProdVar.location
        props.addNew(data)
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setSelectedProdVar({...selectedProdVar, location: value})
      };

    return(
  
        <div style={{minWidth: 600, maxWidth: 800}}>
        { loading2 ? <h4>Loading</h4> : (

        <div>
            <input onChange={findProduce} id="Searchbar"></input>
            <select onChange={setProd} id="Produce Selector">
            {   produce.map((number)=>{
                return <option value={number} key={number}>{number}</option>
            })
        }
        </select>
        <select onChange={setProd} id="Variant Selector">
        {
            variants.map((vari) => {
                return <option value={vari} key={vari}>{vari}</option>
            })
        }
        </select>
        <div style={{marginBottom: 20}}>
        <Typography style={{margin: 15, fontSize: 30}}>Extra Notes</Typography>
        <TextArea rows={4} placeholder="Please add any extra notes for this item" id="ExtraNotes" allowClear={true} />
        </div>
        <Space>
        <Select
            defaultValue="Select Pickup Location"
            style={{width: 350}}
            onChange={handleChange}
            options={location}
            />
        </Space>
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button color="default" variant="solid" icon={<PlusOutlined />} onClick={addToList} id="AddToListButton">Add To List</Button>
        </div>
        </div>
        )
        }
        </div>

    )
};

export default AdvertiseNew