import React from 'react'
import { Link } from 'react-router-dom';
import { imagePath } from '../support-components/axios';
import "./MostViewedQuestionCard.css"

function MostViewedQuestionCard(props) {

  const {user,statement,createdAt,numberOfViews,_id}=props.data
  // console.log(user,statement,description,createdAt)
  // const post = createdAt.substring(0, 10)
  
  return (
    <>
      {
        user.length>0?
        <div className=" row mb-2 ">
          <div className="pt-1 pr-1 pl-1 card mx-4 mt-3 rounded card-border single-question-wrap"  >
            <div className="row no-gutters ">
              <div id="img-div" className=" col-md-1 col-sm-5" >
              {
                user[0] && <img id="qc-img" src={`${imagePath}/users/${user[0].display_image_name}`} className="card-img" alt="TBD"  ></img>
              }
              </div>
              <div className="col"  >
                <Link className="text-decoration-none text-body" to={`/question/${_id}`}>
                  <div>
                    <div className="card-body">
                      <div>
                        <span id="name" className="">{user && user[0].name}</span>
                      </div>
                      <div>
                        <p id="question">{statement}</p>
                      </div>
                      <div id="info" >
                        <span className="posted-text">Posted : <span className="date"> {createdAt && createdAt.substring(0,10)}</span></span>
                        <span className="font-weight-light ml-3 view"><i className="fa fa-eye" aria-hidden="true"></i> {numberOfViews} Views</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        :
        <></>
    }
    </>
  )
}

export default MostViewedQuestionCard
