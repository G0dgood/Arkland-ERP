import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../store/useStore'
import { createRequest, reset } from '../../features/workerRequest/workerRequestSlice'
import { fireAlert } from '../../utils/Alert'
import SelectInput from '../../components/SelectInput'
import { getRole } from '../../features/Employee/employeeSlice'
import { BsDashCircleFill, BsPlusCircleFill } from 'react-icons/bs'
import { ModalHeader } from '../../components/Modals/ModalOptions'
import { AiOutlineUserAdd } from 'react-icons/ai'

const RequestForWorkersModal = ({ id }: any) => {
	const dispatch = useAppDispatch();
	const { createisLoading, createmessage, createisSuccess } = useAppSelector((state: any) => state.worker)
	const { getroledata, getroleisLoading } = useAppSelector((state: any) => state.employee)
	const [Show, setLgShow] = useState(false);
	const [count, setCount] = React.useState(0);
	const [counts, setCounts] = React.useState(0);


	const [input, setInput] = useState<any>({
		requests: [],

	});
	const [newInputField, setnewInputField] = useState<any>([{
		id: 1,
		role: " ",
		requested_quantity: ""
	}]);



	// --- Adds New Request Field --- //
	const handleAddField = () => {
		setCounts(counts + 1)
		setnewInputField([
			...newInputField,
			{
				id: newInputField.length + 1,
				role: " ",
				requested_quantity: ""
			},
		]);
	};

	// --- Remove Request Field   --- //
	const handleRemoveField = (index: any) => {
		setCounts(counts - 1)
		const field = [...newInputField];
		field.splice(index, 1);
		setnewInputField(field);
	};

	const handleChange = (input: any, value: any, index: any,) => {
		let items = [...newInputField];
		let oldItem = items.findIndex((x) => x.id === index);
		let newItem = { ...items[oldItem], [input]: value };
		items[oldItem] = newItem;
		setnewInputField(items);
	};




	useEffect(() => {
		if (createisSuccess) {
			setLgShow(false)
			fireAlert("Success", "Worker Request Creation   successfully", "success");
			dispatch(reset());
		}
	}, [createisSuccess, createmessage, dispatch,]);


	const handleReject = () => {
		// @ts-ignore 
		dispatch(createRequest(input))
	}

	const Counter = ({ setCount, count }: any) => {

		const increase = () => {
			setCount(count + 1);
		};


		// working decrease
		const decrease = () => setCount((prevCount: number) => {
			if (prevCount <= 0) return 0;
			return prevCount - 1;
		})

		const reset = () => setCount(0);

		return (
			<div className="counter">
				<p className="count">{count}</p>
				<div className="controls">
					<Button className="add-experience m-2" onClick={increase}>Increase</Button>
					<Button className="add-experience m-2" onClick={decrease}>Decrease</Button>
					<Button className="add-experience m-2" onClick={reset}>Reset</Button>
				</div>
			</div>
		)
	}



	const availableRole = [] as any;
	getroledata &&
		getroledata.forEach((employee: any) =>
			availableRole.push({
				value: employee?.id,
				label: employee?.name,
			})
		);

	const activities = newInputField?.map((item: any) => ({
		role: item.role.value,
		role_name: item.role.label,
		requested_quantity: item.requested_quantity,
	}));



	useEffect(() => {
		setInput((prevState: any) => {
			return ({
				...prevState,
				requests: activities
			});
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newInputField]);

	const handleClick = () => {
		setLgShow(true)
		dispatch(getRole());
	}

	return (
		<div >
			<ul className="nav-tabs-btn mb-3">
				<li className={"active"} onClick={handleClick}>Create Employee Request</li>
			</ul>
			<Modal
				size="lg"
				show={Show}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<ModalHeader setLgShow={setLgShow} icon={<AiOutlineUserAdd size={30} />} title={"Create Employee Request"} subtitle={"Create Employee Request"} />
				<Modal.Body>
					<div id='add-field-new'>
						{newInputField?.map((item: any, index: any) => (
							<div id='reQuest-worker-contain' key={index}>
								<div id='BsPlusCircleFill'>
									<Button>	<h4>{index + 1}</h4></Button>
									<Button onClick={handleAddField}>
										<BsPlusCircleFill size={30} color='green' />
									</Button>
									<Button onClick={handleRemoveField} disabled={index < 1}>
										<BsDashCircleFill size={30} color='red' />
									</Button>
								</div>
								<SelectInput
									isDisabled={getroleisLoading}
									isLoading={getroleisLoading}
									options={availableRole}
									value={item.role}
									onChange={(e: any) => handleChange("role", e, item.id)}
								/>
								<input
									type='number'
									onChange={(e: any) => handleChange("requested_quantity", e.target.value, item.id)} />
								{/* <Counter setCount={setCount} count={count} /> */}

							</div>
						))}
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button className="add-experience m-2"
						onClick={handleReject}
						disabled={createisLoading}
					>
						{createisLoading
							? <Spinner animation="border" />
							: "Request"}</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default RequestForWorkersModal