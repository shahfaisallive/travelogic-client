import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import axios from "../support-components/axios"

function EmailConfirmation(props) {
  const [EmailConfirmed,setEmailConfirmed] = useState(false)
  const [EmailConfirmedLoader,setEmailConfirmedLoader] = useState(false)
  useEffect(()=>{
    console.log('token',props.match.params.token)
    setEmailConfirmedLoader(true)
    axios.get(`users/email/${props.match.params.token}`)
    .then(res=>{
      console.log(res.data)
      if (res.data.verified===true){
        setEmailConfirmed(true)
        setEmailConfirmedLoader(false)
      }
      else if(res.data.verified===false){
        setEmailConfirmed(false)
        setEmailConfirmedLoader(false)
      }
    })
    .catch(err=>{
      console.log(err)
      setEmailConfirmed(false)
      setEmailConfirmedLoader(false)
    })
    setEmailConfirmed(true)
  },[props.match.params.token])
  return (
    <div className='pt-4 col-lg-12 mx-auto mb-0 row justify-content-center'>
      {
        EmailConfirmedLoader ?
        <Spinner className="" animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        :
        EmailConfirmed ?
        <div className="container jumbotron mt-4">
          <h1 className="display-4">Email Confirmed</h1>
          <p className="lead">Thank You For Registeration, Your Email Has Been Confirmed</p>
          <hr className="my-4"/>
          <p className="lead">
          <Link style={{ backgroundColor: "#114b5f","color":"white" }} className="btn btn-lg" to ="/login" role="button">Click Here To Login</Link>
          </p>
        </div> :
        <div className="container jumbotron mt-4">
          <h1 className="display-4">Sorry, Something Went Wrong or The Link has Expired</h1>
          <hr className="my-4"/>
          <p className="lead">
            <Link style={{ backgroundColor: "#114b5f","color":"white" }} className="btn btn-lg" to ="/" role="button">Go To Home</Link>
          </p>
        </div>
        
      }
    </div>
  )
}

export default EmailConfirmation
