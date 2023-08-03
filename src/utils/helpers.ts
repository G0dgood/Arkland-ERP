export const getTotalScoreWeight = (parameters: any) => {
		let totalScoreWeight = 0;
		for (const key in parameters) {
			if (parameters.hasOwnProperty(key) && parameters[key].score_weight) {
				totalScoreWeight += parseInt(parameters[key].score_weight);
			}
		}
		return totalScoreWeight;
}
	

// export const getTotalScore = (parameters: any) => {
// 		let totalSelfScore = 0;
// 		for (const key in parameters) {
// 			if (parameters.hasOwnProperty(key) && parameters[key].self_score) {
// 				totalSelfScore += parameters[key].self_score;
// 			}
// 		}
// 		return totalSelfScore;
// }
	
// export function getTotalScore(parameters: any) {
//   let totalSelfScore = 0;
//   for (const key in parameters) {
//     const selfScore = parameters[key].self_score;
//     if (typeof selfScore === 'number') {
//       totalSelfScore += selfScore;
//     }
//   }
//   return totalSelfScore;
// }

// export function getTotalScore(parameters: any) {
//   let totalSelfScore = 0;
//   for (const key in parameters) {
//     const selfScore = parameters[key].self_score;
//     // if (typeof selfScore === 'number') {
//     //   totalSelfScore += selfScore;
// 			// }
// 			 if (!isNaN(selfScore)) {
//       totalSelfScore += parseInt(selfScore);
//     }
//   }
//   return totalSelfScore;
// }

export const getTotalScore = (parameters: any) => {
		let totalScoreWeight = 0;
		for (const key in parameters) {
			if (  parameters[key].self_score) {
				totalScoreWeight += parseInt(parameters[key].self_score);
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

export const getTotalReviewerScore= (parameters: any) => {
  let totalReviewerScore = 0;
  for (const key in parameters) {
    const reviewerScore = parameters[key].reviewer_score;
    if (typeof reviewerScore === 'number') {
      totalReviewerScore += reviewerScore;
    }
  }
  return totalReviewerScore;
}
	
	// const totalScoreWeight = getTotalScoreWeight( );
	// console.log("totalScoreWeight", totalScoreWeight);
	export const calculateTotalScore =(weights: number, scores: number) => {
		if (!weights) {
			return "-";
		} else {

			const totalScore = (weights / 5) * scores;
			return totalScore;
		}
	}


							