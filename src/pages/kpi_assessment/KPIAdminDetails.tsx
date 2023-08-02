
import { useEffect, useState } from 'react';
import { fireAlert } from '../../utils/Alert';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/useStore';
import { Button } from '@material-ui/core';


const KPIAdminDetails = ({ data }: any) => {
	const navigate = useNavigate();

	const { hodreviewdata, hodreviewisSuccess } = useAppSelector((state: any) => state.assessment)
	const year = new Date().getFullYear().toString();
	const location = useLocation();


	console.log('viewdata', data)



	// calculates the total in a Columns
	//  @ts-ignore  
	// const Amount: any = Object.values(kpiData).reduce((a, v) => (a = a + v?.num), 0);



	const title = "Successful";
	const html = "KPI Updated!";
	const icon = "success";


	useEffect(() => {
		if (hodreviewisSuccess) {
			fireAlert(title, html, icon);
			navigate("/kpiassessment/kpiassessment/teamkpi")
		}

	}, [html, title, icon, hodreviewisSuccess, navigate]);






	const reviews = [
		{ 'reviewer': data?.job_knowledge_employee },
		{ 'reviewer': data?.efficiency_reviewer },
		{ 'reviewer': data?.attendance_reviewer },
		{ 'reviewer': data?.communication_reviewer },
		{ 'reviewer': data?.reliability_reviewer },
		{ 'reviewer': data?.collaboration_reviewer },
	];

	//  @ts-ignore  
	const hod: any = Object.values(reviews).reduce((a, v) => (a = a + v?.reviewer), 0);




	const mappedParameters: any = Object.keys(!data.parameters ? [] : data.parameters).map((key) => {
		const { self_score, score_weight } = data.parameters[key] || {};
		return {
			key,
			score: self_score || 0, // Provide a default value for score if it is missing
			score_weight: score_weight || 0, // Provide a default value for score_weight if it is missing
		};
	});


	const parameters: any = {};

	Object.keys(mappedParameters).forEach((key) => {
		if (mappedParameters[key].key !== '_id') {
			parameters[mappedParameters[key].key] = {
				score: mappedParameters[key].score,
				score_weight: mappedParameters[key].score_weight,
			};
		}
	});



	useEffect(() => {
		setData(parameters)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data])

	const [datas, setData] = useState<any>(parameters);


	return (
		<form  >

			<div className="top-fields">
				<p>{data?.month} | {year} </p>
			</div>
			{!data ? "" : <div className="evaluation-area_cont">
				<div>
					<div className="added-fields_cont">
						<div className="added-field">
							<div className="factor_area">
								<div className="rate_area Grade-title">
									<p>Performance  Indicator</p>
								</div>
								<div className='Grade-title'>
									<p>Weight</p>
								</div>
							</div>
							<div className="rate_area Grade-title">
								<p>Staff Score</p>
							</div>
							<div className="btn_area Grade-title">
								<p>HOD Grade</p>
							</div>
						</div>

						{Object.keys(!datas ? [] : datas).map((key) => {
							if (key === '_id') return null;
							return (
								<div key={key}>
									<div className="added-field">
										<div className="factor_area">
											<p>{key}</p>
											<div>
												<p>{datas[key].score_weight}</p>
											</div>
										</div>
										<div className="rate_area">
											{datas[key].score}
										</div>
										<div className="btn_area">
											{/* @ts-ignore */}
											{Object.keys(!hodreviewdata ? [] : hodreviewdata).map((key: any) => {
												<p>{hodreviewdata[key]?.reviewer_score}</p>
											})}
										</div>
									</div>

								</div>
							)
						})}

						{/* <div className="added-field">
       <div className="factor_area Grade-title">
        <p>Total</p>
        <div>
         <p>{Weight}</p>
        </div>
       </div>
       <div className="rate_area Grade-title">
        <p>{!Amount ? "0" : Amount}</p>
       </div>
       {location.state.name === "admin" ? "" : <div className="btn_area Grade-title">
        {data?.status === 'active' ? hod : <p> {hodscore}</p>}
       </div>}
       {location.state.name === "admin" && <div className="btn_area Grade-title">
        <p> {hodscore}</p>
       </div>} 
      </div> */}
					</div>


				</div>
			</div>}

		</form>
	)
}

export default KPIAdminDetails;