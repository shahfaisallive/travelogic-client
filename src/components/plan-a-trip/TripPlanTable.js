import React from 'react'
import TripPlanRow from "./TripPlanRow";
import './TripPlanTable.css'

function TripPlanTable(props) {
  const display = props.display
  const luxury = props.luxury
  const budget = props.budget
  const luxuryTotal = props.luxuryTotal
  const budgetTotal = props.budgetTotal
  const persons = props.persons
  return (
    <div>
      {display ? (
        <div className='bg-white mt-2 p-2 rounded'>
          <h5 className='mt-1 text-center' >Budget Plan</h5>
          <table class="table table-sm table-bordered planTable">
            <thead>
              <tr>
                <th scope="col">Day #</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Transport Details</th>
                <th scope="col">Hotel Details</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {
                budget.map(day => {
                  return (
                    <TripPlanRow key={day.day} type='budget' persons={persons} data={day} />
                  )
                })
              }
            </tbody>
          </table>
          <p><b>Budget Total:</b> {budgetTotal} PKR </p>

          <h5 className='mt-4 text-center'>Luxury Plan</h5>
          <table class="table table-sm table-bordered planTable">
            <thead>
              <tr>
                <th scope="col">Day #</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Transport Details</th>
                <th scope="col">Hotels Details</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {
                luxury.map(day => {
                  return (
                    <TripPlanRow key={day.day} type='luxury' persons={persons} data={day} />
                  )
                })
              }
            </tbody>
          </table>
          <p><b>Luxury Total:</b> {luxuryTotal} PKR </p>
        </div>) :
        <div></div>
      }

    </div>
  )
}

export default TripPlanTable
