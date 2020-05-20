//const URL_PROYECTO = "http://localhost:8000/";  local
const URL_PROYECTO = "http://10.39.1.124:8000/";

export async function signup (username ,password, email){

    try {
        const form = new FormData()
        form.append('username', username);
        form.append('password', password);
        form.append('email', email);
        const response = await fetch(URL_PROYECTO+'user/', {
            method: 'POST',
            body: form,
        });

        const json = await response.json();
        if (response.ok) {
          return {data:json , bandera: true};
        }
        else {
            return {data:json.detail , bandera: false}
        }
    } catch (error) {
        console.log(error);
    }
}


export async function login (username ,password){

    try {
        const form = new FormData()
        form.append('username', username);
        form.append('password', password);
        const response = await fetch(URL_PROYECTO+'api/token/', {
            method: 'POST',
            body: form,
        });

        const json = await response.json();
        if (response.ok) {
          return {data:json , bandera: true};
        }
        else {
            return {data:json.detail , bandera: false}
        }
    } catch (error) {
        console.log(error);
    }
}


export async function logout (usuario){

    const form = new FormData()

    form.append('usuario', usuario)
    const response = await fetch('https://restcountries.eu/rest/v2/name/Colombia', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form,
    })
    return await response.json();
}
