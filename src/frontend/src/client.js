import fetch from 'unfetch';

const checkStatus = response => {
    if(response.ok){
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

// service reactowy, ściąganie danych z backendu
export const getAllStudents = () =>{
    return fetch("api/v1/students")
    .then(checkStatus);
}