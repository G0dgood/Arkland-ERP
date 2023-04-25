const AddProjectNav = ({ active, setActive }: any) => {
  return (
    <div className="Stepper">
      <div className="Stepper__step">
        <div className="Stepper__indicator" onClick={() => setActive(1)}>
          <span
            className={active === 1 ? "Stepper__info__active" : "Stepper__info"}
          ></span>
        </div>
        <div className="Stepper__label">Details</div>
        <div className="Stepper__panel">test</div>
      </div>
    </div>
  );
};

export default AddProjectNav;
