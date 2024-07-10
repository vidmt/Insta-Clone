import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import * as ROUTES from './constants/routes';
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from './context/user';


const Login = lazy( ()  => import('./pages/login'));
const Signup = lazy( ()  => import('./pages/signup'));
const Dashboard = lazy( ()  => import('./pages/dashboard'));
const Profile = lazy( ()  => import('./pages/profile'));
const NotFound = lazy( ()  => import('./pages/not-found'));

function App() {
  const {user} = useAuthListener();
  return (
    <UserContext.Provider value = {{user}}>
      <Router>
        <Suspense fallback = {<p>Loading... </p>}>

          <Routes>
            <Route path = {ROUTES.LOGIN} element = {!user ? <Login/> : <Navigate to={ROUTES.DASHBOARD} />}/>
            <Route path = {ROUTES.SIGN_UP} element = {!user ? <Signup/> : <Navigate to={ROUTES.DASHBOARD} />}/>
            <Route path = {ROUTES.DASHBOARD} element={user ? <Dashboard /> : <Navigate to={ROUTES.LOGIN} />}/>
            <Route path = {ROUTES.PROFILE} element={<Profile/>} />
            <Route path = "*" element = {<NotFound/>}/>
          </Routes>

        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}

export default App;
