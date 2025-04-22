import axios from "axios";
import { axiosInstance } from "../lib/axios";

const handleError = (error) => {
  if (error.response) {
    throw new Error(`API error: ${error.response.status}`);
  }
  throw error;
};

export const fetchCharacters = async (pageNumber, filters = {}) => {
  const { search = "", status = "", gender = "", species = "" } = filters;
  try {
    const response = await axiosInstance.get(
      `/character/?page=${pageNumber}&name=${search}&status=${status}&gender=${gender}&species=${species}`
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchSingleCharacter = async (id) => {
  try {
    const response = await axiosInstance.get(`/character/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchEpisode = async (id) => {
  try {
    const response = await axiosInstance.get(`/episode/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchEpisodeCount = async () => {
  try {
    const response = await axiosInstance.get(`/episode`);
    return response.data.info.count;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchLocation = async (id) => {
  try {
    const response = await axiosInstance.get(`/location/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchLocationCount = async () => {
  try {
    const response = await axiosInstance.get(`/location`);
    return response.data.info.count;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchMultipleCharacters = async (urls) => {
  if (!urls || urls.length === 0) return [];
  try {
    const characters = await Promise.all(
      urls.map((url) => axios.get(url).then((res) => res.data))
    );
    return characters;
  } catch (error) {
    return handleError(error);
  }
};
