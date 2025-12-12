import axios from "axios";
import { useEffect, useState } from "react";

export default function usePincodeDetails() {
  const [pin, setPin] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pin.length === 6) {
      getPincodeDetails();
    } else {
      setState("");
      setCity("");
      setError(null);
    }
  }, [pin]);

  const getPincodeDetails = () => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://api.postalpincode.in/pincode/${pin}`)
      .then((response) => {
        setRes(response.data);

        const postOffice = response.data[0]?.PostOffice?.[0];

        if (postOffice) {
          setState(postOffice.State);
          setCity(postOffice.District);
        } else {
          setState("");
          setCity("");
          setError("Invalid pincode");
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log("API Error:", e);
        setState("");
        setCity("");
        setError("Error fetching pincode data");
        setLoading(false);
      });
  };

  // Return everything so you can use in another component
  return { pin, setPin, city, setCity, state, setState, res, setRes, loading, error };
}
