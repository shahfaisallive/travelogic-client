import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import "./Navbar.css";
import { logout } from "../../actions/userActions"

const Navbar = () => {
	const dispatch = useDispatch()

	const userInfo = useSelector(state => state.userLogin.userInfo)

	const logoutHandler = () => {
		dispatch(logout())
		window.location.reload()
	}
	// const [navSearchText, setNavSearchText] = useState()
	const [navScroll, setNavScroll] = useState('navbar-wrap')
	const [scrollLogo, setScrollLogo] = useState('navbar-logo')
	useEffect(() => {
		window.addEventListener("scroll", function () {

			if (window.pageYOffset > 0) {
				setNavScroll('scrollNavBar')
				setScrollLogo('scrollNavLogo')
			} else {
				setNavScroll('navbar-wrap')
				setScrollLogo('navbar-logo')
			}
		});
	}, [])

	return (
		<div id="nav-wrap" className="row " >
			<div id="nav" className="container-fluid "  >
				<nav className={`navbar navbar-expand-lg ${navScroll}`}>
					<button className="navbar-toggler navbar-dark" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="navMenu collapse navbar-collapse text-center" id="navbarToggler">
						<div className="col-lg-3 brandLogo" id="brand-container">
							<Link className="navbar-brand" id="brand-title" to="/"><img alt="wait" src={"/images/logo-png.png"} id={scrollLogo}></img></Link>
						</div>
						<div className="col-lg-9" id="nav-links-wrap">
							<div className="row">
								<div className="col-lg-7" id="nav-links-module">
									<ul className="navbar-nav mr-auto mt-2 mt-lg-0" >
										<li className="nav-item">
											<NavLink className="nav-link" activeClassName="activeLink" exact to="/">Home</NavLink>
										</li>
										<li className="nav-item">
											<NavLink className="nav-link" activeClassName="activeLink" to="/destinations">Destinations</NavLink>
										</li>
										<li className="nav-item">
											<NavLink className="nav-link " activeClassName="activeLink" to="/planatrip">Trip Planner</NavLink>
										</li>
										<li className="nav-item">
											<NavLink className="nav-link " activeClassName="activeLink" to="/bookatrip">Trips & Tours</NavLink>
										</li>
										<li className="nav-item">
											<NavLink className="nav-link " activeClassName="activeLink" to="/forum">Forum</NavLink>
										</li>
										<li className="nav-item">
											<NavLink className="nav-link " activeClassName="activeLink" to="/about">About</NavLink>
										</li>
									</ul>
								</div>
								{
									userInfo ? (
										<div className="col-lg-5" id="nav-links-profile">
											<ul id="signup-div" className="navbar-nav float-right mr-auto mt-2 mt-lg-0" >
												{/* <li className="nav-item">
													
													<form action="">
														<div className="p-1 bg-light rounded rounded-pill shadow-sm ">
															<div className="input-group">
																<input onChange={e => { setNavSearchText(e.target.value) }} type="search" className="form-control border-0 bg-light" />
																<Link className="btn btn-link text-primary" to={`/search/${navSearchText}`}><i className="fa fa-search"></i>
																</Link>
															</div>
														</div>
													</form>
												</li> */}
												<li className="nav-item">
													<NavLink className="nav-link" activeClassName="activeLink" to="/profile">{userInfo.name}</NavLink>
												</li>
												<li onClick={logoutHandler} className="nav-item">
													<NavLink className="nav-link" activeClassName="activeLink" to="/login">Logout</NavLink>
												</li>
											</ul>
										</div>
									)
										:
										(
											<div className="col-lg-5 " id="nav-links-profile">
												<ul id="signup-div" className="navbar-nav float-right mr-auto mt-2 mt-lg-0" >
													<li className="nav-item">
														<NavLink className="nav-link" activeClassName="activeLink" to="/signup">Sign Up</NavLink>
													</li>
													<li className="nav-item">
														<NavLink className="nav-link" activeClassName="activeLink" to="/login">Login</NavLink>
													</li>
												</ul>
											</div>
										)
								}
								<div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>
	);
}

export default Navbar;
