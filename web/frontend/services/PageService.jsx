import { authenticatedFetch } from "@shopify/app-bridge-utils";

export const getAllPages = async (app) => {
    const fetchAPIPage = authenticatedFetch(app)
    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }
        const res = await fetchAPIPage("/api/pages", options)
        const data = await res.json()
        console.log("All_Data: ", data) 
        return data
    } catch (error) {
        console.log("Message: ", error)
    }
}

export const getPageByID = async (app, id) => {
    const fetchAPIPage = authenticatedFetch(app)
    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }
        const res = await fetchAPIPage(`/api/pages/${id}`, options)  
        const data = await res.json()
        console.log("Page_By_ID: ", data)
        return data
    } catch (error) {
        console.log("Message: ", error)
    }
}

export const postPage = async (app, formData) => {
    const fetchAPIPage = authenticatedFetch(app)
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(formData)
        }
        const res = await fetchAPIPage("/api/pages", options)
        const data = res.json()
        console.log("POST_Data: ", data)
        return res
    } catch (error) {
        console.log("Message: ", error)
    }
}

export const putPage = async (app, id, fromData) => {
    const fetchAPIPage = authenticatedFetch(app)
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(fromData)
        }
        const res = await fetchAPIPage(`/api/pages/${id}`, options)
        console.log("PUT_Data: ", res)
        const data = res.json()
        return data
    } catch (error) {
        console.log("Message: ", error)
    }
}

export const deleteData = async (app, id) => {
    const fetchAPIPage = authenticatedFetch(app)
    try {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        }
        const res = await fetchAPIPage(`/api/pages/${id}`, options)
        console.log("Delete_Data: ", res)
        return res
    } catch (error) {
        console.log("Message: ", error)
    }
}

export const deleteAll = async (app, data) => {
    const fetchAPIPage = authenticatedFetch(app)
    try {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data)
        }
        const res = await fetchAPIPage("/api/pages", options)
        console.log("Delete_All_Data: ", res)
        return res
    } catch (error) {
        console.log("Message: ", error)
    }
}