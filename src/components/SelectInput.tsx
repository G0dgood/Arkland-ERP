import { useState } from 'react'
import Select from 'react-select';
const SelectInput = ({ isLoading, isDisabled, options, value, onChange, defaultValue, label }: any) => {



	const [isRtl, setIsRtl] = useState(false);
	return (
		<div className={"input "}>
			<label className={"input__label"} >
				{label}
			</label>
			<Select
				className="basic-single"
				classNamePrefix="select"
				// defaultValue={colourOptions[0]}
				isDisabled={isDisabled}
				isLoading={isLoading}
				isClearable={true}
				isRtl={isRtl}
				isSearchable={true}
				name="color"
				options={options}
				value={value}
				onChange={onChange}
				defaultValue={defaultValue}
				defaultInputValue={defaultValue}
			/>
		</div>
	)
}

export default SelectInput