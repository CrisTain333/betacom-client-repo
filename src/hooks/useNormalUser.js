import axios from "axios";
import { useEffect, useState } from "react"

const useNormalUser = email => {
    const [NormalUser, setNormalUser] = useState(false);
    const [isNormalUserLoading, setIsNormalUseroading] = useState(true);
    useEffect( () => {
        if (email) {
            const options = {
                url: `http://localhost:5000/users/normalUser/${email}`
              };

              axios(options)
              .then(response => {
                console.log(response)
                setNormalUser(response.data.isNormalUser);
                setIsNormalUseroading(false)
              });
        }
    }, [email])
    return [NormalUser, isNormalUserLoading]
}

export default useNormalUser;