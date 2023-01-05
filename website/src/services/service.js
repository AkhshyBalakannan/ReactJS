import api from '../config/local.api'

export function makeRequest(endpoint='', method='GET', body=null) {
    const headers = { "Accept": "application/json", "Content-Type": "application/json" }
    const params = {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null
    }
    let url = api + endpoint
    return fetch(url, params)
}
