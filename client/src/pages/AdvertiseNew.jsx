import { Button } from 'antd'
import { FIND_PRODUCE } from '../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';


function AdvertiseNew(){
    const [produce, setProduce] = useState([]);
    const [returnedProduce, setReturnedProduce] = useState([]);
    const [variants, setVariants] = useState([]);
    const [selectedProduce, setSelectedProduce] = useState();
    const [getProduce, {loading, error, data}] = useLazyQuery(FIND_PRODUCE);

    console.log(selectedProduce)
    console.log(returnedProduce)

    const setProd = (e) => {
        setSelectedProduce(e.target.value)
    }

    const determineVariants = () => {
        console.log(returnedProduce, selectedProduce)
        const narrowedSearch = returnedProduce.filter((entry) => entry.produce===selectedProduce);
        const filteredtForVariants = narrowedSearch.map((each) => {return each.variant})
        console.log(narrowedSearch, filteredtForVariants);
        setVariants(filteredtForVariants);
    }

    let produceSelect = [];
    console.log(produceSelect)
    let shortenedArray = [];
    let quickArray = [];

    const neatenArray = () => {
        produceSelect.forEach((object) => {
            shortenedArray.push(object.produce)
            quickArray = [...new Set(shortenedArray)]
            setProduce(quickArray)
            setSelectedProduce(quickArray[0])
            console.log(quickArray);
            determineVariants();
        })
    }

    async function findProduce(e){
        const searchProduce = await getProduce({variables: {string: e.target.value}})
        const searchResponse = searchProduce.data.findProduce;
        setReturnedProduce(searchResponse);
        produceSelect.length = 0;
        searchResponse.forEach((response) => {
            produceSelect.push(response)
            console.log(produceSelect);
        })
        neatenArray()
    }

    return(
        <div>
            <input onChange={findProduce}></input>
            <select onChange={setProd}>
                {   produce.map((number)=>{
                    return <option value={number} key={number}>{number}</option>
                })
                }
            </select>
            <select>
                {
                    variants.map((vari) => {
                        return <option key={vari}>{vari}</option>
                    })
                }
            </select>

            <Button color="default" variant="solid">Add More</Button>
            <h2>Advertise New</h2>
            
        </div>
    )
};

export default AdvertiseNew