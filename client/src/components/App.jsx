import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BoxWrapper } from './styles/appStyles.js';

// Componenets 
import Landing from './landing/Landing.jsx';
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import ForgotPassword from './auth/ForgotPassword.jsx';
import ResetConfirmation from './auth/ResetConfirmation.jsx';
import Home from './home/Home.jsx';
import SearchFriends from './search/SearchFriends.jsx';
import FriendPage from './friends/FriendPage.jsx';
import BuildChallenge from './challenge/BuildChallenge.jsx';
import ChallengeAddFriends from './challenge/ChallengeAddFriends.jsx';
import FourOFour from './auth/FourOFour.jsx';

const App = () => {
  
  return (
    <BoxWrapper 
      w={'min(100vw, 500px)'} 
      h={'min(100vh, 950px)'}
      
      >
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />  
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="reset" element={<ForgotPassword/>} />
            <Route path="reset_confirmation" element={<ResetConfirmation/>}/>
            <Route path="home" element={<Home />} />
            <Route path="friends" element={<FriendPage/>} />
            <Route path="searchFriends" element={<SearchFriends/>} /> 
            <Route path="buildChallenge" element={<BuildChallenge />} /> 
            <Route path="challengeAddFriends/:cuid" element={<ChallengeAddFriends />} /> 
            <Route path="notFound" element={<FourOFour />} />
        </Routes>
      </Router> 
    </BoxWrapper>
  );
};

export default App;
