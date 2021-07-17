import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


function ProtectedRoute(props) {
  const userInfo = useSelector(state => state.userLogin.userInfo)
  const { path, component } = props
  return (
    userInfo ?
      (<Route path={path} component={component} />)
      :
      (<Redirect to="/login" />)
  )
}

export default ProtectedRoute
