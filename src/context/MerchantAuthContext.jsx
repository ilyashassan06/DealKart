import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";


const MerchantAuthContext = createContext();

export const MerchantAuthProvider = ({children})=>{
    const [merchant,setMerchant] = useState(null);
   const [Loading, setLoading] = useState(true);

   useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth,async(firebaseUser)=>{
        if(firebaseUser){
            const docRef = doc(db,"merchant",firebaseUser.uid);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                setMerchant({
                    uId:firebaseUser.uid,
                    ...docSnap.data()
                })
            }
        }else{
                setMerchant(null)
        }
        setLoading(false)
    })
return ()=>unSubscribe();
}, [])

return(
    <MerchantAuthContext.Provider value={{merchant,Loading}} >
        {!Loading && children}
    </MerchantAuthContext.Provider>
)
   
}

export const useAuth = ()=>{
    return useContext(MerchantAuthContext)
}




