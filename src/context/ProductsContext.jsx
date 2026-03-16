import { collection, getDoc, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";


const ProductsContext = createContext();

export const ProductsProvider = ({children})=>{
    const [products, setproducts] = useState([]);
     const [loadingProducts, setLoadingProducts] = useState(true);

     useEffect(() => {
       
        const fetchProduct = async ()=>{
            try {
                const snapShot = await getDocs(collection(db,"products"));
                const productList = snapShot.docs.map((doc)=>({
                    id:doc.id,
                    products:doc.data()
                }))

                setproducts(productList)
            } catch (error) {
                 console.log("Error fetching products:", error);  
            }
            setLoadingProducts(false);
        } 
     
      fetchProduct();
     }, [])

     return (
        <ProductsContext.Provider value={{products,loadingProducts}}>
            {children}
        </ProductsContext.Provider>
     )
     
}

export const useProducts = ()=>{
    return useContext(ProductsContext)
}