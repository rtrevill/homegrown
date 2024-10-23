import { Button, List } from "antd";

function ProduceList(props){
    const { currentList, deleteOne, saveAll } = props;

    console.log(currentList)

    const deleteEntry = (indNum) => {
        // console.log("Black", indNum)
        deleteOne(indNum)
    }

    const saveBatch = () => {
        saveAll()
    };

    return (
        <div>

            <h2>Produce list</h2>
            <List
                itemLayout="horizontal"
                dataSource={currentList}
                bordered={true}
                size="large"
                renderItem={(item, index) => (
                <List.Item >
                    <List.Item.Meta
                    // avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                    title={<div style={{fontSize: 25}}>
                                <a href="https://ant.design">{item.produce}</a>
                            </div>
                                }
                    description={<div style={{display: "flex", justifyContent: "space-between", fontSize: 25}}>
                                    {item.variant}  
                                    <img src="/icons8-delete.svg" onClick={()=>deleteEntry(index)}/>
                                </div> }
                    />
                </List.Item>
                )}
            />
            <Button color="primary" variant="outlined" onClick={saveBatch}>Save Batch</Button>
        </div>
    )
};

export default ProduceList