//import bootstrap, { Button } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import axios from "../support-components/axios";
import './PlanATripForm.css'
import { Formik, Form, Field, FieldArray } from 'formik';
import { Select } from '@material-ui/core'
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner'


import TripPlanTable from './TripPlanTable'

function PlanATripForm() {
  const [stopsLoader, setStopsLoader] = useState(false)
  const [calculateBudgetLoader, setCalculateBudgetLoader] = useState(false)
  const [destinations, setDestinations] = useState([])
  const [displayTripTable, setDisplayTripTable] = useState(false)
  const [displayGenerateButton, setDisplayGenerateButton] = useState(false)
  const [displayEstimateButton, setDisplayEstimateButton] = useState(false)
  const [stops, setStops] = useState([])
  const [minHotel, setMinHotel] = useState(0)
  const [maxHotel, setMaxHotel] = useState(0)
  const [minTravel, setMinTravel] = useState(0)
  const [maxTravel, setMaxTravel] = useState(0)
  const [minTotal, setMinTotal] = useState(0)
  const [maxTotal, setMaxTotal] = useState(0)
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const [departure, setDeparture] = useState('')
  const [final, setFinal] = useState('')
  const [disable, setDisable] = useState(false)
  const [luxury, setLuxury] = useState([])
  const [budget, setBudget] = useState([])
  useEffect(() => {
    axios.get('/tripplannerdestination/')
      .then(res => {
        console.log(res.data)
        setDestinations(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  const initialValues = {
    numberOfStops: '',
    persons: '',
    destinations: []
  };

  const onGenerateTripPlan = (e) => {
    e.preventDefault()
    setDisplayTripTable(true)
    setDisplayGenerateButton(true)
  }

  function onChangeTickets(e, field, values, setValues) {
    // update dynamic form
    const destinations = [...values.destinations];
    const numberOfStops = e.target.value || 0;
    const previousNumber = parseInt(field.value || '0');
    if (previousNumber < numberOfStops) {
      for (let i = previousNumber; i < numberOfStops; i++) {
        destinations.push('');
      }
    } else {
      for (let i = previousNumber; i >= numberOfStops; i--) {
        destinations.splice(i, 1);
      }
    }
    setValues({ ...values, destinations });

    // call formik onChange method
    field.onChange(e);
  }
  function checkArrayForEmptyIndex(arr) {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index] === '' || arr[index] === undefined) {
        return true
      }
    }
    return false
  }
  function getStops() {
    console.log(to, from)
    if ((to === '' || undefined) || (from === '' || undefined)) {
      toast.warning("Please Select Both Departure and Final Location", {
        position: toast.POSITION.TOP_LEFT
      });
    }
    else if (to === from) {
      toast.warning("Departure and Final Location Should be Different", {
        position: toast.POSITION.TOP_LEFT
      });
    }
    else {
      setStopsLoader(true)
      axios.post('/tripplannerdestination/coordinates/destinations', { 'to': to, 'from': from })
        .then(res => {
          console.log(res.data)
          if (res.data.length === 0) {
            reset()
          } else {

            setStops(res.data)
          }
          setStopsLoader(false)

        })
        .catch(err => {
          console.log(err)
          setStopsLoader(false)
        })
      setDisable(true)

    }

  }
  function reset() {
    setStops([])
    setDisable(false)
    setMinTotal(0)
    setMaxTotal(0)
    setMinHotel(0)
    setMaxHotel(0)
    setMinTravel(0)
    setMaxTravel(0)
    setDisplayTripTable(false)
    setDisplayEstimateButton(false)
    setDisplayGenerateButton(false)
  }
  function handleOnChangeDeparture(e) {
    setFrom(e.target.value);
    const selectedIndex = e.target.options.selectedIndex;
    setDeparture(e.target.options[selectedIndex].getAttribute('data'))
  }
  function handleOnChangeFinal(e) {
    setTo(e.target.value);
    const selectedIndex = e.target.options.selectedIndex;
    setFinal(e.target.options[selectedIndex].getAttribute('data'))
  }
  function onSubmit(fields) {
    // display form field values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
    if (fields.destinations.length === '') {
      toast.warning("Please Fill Up The Form", {
        position: toast.POSITION.TOP_LEFT
      });
    }
    else if (fields.persons === '' || fields.persons === undefined) {
      toast.warning("Please Select Number of Persons", {
        position: toast.POSITION.TOP_LEFT
      });
    }
    else if (checkArrayForEmptyIndex(fields.destinations)) {
      toast.warning("Your Form is Incomplete", {
        position: toast.POSITION.TOP_LEFT
      });
    }
    else {
      setCalculateBudgetLoader(true)
      var destinations = []
      destinations.push(...fields.destinations);
      destinations.unshift(departure)
      destinations[destinations.length] = final
      axios.post('/plan/estimate', { destinations: destinations })
        .then(res => {
          console.log(res.data)
          setMinHotel(fields.persons * res.data.minHotel)
          setMaxHotel(fields.persons * res.data.maxHotel)
          setMinTravel(fields.persons * res.data.minTransportFare)
          setMaxTravel(fields.persons * res.data.maxTransportFare)
          setMinTotal(fields.persons * res.data.newMinEstimate)
          setMaxTotal(fields.persons * res.data.newMaxEstimate)
          setLuxury(res.data.luxury)
          setBudget(res.data.budget)

          setDisplayEstimateButton(true)
          setCalculateBudgetLoader(false)
        })
        .catch(err => {
          toast.warning(err.response.data.message, {
            position: toast.POSITION.TOP_LEFT
          });
          console.log(err)
          setCalculateBudgetLoader(false)
        })
    }
  }

  return (
    <div className='container'>
      {
        destinations.length>0 ?
        <>
          <div className="form-group">
            <label className='font-weight-bold'>Departure Location</label>
            <select disabled={disable} className="form-control" onChange={e => { handleOnChangeDeparture(e) }} >
              <option value=''></option>
              {
                destinations.map(destination => {
                  return (
                    <option data={destination._id} value={destination.north_coordinate.$numberDecimal} key={destination._id} >{destination.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label className='font-weight-bold'>Final Location</label>
            <select disabled={disable} className="form-control" onChange={
              e => { handleOnChangeFinal(e) }} >
              <option value=''></option>
              {
                destinations.map(destination => {
                  return (
                    <option data={destination._id} value={destination.north_coordinate.$numberDecimal} key={destination._id} >{destination.name}</option>
                  )
                })
              }
            </select>
          </div>
        </> :
        <Spinner className="spinner-border-sm" animation="border" role="status" />
      }

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, fields, values, touched, setValues, setFieldValue }) => (
          <Form>
            <div >

              {
                stops.length === 0 ?
                  <div className=" mt-3">
                    {
                      stopsLoader ?
                        <button className='btn button'>
                          <Spinner className="spinner-border-lg" animation="border" role="status" />
                        </button> :
                        <input type='button' value='Go!' onClick={getStops} className="btn button" />
                    }
                  </div>
                  :
                  <div>
                    <div className="form-group mt-2">
                      <label className='font-weight-bold mr-1'>Number of Days</label>
                      <Field name="numberOfStops">
                        {({ field }) => (
                          <select className='w-10 ml-2' {...field} onChange={e => onChangeTickets(e, field, values, setValues)}>
                            <option value=""></option>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i =>
                              <option key={i} value={i - 1}>{i}</option>
                            )}
                          </select>
                        )}
                      </Field>
                    </div>
                    <FieldArray name="destinations">
                      {() => (values.destinations.map((ticket, i) => {
                        if (i === 0) {
                          let stay = i + 1
                          return (
                            <div key={i} className="list-group list-group-flush">
                              <div className="list-group-item">
                                <div>
                                  <p>(night stays during the trip)</p>
                                  <div className="form-group ">
                                    <label className='font-weight-bold'>Stay {stay}</label>
                                    <Field defaultValue='' className='w-100' name={`destinations.${i}`} type='select' as={Select} >
                                      <option value=''></option>
                                      {
                                        stops.map(destination => {
                                          return (
                                            <option value={destination._id} key={destination._id} >{destination.name}</option>
                                          )
                                        })
                                      }
                                    </Field>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        else {
                          let stay = i + 1
                          return (
                            <div key={i} className="list-group list-group-flush">
                              <div className="list-group-item">
                                <div className="">
                                  <div className="form-group ">
                                    <label className='font-weight-bold'>Stay {stay}  </label>
                                    <Field className='w-100' name={`destinations.${i}`} type='select' as={Select} >
                                      <option value=''></option>
                                      {
                                        stops.map(destination => {
                                          return (
                                            <option value={destination._id} key={destination._id} >{destination.name}</option>
                                          )
                                        })
                                      }
                                    </Field>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      }))
                      }
                    </FieldArray>
                    <div>
                      <div className="list-group-item w-25 mt-2">
                        <div className="form-group ">
                          <label className='font-weight-bold'>Persons</label>
                          <Field className='w-100' name='persons' type='select' as={Select} >
                            <option value='1'></option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                          </Field>
                        </div>
                      </div>
                    </div>
                    <div className=" mt-3">
                      {
                        calculateBudgetLoader ?
                          <button className='btn button w-50'>
                            <Spinner className="spinner-border-lg" animation="border" role="status" />
                          </button> :

                          <button disabled={displayEstimateButton} type="submit " className="btn button " id='plannerBtn'>
                            Calculate Approximate Budget
                          </button>
                      }
                    </div>

                    {
                      minTotal > 0 ?
                        (
                          <div className="mt-3 form-group rounded pt-2 pl-3 pr-3 pb-1" id="budget-div">
                            <h5>Expense Table</h5>
                            <table class="table table-bordered" id='expenseTable'>
                              <thead>
                                <tr>
                                  <th scope="col"></th>
                                  <th scope="col">Minimum</th>
                                  <th scope="col">Maximum</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope="row">Transport</th>
                                  <td>{minTravel} PKR</td>
                                  <td>{maxTravel} PKR</td>
                                </tr>
                                <tr>
                                  <th scope="row">Hotels</th>
                                  <td>{minHotel} PKR</td>
                                  <td>{maxHotel} PKR</td>
                                </tr>
                              </tbody>
                            </table>

                            <p className='mt-3'><b>Total Estimated Budget</b>: {minTotal} PKR - {maxTotal} PKR</p>
                            <hr />
                            <p style={{ fontSize: 13 }}><b>Note: </b>This estimated budget is based on transport and hotel services, it doesn't include food and other expenses which depends on your own needs.</p>
                          </div>
                        ) :
                        (
                          <div className="mt-3 form-group border border-secondary text-center p-4" id="budget-div">
                            <span className="font-weight-bold" id="budget-heading">Click on the calculate button to view estimated budget</span>
                            <div></div>
                          </div>
                        )
                    }
                    {
                      minTotal > 0 ?
                        <button onClick={onGenerateTripPlan} disabled={displayGenerateButton} className="btn button" >Generate Trip Plan</button> :
                        <div></div>
                    }
                    {
                      luxury.length > 0 && budget.length > 0 ?
                        <TripPlanTable persons={values.persons} display={displayTripTable} luxuryTotal={maxTotal} budgetTotal={minTotal} luxury={luxury} budget={budget} /> :
                        null
                    }
                    <div className=" mt-3">
                      <button onClick={reset} id='plan-another' className="btn">
                        Plan Another Trip
                      </button>
                    </div>

                  </div>
              }

            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PlanATripForm
