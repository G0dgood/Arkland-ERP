import { Button } from "@material-ui/core"
import { useNavigate } from "react-router-dom";


const PageNotFound = () => {

	const navigate = useNavigate();
	return (
		<div className='body-container'>
			<div className="container-body">
				<div className="crane-container">
					<img src="https://i.postimg.cc/JhYnB3hd/crane.png" alt="" className="crane-img" />
				</div>

				<div className="container-404">
					<span className="text-404">4</span>
					<img src="https://i.postimg.cc/6Qpq3bBv/plaint.png" alt="" className="plaint-img" />
					<span className="text-404">4</span>

					<img src="https://i.postimg.cc/8PLjnryj/bird.png" alt="" className="bird-img" />

					<span className="box box-1"></span>
					<span className="box box-2"></span>
					<span className="box box-3"></span>

				</div>
			</div>

			<div className="text-container">
				<h1>Opp! Sorry...</h1>
				<p>Page not found</p>
				<Button
					variant="contained"
					className="add-experience"
					onClick={() => navigate("/")}
				>
					Login
				</Button>
			</div>


		</div>
	)
}

export default PageNotFound
