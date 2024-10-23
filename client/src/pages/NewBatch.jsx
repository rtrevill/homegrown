import { useState } from "react"
import AdvertiseNew from "../components/AdvertiseNew"
import ProduceList from "../components/ProduceList"

function NewBatch(){
    const [batchList, setBatchList] = useState([])

    const addToBatch = (newItem) => {
        setBatchList([...batchList, newItem])
    }

    const removeBatch = (index) => {
        console.log(index)
        setBatchList(
            batchList.filter((_, i) => i !== index)
        )
    }

    const saveToDB = () => {
        
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