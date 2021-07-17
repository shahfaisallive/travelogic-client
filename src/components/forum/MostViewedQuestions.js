import React, { useState, useEffect } from 'react'
import axios from "../support-components/axios";
import { Link } from 'react-router-dom';
import Loader from "../support-components/Loader"
import './MostViewedQuestions.css'

//MostViewedQuestions components imported here
import MostViewedQuestionCard from "./MostViewedQuestionCard";

function MostViewedQuestions() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get('questions/most-viewed')
      .then(res => {
        // console.log(res.data);
        setQuestions(res.data);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  }, [])
  return (
    <div className="container mb-3 mt-4 pb-3 h-auto h-100 rounded bg-white">
      {
        loading ?
          <div className='pt-2 pb-2'>
            <Loader />
          </div>
          :
          questions.length === 0 ?
            <div className="mt-4 mb-1 pt-3 pb-1 h-auto h-100 container mb-3 rounded bg-white">
              <h5 className='text-danger text-center'>It seems there are no questions available yet...</h5>
            </div>
            :
            questions.map(question => {
              return (
                <MostViewedQuestionCard key={question._id} data={question} />
              )
            })
      }
      <hr />
      <Link id='view-all-question-btn' className="text-dark font-weight-bold" to='/questions'>
        <button className='btn all-questions-link-btn'>View All Questions</button>
        </Link>
    </div>
  )
}

export default MostViewedQuestions

