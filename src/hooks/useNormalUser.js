import axios from "axios";
import { useEffect, useState } from "react"

const useNormalUser = email => {
    const [NormalUser, setNormalUser] = useState(false);
    const [isNormalUserLoading, setIsNormalUseroading] = useState(true);
    useEffect( () => {
        if (email) {
            const options = {
                url: `https://betacom-server-cristain333.vercel.app/users/normalUser/${email}`
              };

              axios(options)
              .then(response => {
                setNormalUser(response.data.isNormalUser);
                setIsNormalUseroading(false)
              });
        }
    }, [email])
    return [NormalUser, isNormalUserLoading]
}

export default useNormalUser;