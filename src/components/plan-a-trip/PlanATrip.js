import React, { useEffect } from 'react'
import './Plan-a-Trip.css'

//PlanATrip components imported here
import Searchbar from "../header/Searchbar.js"
import PlanATripForm from "./PlanATripForm.js"
import RoutePossibility from "./RoutePossibility.js"
import Meta from '../support-components/Meta'


const PlanATrip = ({ history }) => {
	useEffect(() => {
		window.scrollTo(0, 0)
	})

	return (
		<div className="container">
			<Meta title="Trip Planner | Plan your journey" keywords="trip planner, travel, trip guide, travelogic guide, tour planner, budget calculater" />
			<Searchbar history={history} />
			<h2 className="text-center ">Plan Your Trip</h2>
			<div className="p-3 mb-3" id="planATrip-cont" >
				<div className=" container form-group row" >
					<div className="col-md-7 ">
						<PlanATripForm />
					</div>
					<div className="col md-5">
						<RoutePossibility />
					</div>
				</div>
			</div>
		</div>
	);
}

export default PlanATrip;
