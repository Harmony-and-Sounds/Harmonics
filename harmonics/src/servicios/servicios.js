export async function obtenerDatos (instrumentos ,file){

    const form = new FormData()

    form.append('instrumentos', instrumentos)
    form.append('file', file)
    
    const response = await fetch('example.com', {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: form,
    })
    return await response.json();
}