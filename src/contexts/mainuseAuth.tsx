import { useContext } from 'react';
import AuthContext from './mainuserContext';
import axios from 'axios';


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const api = axios.create({
  baseURL: "https://backgmb.onrender.com",
  withCredentials: true,
});
