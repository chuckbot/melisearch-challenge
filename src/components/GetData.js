import axios from 'axios';
import Http from './Url';

const searchItem = async query => {
    let url = Http.url + "api/items?q=" + query;
    const response = await axios.get(url);
    return response.data;
}

const getItem = async id => {
    let url = Http.url + "api/items/" + id;
    const response = await axios.get(url);
    return response.data;
}

let getData = { searchItem, getItem };
export default getData;