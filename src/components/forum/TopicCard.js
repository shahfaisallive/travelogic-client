import React from 'react'
import "./TopicCard.css"

import { Link } from 'react-router-dom'

function TopicCard(props) {
  // console.log(props.name)
  return (
    <div>
      <div id="topic" className=" mb-5">
        <Link to={`/topic/${props.name}`}>
          <div id="card-div" className="card shadow">
            {/* topic image here */}
            <img id="topic-img" className="card-img-top rounded" src={`images/${props.name}.jpg`}  alt="Card cap" />
            <div className="card-body">
              <div className="col-12 text-center">
                {/* topic name here */}
                <p className="btn text-dark font-weight-bold" >{props.name}</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default TopicCard
