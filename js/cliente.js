document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. ESCUDO PARA EL FORMULARIO (Solo si existe) ---
    const formCliente = document.getElementById("form-cliente");
    if (formCliente) {
        formCliente.addEventListener("submit", async (e) => {
            e.preventDefault();
            const datos = new FormData(formCliente);
            try {
                const res = await fetch("php/registrar_cliente.php", {
                    method: "POST",
                    body: datos
                });
                const texto = await res.text();
                document.getElementById("modal-info").innerHTML = texto;
                document.getElementById("modal-exito").classList.remove("hidden");
            } catch (err) {
                console.error("Error al registrar:", err);
            }
        });
    }

    // --- 2. CARGAR DATOS DEL DUEÑO ---
    if (document.getElementById("saludo-dueno")) {
        cargarPerfil();
    }
    
    if (document.getElementById("lista-mis-mascotas")) {
        cargarMisMascotas();
    }

    // --- 3. MENÚ LATERAL ---
    const toggleBtn = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
});

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

function verHistorial(id) { window.location.href = `historial-cliente.html?id=${id}`; }
function agendarCita(id) { alert("Agendar para: " + id); }
function cerrarModal() {
    const modal = document.getElementById("modal-exito");
    if (modal) modal.classList.add("hidden");
}