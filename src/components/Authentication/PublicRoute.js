import React from 'react'
import { Route,Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';


function PublicRoute(props) {
  const userInfo = useSelector(state => state.userLogin.userInfo)
  const {path,component} = props
  const toRender = () =>{
    if(userInfo){
      if(path==='/login'|| path==='/signup' ){
        return <Redirect to="/"/>
      }
    }
    return <Route exact path={path} component={component} />
  }
  return (  
    toRender()
  )
}

export default PublicRoute
