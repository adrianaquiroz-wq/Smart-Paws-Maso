//atenciones.js
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

const formAtencion = document.getElementById('form-atencion');
if (formAtencion) {
    formAtencion.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Atención registrada con éxito");
        e.target.reset();
    });
}

/* --- REGISTRO DE CLIENTE (Restaurado) --- */
const formCliente = document.getElementById("form-cliente");
if (formCliente) {
    formCliente.addEventListener("submit", e => {
        e.preventDefault();
        const formData = new FormData(formCliente);
        fetch("php/registrar_cliente.php", { method: "POST", body: formData })
        .then(res => res.text())
        .then(data => { if(data.trim()==="ok") alert("Cliente registrado"); });
    });
}
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
