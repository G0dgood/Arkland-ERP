import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const AddEmployeeTitle = ({ setActive, active, click }: any) => {
  const navigate = useNavigate();

  const [finish, setFinish] = useState<boolean>(false);

  // Function to increment count by 1
  const incrementCountCancel = () => {
    // Update state with incremented value
    setActive((active = 1));
  };
  // Function to increment count by 1
  const incrementCount = () => {
    // Update state with incremented value
    if (active !== 6) {
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
    if (active === 6) {
      setFinish(true);
    } else {
      setFinish(!true);
    }
  }, [active]);

  return (
    <div className="addemployeecontainer-sup">
      <div className="back-to-employee-container">
        <Button
          onClick={() => navigate("/employeecontainer")}
          variant="outlined"
          className="back-to-employee-button"
        >
          <GoArrowLeft className="back-to-employee-icon" size={20} />
        </Button>
        <h4
          className="addemployeecontainer-title"
          onClick={incrementCountCancel}
        >
          Add Employee
        </h4>
      </div>
      <div className="addemployee-sup">
        <div>
          <Button
            variant="outlined"
            className="addemployee-back"
            onClick={decrementCount}
          >
            BACK
          </Button>
        </div>
        <div className="addemployee-space" />
        <div>
          {finish ? (
            <Button
              variant="contained"
              className="addemployee-back2"
              onClick={incrementCount}
            >
              FINISH
            </Button>
          ) : (
            <Button
              variant="contained"
              className="addemployee-back2"
              onClick={click}
              type="submit"
            >
              CONTINUE
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeTitle;
