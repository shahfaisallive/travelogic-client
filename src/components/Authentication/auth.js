import jwtDecode from "jwt-decode";


export const getToken = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return 'Token Not Available'
  }
  else {
    return token
  }
}

export const isLoggedIn = () => {
  return localStorage.getItem('token') ? true : false
}

export const getLoggedInUser = () => {
  try {
    const jwt_token = localStorage.getItem('token')
    // console.log(jwt_token)
    const decoded = jwtDecode(jwt_token);
    // console.log(decoded)

    return decoded;
  } catch (ex) {
    return null;
  }
}


export const removeToken = () => {
  localStorage.removeItem('userInfo')
}
