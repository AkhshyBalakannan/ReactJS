import { makeRequest } from "./service"

export function signInUser(body) {
    return makeRequest('/api-login', 'POST', body=body)
}

export function createUser(body) {
    return makeRequest('/user-create/', 'POST', body=body)
}
