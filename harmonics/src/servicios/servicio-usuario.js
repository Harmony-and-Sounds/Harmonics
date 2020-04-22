const URL_PROYECTO = "http://localhost:8000/";

export async function getInfoUsuario (token){
    try {
        const response = await fetch(URL_PROYECTO+'user/detail/', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer '+token },
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

export async function borrarNotificaciones (token){
    try {
        const response = await fetch(URL_PROYECTO+'user/notifications/', {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer '+token },
        });
        const json = await response.json();
        console.log(json);
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
