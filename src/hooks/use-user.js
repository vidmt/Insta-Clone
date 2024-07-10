import { useState, useEffect, useContext} from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

// everytime auth detects user change(from use-auth-listener), we grab the new user data
export default function useUser(){
    const [activeUser, setActiveUser] = useState({});
    const {user} = useContext(UserContext);

    useEffect(() => {
        async function getUserObjByUserId(){
            // we need a function that we can call that can get us user data(from firestore docs) with uid
            const [response] = await getUserByUserId(user.uid);
            setActiveUser(response);
        }

        if(user?.uid){
            getUserObjByUserId();
        }

    },[user])

    //active user is a doc(from firestore) with user data 
    return {user: activeUser};
}



