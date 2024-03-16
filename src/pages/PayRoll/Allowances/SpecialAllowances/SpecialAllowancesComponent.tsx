import { SetStateAction, useEffect, useState } from 'react';
import { InputCategory, InputDepartment, InputExpatriate, InputLocation, InputOne, InputRole, NoRecordFound, TableFetch } from '../../../../components/TableOptions';
import { getPayparameters } from '../../../../features/Payparameters/PayparametersSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/useStore';
import { Button } from '@material-ui/core';

const SpecialAllowancesComponent = ({ setSelectedRadio, selectedRadio }: any) => {
	const dispatch = useAppDispatch();
	const { getparameterdata, getparameterisLoading } = useAppSelector((state: any) => state.payparameters)
	// const [selectedValue, setSelectedValue] = useState('Employees');
	// const [selectedLocation, setSelectedLocation] = useState('');
	// const [selectedRole, setSelectedRole] = useState('');
	// const [selectedDepartment, setSelectedDepartment] = useState('');
	// const [selectedCategory, setSelectedCategory] = useState('');
	// const [selectedExpatriate, setSelectedExpatriate] = useState('');



	const [input, setInput] = useState({
		employee: "Employees",
		location: "",
		role: "",
		department: "",
		category: "",
		expatriate: "",
		monthstopay: "",
		amount: "",
		comment: "",
	})

	console.log('input', input)

	const handleOnChange = (input: any, value: any) => {
		handleQueryClick()
		setInput((prevState: any) => ({
			...prevState,
			[input]: value,
		}));
	};

	const [Query, setQuery] = useState(
		{
			size: undefined,
			page: undefined,
			sort: undefined,
			limit: undefined,
			search: undefined,
			base: undefined,
			title: undefined,
			status: undefined,
			location: !input?.location ? undefined : input?.location,
			department: !input?.department ? undefined : input?.department,
			role: !input?.role ? undefined : input?.role,
			// @ts-ignore  
			is_expatriate: !input?.is_expatriate ? undefined : input?.is_expatriate,
			category: !input?.category ? undefined : input?.category
		}
	);





	const handleQueryClick = () => {
		setQuery((prevQuery) => ({
			...prevQuery,
			size: undefined,
			page: undefined,
			sort: undefined,
			limit: undefined,
			search: undefined,
			base: undefined,
			title: undefined,
			status: undefined,
			location: input?.employee === "Location" ? "location" : undefined,
			department: input?.employee === "Category" ? "category" : undefined,
			role: input?.employee === "Role" ? "role" : undefined,
			is_expatriate: input?.employee === "Expatriate" ? "expatriate" : undefined,
			category: input?.employee === "Category" ? "category" : undefined,
		}));

		// @ts-ignore  
		dispatch(getPayparameters(Query));
	};


	const handleRadioChange = (value: any) => {
		setSelectedRadio(value);
	};


	// const YourComponent = ({ getparameterdata, getparameterisLoading }) => {
	// const [selectedItems, setSelectedItems] = useState<any>([]);
	// const [selectAll, setSelectAll] = useState(false);
	// const handleSelectAllChange = () => {
	// 	if (selectAll) {
	// 		setSelectedItems([]);
	// 	} else {
	// 		const allEmployeeIds = getparameterdata?.data?.map((item: any) => item?.employee_id) || [];
	// 		setSelectedItems(allEmployeeIds);
	// 	}
	// 	setSelectAll(!selectAll);
	// };

	// useEffect(() => {
	// 	// Update selectAll based on the selectedItems
	// 	setSelectAll(selectedItems.length === (getparameterdata?.data?.length || 0));
	// }, [selectedItems, getparameterdata]);
	// console.log('selectedItems', selectedItems)

	// const handleCheckboxChange = (item: any) => {
	// 	if (selectedItems.includes(item)) {
	// 		// Item is already selected, remove it
	// 		setSelectedItems(selectedItems.filter((selectedItem: any) => selectedItem !== item));
	// 	} else {
	// 		// Item is not selected, add it
	// 		setSelectedItems([...selectedItems, item]);
	// 	}
	// };

	const [selectedItems, setSelectedItems] = useState<any>({});
	const [selectAll, setSelectAll] = useState(false);



	const handleCheckboxChange = (item: any) => {
		const { employee_id } = item;

		if (selectedItems[employee_id]) {
			const { [employee_id]: removed, ...rest } = selectedItems;
			setSelectedItems(rest);
		} else {
			setSelectedItems({ ...selectedItems, [employee_id]: item });
		}
	};

	const handleSelectAllChange = () => {
		if (selectAll) {
			setSelectedItems({});
		} else {
			const allItems = getparameterdata?.data?.reduce((acc: any, item: any) => {
				acc[item.employee_id] = item;
				return acc;
			}, {});
			setSelectedItems(allItems);
		}
		setSelectAll(!selectAll);
	};

	useEffect(() => {
		// Update selectAll based on the selectedItems
		setSelectAll(Object.keys(selectedItems).length === (getparameterdata?.data?.length || 0));
	}, [selectedItems, getparameterdata]);


	return (
		<div className='specialallowancescomponent'>
			<div >
				<div id='entry-radio-btn-container'>
					<div className="radio" id='entry-radio-btn'>
						<p className='check-title'> Regular Entry </p>
						<input
							id="radio-1"
							name="radio"
							type="radio"
							checked={selectedRadio === 'radio-1'}
							onChange={() => handleRadioChange('radio-1')}
						/>

						<label htmlFor="radio-1" className="radio-label"> </label>
					</div>

					<div className="radio" id='entry-radio-btn'>
						<p className='check-title'> Bulk Upload </p>
						<input
							id="radio-2"
							name="radio"
							type="radio"
							checked={selectedRadio === 'radio-2'}
							onChange={() => handleRadioChange('radio-2')}
						/>
						<label htmlFor="radio-2" className="radio-label">
						</label>
					</div>
				</div>
				{selectedRadio === "radio-1" &&
					<div className='specialallowancescomponent-contaner'>
						<InputOne handleOnChange={handleOnChange} input={input} />
						{input.employee === "Employees" ?
							<InputLocation handleOnChange={handleOnChange} input={input} /> :
							input.employee === "Role" ?
								<InputRole handleOnChange={handleOnChange} input={input} /> :
								input.employee === "Category" ?
									<InputCategory handleOnChange={handleOnChange} input={input} /> :
									input.employee === "Department" ?
										<InputDepartment handleOnChange={handleOnChange} input={input} /> :
										input.employee === "Expatriate" ?
											<InputExpatriate handleOnChange={handleOnChange} input={input} /> :
											input.employee === "Location" ?
												<InputLocation handleOnChange={handleOnChange} input={input} /> :
												<InputLocation handleOnChange={handleOnChange} input={input} />
						}

						<div className='input__label%input__field' style={{ display: "flex", gap: "20px" }}>
							<div className='input' style={{ width: "50%" }}>
								<label className='input__label'>No. of months to pay</label>
								<input className='input__field  input-perameter-color'
									value={input.monthstopay} onChange={(e: any) => handleOnChange("monthstopay", e.target.value)} />
							</div>
							<div className='input' style={{ width: "50%" }}>
								<label className='input__label'>Amount</label>
								<input className='input__field input-perameter-color'
									value={input.amount} onChange={(e: any) => handleOnChange("amount", e.target.value)} />
							</div>
						</div>
						<div className='input'>
							<label className='input__label  '>Comment</label>
							<textarea rows={4} className='input-perameter-color p-2'
								value={input.comment} onChange={(e: any) => handleOnChange("comment", e.target.value)}>
							</textarea>
						</div>
						<Button
							variant="contained"
							className="add-experience"
							type="submit"
						> Create
						</Button>
					</div>
				}

			</div>

			{selectedRadio === "radio-1" ?
				<div style={{ overflow: 'auto' }}>
					<div className='selected-sub-entries'>
						<p>Selected {selectedItems.length} Out of {getparameterdata?.data?.length} Entries</p>

					</div>
					<section className="md-ui component-data-table">
						<div className="main-table-wrapper">
							<table className="main-table-content">
								<thead className="data-table-header">
									<tr className="data-table-row">


										<td className="table-datacell datatype-numeric"   >
											<div className="md-checkbox">
												<input
													id="selectAllCheckbox"
													name="selectAllCheckbox"
													type="checkbox"
													checked={selectAll}
													onChange={handleSelectAllChange}
												/>
												<label htmlFor="selectAllCheckbox" className="radio-label"></label>
											</div>
										</td>
										<td className="table-datacell datatype-numeric"   >
											Employee & ID
										</td>
										<td className="table-datacell datatype-numeric"   >
											Department
										</td>
										<td className="table-datacell datatype-numeric"   >
											Role
										</td>
										<td className="table-datacell datatype-numeric"   >
											Location
										</td>
										<td className="table-datacell datatype-numeric"   >
											Status
										</td>

									</tr>
								</thead>
								<tbody className="data-table-content">
									{
										getparameterisLoading ? (
											<TableFetch colSpan={6} />
										) : getparameterdata?.data?.length === 0 || getparameterdata?.data == null ? (
											<NoRecordFound colSpan={6} />
										) : (
											getparameterdata?.data?.map((item: any, index: any) => (
												<tr key={index} className="data-table-row">
													<td className="table-datacell" key={item?.employee_id}>
														{/* <div className="md-checkbox">
															<input
																id={`radio-${item?.employee_id}`}
																name="radio"
																type="checkbox"
																checked={selectedItems.includes(item?.employee_id)}
																onChange={() => handleCheckboxChange(item?.employee_id)}
															/>
															<label htmlFor={`radio-${item?.employee_id}`} className="radio-label"> </label>
														</div> */}
														<div className="md-checkbox">
															<input
																id={`radio-${item?.employee_id}`}
																name="radio"
																type="checkbox"
																checked={selectedItems[item?.employee_id] !== undefined}
																onChange={() => handleCheckboxChange(item)}
															/>
															<label htmlFor={`radio-${item?.employee_id}`} className="radio-label"></label>
														</div>
													</td>
													<td className="table-datacell datatype-numeric">
														<h4>{item?.full_name}</h4>
														<p style={{ fontSize: "12px", color: "#808080" }}>{item?.employee_id}</p></td>
													<td className="table-datacell" > </td>
													<td className="table-datacell" > </td>
													<td className="table-datacell" > </td>
													<td className="table-datacell" > </td>
												</tr>
											))
										)}
								</tbody>
							</table>
						</div>
					</section>
				</div> : ""}
		</div>
	)
}

export default SpecialAllowancesComponent