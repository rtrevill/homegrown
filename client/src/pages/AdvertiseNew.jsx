import { Button } from 'antd'


function AdvertiseNew(){

    let produceSelect = [];

    function findProduce(e){
        console.log(e.target.value)
        
    }

    return(
        <div>
            <input onChange={findProduce}></input>
            <select>
                <option>Something</option>
                <option>else</option>
            </select>

            <Button color="default" variant="solid">Add More</Button>
            <h2>Advertise New</h2>
            
        </div>
    )
};

export default AdvertiseNew