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

export const addNewStudent = student => {
    return fetch("api/v1/students", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(student),
    }).then(checkStatus);
}

export const deleteStudent = student => {
    return fetch("api/v1/students", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify(student),
    }).then(checkStatus);
}

export const editStudent = student => {
    return fetch("api/v1/students", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(student),
    }).then(checkStatus);
}