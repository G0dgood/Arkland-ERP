import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const HodEvaluation = () => {

  const [performanceTable, setPerformanceTable] = useState([])
  const [newFactor, setNewFactor] = useState("")
  const [newRating, setNewRating] = useState("")

  // --- Handle Add Field --- //
  // const handleAddField = () => {
  //   setPerformanceTable([
  //     { factor: newFactor, rating: newRating },
  //     ...performanceTable
  //   ])
  //   setNewFactor("")
  //   setNewRating("")
  // }

  // --- Handle Delete Field --- //
  // const handleDeleteField = (i) => {
  //   const fields = [...performanceTable]
  //   fields.splice(i, 1)
  //   setPerformanceTable(fields)
  // }

  return (
    <form>
      <div className="top-fields">
        <p>3 | 2021</p>
      </div>
      <div className="evaluation-area_cont">
        <div>
          <div className="added-fields_cont">
            {[1, 2, 3, 4, 5].map((item, i) =>
              <div key={i} className="added-field">
                <div className="factor_area">
                  <p>Punctuality</p>
                </div>
                <div className="rate_area">
                  <p>{item}</p>
                </div>
                <div className="btn_area">
                  <select>
                    <option></option>
                    {[1, 2, 3, 4, 5].map(item =>
                      <option key={item} value={item}>{item}</option>
                    )}
                  </select>
                </div>
              </div>
            )}
          </div>
          {/* @ts-ignore */}
          <textarea rows="4" placeholder="Add an extended comment" required />
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </form>
  )
}

export default HodEvaluation;