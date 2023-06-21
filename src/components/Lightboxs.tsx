import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { AiOutlineFileDone } from 'react-icons/ai';
import { MdOutlineClose } from 'react-icons/md';


const Lightboxs = ({ img }: any) => {
	const [show, setShow] = useState(false);



	const showAlert = () => {
		toast.error("No file Avialable");
	};

	return (
		<>{img[0]?.url === undefined || !img[0]?.url ? <AiOutlineFileDone size={40} color='gray' onClick={showAlert} /> : <img src={img[0]?.url}
			alt="file" className="file-image-size" onClick={() => { setShow(true) }} />}

			<Modal
				show={show}
				onHide={() => setShow(false)}
				ClassName="modal-mediem-with"
				centered
				fullscreen={true}
			>
				<Modal.Header  >
					<span>
					</span>
					<span className='span-center-title'>{img.length > 1 ? `Total of ${img.length} Files` : "View File"}</span>
					<Button style={{ color: '#fff' }} onClick={() => { setShow(false) }}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body >
					{img?.map((item: any, i: any) => (
						<div className='file-main-div' key={i}>
							<img src={item?.url}
								alt="file" className="file-main-size" />
						</div>
					))}
				</Modal.Body>
			</Modal>
		</>
	);
}

export default Lightboxs