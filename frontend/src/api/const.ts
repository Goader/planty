const defaultUrl = 'http://localhost:3001';
const apiUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : defaultUrl;

export const urls = {
    defaultUrl,
    apiUrl
};