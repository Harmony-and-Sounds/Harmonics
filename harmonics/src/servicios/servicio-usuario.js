export async function getNotificaciones (user){

    const form = new FormData()

    form.append('user', user)
    
    const response = await fetch('https://restcountries.eu/rest/v2/name/Colombia', {
    method: 'GET',
    /*headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form,*/
    })
    return await response.json();
}