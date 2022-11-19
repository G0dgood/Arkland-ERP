import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";

import { faker } from "@faker-js/faker";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { MainSearch } from "../../components/TableOptions";

interface IData {
	name?: string;
	department?: string;
	teamlead?: string;
	role?: string;
	location?: string;
	lga?: string;
	country?: string;
	due_date?: string;
	children?: JSX.Element | JSX.Element[];
	// view?: () => null;
}

export const DATA: IData[] = [];

export function createRandomData(): IData {
	return {
		name: faker.name.fullName(),
		department: faker.commerce.department(),
		teamlead: faker.name.fullName(),
		role: faker.random.word(),
		location: faker.address.secondaryAddress(),
		lga: faker.address.streetAddress(),
		country: faker.address.country(),
		due_date: faker.commerce.price(),
	};
}

Array.from({ length: 50 }).forEach(() => {
	DATA.push(createRandomData());
});
// header for data table
const header = [
	{ title: "NAME", prop: "NAME" },
	{ title: "DEPARTMENT", prop: "DEPARTMENT" },
	{ title: "TEAM LEAD", prop: "team_lead" },
	{ title: "ROLE", prop: "role" },
	{ title: "LOCATION", prop: "location" },
	{ title: "LGA", prop: "lga" },
	{ title: "COUNTRY", prop: "country" },
	{ title: "DUE DATE", prop: "due_date" },
	{ title: "VIEW", prop: "view" },
];

const Projects = () => {
	const [collapseNav, setCollapseNav] = useState(() => {
		// @ts-ignore
		return JSON.parse(localStorage.getItem("collapse")) || false;
	});
	const navigate = useNavigate();

	useEffect(() => {
		// --- Set state of collapseNav to localStorage on pageLoad --- //
		localStorage.setItem("collapse", JSON.stringify(collapseNav));
		// --- Set state of collapseNav to localStorage on pageLoad --- //
	}, [collapseNav]);
	const toggleSideNav = () => {
		setCollapseNav(!collapseNav);
	};
	const viewProject = () => {
		console.log("clicked");
		navigate("/viewproject");
	};

	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<div className="allemployees-container">
					<div className="allemployees-container-main">
						<div className="allemployees-container-sup">
							<div className="allemployees-sup-item1">
								<Button variant="contained" className="Add-btn">
									<GoPlus /> Create Project
								</Button>
							</div>
							<div className="allemployees-sup-item2">
								<Button variant="contained" className="Add-btn">
									Request Worker List
								</Button>
							</div>
						</div>

						<div>
							<MainSearch placeholder={"Search...          Projects"} />
						</div>
					</div>

					<section className="md-ui component-data-table">
						<div className="main-table-wrapper">
							<table className="main-table-content">
								<thead className="data-table-header">
									<tr className="data-table-row">
										{header.map((i, index) => {
											return (
												<>
													<td
														className="table-datacell datatype-numeric"
														key={index}
													>
														{i.title}
													</td>
												</>
											);
										})}
									</tr>
								</thead>
								<tbody className="data-table-content">
									{DATA.map((i: any, index) => {
										return (
											<>
												<tr className="data-table-row" key={index}>
													{Object.values(i).map((i: any, index: number) => {
														return (
															<>
																<td
																	className="table-datacell datatype-numeric"
																	key={index}
																>
																	{i}
																</td>
															</>
														);
													})}
													<td className="table-datacell datatype-numeric">
														<div className="table-active-items">
															<Button
																variant="contained"
																className="view-project-btn"
																onClick={viewProject}
															>
																View
															</Button>
														</div>
													</td>
												</tr>
											</>
										);
									})}
								</tbody>
							</table>
						</div>
						{/* <footer className="main-table-footer">
              <span className="rows-selection">
                <span className="rows-selection-label">
                  Total of 34 Projects
                </span>
              </span>
              <span className="table-pagination">
                <i className="material-icons">Prev</i>
                <i className="material-icons">Next</i>
              </span>
            </footer> */}
					</section>
				</div>
			</main>
		</div>
	);
};

export default Projects;