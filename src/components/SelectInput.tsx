import React, { useState } from 'react'
import Select from 'react-select';
const SelectInput = ({ isLoading, isDisabled, options, value, onChange, defaultValue }: any) => {

	const [isClearable, setIsClearable] = useState(true);
	const [isSearchable, setIsSearchable] = useState(true);


	const [isRtl, setIsRtl] = useState(false);
	return (
		<div>
			<Select
				className="basic-single"
				classNamePrefix="select"
				// defaultValue={colourOptions[0]}
				isDisabled={isDisabled}
				isLoading={isLoading}
				isClearable={true}
				isRtl={isRtl}
				isSearchable={isSearchable}
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