import { Modal } from "antd"

function ProducerModal(props){
    const {isModalOpen, handleOk, handleCancel} = props;

    return(
        <div>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

        </div>
    )
}

export default ProducerModal