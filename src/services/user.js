import {SERVER_URL} from '../config';

export function getUserInfo(userId) {
    let url = `${SERVER_URL}/get/user/${userId}`
    let settings = {
        method: "GET"
    }

    return fetch(url, settings)
        .then(response => {
            if (response.ok) {
                return response.json()
            }

            throw new Error(response.statusText)
        })
        .then(responseJSON => {
            return responseJSON.foundUser;
        })
}

export function updateUserInfo(userId, updatedUser) {
    let url = `${SERVER_URL}/update/user/${userId}`
    let settings = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    }

    return fetch(url, settings)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error(response);
            })
            .then(responseJSON => {
                return responseJSON
            })
}