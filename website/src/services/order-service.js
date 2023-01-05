import { makeRequest } from "./service"

export function placeOrder(body) {
    return makeRequest('/purchase/', 'POST', body=body)
}
