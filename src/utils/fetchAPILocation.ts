import axios from "axios";

export const fetchProvinces = async () =>
  axios.get("https://provinces.open-api.vn/api/p/");

export const fetchDistricts = async (provinceId: number) =>
  axios.get(`https://provinces.open-api.vn/api/p/${provinceId}?depth=2`);

export const fetchWards = async (districtId: number) =>
  axios.get(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`);
