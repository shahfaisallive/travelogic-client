import React,{useState,useEffect} from 'react'
import axios from '../support-components/axios'
import { useParams } from 'react-router-dom';
import Loader from "../support-components/Loader"


//TopicQuestions components imported here
import TopicQuestionCard from "./TopicQuestionCard";
import Searchbar from "../header/Searchbar"


function TopicQuestions({history}) {
  let {name} = useParams()
  console.log('name',name)
  const [questions,setQuestions] = useState([])
  const [loading,setLoading] = useState(false)
  // const getData = () =>{
  //   axios.get()
  // }
  useEffect(()=>{
    setLoading(true)
    axios.get(`/questions/topic/${name}`)
    .then(res => {
      console.log(res.data);
      setQuestions(res.data);
      setLoading(false)
    })
    .catch((err) => {
      console.log(err);
      setLoading(false)
    });
  },[name])
  return (
    <div style={{"marginBottom":"130px"}} className="container">
      <Searchbar history={history} />
      <h5 className="display-4 mt-5">Topic : {name}</h5>
      {
        loading ? 
        <Loader/>
        :
        questions.length === 0 ?
        <div className="mt-4 mb-5 pb-1 h-auto h-100 container mb-3 rounded bg-white">
          <h2>No Questions Found</h2>
        </div>:
        <div  className="mt-2 mb-5 pb-1 h-auto h-100 container mb-3 rounded bg-white">
        {questions.map(question => { // using props in child component and looping
          return (
              <TopicQuestionCard data={question} key={question._id} detail={false}/>
          )
        })}
        </div>
      }     
    </div>
  )
}

export default TopicQuestions
