import { useState, useEffect, useContext} from "react";
import FirebaseContext from "../context/firebase";

//updates user(uid,display name, email, etc) when ever there is a sign in or sign out
export default function useAuthListener(){
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            //we have a user so we can store the user in local storage
            if(authUser){
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            }
            else{
            // we don't have a user so clear the local storage
                localStorage.removeItem('authUser');
                setUser(null);
            }
        })

        return () => listener();
    }, [firebase])

    return {user};
}