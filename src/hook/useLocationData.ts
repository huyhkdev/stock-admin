import { useState, useEffect } from "react";
import {
  fetchDistricts,
  fetchProvinces,
  fetchWards,
} from "../utils/fetchAPILocation";
import { District, Province, Ward } from "../@types/owner.type";

export const useLocationData = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  useEffect(() => {
    fetchProvinces().then((response) => setProvinces(response.data));
  }, []);

  const loadDistricts = async (provinceCode: number) => {
    const response = await fetchDistricts(provinceCode);
    setDistricts(response.data.districts);
    setWards([]);
  };

  const loadWards = async (districtCode: number) => {
    const response = await fetchWards(districtCode);
    setWards(response.data.wards);
  };

  return { provinces, districts, wards, loadDistricts, loadWards };
};
