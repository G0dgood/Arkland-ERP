/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from 'react'
import AdminAnnouncement from '../Dashboard/AdminAnnouncement';


const AdminDashboards = () => {
	// chartRef = React.createRef();
	// const chart = chartRef.current.getContext("2d");
	// var chart = document.getElementById('chart').getContext('2d'),
	// 	gradient = chart.createLinearGradient(0, 0, 0, 450);

	// gradient.addColorStop(0, 'rgba(0, 199, 214, 0.32)');
	// gradient.addColorStop(0.3, 'rgba(0, 199, 214, 0.1)');
	// gradient.addColorStop(1, 'rgba(0, 199, 214, 0)');

	var data = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		datasets: [{
			label: 'Applications',
			// backgroundColor: gradient,
			pointBackgroundColor: '#00c7d6',
			borderWidth: 1,
			borderColor: '#0e1a2f',
			data: [60, 45, 80, 30, 35, 55, 25, 80, 40, 50, 80, 50]
		}]
	};

	var options = {
		responsive: true,
		maintainAspectRatio: true,
		animation: {
			easing: 'easeInOutQuad',
			duration: 520
		},
		scales: {
			yAxes: [{
				ticks: {
					fontColor: '#5e6a81'
				},
				gridLines: {
					color: 'rgba(200, 200, 200, 0.08)',
					lineWidth: 1
				}
			}],
			xAxes: [{
				ticks: {
					fontColor: '#5e6a81'
				}
			}]
		},
		elements: {
			line: {
				tension: 0.4
			}
		},
		legend: {
			display: false
		},
		point: {
			backgroundColor: '#00c7d6'
		},
		tooltips: {
			titleFontFamily: 'Poppins',
			backgroundColor: 'rgba(0,0,0,0.4)',
			titleFontColor: 'white',
			caretSize: 5,
			cornerRadius: 2,
			xPadding: 10,
			yPadding: 10
		}
	};
	// @ts-ignore
	// var chartInstance = new Chart(chart, {
	// 	type: 'line',
	// 	data: data,
	// 	options: options
	// });
	// @ts-ignore
	// document.querySelector('.open-right-area').addEventListener('click', function () {
	// 	// @ts-ignore
	// 	document.querySelector('.app-right').classList.add('show');
	// });
	// @ts-ignore
	// document.querySelector('.close-right').addEventListener('click', function () {
	// 	// @ts-ignore
	// 	document.querySelector('.app-right').classList.remove('show');
	// });
	// // @ts-ignore

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
	return (
		<div className="app-container">
			<div className="app-main">
				<div className="chart-row three">
					<div className="chart-container-wrapper">
						<div className="chart-container">
							<div className="chart-info-wrapper">
								<h2>Applications</h2>
								<span id="chart-info-wrapper-span"  >20</span>
							</div>
							<div className="chart-svg">
								<svg viewBox="0 0 36 36" className="circular-chart pink">
									<path className="circle-bg" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"></path>
									<path className="circle" stroke-dasharray="30, 100" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"></path>
									<text x="18" y="20.35" className="percentage">30%</text>
								</svg>
							</div>
						</div>
					</div>
					<div className="chart-container-wrapper">
						<div className="chart-container">
							<div className="chart-info-wrapper">
								<h2>Shortlisted</h2>
								<span id="chart-info-wrapper-span">5</span>
							</div>
							<div className="chart-svg">
								<svg viewBox="0 0 36 36" className="circular-chart blue">
									<path className="circle-bg" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"></path>
									<path className="circle" stroke-dasharray="60, 100" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"></path>
									<text x="18" y="20.35" className="percentage">60%</text>
								</svg>
							</div>
						</div>
					</div>
					<div className="chart-container-wrapper">
						<div className="chart-container">
							<div className="chart-info-wrapper">
								<h2>On-hold</h2>
								<span id="chart-info-wrapper-span">10</span>
							</div>
							<div className="chart-svg">
								<svg viewBox="0 0 36 36" className="circular-chart orange">
									<path className="circle-bg" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"></path>
									<path className="circle" stroke-dasharray="90, 100" d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"></path>
									<text x="18" y="20.35" className="percentage">90%</text>
								</svg>
							</div>
						</div>
					</div>
				</div>
				<div className="chart-row two">
					<div className="chart-container-wrapper big">
						{/* <div className="chart-container">
									<div className="chart-container-header">
										<h2>Top Active Jobs</h2>
										<span>Last 3022 days</span>
									</div>
									<div className="line-chart">
										ytg
										{/* <canvas id="chart">dddd</canvas> */}
						{/* jjj
									</div>
									<div className="chart-data-details">
										<div className="chart-details-header"></div>
									</div>
								</div> */}
						<AdminAnnouncement />
					</div>
					<div className="chart-container-wrapper small">
						<div className="chart-container">
							<div className="chart-container-header">
								<h2>Acquisitions</h2>
								<span >This month</span>
							</div>
							<div className="acquisitions-bar">
								<span className="bar-progress rejected" style={{ width: "8%" }} ></span>
								<span className="bar-progress on-hold" style={{ width: "10%" }}></span>
								<span className="bar-progress shortlisted" style={{ width: "18%" }}></span>
								<span className="bar-progress applications" style={{ width: "8%" }}></span>
							</div>
							<div className="progress-bar-info">
								<span className="progress-color applications"></span>
								<span className="progress-type">Applications</span>
								<span className="progress-amount">64%</span>
							</div>
							<div className="progress-bar-info">
								<span className="progress-color shortlisted"></span>
								<span className="progress-type">Shortlisted</span>
								<span className="progress-amount">18%</span>
							</div>
							<div className="progress-bar-info">
								<span className="progress-color on-hold"></span>
								<span className="progress-type">On-hold</span>
								<span className="progress-amount">10%</span>
							</div>
							<div className="progress-bar-info">
								<span className="progress-color rejected"></span>
								<span className="progress-type">Rejected</span>
								<span className="progress-amount">8%</span>
							</div>
						</div>
						<div className="chart-container applicants">
							<div className="chart-container-header">
								<h2>New Applicants</h2>
								<span>Today</span>
							</div>
							<div className="applicant-line">
								<img src="https://images.unsplash.com/photo-1587628604439-3b9a0aa7a163?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="profile" />
								<div className="applicant-info">
									<span>Emma Ray</span>
									<p>Applied for <strong>Product Designer</strong></p>
								</div>
							</div>
							<div className="applicant-line">
								<img src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80" alt="profile" />
								<div className="applicant-info">
									<span>Ricky James</span>
									<p>Applied for <strong>IOS Developer</strong></p>
								</div>
							</div>
							<div className="applicant-line">
								<img src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="profile" />
								<div className="applicant-info">
									<span>Julia Wilson</span>
									<p>Applied for <strong>UI Developer</strong></p>
								</div>
							</div>
							<div className="applicant-line">
								<img src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1215&q=80" alt="profile" />
								<div className="applicant-info">
									<span>Jess Watson</span>
									<p>Applied for <strong>Design Lead</strong></p>
								</div>
							</div>
							<div className="applicant-line">
								<img src="https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2232&q=80" alt="profile" />
								<div className="applicant-info">
									<span>John Pellegrini</span>
									<p>Applied for <strong>Back-End Developer</strong></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="app-right">
				<button className="close-right">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
				</button>

				<div className="app-right-contents">
					<div className="app-right-section-header">
						<h2>Task</h2>
					</div>
					<div className="app-right-section">
						<div className="activity-line">
							<span className="activity-icon warning">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">Your plan is expires in <strong>3 days.</strong></p>
								<a className="activity-link" href="#">Renew Now</a>
							</div>
						</div>
						<div className="activity-line">
							<span className="activity-icon warning">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">Your plan is expires in <strong>3 days.</strong></p>
								<a className="activity-link" href="#">Renew Now</a>
							</div>
						</div>
						<div className="activity-line">
							<span className="activity-icon warning">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">Your plan is expires in <strong>3 days.</strong></p>
								<a className="activity-link" href="#">Renew Now</a>
							</div>
						</div>
						<div className="activity-line">
							<span className="activity-icon warning">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">Your plan is expires in <strong>3 days.</strong></p>
								<a className="activity-link" href="#">Renew Now</a>
							</div>
						</div>
						<div className="activity-line">
							<span className="activity-icon warning">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">Your plan is expires in <strong>3 days.</strong></p>
								<a className="activity-link" href="#">Renew Now</a>
							</div>
						</div>
						<div className="activity-line">
							<span className="activity-icon warning">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">Your plan is expires in <strong>3 days.</strong></p>
								<a className="activity-link" href="#">Renew Now</a>
							</div>
						</div>
						<div className="activity-line">
							<span className="activity-icon warning">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">Your plan is expires in <strong>3 days.</strong></p>
								<a className="activity-link" href="#">Renew Now</a>
							</div>
						</div>
						<div className="activity-line">
							<span className="activity-icon warning">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-alert-circle"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">Your plan is expires in <strong>3 days.</strong></p>
								<a className="activity-link" href="#">Renew Now</a>
							</div>
						</div>
						<div className="activity-line">
							<span className="activity-icon applicant">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">There are <strong>3 new applications</strong> for <strong>UI Developer</strong></p>
							</div>
						</div>
						<div className="activity-line">
							<span className="activity-icon close">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">Your teammate, <strong>Wade Wilson</strong> has closed the job post of <strong>IOS Developer</strong></p>
							</div>
						</div>
						<div className="activity-line">
							<span className="activity-icon applicant">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">There are <strong>4 new applications</strong> for <strong>Front-End Developer</strong></p>
							</div>
						</div>
						<div className="activity-line">
							<span className="activity-icon applicant">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">There are <strong>2 new applications</strong> for <strong>Design Lead</strong></p>
							</div>
						</div>
						<div className="activity-line">
							<span className="activity-icon close">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x-circle"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">Your teammate, <strong>Wade Wilson</strong> has closed the job post of <strong>Back-End Developer</strong></p>
							</div>
						</div>
						<div className="activity-line">
							<span className="activity-icon draft">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-file-minus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
							</span>
							<div className="activity-text-wrapper">
								<p className="activity-text">You have drafted a job post for <strong>HR Specialist</strong></p>
								<a href="#" className="activity-link">Complete Now</a>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default AdminDashboards