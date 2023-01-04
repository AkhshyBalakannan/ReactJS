import api from '../config/local.api'

export function makeRequest(endpoint, body=null) {
    const headers = {"Accept":"application/json, text/plain, /","Content-Type": "multipart/form-data"}
    let url = api + endpoint
    return fetch(url, headers)
}
