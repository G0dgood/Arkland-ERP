import React from 'react'
import { Button } from '@material-ui/core';
import { BsChatLeftText } from 'react-icons/bs';
import { MdOutlineClose } from 'react-icons/md';

const ViewLeave = ({ showLeave, setShowLeaver }: any) => {

	return (
		<div className={showLeave ? "Drawer" : "Drawer1"}>
			<header className="ChatProgressView-header"  >
				<div>
					<span className="app-chat--icon">
						<BsChatLeftText />
					</span>
					<span className="in-progresss">
						Update Leave
					</span>

				</div>
				<div className="ChatProgressView-close" onClick={() => setShowLeaver(false)}>
					<MdOutlineClose
						size={25}
						style={{ color: "white", backgroundColor: "" }}
						className="ChatProgressView-close-icon"
					/>
				</div>
			</header>
			<div className="container-todos">
				<ul className="responsive-table">
					<li className="table-header">
						<div className="col col-2">Update Leave</div>
					</li>

					<div className='Drawactive'>
						<form>
							<div className="form-grp">
								<label htmlFor="institution">Institution Attended</label>
								<input type="text" id="institution" required />
							</div>
							<div className="form-grp">
								<label htmlFor="course">Course Of Study</label>
								<input type="text" id="course" required />
							</div>
							<div className="form-grp">
								<label htmlFor="membership">Proffesional Membership</label>
								<input type="text" id="membership" required />
							</div>
							<div className="form-grp">
								<label htmlFor="graduation">Year Of Graduation</label>
								<input type="date" id="graduation" required />
							</div>
							<div className="form-grp">
								<label htmlFor="graduation">Year Of Graduation</label>
								<textarea >

								</textarea>
							</div>

							<div className="form_btn">
								<Button variant="outlined" className={"Add-btn-edit"}>
									Update
								</Button>
							</div>
						</form>
					</div>
				</ul>

			</div>
		</div>
	)
}

export default ViewLeave