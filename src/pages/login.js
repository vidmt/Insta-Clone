import { useNavigate, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import { useContext, useEffect, useState } from 'react';
import * as ROUTES from '../constants/routes';



export default function Login() {
    const navigate = useNavigate();
    const {firebase} = useContext(FirebaseContext);


    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            navigate(ROUTES.DASHBOARD);
        } catch (error) {
            setEmailAddress('');
            setPassword('');
            setError(error.message);
        }
    };

    useEffect(() => {
        document.title = 'Login - Instagram';
    }, []);


    return (
        // <div class = "container flex mx-auto max-w-screen-md items-center h-screen">
        <div className = "container flex mx-auto max-w-screen-md items-center h-screen">
            <div className = "flex w-3/5">
                <img src = "/images/iphone-with-profile.jpg" alt = "iPhone with profile"/>
            </div>
            <div className = "flex flex-col w-2/5">
                <div className='flex-col iteams-center bg-white p-4 border border-gray-primary mb-4 rounded'>
                    <h1 className = "flex justify-center w-full py-5">
                        <img src = "/images/logo.png" alt = "Instagram" className = "w-6/12"/>
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleLogin} method = "POST">
                        <input aria-label = "Enter your email address" 
                        type = "text"
                        placeholder="Email address"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                        onChange={({target}) => setEmailAddress(target.value)}/>

                        <input aria-label = "Enter your password" 
                        type = "password"
                        placeholder="Password"
                        className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                        onChange={({target}) => setPassword(target.value)}/>


                        <button
                        disabled = {isInvalid}
                        type = "submit"
                        className= {`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
                        >Log in</button>
                    </form>
                </div>
                <div className='flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded'>
                    <p className='text-sm'>Don't have an account?{` `}
                        <Link to={ROUTES.SIGN_UP} className='font-bold text-blue-medium'>Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}