import { makeRequest } from "./service"

export function fetchAllProduct() {
    return makeRequest('/products/')
}

export function fetchProduct(id) {
    return makeRequest('/product/' + id)
}
