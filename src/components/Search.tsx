import React from 'react';
import { Form } from 'react-bootstrap';

const Search = ({ placeHolder, onChange, result }: any) => {

	return (
		<Form className='searchbox'>
			<div className="search-form-ctrl">
				<input type="search" placeholder={placeHolder}
					value={result}
					onChange={onChange} />
				<button type="button">
					<i className="fa fa-search"></i>
				</button>

			</div>
		</Form>
	)
}

export default Search;