import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

// Chakra + Forms
import { Flex } from '@chakra-ui/react';

// Componenets 
import Login from './landingPage/Login.jsx';
import Register from './landingPage/Register.jsx';
import ForgotPassword from './password/ForgotPw.jsx';
import ResetConfirmation from './password/ResetConfirmation.jsx';
import LandingPage from './landingPage/LandingPage.jsx';

const App = () => {
  
  return (
     <Flex direction="column" align="center" >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} /> 
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
            <Route path="reset" element={<ForgotPassword/>} />
            <Route path="reset_confirmation" element={<ResetConfirmation/>}/>
            <Route path="profile" element={<UserPage />} />
        </Routes>
      </Router>
     </Flex>
  );
};

export default App;
