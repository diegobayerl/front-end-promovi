import axios, { AxiosError } from "axios";
import { SignOut } from "../contexts/AuthContext";

const token = localStorage.getItem('auth.token');
let isRefrash = false;
let failedRequestQueue = [];

export const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: {
        Authorization: `Bearer ${token}`
    }
});

api.interceptors.response.use(response =>{
    return response;
}, (error: AxiosError) =>{
    if(error.response?.status === 401){
       if(error.response?.data?.message === 'Invalid token'){
            const token = localStorage.getItem('auth.refresh_token');
            const originalConfig = error.config;

            if(!isRefrash){
                isRefrash = true;

                api.post('/refrash-token', {
                    token
                }).then(response => {
                    const new_token = response.data.token;
                    const new_refrash = response.data.refresh_token;
    
                    localStorage.setItem("auth.token", new_token);
                    localStorage.setItem("auth.refresh_token", new_refrash);
    
                    api.defaults.headers["Authorization"] = `Bearer ${new_token}`;
                    
                    failedRequestQueue.forEach(request => request.onSucces(new_token));
                    failedRequestQueue = [];
                }).catch(err => {
                    failedRequestQueue.forEach(request => request.onFailure(err));
                    failedRequestQueue = [];
                }).finally(() => {
                    isRefrash = false;
                });
            }

        return new Promise((resolve, reject) =>{
            failedRequestQueue.push({
                onSucces: (token: string) => {
                    originalConfig.headers["Authorization"] = `Bearer ${token}`;

                    resolve(api(originalConfig));
                },
                onFailure: (err: AxiosError) => {
                    reject(err);
                }
            })
        })

       } else {
            SignOut();
       }
    }
    
    return Promise.reject(error)
})