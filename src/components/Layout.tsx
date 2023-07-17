import { Outlet, } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "./SidebarAndDropdown/Sidebar";
import { useEffect, useState } from "react";
import HttpService from "./HttpService";

function Layout() {

	const [collapseNav, setCollapseNav] = useState(() => {
		// @ts-ignore
		return JSON.parse(localStorage.getItem("collapse")) || false;
	});

	useEffect(() => {
		// --- Set state of collapseNav to localStorage on pageLoad --- //
		localStorage.setItem("collapse", JSON.stringify(collapseNav));
		// --- Set state of collapseNav to localStorage on pageLoad --- //
	}, [collapseNav]);
	const toggleSideNav = () => {
		setCollapseNav(!collapseNav);
	}

	const [isWarning, setisWarning] = useState(0);



	useEffect(() => {
		setTimeout(() => {
			getData()
		}, 5000);
	}, [])
	useEffect(() => {
		setTimeout(() => {
			getData()
		}, 8000);
	}, [])


	const getData = async () => {

		try {
			const warningUrl = `me/warnings`
			const warning: any = await HttpService.get(warningUrl)
			setisWarning(warning?.data?.data.length)
		} catch (error) {

		}
	}



	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} isWarning={isWarning} />
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default Layout;