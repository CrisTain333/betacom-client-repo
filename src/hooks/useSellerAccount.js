import axios from "axios";
import { useEffect, useState } from "react"

const useSellerAccount = email =>{
    const [isSellerAccount, setIsSellerAccount] = useState(false);
    const [isSellerAccountLoading, setIsSellerAccountLoading] = useState(true);
    useEffect( () => {
        if (email) {
            const options = {
                url: `http://localhost:5000/users/sellerAccount/${email}`
              };

              axios(options)
              .then(response => {
                setIsSellerAccount(response.data.isSellerAccount);
                setIsSellerAccountLoading(false)
              });
        }
    }, [email])
    return [isSellerAccount, isSellerAccountLoading]

}

export default useSellerAccount;