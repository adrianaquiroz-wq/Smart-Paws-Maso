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


/*------------------------------------------------------------------*/
/*-------------------buscadita duemo ------------------------------*/
function buscarPacientes(){

    let ci = document.getElementById("busca-ci").value;

    if(ci == ""){
        alert("Ingrese carnet");
        return;
    }

    fetch("php/buscar_dueno.php?ci=" + ci)

    .then(res => res.json())

    .then(data => {

        let cont = document.getElementById("resultado-busqueda");

        cont.innerHTML = "";

        if(data.length == 0){

            cont.innerHTML = `
                <p style="margin-top:10px;color:red;">
                    No se encontraron mascotas
                </p>
            `;

            return;
        }

        data.forEach(m => {

            cont.innerHTML += `

            <div class="card" style="margin-top:15px;">

                <div style="display:flex;align-items:center;gap:15px;">

                    <img 
                        src="${m.foto || 'img/default.png'}"
                        style="
                            width:80px;
                            height:80px;
                            border-radius:50%;
                            object-fit:cover;
                        "
                    >

                    <div>
                        <h4 style="margin:0;">${m.nombre}</h4>
                        <small>${m.raza}</small>
                    </div>

                </div>

                <div class="actions">

                    <button onclick="historial(${m.id_mascota})">
                        Historial
                    </button>

                    <button onclick="nuevaAtencion(${m.id_mascota})">
                        Atención
                    </button>

                </div>

            </div>
            `;
        });

    });

}


function historial(id){

    alert("Historial mascota ID: " + id);

}



function nuevaAtencion(id){

    window.location.href = "atenciones.html?id=" + id;

}