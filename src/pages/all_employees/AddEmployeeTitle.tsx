import { Button } from "@mui/material";
import { useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const AddEmployeeTitle = ({ setActive, active, click, setFinish, handleSubmitMyForm, decrementCount, incrementCountCancel, incrementCount, finish }: any) => {
  const navigate = useNavigate();





  useEffect(() => {
    if (active === 6) {
      setFinish(true);
    } else {
      setFinish(!true);
    }
  }, [active, setFinish]);

  return (
    <div className="addemployeecontainer-sup">
      <div className="back-to-employee-container">
        <Button
          onClick={() => navigate("/employees")}
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
              onClick={incrementCount}  >
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
