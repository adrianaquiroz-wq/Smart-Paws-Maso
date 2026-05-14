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