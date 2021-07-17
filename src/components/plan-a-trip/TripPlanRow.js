import React,{useEffect,useState} from 'react'

function TripPlanRow(props) {

  const [fare,setFare] = useState('')

  const { day, transport, hotel, total,route } = props.data
  const persons = props.persons
  
  useEffect(() => {

    if (transport.fare === 0) {
      setFare('-')
    }
    else {
      setFare(`${persons * transport.fare}rs`)
    }
  
  }, [transport.fare,persons])



  return (
    <tr>
      <th className="text-center" scope="row">Day {day}</th>
      <td>{route.destination_from}</td>
      <td>{route.destination_to}</td>
      <td>
        <table className='table table-borderless'>
          <tbody>
            <tr className="mb-2">
              <td className="text-center">{transport.name}</td>
            </tr>
            <tr className="mt-2">
              <td className="text-center">{fare}</td>
            </tr>
          </tbody>
        </table>
      </td>
      <td>
        <table className='table table-borderless'>
          <tbody>
            <tr className="mb-2">
              <td className="text-center">{hotel.name}</td>
            </tr>
            <tr className="mt-2">
              <td className="text-center">{persons * hotel.rent}rs</td>
            </tr>
          </tbody>
        </table>
      </td>
      <td className="text-center">{persons * total}</td>
    </tr>
  )
}

export default TripPlanRow
