fetch("php/get_mascotas.php")
.then(async res => {
    const text = await res.text();
    console.log("RESPUESTA RAW:", text);
    return JSON.parse(text);
})
.then(data => {
    let cont = document.getElementById("lista-mascotas");
    cont.innerHTML = "";

    data.forEach(m => {
        cont.innerHTML += `
            <div class="card">
                <div style="display:flex;gap:10px;align-items:center;">
                    <img src="${m.foto || 'img/default.png'}">
                    <div>
                        <b>${m.nombre}</b><br>
                        <small>${m.raza || 'Sin raza'}</small>
                    </div>
                </div>

                <div class="actions">
                    <button onclick="historial(${m.id_mascota})">Historial</button>
                    <button onclick="cita(${m.id_mascota})">Cita</button>
                </div>
            </div>
        `;
    });
})
.catch(err => {
    console.error("ERROR FETCH:", err);
});