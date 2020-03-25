const URL_PROYECTO = "http://localhost:8000/";

export async function crearProyecto (token, project_name, archivo, voces){
    try {
        const form = new FormData()
        form.append('project_name', project_name);
        form.append('file', archivo);
        form.append('instruments', voces);
        const response = await fetch(URL_PROYECTO+'project/', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer '+token},
            body: form,
        });
        
        const json = await response.json();
        console.log(json);
        if (response.ok) {
          return {bandera: true};
        }
        else {
            return {data:json.detail , bandera: false}
        }
    } catch (error) {
        console.log(error);
    }
}

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