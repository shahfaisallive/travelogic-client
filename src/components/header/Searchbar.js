import React, { useState } from 'react';
import "./Searchbar.css";
import { withRouter } from 'react-router-dom';

const Searchbar = ({ history }) => {
	const [navSearchText, setNavSearchText] = useState()

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('insearch bar',navSearchText)
        history.push(`/search/${navSearchText}`)

    }

    return (
        <div className="container-fluid" id="searchbar-wrap">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <form onSubmit={submitHandler} className="card searchbar-card card-sm">
                        <div className="card-body row no-gutters align-items-center">
                            <div className="col-auto">
                                <i className="fa fa-search h5 mt-2 mr-2 text-body"></i>
                            </div>

                            {/*Search Bar Input here */}
                            {/* <div className="col">
                                <input className="form-control searchbar-input form-control-lg form-control-borderless"
                                    onChange={(e) => setKeyword(e.target.value)} type="search" placeholder='Search Here...' />
                            </div> */}
                            <div className="col">
                                <input className="form-control searchbar-input form-control-lg form-control-borderless"
                                    onChange={e => { setNavSearchText(e.target.value) }} type="search" placeholder='Search destinations, trips and queries here...' />
                            </div>

                            <div className="col-auto">
                                <button type="submit" id="search-btn">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

Searchbar.defaultProps = {
    placeholder: "Search Here..."
}


export default withRouter(Searchbar);



