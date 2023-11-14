import { Button } from '@material-ui/core';
import React from 'react'
import { ModalHeader } from './ModalOptions';
import { Modal } from 'react-bootstrap';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const BulkUploadModal = ({ setLgShow }: any) => {
	return (
		<div>
			{/* <Button
				className="subone-header-flex-btn"
				onClick={() => { setLgShow(true) }} > 
				Create Project
			</Button> */}
			<Modal
				size="lg"
				// show={lgShow}
				aria-labelledby="contained-modal-title-vcenter"
				centered >
				<ModalHeader
					setLgShow={setLgShow}
					icon={<AiOutlineCloudUpload size={30} />} title={"Bulk Upload"} subtitle={"Click on download tem"} />
				<Modal.Body>
					<div>
						<div></div>
						<div></div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	)
}

export default BulkUploadModal
