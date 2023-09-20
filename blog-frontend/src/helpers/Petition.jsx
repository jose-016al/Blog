export const Petition = async (url, method, dataSave = "", file = false) => {

    let loading = true;

    let options = {
        method: "GET"
    }
    if (method == "GET" || method == "DELETE") {
        options = {
            method: method,
        }
    }
    if (method == "POST" || method == "PUT") {
        if (file) {
            options = {
                method: method,
                body: dataSave
            }
        } else {
            options = {
                method: method,
                body: JSON.stringify(dataSave),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }
    }
    const peticion = await fetch(url, options);
    const data = await peticion.json();

    loading = false;

    return {
        data,
        loading
    }
}
