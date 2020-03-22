export async function getAudioMidi (user, proyecto, instrumento){

    const form = new FormData()

    form.append('user', user);
    form.append('nombreProy', proyecto);
    form.append('instrumento', instrumento);
    
    const response = await fetch('https://restcountries.eu/rest/v2/name/Colombia', {
    method: 'GET',
    /*headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form,*/
    })
    return await response.json();
}

export async function getAudioVozSeparada (user, proyecto, instrumento){

    const form = new FormData()

    form.append('user', user);
    form.append('nombreProy', proyecto);
    form.append('instrumento', instrumento);
    
    const response = await fetch('https://restcountries.eu/rest/v2/name/Colombia', {
    method: 'GET',
    /*headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form,*/
    })
    return await response.json();
}