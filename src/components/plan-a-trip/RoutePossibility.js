//import bootstrap from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import axios from "../support-components/axios";
import './RoutePossibility.css'

import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

function RoutePossibility() {
	const [destinations, setDestinations] = useState([])
	const [destination_to, setDestinationTo] = useState()
	const [destination_from, setDestinationFrom] = useState()
	const [output, setOutput] = useState('Try it...!')
	const [loading, setLoading] = useState(false)
	const [destinationLoader, setDestinationLoader] = useState(false)

	useEffect(() => {
		setDestinationLoader(true)
		axios.get('/tripplannerdestination/')
			.then(res => {
				// console.log(res.data)
				setDestinations(res.data)
				setDestinationLoader(false)
			})
			.catch(err => {
				setDestinationLoader(false)
				console.log(err)
			})
	}, [])

	const checkRoute = (e) => {
		e.preventDefault()
		if (destination_to === undefined || destination_from === undefined || destination_to === '' || destination_from === '') {
			toast.warn("Please Select Destinations", {
				position: toast.POSITION.TOP_LEFT
			});
		}
		else {
			setLoading(true)
			// console.log(destination_to,destination_from)
			axios.post('/routes/route', { destination_to, destination_from })
				.then(res => {
					setOutput(res.data.status)
					setLoading(false)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
	return (
		<>
		{
			destinationLoader === false ?
			<div className="container routePossibilityWrap">
				<div className="form-group">
					<div className="border border-secondry route-possibility p-3">
						<h4>Route Possibility</h4>
						<p>Check here to see route possibility between two points</p>
						<div className="form-group row">
							<div className="col">
								<h5>From:</h5>
								<div >
									<select onChange={e => { setDestinationFrom(e.target.value) }} className="custom-select">
										<option></option>
										{
											destinations.map(destination => {
												return (
													<option value={destination._id} key={destination._id} >{destination.name}</option>
												)
											})
										}
									</select>
								</div>
							</div>
							<div className="col">
								<h5>To:</h5>
								<div >
									<select onChange={e => { setDestinationTo(e.target.value) }} className="custom-select">
										<option></option>
										{
											destinations.map(destination => {
												return (
													<option value={destination._id} key={destination._id}>{destination.name}</option>
												)
											})
										}
									</select>
								</div>
							</div>
						</div>
						<div className="form-group row justify-content-center">
							{loading ?
								<button className='btn btn-secondary check-route w-25'>
									<Spinner className="spinner-border-sm" animation="border" role="status" />
								</button> :
								<button onClick={checkRoute} className=" btn btn-secondary check-route " >Check Route</button>
							}

						</div>
						<div className=" mt-3 form-group text-center p-4" id="budget-div">
							{output === 'Sorry, Direct Route Does Not Exists' ?
								<span id="output-text-no">{output}</span> :
								<span id="output-text-yes">{output}</span>
							}
						</div>
						<p id='noteText'><b>Note:</b> Route possiblity feature only check if there is any direct transport service available between two destinations.</p>
					</div>
				</div>
			</div>
			:
			<Spinner className="spinner-border-sm" animation="border" role="status" />
		}
		</>
	)
}

export default RoutePossibility;
