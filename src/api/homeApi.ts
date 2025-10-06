import axiosInstance from './axios.config';
import { Item } from '../types/Item';

export const getPosts = async (): Promise<Item[]> => {
  const response = await axiosInstance.get<Item[]>('/posts?_limit=10');
  return response.data;
};
