import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";


const UserAuthContext = createContext();

export const UserAuthProvider = ({children })=>{
    const [user, setUser] = useState(null)
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
     const unSubscribe = onAuthStateChanged(auth,async(firebaseUser)=>{
        if(firebaseUser){
            const docRef = doc(db,"users",firebaseUser.uid);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                setUser({
                    uId:firebaseUser.uid,
                    ...docSnap.data()
                })
            }

        }else{
                setUser(null)
            }

            setLoading(false)
     })

     return ()=> unSubscribe();
    }, [])



    return(
        <UserAuthContext.Provider value={{user,Loading}}>
            {children }
        </UserAuthContext.Provider>
    )
    
}

export const useAuth = ()=>{
    return useContext(UserAuthContext);
}