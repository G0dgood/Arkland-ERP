import React from 'react';
import { states } from '../../components/Data';
import { Button } from '@material-ui/core';



const Search = ({ ID, search, create, Date, State, Product, GridView, isGridView, switchView }: any) => {


  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()

  }

  return (
    <div className="search-area">
      <form onSubmit={handleSubmit}>
        {ID && <div className="form-grp">
          <label htmlFor="loanID">{ID}</label>
          <input id="loanID" type="text" placeholder="Enter Inventory ID" />
        </div>}

        {State && <div className="form-grp">
          <label htmlFor="state">State</label>
          <select id="state">
            <option>Please select</option>
            {states.map((state: any, i: any) => (
              <option value={state} key={i}>{state}</option>
            ))}
          </select>
        </div>}
        {Date && <div className="form-grp">
          <label htmlFor="date">Date</label>
          <input id="date" type="date" />
        </div>}
        {search && <div className="search-btn">
          <Button className="add-experience">Search</Button>
        </div>}
        {create && <div className="search-btn">
          {/* <RegisterModal /> */}
          {/* <button>Create User</button> */}
        </div>}
        {Product &&
          <div >
            <Button className="add-experience">Add Product</Button>
          </div>}
      </form>

    </div>
  )
}

export default Search;