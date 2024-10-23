import { Button } from 'antd'
import { FIND_PRODUCE } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';



function AdvertiseNew(props){
    const [returnedProduce, setReturnedProduce] = useState([]);
    const [produce, setProduce] = useState([]);
    const [variants, setVariants] = useState([]);
    const [selectedProduce, setSelectedProduce] = useState();
    const [selectedVariant, setSelectedVariant] = useState();
    const [getProduce, {loading, error, data}] = useLazyQuery(FIND_PRODUCE);

    const setProd = (e) => {
        e.target.id==="Produce Selector" ? setSelectedProduce(e.target.value):
        setSelectedVariant(e.target.value)
    }

    const determineVariants = () => {
        const narrowedSearch = returnedProduce.filter((entry) => entry.produce===selectedProduce);
        const filteredForVariants = narrowedSearch.map((each) => {return each.variant})
        // console.log(narrowedSearch, filteredForVariants);
        setVariants(filteredForVariants);
        setSelectedVariant(filteredForVariants[0])
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
 
    useEffect(()=>{
        determineVariants();
    },[selectedProduce])

    useEffect(() => {
        setSelectedProduce(produce[0])
    },[produce])

    useEffect(() => {
        neatenArray()
    }, [returnedProduce])

    const addToList = () => {
        if (!selectedProduce){
            return
        }
        const produceObject = returnedProduce.find((object) => object.produce===selectedProduce&&object.variant===selectedVariant)
        props.addNew(produceObject)
    }

    return(
        <div>
            <input onChange={findProduce} ></input>
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

            <Button color="default" variant="solid" icon={<PlusOutlined />} onClick={addToList}>Add To List</Button>
        </div>
    )
};

export default AdvertiseNew