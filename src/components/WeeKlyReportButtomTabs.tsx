import React, { useEffect, useState } from 'react'


const WeeKlyReportButtomTabs = ({ setData }: any) => {

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const subNavData: any = [
		{
			id: 1,
			category: "COVER PAGE",
		},

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

	const [filter, setFilter] = useState([])
	const [result, setResult] = useState("");


	//Getting the unique values in the array from caseStudyData
	// @ts-ignore
	const categories = [...new Set(subNavData.map((item: any) => item.category))];

	const showInfo = (catagory: any) => {
		setResult(catagory)
	}


	useEffect(() => {
		const found = subNavData.filter((element: { category: string; }) => element.category === result);
		setData(found)
		// if (result === "ALL") {
		// 	setFilter(subNavData)
		// }
		// @ts-ignore
	}, [result, filter, setData])


	// useEffect(() => {
	// 	setData(subNavData)
	// }, [setData, subNavData])



	return (
		<div className='WeeKlyReport'>
			<span className='WeeKlyReport-sub'>
				{categories.map((catagory, i) =>
					<button className="ccsnl-btn WeeKlyReport-tab"
						onClick={() => showInfo(catagory)}
						key={i}>{catagory} </button>)}
			</span>
		</div>
	)
}

export default WeeKlyReportButtomTabs




