import { useState } from "react"
import AdvertiseNew from "../components/AdvertiseNew"
import ProduceList from "../components/ProduceList"
import { ADD_USER_PRODUCE } from "../utils/mutations"
import { useMutation } from "@apollo/client"
import auth from "../utils/auth"

function NewBatch(){
    const [sendProd, {error, loading, data}] = useMutation(ADD_USER_PRODUCE);

    const [batchList, setBatchList] = useState([])

    console.log(batchList)

    const addToBatch = (newItem) => {
        setBatchList([...batchList, newItem])
    }

    const removeBatch = (index) => {
        console.log(index)
        setBatchList(
            batchList.filter((_, i) => i !== index)
        )
    }

    const saveToDB = async () => {
        const batchToSend = batchList.map((product) => ({"itemtype": product._id}) )
        try{
            const confirm = await sendProd({variables: {
                                            userId: auth.getProfile().data._id,
                                            produce: batchToSend}});
            console.log(confirm)
        }catch(err){
            console.log(err)
        }
        // console.log(batchToSend)

    }

    console.log(batchList);

    return (
        <div>
        <AdvertiseNew 
            addNew={addToBatch}
        />
        <ProduceList 
            currentList={batchList}
            deleteOne={removeBatch}
            saveAll={saveToDB}
        />
        </div>
    )
}

export default NewBatch