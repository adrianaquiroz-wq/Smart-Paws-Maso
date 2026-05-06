// Simulación de búsqueda (lógica de tu DB)
function buscarPacientes() {
    const ci = document.getElementById('busca-ci').value;
    const area = document.getElementById('area-trabajo');
    const lista = document.getElementById('lista-mascotas-dueño');

    if(ci === "1234567") { // Ejemplo de CI
        area.classList.remove('hidden');
        lista.innerHTML = `
            <div class="mascota-item" onclick="seleccionarMascota(1, 'Firulais')">
                <p><strong>ID: 1</strong> - Firulais (Canino - Poodle)</p>
                <button class="btn-sm">Atender</button>
            </div>
        `;
    } else {
        alert("Dueño no encontrado en la base de datos.");
    }
}

function seleccionarMascota(id, nombre) {
    document.getElementById('nombre-paciente-actual').innerText = nombre;
    document.getElementById('atencion-id-mascota').value = id;
}

// Registro de atención
document.getElementById('form-atencion').addEventListener('submit', (e) => {
    e.preventDefault();
    const datosAtencion = {
        id_mascota: document.getElementById('atencion-id-mascota').value,
        descripcion: document.getElementById('desc-atencion').value,
        fecha: new Date().toISOString().split('T')[0],
        prox_fecha: document.getElementById('prox-fecha').value,
        traido_por: document.getElementById('nombre-trajo').value
    };

    console.log("Guardando en tabla ATENCIONES:", datosAtencion);
    alert("Atención registrada con éxito en el historial de " + document.getElementById('nombre-paciente-actual').innerText);
    e.target.reset();
});


/*-----------------------------------------------------------------*/
/*---------------------------REGISTRAR CLIENTE---------------------------*/
document.getElementById("form-cliente")?.addEventListener("submit", e => {
    e.preventDefault();

    const carnet = document.getElementById("cli-carnet").value;
    const nombre = document.getElementById("cli-nombre").value;
    const apellido = document.getElementById("cli-apellido").value;
    const usuario = document.getElementById("cli-usuario").value;
    const pass = document.getElementById("cli-pass").value;

    fetch("php/registrar_cliente.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `carnet=${carnet}&nombre=${nombre}&apellido=${apellido}&usuario=${usuario}&pass=${pass}`
    })
    .then(res => res.text())
    .then(data => {
        if (data === "ok") {
            alert("Cliente registrado");
        } else {
            alert("Error");
        }
    });
});
/*-----------------------------------------------------------------*/
/*-----------------------FIN REGISTRAR CLIENTE---------------------------*/

/*-----------------------------------------------------------------*/
/*-----------------------LLENAR LO DEL VET---------------------------*/

function cargarMascotasDashboard() {
    fetch("php/obtener_mascotas.php")
        .then(res => res.json())
        .then(data => {
            const contenedor = document.getElementById("mascotas-dashboard");

            contenedor.innerHTML = "";

            data.forEach(m => {
                contenedor.innerHTML += `
                    <div class="mascota-item">
                        <h4>🐾 ${m.mascota}</h4>
                        <p>Dueño: ${m.duenio} ${m.apellido}</p>
                    </div>
                `;
            });
        });
}

window.addEventListener("DOMContentLoaded", () => {
    cargarMascotasDashboard();
});
/*-----------------------------------------------------------------*/
/*--------------------FIN LLENAR LO DEL VET---------------------------*/
