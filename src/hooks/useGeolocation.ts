import axios from "axios";
import { useState, useEffect } from "react";

interface LocationData {
  country: any;
}

export const useGeoLocation = () => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation() {
    try {
      const res = await axios.get<LocationData>("https://api.country.is/");
      if (res.status === 200) setLocationData(res.data);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }

  return {
    country: locationData?.country,
  };
};

export default useGeoLocation;
