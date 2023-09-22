import axios, { AxiosError } from "axios";

interface ErrorResponse {
    response?:{
        status: number;
        data?:{
            message?: string;
        }
    }
}

const token = localStorage.getItem('auth.token');

export const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
        Authorization: `Bearer ${token}`
    }
});

api.interceptors.response.use(response =>{
    return response;
}, (error: ErrorResponse) =>{
    if(error.response?.status === 401){
       if(error.response?.data?.message === 'Invalid token'){
            const token = localStorage.getItem('auth.refresh_token');
            
            api.post('/refrash-token', {
                token
            }).then(response => {
                console.log(response)
                const new_token = response.data.token;
                const new_refrash = response.data.refresh_token;

                localStorage.setItem("auth.token", new_token);
                localStorage.setItem("auth.refresh_token", new_refrash);

            })

       } else {

       }
    }
})