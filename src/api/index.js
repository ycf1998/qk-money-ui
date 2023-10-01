import instance from '@/api/axios.js'

export function req(options) {
    if (import.meta.env.VITE_ONLY_UI) {
        alert(JSON.stringify(options))
        return new Promise((resolve, reject) => resolve({data: {}}))
    } else {
        return instance.request(options)
    }
}

export function reqForm(options) {
    options.headers = {}
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return req(options)
}

export function reqFormData(options) {
    options.headers = {}
    options.headers['Content-Type'] = 'multipart/form-data'
    return req(options)
}

export function reqMixed(options, {key, jsonData}, formData) {
    const data = new FormData()
    if (key && jsonData) {
        data.append(key, new Blob([JSON.stringify(jsonData)], {
            type: 'application/json'
        }))
    }
    if (formData) {
        Object.entries(formData).forEach(kv => data.append(kv[0], kv[1]))
    }
    options.data = data
    options.headers = {}
    options.headers['Content-Type'] = 'multipart/mixed'
    return req(options)
}

export default req