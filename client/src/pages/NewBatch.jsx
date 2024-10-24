import { useState } from "react"
import AdvertiseNew from "../components/AdvertiseNew"
import ProduceList from "../components/ProduceList"
import { ADD_USER_PRODUCE } from "../utils/mutations"
import { useMutation } from "@apollo/client"
import auth from "../utils/auth"
import { ToastContainer, toast } from 'react-toastify';


function NewBatch(){
    const [sendProd, {error, loading, data}] = useMutation(ADD_USER_PRODUCE);

    const [batchList, setBatchList] = useState([]);
    const [trigger, setTrigger] = useState(0);

    console.log(batchList)

    const addToBatch = (newItem) => {
        setBatchList([...batchList, newItem])
    }

    const removeBatch = (index) => {
        // console.log(index)
        setBatchList(
            batchList.filter((_, i) => i !== index)
        )
    }

    const clearForms = () => {
        toast("Successfully added new produce");
        setBatchList([]);
        setTrigger(trigger +1);
    }

    const saveToDB = async () => {
        const batchToSend = batchList.map((product) => ({   "itemtype": product._id,
                                                            "itemproduce": product.produce,
                                                            "itemvariant": product.variant,
                                                            "itemdetail": product.Notes,
                                                            "location": product.Location
                                        }) )
        try{
            const confirm = await sendProd({variables: {
                                            userId: auth.getProfile().data._id,
                                            produce: batchToSend}});
            if (confirm){ clearForms() }
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
        <AdvertiseNew 
            addNew={addToBatch}
            trigger={trigger}
        />
        <ProduceList 
            currentList={batchList}
            deleteOne={removeBatch}
            saveAll={saveToDB}
        />
        <ToastContainer />
        </div>
    )
}

export default NewBatch