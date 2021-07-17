import React, { useEffect, useState } from 'react'
import axios from '../support-components/axios'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'
import "./AskQuestion.css"

//AskQuestion's components imported here
import Searchbar from "../header/Searchbar";

function AskQuestion() {
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [topic, setTopic] = useState('Transport');
  const [statement, setStatement] = useState('');
  const [description, setDescription] = useState('');

  let history = useHistory()

  const addQuestion = (e) => {
    e.preventDefault()
    if (topic === '' || statement === '' || description === '' ){
      toast.success("Question Added", {
        position: toast.POSITION.TOP_LEFT
      });
    }
    else if (userInfo) {
      const user = userInfo._id
      axios.post('/questions/', { topic, statement, description, user })
      .then(res => {
        toast.success("Question Added", {
          position: toast.POSITION.TOP_LEFT
        });
        console.log(res.data)
        history.push(`/question/${res.data._id}`)
      })
      .catch(err => {
        console.log(err)
      })
    }
    else {
      toast.warning("Please login to Submit Question", {
        position: toast.POSITION.TOP_LEFT
      });
    }
  }

  return (
    <div className="container">
      <Searchbar history={history} />
      <div className="container mt-5 bg-white mb-5 pb-4 h-auto h-100">
        <h3 className="pt-2 mb-3">Ask A Question</h3>
        <hr className="mt-2 mb-3 border-darken" />
        <form>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <label className="input-group-text">Topic</label>
            </div>
            <select className="custom-select" onChange={e => { setTopic(e.target.value) }}>
              <option>Transport</option>
              <option >Accomodations</option>
              <option>Budget</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <h6>Question Statement</h6>
            <input onChange={e => { setStatement(e.target.value) }} type="text" className="form form-control" />
          </div>

          <div className="form-group">
            <h6>Question Description</h6>
            <textarea onChange={e => { setDescription(e.target.value) }} className="form form-control mb-2" rows="4"></textarea>
            <button onClick={addQuestion} id="sub-btn" type="button" className="btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AskQuestion
