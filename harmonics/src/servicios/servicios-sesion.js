export async function login (usuario ,password){

    const form = new FormData()

    form.append('usuario', usuario)
    form.append('password', password)
    
    const response = await fetch('https://restcountries.eu/rest/v2/name/Colombia', {
    method: 'GET',
    /*headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form,*/
    })
    return await response.json();
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