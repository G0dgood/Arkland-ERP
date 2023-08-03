import { useEffect, useState } from 'react'
import { calculateTotalScore } from '../../utils/helpers';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import SelectInput from '../../components/SelectInput';
import HttpService from '../../components/HttpService';


const KPIInfoDetails = ({ viewdata }: any) => {
	const { id } = useParams()
	const year = new Date().getFullYear().toString();
	const location = useLocation();
	const [kpinputs, setKpInputs] = useState({
		month: 0,
		reviewer: "",
		job_knowledge: 0,
		efficiency: 0,
		attendance: 0,
		communication: 0,
		comment: "",
	});
	// const totalScore1 = (kpiData3.Weight1 / 5) * employeegrade.employeegrade1 


	//  @ts-ignore  
	// const hod: any = Object.values(reviews).reduce((a, v) => (a = a + v?.reviewer), 0);

	const mappedParameters: any = Object.keys(!viewdata?.parameters ? [] : viewdata?.parameters).map((key) => {
		const { self_score, score_weight } = viewdata?.parameters[key] || {};
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
	}, [viewdata])




	const [datas, setData] = useState<any>(parameters);

	const handleEditScoreWeight: any = (key: string, newScoreWeight: number) => {
		setData((prevData: any) => ({
			...prevData,
			[key]: {
				...prevData[key],
				score_weight: newScoreWeight,
			},
		}));
	};

	interface InputState {
		month: 0;
		parameters: {};
		comment: string;
	}

	const initialInputState: InputState = {
		month: 0,
		parameters: {},
		comment: '',
	};
	const [input, setInput] = useState<InputState>(initialInputState);



	useEffect(() => {
		setInput((prevState: any) => {
			return ({
				...prevState,
				parameters: datas,
			});
		});
	}, [setInput, datas]);

	const handelHodkpi = (e: any) => {
		e.preventDefault();
		const inputs = { id, input }
		//  @ts-ignore  
		dispatch(hodReviewAssessment(inputs));
	}
	const handleOnChange = (input: string, value: any) => {
		setInput((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	const [hods, setHOD] = useState([])



	useEffect(() => {
		getData()
	}, [])

	const [isLoading, setisLoading] = useState(false)

	const getData = async () => {
		setisLoading(true)
		try {
			const hodsUrl = `employees`
			const hods: any = await HttpService.get(hodsUrl)
			setHOD(hods?.data?.data)
			setisLoading(false)
		} catch (error) {
			setisLoading(false)
		}
	}


	const availablleHods = [] as any;
	hods &&
		hods?.forEach((hod: any) =>
			availablleHods.push({
				value: hod.id,
				label: hod.full_name,
			})
		);


	return (
		<form onSubmit={handelHodkpi}>
			<div className='flex-entries-perpage'>
				<div className="top-fields">
					<p>{viewdata?.month} | {year} </p>
				</div>
				<div className="entries-perpage-edit">
					<SelectInput
						// label="HOD :"
						isDisabled={isLoading}
						isLoading={isLoading}
						options={availablleHods}
						value={kpinputs?.reviewer}
						onChange={(e: any) => handleOnChange("reviewer", e)}
					/>
				</div>
			</div>
			{!viewdata ? "" : <div className="evaluation-area_cont">
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
												<p>
													<input
														style={{ width: "80px" }}
														type="number"
														value={datas[key]?.score_weight}
														onChange={(e) => handleEditScoreWeight(key, parseInt(e.target.value))}
													/>
												</p>
											</div>
										</div>
										<div className="rate_area">
											{datas[key]?.score}
										</div>
										<div className="btn_area">
											{calculateTotalScore(parameters[key]?.score_weight, parameters[key]?.score)}
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
					<div>
						{viewdata?.status === 'active' ? "" :
							<div>
								<textarea
									id="shareCommentText"
									placeholder="Write a comment.."
									required
									value={input.comment}
									onChange={(e) => handleOnChange("comment", e.target.value)} >
								</textarea>
								<div>
									<Button variant="contained"
										disabled={false}
										className="Add-btn-modal" type="submit">{false ? <Spinner animation="border" /> : 'Submit'}</Button>
								</div>
							</div>}
					</div>

				</div>
			</div>}

		</form>
	)
}

export default KPIInfoDetails
