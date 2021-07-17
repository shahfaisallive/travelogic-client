import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://server.travelogic.pk/api/'
    // baseURL: 'http://localhost:4000/api/'
});

export const imagePath = 'https://server.travelogic.pk/uploads'

export default instance;
