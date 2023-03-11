import { Button } from '@mui/material';


const HodEvaluation = ({ data }: any) => {
  const year = new Date().getFullYear().toString();


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


  const kpiData = [
    {
      'Performance': 'Job Knowledge',
      'num': '1'
    },

    {
      'Performance': 'Efficiency',
      'num': '2'
    },
    {
      'Performance': ' Attendance',
      'num': '3'
    },
    {
      'Performance': 'Software Development',
      'num': '4'
    },
    {
      'Performance': 'Team work',
      'num': '5'
    },
    {
      'Performance': 'Debugging',
      'num': '6'
    },
  ];

  return (
    <form>
      <div className="top-fields">
        <p>{data?.data?.month}| {year} </p>
      </div>
      <div className="evaluation-area_cont">
        <div>
          <div className="added-fields_cont">
            {kpiData.map((item, i) =>
              <div key={i} className="added-field">
                <div className="factor_area">
                  <p>{item.Performance}</p>
                </div>
                <div className="rate_area">
                  <p>{item.num}</p>
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
          <Button variant="contained"
            className="Add-btn-modal" type="submit">Submit</Button>
        </div>
      </div>
    </form>
  )
}

export default HodEvaluation;