import { useEffect } from "react";




export const blockFullStop = (event: { target: any; }) => {
	const inputField = event.target;
	const inputValue = inputField.value;

	if (inputValue.includes('.')) {
		// Remove the full stop from the input value
		inputField.value = inputValue.replace(/\./g, '');
	}
}

export const getTotalScoreWeight = (parameters: any) => {
	let totalScoreWeight = 0;
	for (const key in parameters) {
		if (parameters.hasOwnProperty(key) && parameters[key].score_weight) {
			totalScoreWeight += parseInt(parameters[key].score_weight);
		}
	}
	return totalScoreWeight;
}


export const getTotalScore = (parameters: any) => {
	let totalScoreWeight = 0;
	for (const key in parameters) {
		if (parameters.hasOwnProperty(key) && parameters[key].score) {
			totalScoreWeight += parseInt(parameters[key].score);
		}
	}
	return totalScoreWeight;
}


export const getTotalScoreSum = (parameters: any) => {
	let totalScoreSum = 0;
	for (const key in parameters) {
		if (parameters.hasOwnProperty(key) && parameters[key].reviewer_score) {
			totalScoreSum += parameters[key].reviewer_score;
		}
	}
	return totalScoreSum;
}

export const getTotalReviewerScore = (parameters: any) => {
	let totalReviewerScore = 0;
	for (const key in parameters) {
		const reviewerScore = parameters[key].reviewer_score;
		if (typeof reviewerScore === 'number') {
			totalReviewerScore += reviewerScore;
		}
	}
	return totalReviewerScore;
}



// Function to calculate the total score for each entry
export const calculateTotalScore = (weights: number, scores: number) => {
	if (!weights) {
		return "";
	} else {
		const totalScore = (weights / 5) * scores;

		return totalScore;
	}
};


export const hodTotalScore = (parameters: any) => {
	let totalReviewerScore = 0;
	for (const key in parameters) {
		const reviewerScore = parameters[key].reviewer_score;
		if (typeof reviewerScore === 'number') {
			totalReviewerScore += reviewerScore;
		}
	}
	return totalReviewerScore;
};



export const KPISummary = (data: any,) => {

	const mappedParameters: any = Object.keys(!data?.parameters ? [] : data?.parameters).map((key) => {
		const { self_score, score_weight } = data?.parameters[key] || {};
		return {
			key,
			score: self_score || 0, // Provide a default value for score if it is missing
			score_weight: score_weight || 0, // Provide a default value for score_weight if it is missing
		};
	});

	useEffect(() => {

	}, [])

	const parameters: any = {};

	Object.keys(mappedParameters).forEach((key) => {
		if (mappedParameters[key].key !== '_id') {
			parameters[mappedParameters[key].key] = {
				score: mappedParameters[key].score,
				score_weight: mappedParameters[key].score_weight,
			};
		}
	});

	// Performance  Percentage Calculation
	// const broughtDownAverage = (getTotalScore: any, hodTotalScore: any) => {
	// 	const finalscore: any = (100 + hodTotalScore) / (hodTotalScore === 0 ? 0 : 2)
	// 	return finalscore
	// }



	return (
		< >
			{data?.status === "in review" ? <div className="kpi-summary">
				<div className="kpi-summary-title">
					<p>KPI Summary</p>
				</div>
				<div className="kpi-summary-body m-t-10" >
					<p>Total</p>
					<p id="total-rating">{getTotalScore(parameters)}</p>
					<p>HOD Score</p>
					<p id="avg-rating">0</p>
					<p>Average Score</p>
					<p id="avg-rating">0</p>
				</div>
			</div> : <div className="kpi-summary">
				<div className="kpi-summary-title">
					<p>KPI Summary</p>
				</div>
				<div className="kpi-summary-body m-t-10" >
					<p>Employee Score</p>
					<p id="total-rating">{!data?.performance_percentage_employee ? "" : data.performance_percentage_employee}</p>
					<p>HOD Score</p>
					<p id="avg-rating">{!data.performance_percentage_reviewer ? "" : data.performance_percentage_reviewer}</p>
					<p>Average Score</p>
					<p id="avg-rating">{!data?.total_performance_percentage ? "" : data?.total_performance_percentage + "%"}</p>
				</div>
			</div>}
		</>


	);
};

