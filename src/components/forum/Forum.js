import React, { useEffect } from 'react'
import "./Forum.css"

//Forum's components imported here
import Searchbar from "../header/Searchbar"
import FeaturedTopics from "./FeaturedTopics"
import MostViewedQuestions from "./MostViewedQuestions";
import { Link } from 'react-router-dom'
import Meta from '../support-components/Meta';

function Forum({ history }) {
	useEffect(() => {
        window.scrollTo(0, 0)
	}, [])

	return (
		<div className="container">
			<Meta title="Forum | Ask, Answer and explore" />
			<Searchbar history={history} />
			<div className="row">
				{/* ask a question floating button */}
				<div className="col-md-2  pt-5">
					<div className="mt-5 ask-btn-outer d-flex justify-content-center ">
						<Link id="ask-btn" className="btn" to="/askquestion">Ask A Question</Link>
					</div>
				</div>
				{/* forum content starts here */}
				<div className="col-md-10 forum-main-column pt5">
					<div className="row d-flex justify-content-center">
						<div className="col-12">
							{/* trending topic here */}
							<h2 className="text-center mb-4 pt-3">Featured Topics</h2>
							<FeaturedTopics />
							{/* top question here */}
							<h2 className="text-center">Most Viewed Questions</h2>
							<MostViewedQuestions />
						</div>
					</div>
				</div>
				{/* forum content ends here */}
			</div>

		</div>
	);
}


export default Forum;


