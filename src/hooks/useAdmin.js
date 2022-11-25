import axios from "axios";
import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);
    useEffect( () => {
        if (email) {
            const options = {
                url: `http://localhost:5000/users/admin/${email}`
              };

              axios(options)
              .then(response => {
                setIsAdmin(response.data.isAdmin);
                setIsAdminLoading(false)
              });
        }
    }, [email])
    return [isAdmin, isAdminLoading]
}

export default useAdmin;