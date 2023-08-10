import { useEffect, useState } from 'react'
import { calculateTotalScore, getTotalScore, getTotalScoreWeight, hodTotalScore } from '../../utils/KpiFunctions';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Spinner } from 'react-bootstrap';
import { monthsData } from '../../components/ERP_Datas/ProjectData';
import { useAppDispatch, useAppSelector } from '../../store/useStore';
import { editAssessment, reset } from '../../features/KPIAssessment/assessmentSlice';
import { fireAlert } from '../../utils/Alert';


const KPIInfoDetails = ({ viewdata }: any) => {
	const dispatch = useAppDispatch();
	const { editisLoading, editisSuccess } = useAppSelector((state: any) => state.assessment)
	const navigate = useNavigate();
	const { id } = useParams()
	const year = new Date().getFullYear().toString();

	const [kpinputs, setKpInputs] = useState({
		month: 0,
		parameters: null,
		comment: ''
	});






	const mappedParameters: any = Object.keys(!viewdata?.parameters ? [] : viewdata?.parameters).map((key) => {
		const { self_score, score_weight } = viewdata?.parameters[key] || {};
		return {
			key,
			description: key,
			score: self_score || 0, // Provide a default value for score if it is missing
			score_weight: score_weight || 0, // Provide a default value for score_weight if it is missing
		};
	});

	const parameters: any = {};
	Object.keys(mappedParameters).forEach((key) => {
		if (mappedParameters[key].key !== '_id') {
			parameters[mappedParameters[key].key] = {
				description: mappedParameters[key].description,
				score: mappedParameters[key].score,
				score_weight: mappedParameters[key].score_weight,
			};
		}
	});


	useEffect(() => {
		setData(parameters)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [viewdata])



	const [datas, setData] = useState(parameters);


	const handleEditScoreWeight: any = (key: string, newScoreWeight: number) => {

		setData((prevData: any) => ({
			...prevData,
			[key]: {
				...prevData[key],
				score: newScoreWeight <= 5 ? newScoreWeight : '',
			},
		}));

	};
	const handleEditScoreWeights: any = (key: string, description: number) => {

		setData((prevData: any) => ({
			...prevData,
			[key]: {
				...prevData[key],
				description: description,
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

	// const extractedData: any = {};

	// for (const key in input?.parameters) {
	// 	if (input?.parameters?.hasOwnProperty(key)) {
	// 		// @ts-ignore
	// 		extractedData[key] = input?.parameters[key].score;
	// 	}
	// }




	const updatedData = Object.keys(datas).reduce((acc, key) => {
		const entry = datas[key];
		const { score, description } = entry;
		// const description = getDescription(key);
		// @ts-ignore
		acc[key] = {
			score,
			description,
		};

		return acc;
	}, {});

	function getDescription(key: any) {
		// Replace this function with your logic to generate descriptions based on the keys
		// For the key "parseInt(e.target.value)", you might return a default description
		// or something relevant to your use case.
		return key;
	}






	useEffect(() => {
		setInput((prevState: any) => {
			return ({
				...prevState,
				parameters: datas,
			});
		});
	}, [setInput, datas]);

	const handelEdit = (e: any) => {
		e.preventDefault();
		const inputs = { id, kpinputs }

		dispatch(editAssessment(inputs));
	}


	const handleOnChange = (input: string, value: any) => {
		setInput((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};


	// const mapped: any = Object.keys(!input.parameters ? [] : input.parameters).map((key) => {
	// 	const { self_score, score_weight } = input?.parameters[key] || {};
	// 	return {
	// 		score: self_score || 0, // Provide a default value for score if it is missing
	// 		description: score_weight || 0, // Provide a default value for score_weight if it is missing
	// 	};
	// });

	useEffect(() => {
		setKpInputs((prevState: any) => {
			return ({
				...prevState,
				// @ts-ignore
				month: parseInt(input.month),
				parameters: updatedData,
				comment: input.comment
			});
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setInput, datas, input.comment, input.month, input]);


	console.log('kpinputs', kpinputs);


	useEffect(() => {
		if (editisSuccess) {
			fireAlert("Successful", "KPI Edited!", "success");
			// navigate("/kpiassessment/kpiassessment/teamkpi")
			navigate(-1)
		}
		dispatch(reset());

	}, [editisSuccess, navigate, dispatch]);



	return (
		<form onSubmit={handelEdit}>
			<div className='flex-entries-perpage'>
				<div className="top-fields">
					<p>{viewdata?.month} | {year} </p>
				</div>
				{<div className='m-3'>
					<select
						required
						value={input.month}
						onChange={(e) => handleOnChange("month", e.target.value)}
					// onChange={handleMonthChange}
					>
						<option value="">Select a month</option>
						{Object.entries(monthsData).map(([number, name]) => (
							// @ts-ignore
							<option key={number} value={number}>{name}</option>
						))}
					</select>
				</div>}

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
											<p style={{ width: "100%" }}>
												<input
													required

													type="text"
													value={datas[key]?.description}
													max={5}
													onChange={(e) => handleEditScoreWeights(key, e.target.value)}
												/>
												{/* {key} */}
											</p>

											<div>
												<p>
													{datas[key]?.score_weight}
												</p>
											</div>
										</div>
										<div className="rate_area">
											<input
												required
												style={{ width: "80px" }}
												type="number"
												value={datas[key]?.score}
												max={5}
												onChange={(e) => handleEditScoreWeight(key, parseInt(e.target.value))}
											/>
										</div>

										<div className="btn_area">
											{calculateTotalScore(parseInt(parameters[key]?.score_weight), parseInt(parameters[key]?.score))}
										</div>
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
							{datas?.status === "in review" ? "" :
								<div className="btn_area Grade-title">
									<p> {hodTotalScore(parameters)}</p>
								</div>}
						</div>

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
									<Button
										variant="contained"
										disabled={editisLoading}
										className="Add-btn-modal" type="submit">{editisLoading ? <Spinner animation="border" /> : 'Submit'}</Button>
								</div>
							</div>}
					</div>

				</div>
			</div>}

		</form>
	)
}

export default KPIInfoDetails
