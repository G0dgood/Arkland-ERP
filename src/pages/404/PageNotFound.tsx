import { Button } from "@material-ui/core"


const PageNotFound = () => {
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
				{/* <button className="Add-btn" >
					Back home
				</button> */}
				<Button
					variant="contained"
					className="Add-btn"
					onClick={() => window.location.replace("/home")}
				>

					Back home
				</Button>
			</div>


		</div>
	)
}

export default PageNotFound
