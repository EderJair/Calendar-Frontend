import { getEnvVariables } from '../helpers/getEnvVariables';
import axios from 'axios';

const {VITE_API_URL} = getEnvVariables();


const calendarApi = axios.create({
    baseURL: VITE_API_URL
})





export default calendarApi;