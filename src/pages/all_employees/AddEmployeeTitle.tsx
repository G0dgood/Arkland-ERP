
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
const AddEmployeeTitle = ({ setActive, active }: any) => {
	const [finish, setFinish,] = useState<boolean>(false)


	// Function to increment count by 1
	const incrementCountCancel = () => {
		// Update state with incremented value 
		setActive(active = 1);

	};
	// Function to increment count by 1
	const incrementCount = () => {
		// Update state with incremented value
		if (active !== 5) {
			setActive(active + 1);
		}
	};
	// Function to decrementCount count by 1
	const decrementCount = () => {
		// Update state with incremented value
		if (active !== 1) {
			setActive(active - 1);
		}
	};

	useEffect(() => {
		if (active === 5) {
			setFinish(true)
		} else {
			setFinish(!true)
		}

	}, [active])

	return (
		<div className='addemployeecontainer-sup'>
			<h4 className='addemployeecontainer-title' onClick={incrementCountCancel}>Add Employee</h4>
			<div className='addemployee-sup'>
				<div>
					<Button variant="outlined" className="addemployee-back" onClick={decrementCount}>
						BACK
					</Button>
				</div>
				<div className='addemployee-space' />
				<div>
					{finish ? <Button variant="contained" className="addemployee-back2" onClick={incrementCount}>
						FINISH
					</Button> : <Button variant="contained" className="addemployee-back2" onClick={incrementCount}>
						CONTINUE
					</Button>}
				</div>
			</div>
		</div>
	)
}

export default AddEmployeeTitle
