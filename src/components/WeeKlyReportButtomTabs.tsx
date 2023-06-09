/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'


const WeeKlyReportButtomTabs = ({ setData }: any) => {

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const subNavData: any = [

		{
			id: 2,
			category: "Week 1",
		},
		{
			id: 12,
			category: "Week 2",
		},
		{
			id: 13,
			category: "Week 3",
		},
		{
			id: 3,
			category: "Week 4"
		},
		{
			id: 4,
			category: "Week 5",
		},

	];


	const [result, setResult] = useState("");
	//Getting the unique values in the array from caseStudyData
	// @ts-ignore
	const categories = [...new Set(subNavData.map((item: any) => item?.category))];

	const showInfo = (category: any) => {
		setResult(category)
	}


	useEffect(() => {
		const found = subNavData.filter((element: { category: string; }) => element.category === result);
		setData(found)


	}, [result, setData])


	// eslint-disable-next-line react-hooks/exhaustive-deps


	return (
		<div className='WeeKlyReport'>
			<span className='WeeKlyReport-sub'>
				{categories.map((category, i) =>
					<button className="ccsnl-btn WeeKlyReport-tab"
						onClick={() => showInfo(category)}
						key={i}>{category} </button>)}
			</span>
		</div>
	)
}

export default WeeKlyReportButtomTabs




