import React, { useState, useEffect } from 'react'
import axios from "../support-components/axios";
import Loader from "../support-components/Loader"


//All Questions Components Imported here
import QuestionCard from './QuestionCard'
import Searchbar from '../header/Searchbar'

function AllQuestions() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get('/questions/')
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
    <div style={{ "marginBottom": "40px" }} className="container">
      <Searchbar />
      <h5 className="display-4 mt-5">All Questions</h5>
      <div className="mt-2 mb-5 pb-1 h-auto h-100 container mb-3 rounded bg-white">
        {
          loading ?
            <div className='pt-2 pb-2'>
              <Loader />
            </div> :
            questions.length === 0 ?
              <div>
                <h2>No Questions Found</h2>
              </div>
              :
              questions.map(question => { // using props in child component and looping
                return (
                  <QuestionCard data={question} key={question._id} detail={false} />
                )
              })
        }
      </div>
    </div>
  )
}

export default AllQuestions
