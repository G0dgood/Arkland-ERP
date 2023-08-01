// Generic component - simple feedback after an action has taken place
const Feedback = ({ message, type }: any) => {
	return <div className={`feedback ${type}`}>{message}</div>;
};

export { Feedback };