import axios from 'axios';

 const authAxios =() => {
    const token = localStorage.getItem('token');

    return axios.create({           
        headers: {
            Authorization: token,
        },
    });
};

export default authAxios