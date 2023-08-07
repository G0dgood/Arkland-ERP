
import { Button } from '@material-ui/core';
import { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { MdOutlineClose } from 'react-icons/md';
import KPIAssessment from '../../pages/kpi_assessment/KPIAssessment';
import HttpService from '../HttpService';

const CreateKpiModal = () => {
	const [show, setShow] = useState(false);
	const [count, setCount] = useState<number>(0)
	const [inputs, setInputs] = useState<any>({
		month: 0,
		reviewer: "",
		job_knowledge: 0,
		efficiency: 0,
		attendance: 0,
		other_parameters: [],
		comment: ""
	})


	const [newKpiField, setNewKpiField] = useState<any>([
		{
			id: 1,
			name: "",
			score: 0,
			description: "",
		}
	]);

	// --- Adds New Performance Field --- //
	const handleAddField = () => {
		setCount(count + 1)
		setNewKpiField([
			...newKpiField,
			{
				id: newKpiField.length + 1,
				name: "",
				score: 0,
				description: "",
			}
		]);
	};

	// --- Remove New Weekly Field   --- //
	const handleRemoveField = (index: any) => {
		setCount(count - 1)
		const field = [...newKpiField];
		field.splice(index, 1);
		setNewKpiField(field);
	};



	const handleKPIChange = (input: any, value: any, index: any,) => {
		let items = [...newKpiField];
		let oldItem = items.findIndex((x) => x.id === index);
		let newItem = { ...items[oldItem], [input]: value };
		items[oldItem] = newItem;
		setNewKpiField(items);
	};

	const other_parameters = newKpiField?.map((item: any) => ({
		name: item.name,
		score: item.score,
		description: item.description,
	}));

	const allInput = { ...inputs, other_parameters }




	return (
		<>
			<Button className="add-experience" onClick={() => { setShow(true) }} style={{ marginLeft: "1rem" }}>
				Create KPI Assessment
			</Button>
			<Modal
				show={show}
				onHide={() => setShow(false)}
				fullscreen={true}>
				<Modal.Header  >
					<span className="span-center-title">Create Assessment</span>

					<Button onClick={() => setShow(false)}>
						<MdOutlineClose size={28} />
					</Button>
				</Modal.Header>
				<Modal.Body>
					<main>
						<KPIAssessment
							setShow={setShow}
							handleRemoveField={handleRemoveField}
							handleAddField={handleAddField}
							newKpiField={newKpiField}
							handleKPIChange={handleKPIChange}
							setInputs={setInputs}
							inputs={inputs}
							allInput={allInput}
						/>
					</main>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default CreateKpiModal