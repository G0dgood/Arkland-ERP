import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

const Policy = () => {
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
	};

	return (
		<div id="screen-wrapper">
			<Header toggleSideNav={toggleSideNav} />
			<Sidebar collapseNav={collapseNav} />
			<main>
				<div className='policy-container' >
					<div className='policy-container-sub'>
						<h3 className='policy-title'>EMPLOYEE RECEIPT AND ACCEPTANCE</h3>
						<p className='policy-title-p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus scelerisque mattis malesuada euismod sit senectus. Cursus purus praesent nulla cursus placerat nec mattis urna. A pretium pharetra, diam, volutpat interdum augue odio pharetra scelerisque. Nisl, aliquet mattis dui quis vivamus dui. Facilisis lacus, fames amet, eget. Nunc vel vestibulum, quis ultrices. Eros, quam a consequat, est risus cursus lobortis. Nibh eu, diam, purus ipsum nulla nibh. Lectus massa aliquet risus donec. Parturient cras diam dui gravida tellus mattis. A eget ut nullam at eget aliquet aenean. Ornare elit bibendum vel lacus, congue amet pellentesque faucibus augue. Dictumst id imperdiet orci elit cursus tempus.
							Cursus eget massa mollis id turpis. Nisl nunc eget nunc blandit vitae aliquet hac viverra et. Odio tristique massa, imperdiet tincidunt. Purus venenatis morbi etiam placerat facilisi. Eu vulputate lorem duis lectus diam. Sed non nulla turpis quam.
							Aliquet et elementum arcu faucibus ullamcorper quis bibendum pellentesque metus. Sapien commodo at orci mattis congue nunc malesuada ultrices. Purus, nibh aenean sit tellus ipsum, vulputate orci. Auctor interdum malesuada senectus odio et, lorem. Eu bibendum odio pulvinar nec risus vulputate. Egestas iaculis viverra mauris vulputate quam.
							Scelerisque viverra ut orci tellus euismod aenean justo, hendrerit. Magna convallis enim, senectus amet aliquam. Adipiscing blandit nibh sit turpis viverra urna lectus. Quam elementum, enim tortor velit velit pharetra, nunc ullamcorper. Dignissim imperdiet ultricies ut imperdiet vivamus nulla quisque tincidunt nascetur. Magna aenean nullam non quis tincidunt. Tellus interdum aliquam elit, sit nisl, lacus venenatis, molestie. Sed id dictum nisi, felis enim neque, ornare. Dignissim velit dui sed suspendisse ut erat. Risus lacus, dui nunc morbi nisl. Accumsan diam lacus, aliquet habitasse vitae nisl, sit risus. Eget commodo scelerisque velit euismod amet pharetra etiam. Dignissim proin faucibus in adipiscing non potenti adipiscing non.
							Vel pharetra, aliquam consectetur egestas mauris purus sed pellentesque. Consectetur lorem facilisi elit sit ac leo. Enim, nisl, sceler</p>
					</div>
				</div>
			</main>
		</div>
	)
}

export default Policy
