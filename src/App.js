import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/Authentication/ProtectedRoute'
import PublicRoute from './components/Authentication/PublicRoute'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//IMPORTING ALL COMPONENTS HERE
import Navbar from "./components/header/Navbar"
import Footer from "./components/footer/Footer"
import Homepage from "./components/homepage/homepage"
import Login from "./components/login/Login"
import SignUp from "./components/sign-up/SignUp"
import Destinations from "./components/destinations/Destinations"
import DestinationDetails from "./components/destinations/destination-details/DestinationDetails"
import PlanATrip from "./components/plan-a-trip/PlanATrip"
import BookATrip from "./components/book-a-trip/BookATrip"
import BookingStatusPage from "./components/book-a-trip/BookingStatusPage"
import TripBookingPage from "./components/book-a-trip/TripBookingPage"
import BookingDetail from "./components/book-a-trip/BookingDetail"
import BookingForm from './components/book-a-trip/BookingForm'
import Forum from "./components/forum/Forum"
import AskQuestion from "./components/forum/AskQuestion"
import QuestionDetail from "./components/forum/QuestionDetail"
import About from "./components/about/About"
import Feedback from "./components/about/Feedback"
import Profile from "./components/profile/Profile";
import Newsletter from "./components/support-components/Newsletter"
import Privacy from "./components/support-components/Privacy"
import TopicQuestions from "./components/forum/TopicQuestions"
import AllQuestions from "./components/forum/AllQuestions"
import PageNotFound from "./components/support-components/PageNotFound"
import EmailConfirmation from "./components/support-components/EmailConfirmation"
import SearchResult from "./components/search/SearchResult"


const App = () => {

  return (

    <BrowserRouter>
      <div>
        <ToastContainer />
        <Navbar />
        <Switch>
          <PublicRoute exact path="/" component={Homepage} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/signup" component={SignUp} />
          <PublicRoute path="/destinations" component={Destinations} />
          <PublicRoute path="/destinationsdetails/:id" component={DestinationDetails} />
          <PublicRoute path="/planatrip" component={PlanATrip} />
          <PublicRoute path="/bookatrip" component={BookATrip} />
          <PublicRoute path="/tripdetails/:id" component={BookingDetail} />
          <ProtectedRoute path="/bookingform/:id" component={BookingForm} />
          <ProtectedRoute path="/tripbooking/:id" component={TripBookingPage} />
          <ProtectedRoute path="/bookingstatus/:id" component={BookingStatusPage} />
          <PublicRoute path="/forum" component={Forum} />
          <PublicRoute path="/topic/:name" component={TopicQuestions} />
          <PublicRoute path="/askquestion" component={AskQuestion} />
          <PublicRoute path="/questions" component={AllQuestions} />
          <PublicRoute exact path="/question/:id" component={QuestionDetail} />
          <PublicRoute path="/about" component={About} />
          <PublicRoute path="/feedback" component={Feedback} />
          <PublicRoute path="/newsletter" component={Newsletter} />
          <PublicRoute path="/privacy" component={Privacy} />
          <PublicRoute path="/email/:token" component={EmailConfirmation} />   
          <PublicRoute path="/search/:query" component={SearchResult} />   
          <ProtectedRoute path="/profile" component={Profile} />
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
