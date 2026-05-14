// --- FUNCIONES ---

function cargarPerfil() {
    fetch("php/get_perfil.php")
    .then(res => res.json())
    .then(user => {
        if(!user.error) {
            document.getElementById("nombre-dueno").textContent = `${user.nombre} ${user.apellido}`;
            document.getElementById("saludo-dueno").textContent = `¡Hola, ${user.nombre}! 👋`;
        }
    })
    .catch(err => console.log("No se pudo cargar el perfil"));
}

function cargarMisMascotas() {
    fetch("php/get_mis_mascotas.php")
    .then(res => res.json())
    .then(data => {
        const contenedor = document.getElementById("lista-mis-mascotas");
        if (!contenedor) return;
        contenedor.innerHTML = "";

        if (!data || data.length === 0) {
            contenedor.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:gray;">No tienes mascotas vinculadas.</p>`;
            return;
        }

        data.forEach(m => {
            // USAR BACKTICKS `` PARA TODO EL BLOQUE HTML
            contenedor.innerHTML += `
                <div class="card" style="text-align:center; padding:20px; background:white; border-radius:15px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
                    <img src="${m.foto || 'img/default.png'}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; border:3px solid #4CAF50; margin-bottom:15px;">
                    <h3 style="margin:5px 0;">${m.nombre}</h3>
                    <p style="color:gray; font-size:.9rem; margin-bottom:15px;">${m.raza}</p>
                    <div style="display:flex; gap:10px; justify-content:center;">
                        <button class="btn-secundario" onclick="verHistorial(${m.id_mascota})">Historial</button>
                        <button class="btn-principal" onclick="agendarCita(${m.id_mascota})" style="background:#FF9800; border:none; color:white; padding:5px 10px; border-radius:5px; cursor:pointer;">Cita</button>
                    </div>
                </div>`;
        });
    })
    .catch(err => console.error("Error cargando mascotas:", err));
}



// --- FUNCIONES GLOBALES (Fuera del DOMContentLoaded para que el HTML las vea) ---
/* --- FUNCIONES GLOBALES          CCCCIIIITTTTAAAASSSS       --- */

function agendarCita(id = '') { 
    const modal = document.getElementById('modal-cita');
    const select = document.getElementById('select-mascotas');

    if (modal) {
        modal.classList.remove('hidden');
        
        if (select) {
            if (id !== '') {
                // Entra desde una mascota específica: bloqueamos el select en esa mascota
                select.value = id;
            } else {
                // Entra desde el sidebar: dejamos que elija cualquiera
                select.value = ""; 
            }
        }
    }
}

function verHistorial(id) { 
    window.location.href = `historial-cliente.html?id=${id}`; 
}

/* --- LÓGICA PRINCIPAL --- */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Cargar Perfil (Nombre y Saludo)
    fetch('php/get_perfil.php')
        .then(res => res.json())
        .then(data => {
            if (!data.error) {
                const nombreEl = document.getElementById('nombre-dueno');
                const saludoEl = document.getElementById('saludo-dueno');
                
                if (nombreEl) nombreEl.textContent = data.nombre;
                if (saludoEl) saludoEl.textContent = `¡Hola, ${data.nombre.split(' ')[0]}! 👋`;
            }
        })
        .catch(err => console.error("Error cargando perfil:", err));

    // 2. Cargar las Tarjetas de Mascotas Y el Select del Modal
    // Llamamos a esta función que ahora hará ambas tareas
    cargarMisMascotasYSelect();


    if (document.getElementById("citas-dueno")) {
        cargarCitasPendientes();
    }

    // 3. Manejo del Formulario de Citas (Se mantiene igual)
    const formCita = document.getElementById('form-agendar-cita');
    if (formCita) {
        formCita.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(formCita);

            fetch('php/guardar_cita.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.text())
            .then(res => {
                if (res.trim() === "ok") {
                    alert("¡Cita agendada con éxito!");
                    location.reload();
                } else {
                    alert("Error: " + res);
                }
            });
        });
    }
});
// NUEVA VERSIÓN DE TU FUNCIÓN PARA LLENAR EL SELECT

function cargarMisMascotasYSelect() {
    
    // 1. CARGAR MASCOTAS (Para el Select y las Tarjetas)
    fetch("php/get_mis_mascotas.php")
    .then(res => res.json())
    .then(data => {
        const selectMascota = document.getElementById('select-mascotas');
        const contenedor = document.getElementById("lista-mis-mascotas");

        // Llenamos el select de mascotas en el modal
        if (selectMascota) {
            selectMascota.innerHTML = '<option value="" disabled selected>Selecciona una mascota</option>';
            data.forEach(m => {
                selectMascota.innerHTML += `<option value="${m.id_mascota}">${m.nombre}</option>`;
            });
        }

        if (contenedor) {
            contenedor.innerHTML = "";
            data.forEach(m => {
                contenedor.innerHTML += `
                <div class="card" style="text-align:center; padding:20px; background:white; border-radius:15px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
                    <img src="${m.foto || 'img/default.png'}" style="width:100px; height:100px; border-radius:50%; object-fit:cover; border:3px solid var(--verde-vivo); margin-bottom:15px;">
                    <h3 style="margin:5px 0;">${m.nombre}</h3>
                    <p style="color:gray; font-size:.9rem; margin-bottom:15px;">${m.raza}</p>
                    
                    <button class="btn-secundario" onclick="verHistorial(${m.id_mascota})" style="width:100%; padding:10px;">
                        <i class="fas fa-file-medical"></i> Ver Historial
                    </button>
                </div>`;
            });
        }
    })
    .catch(err => console.error("Error al obtener mascotas:", err));

    // 2. CARGAR VETERINARIOS (Para el nuevo select del modal)
    fetch("php/get_veterinarios.php")
    .then(res => res.json())
    .then(vets => {
        const selectVet = document.getElementById('select-veterinarios');
        if (selectVet) {
            selectVet.innerHTML = '<option value="" disabled selected>Selecciona un especialista</option>';
            vets.forEach(v => {
                // Usamos v.nombre y v.apellido que ahora vienen del JOIN
                selectVet.innerHTML += `<option value="${v.carnetVet}">Dr(a). ${v.nombre} ${v.apellido}</option>`;
            });
        }
    })
    
    .catch(err => console.error("Error al cargar veterinarios:", err));
}


function cargarCitasPendientes() {
    fetch("php/get_mis_citas.php")
    .then(res => res.json())
    .then(data => {
        const contenedor = document.getElementById("citas-dueno");
        if (!contenedor) return;

        if (data.length === 0) {
            contenedor.innerHTML = `<p style="font-size: .9rem; color: gray;">No tienes citas próximas.</p>`;
            return;
        }

        contenedor.innerHTML = ""; 
        data.forEach(c => {
            contenedor.innerHTML += `
            <div class="cita-item" style="display:flex; align-items:center; gap:15px; padding:10px; border-bottom:1px solid #eee;">
                <div style="background:var(--verde-vivo); color:white; padding:8px; border-radius:10px; text-align:center; min-width:60px;">
                    <span style="display:block; font-size:1.1rem; font-weight:bold;">${c.dia}</span>
                    <span style="font-size:0.7rem; text-transform:uppercase;">${c.mes}</span>
                </div>
                <div style="flex:1;">
                    <h4 style="margin:0; font-size:0.95rem;">${c.mascota} — <span style="color:var(--verde-vivo)">${c.hora}</span></h4>
                    <p style="margin:2px 0 0; font-size:0.8rem; color:gray;">Dr(a). ${c.vet_nombre} | ${c.motivo}</p>
                </div>
                <span class="tag-estado" style="font-size:0.7rem; padding:4px 8px; border-radius:12px; background:#fff3cd; color:#856404;">${c.estado}</span>
            </div>`;
        });
    });
}