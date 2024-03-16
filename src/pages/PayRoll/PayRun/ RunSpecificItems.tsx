import { Button } from '@material-ui/core'
import React from 'react'
import PayRunModal from '../../../components/Modals/PayRunModal'
import { Helmet } from 'react-helmet-async'

const RunSpecificItems = () => {
	return (
		<>
			<Helmet>
				<title>Run Specific Items | Arkland ERP</title>
			</Helmet>
			<div>
				<div className='specialallowancescomponent-contaner'>
					<div className='numberofdays-main'>
						<div className='numberofdays'>
							<div className='numberofdays-title'> Pay Period </div>
							<div className='input__labelinput__field' style={{ display: "flex", gap: "20px" }} id='numberofdays-bg'>
								<div className='input' style={{ width: "50%" }}>
									<label className='input__label' style={{ fontSize: "10px", paddingLeft: '16px' }} >Month</label>
									<input className='input__field input-perameter-color' placeholder='23' />
								</div>
								<div className='input' style={{ width: "20%" }}>
								</div>
								<div className='input' style={{ width: "50%" }}>
									<label className='input__label' style={{ fontSize: "10px", paddingLeft: '16px' }}>Year</label>
									<input className='input__field input-perameter-color' placeholder='23' />
								</div>
							</div>
						</div>
					</div>
					<div className='input mt-5'  >
						<label className='input__label'>Days to pay</label>
						<input className='input__field input-perameter-color           ' placeholder='Enter Amount' />
					</div>
				</div>
				<div style={{ float: "right", paddingRight: "3.6rem", marginTop: "1.5rem", marginBottom: "3rem" }}>
					{/* <Button id="view-status"  >Run</Button> */}
					<PayRunModal />
				</div>
			</div>
		</>
	)
}

export default RunSpecificItems