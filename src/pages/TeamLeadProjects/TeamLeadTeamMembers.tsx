import { useNavigate } from 'react-router-dom';
import userIcon from '../../assets/images/usericon.png'

const TeamLeadTeamMembers = ({ memberdata }: any) => {


	const navigate = useNavigate();

	return (
		<div className='memberdata'>
			<hr />
			{memberdata?.map((item: any, i: any) => (
				<div key={i}>
					<div className="column1">
						<div className="card1">
							<div style={{ display: "flex", justifyContent: "center" }}>

								<img src={userIcon} alt="Jane" style={{ width: "50%" }} />
							</div>
							<div className="container ">
								<h5>{item?.team_name}</h5>
								<p className="title1">{item?.team_name}</p>
								<p>{item.employee_name}</p>
								<p>{item?.status}</p>
								<p><button className="button1" onClick={() => navigate(`/employees/employees/${item?.employee
									?.id}`)}>View</button></p>
							</div>
						</div>
					</div>
				</div>
			))}

		</div>
	)
}

export default TeamLeadTeamMembers