import React, { useState } from 'react'
import axios from "../support-components/axios";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./AnswerArea.css"
import { toast } from 'react-toastify';

function AnswerArea() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const { id } = useParams()
  const [answer, setAnswer] = useState()

  const sendAnswer = (e) => {
    e.preventDefault()
    if (userInfo) {
      const user = userInfo._id
      axios.post(`/answers/`, { user, question: id, text: answer })
        .then(res => {
          toast.success("Answer Submitted", {
            position: toast.POSITION.TOP_LEFT
          });
          window.location.reload();
          // console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
    else {
      toast.warning("Please login to Answer", {
        position: toast.POSITION.TOP_LEFT
      });
    }
  }
  return (
    <div>
      <form>
        <div className="form-group">
          <h5>Answer Question</h5>
          <textarea className="form-control" onChange={e => { setAnswer(e.target.value) }} rows="4"></textarea>
          <button id="sub-btn" type="button" onClick={sendAnswer} className="btn submit-question-btn">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AnswerArea
