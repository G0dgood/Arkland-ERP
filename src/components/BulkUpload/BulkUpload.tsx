import { Button } from '@material-ui/core'
import React from 'react'

const BulkUpload = () => {


	const handleFileChange = (e: any) => {
		const fileInput = e.target;
		const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : null;
		const fileText = fileName ? fileName : 'Click here to select a file';
		fileInput.closest('.file-input-container').querySelector('.file-text').innerText = fileText;
	};

	return (
		<div>
			<div className='template-download-container mt-5 mb-5'>
				<span className='template-download-sup'>
					<div className='template-download-container-sup'>
						<button className='card-template-one'>Download  Template </button>
						<div className="file-input-container">
							<input
								type="file"
								id="fileInput"
								className="card-template-two"
								onChange={handleFileChange}
							/>
							<label htmlFor="fileInput">
								{/* <div className="file-icon">
							<span>📂</span>
						</div> */}
								<span className="file-text">Click here to select a file</span>
							</label>
						</div>
					</div>
					<div className='Upload-btn'>
						<Button id="view-status"   >Upload</Button>
					</div>
				</span>
			</div>
		</div>
	)
}

export default BulkUpload