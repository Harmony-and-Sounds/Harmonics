//const URL_PROYECTO = "http://localhost:8000/";  local
const URL_PROYECTO = "http://10.39.1.124:8000/";

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

export async function getProyectos (){
    try {
        const response = await fetch(URL_PROYECTO+'project/', {
            method: 'GET',})
            const json = await response.json();
        return await json;
      } catch (error) {
          console.log(error);
      }
}

export async function getProyectosBusqueda (searchWord,Voces){
    try {
        const response = await fetch(URL_PROYECTO+'project/?keyWord='+searchWord+'&keyVoices='+Voces, {
            method: 'GET',})
            const json = await response.json();
        return await json;
      } catch (error) {
          console.log(error);
      }
}

export async function getProyectosUsusario (token){
    try {
        const response = await fetch(URL_PROYECTO+'project/user', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer '+token}
          })
            const json = await response.json();
        return await json;
      } catch (error) {
          console.log(error);
      }
}

export async function getAudioMidi (token, idVoz){

    try {
        const response = await fetch(URL_PROYECTO+'project/voice/'+idVoz+'/transcription/audio', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer '+token}
        })

        if (response.ok) {
            let blob = await response.blob();
            blob.name = "mp3Midi";
            //var file = new File([blob], "mp3Midi.mp3", {type: "audio/mp3", lastModified: new Date()});
            var url = window.URL.createObjectURL(blob);
            return {data:url , bandera: true}
        }
        else {
            let json = await response.json();
            return {data:json.detail , bandera: false}
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getAudioMidiNoLogin (idVoz){

    try {
        const response = await fetch(URL_PROYECTO+'project/voice/'+idVoz+'/transcription/audio', {
            method: 'GET',
            headers: {}
        })

        if (response.ok) {
            let blob = await response.blob();
            blob.name = "mp3Midi";
            //var file = new File([blob], "mp3Midi.mp3", {type: "audio/mp3", lastModified: new Date()});
            var url = window.URL.createObjectURL(blob);
            return {data:url , bandera: true}
        }
        else {
            let json = await response.json();
            return {data:json.detail , bandera: false}
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getPartituraABC (token, idVoz){

    try {
        const response = await fetch(URL_PROYECTO+'project/voice/'+idVoz+'/transcription/abc', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer '+token}
        })
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

export async function descargarVoz (idVoz) {

    try {
        const response = await fetch(URL_PROYECTO+'project/voice/'+idVoz+'/download', {
            method: 'GET',
            //headers: { 'Authorization': 'Bearer '+token}
        })

        if (response.ok) {

          let blob = await response.blob();
          blob.name = "proyZip";
          //var file = new File([blob], "mp3Midi.mp3", {type: "audio/mp3", lastModified: new Date()});
          var url = window.URL.createObjectURL(blob);

          return {data:url , bandera: true}
        }
        else {
            //let json = await response.json();
            return {bandera: false}
        }
    } catch (error) {
        console.log(error);
    }
}

export async function descargarProyecto (idProyecto) {

    try {
        const response = await fetch(URL_PROYECTO+'project/'+idProyecto+'/download', {
            method: 'GET',
            //headers: { 'Authorization': 'Bearer '+token}
        })

        if (response.ok) {

          let blob = await response.blob();
          blob.name = "proyZip";
          //var file = new File([blob], "mp3Midi.mp3", {type: "audio/mp3", lastModified: new Date()});
          var url = window.URL.createObjectURL(blob);

          return {data:url , bandera: true}
        }
        else {
            //let json = await response.json();
            return {bandera: false}
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getAudioVozSeparada (token, idVoz) {
  try {
      const response = await fetch(URL_PROYECTO+'project/voice/'+idVoz, {
          method: 'GET',
          headers: { 'Authorization': 'Bearer '+token}
      })

      if (response.ok) {
          let blob = await response.blob();
          blob.name = "mp3Voz";
          //var file = new File([blob], "mp3Midi.mp3", {type: "audio/mp3", lastModified: new Date()});
          var url = window.URL.createObjectURL(blob);

          return {data:url , bandera: true}
      }
      else {
          let json = await response.json();
          return {data:json.detail , bandera: false}
      }
  } catch (error) {
      console.log(error);
  }

}

export async function getAudioVozSeparadaNoLogin (idVoz) {
    try {
        const response = await fetch(URL_PROYECTO+'project/voice/'+idVoz, {
            method: 'GET',
            headers: {}
        })
  
        if (response.ok) {
            let blob = await response.blob();
            blob.name = "mp3Voz";
            //var file = new File([blob], "mp3Midi.mp3", {type: "audio/mp3", lastModified: new Date()});
            var url = window.URL.createObjectURL(blob);
  
            return {data:url , bandera: true}
        }
        else {
            let json = await response.json();
            return {data:json.detail , bandera: false}
        }
    } catch (error) {
        console.log(error);
    }
  
  }

export async function getPDF (token, idVoz) {

    try {
        const response = await fetch(URL_PROYECTO+'project/voice/'+idVoz+'/transcription/sheet/', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer '+token}
        })

        if (response.ok) {
            let blob = await response.blob();
            blob.name = "pdf";
            //var file = new File([blob], "mp3Midi.mp3", {type: "audio/mp3", lastModified: new Date()});
            var url = window.URL.createObjectURL(blob);
            return {data:url , bandera: true}
        }
        else {
            let json = await response.json();
            return {data:json.detail , bandera: false}
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getPDFNoLogin (idVoz) {
    try {
        const response = await fetch(URL_PROYECTO+'project/voice/'+idVoz+'/transcription/sheet/', {
            method: 'GET',
            headers: {}
        })

        if (response.ok) {
            let blob = await response.blob();
            blob.name = "pdf";
            //var file = new File([blob], "mp3Midi.mp3", {type: "audio/mp3", lastModified: new Date()});
            var url = window.URL.createObjectURL(blob);
            return {data:url , bandera: true}
        }
        else {
            let json = await response.json();
            return {data:json.detail , bandera: false}
        }
    } catch (error) {
        console.log(error);
    }
}

export async function guardarPartitura (token, idVoz, partitura){
    try {
        const form = new FormData()
        form.append('ABCString', partitura);
        const response = await fetch(URL_PROYECTO+'project/voice/'+idVoz+'/transcription/', {
            method: 'PUT',
            headers: { 'Authorization': 'Bearer '+token},
            body: form,
        });

        const json = await response.json();
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
