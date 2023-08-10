
import { useEffect } from 'react';
import { fireAlert } from '../../utils/Alert';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/useStore';
import { calculateTotalScore, getTotalScore, getTotalScoreWeight, hodTotalScore } from '../../utils/KpiFunctions';




const KPIAdminDetails = ({ data }: any) => {
	const navigate = useNavigate();

	const { hodreviewisSuccess } = useAppSelector((state: any) => state.assessment)
	const year = new Date().getFullYear().toString();


	useEffect(() => {
		if (hodreviewisSuccess) {
			fireAlert("Successful", "KPI Updated!", "success");
			navigate("/kpiassessment/kpiassessment/teamkpi")
		}

	}, [hodreviewisSuccess, navigate]);


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
							{data?.status === "in review" ? "" :
								<div className="btn_area Grade-title">
									<p>HOD Grade</p>
								</div>}

						</div>

						{Object.keys(!parameters ? [] : parameters).map((key) => {
							if (key === '_id') return null;
							return (
								<div key={key}>
									<div className="added-field">
										<div className="factor_area">
											<p>{key}</p>
											<div>
												<p>{parameters[key].score_weight}</p>
											</div>
										</div>
										<div className="rate_area">
											{parameters[key].score}
										</div>
										{data?.status === "in review" ? "" :
											<div className="btn_area">
												{calculateTotalScore(parameters[key].score_weight, parameters[key].score)}
											</div>}
									</div>
								</div>
							)
						})}

						<div className="added-field">
							<div className="factor_area Grade-title">
								<p>Total</p>
								<div>
									<p>{getTotalScoreWeight(parameters)}</p>
								</div>
							</div>
							<div className="rate_area Grade-title">
								<p>{getTotalScore(parameters)}</p>
							</div>
							{data?.status === "in review" ? "" :
								<div className="btn_area Grade-title">
									<p> {hodTotalScore(parameters)}</p>
								</div>}
						</div>
					</div>


				</div>
			</div>}

		</form>
	)
}

export default KPIAdminDetails;