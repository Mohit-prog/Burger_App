import axios from 'axios';

const instance=axios.create({
    baseURL:'https://my-burger-reactjs-cdfe8-default-rtdb.firebaseio.com/'
})

export default instance;