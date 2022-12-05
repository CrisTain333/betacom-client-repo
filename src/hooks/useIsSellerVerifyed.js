import axios from "axios";
import { useEffect, useState } from "react";

const useIsSellerVerifyed = (email) => {
  const [IsSellerVerifyed, setIsSellerVerifyed] = useState(false);
  const [isNormalUserLoading, setIsNormalUseroading] = useState(true);
  useEffect(() => {
    if (email) {
      const options = {
        url: `https://betacom-server-cristain333.vercel.app/users/isVerified/${email}`,
      };

      axios(options).then((response) => {
        setIsSellerVerifyed(response.data.isVerified);
        setIsNormalUseroading(false);
      });
    }
  }, [email]);
  return [IsSellerVerifyed, isNormalUserLoading];
};

export default useIsSellerVerifyed;
