// --- LÓGICA DE NAVEGACIÓN ENTRE TABS ---
function switchTab(tab) {
    const loginSec = document.getElementById('section-login');
    const registroSec = document.getElementById('section-registro');
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(t => t.classList.remove('active'));

    if (tab === 'login') {
        loginSec.classList.remove('hidden');
        registroSec.classList.add('hidden');
        event.currentTarget.classList.add('active');
    } else {
        loginSec.classList.add('hidden');
        registroSec.classList.remove('hidden');
        event.currentTarget.classList.add('active');
    }
}

// =========================
// 🔐 LOGIN CON BD REAL
// =========================
document.querySelector('#section-login form')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.getElementById("login-usuario").value;
    const contrasena = document.getElementById("login-pass").value;
    const rol = document.getElementById('rol-login').value;

    fetch("php/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `usuario=${usuario}&contrasena=${contrasena}&rol=${rol}`
    })
    .then(res => res.text())
    .then(data => {

        if (data === "cliente") {
            alert("Bienvenido Cliente");
            window.location.href = "mi-mascota.html";
        } 
        else if (data === "veterinario") {
            alert("Bienvenido Veterinario");
            window.location.href = "panel-vet.html";
        } 
        else if (data === "no_rol") {
            alert("No tienes ese rol asignado");
        } 
        else {
            alert("Datos incorrectos");
        }

    });
});


// =========================
// 📝 REGISTRO CON BD REAL
// =========================
document.getElementById('form-registro')?.addEventListener('submit', (e) => {
    e.preventDefault();

    const carnet = document.getElementById('reg-carnet').value;
    const nombre = document.getElementById('reg-nombre').value;
    const apellido = document.getElementById('reg-apellido').value;
    const correo = document.getElementById('reg-correo').value;
    const password = document.getElementById('reg-pass').value;
    const rol = document.getElementById('reg-rol').value;

    fetch("php/registro.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `carnet=${carnet}&nombre=${nombre}&apellido=${apellido}&correo=${correo}&password=${password}&rol=${rol}`
    })
    .then(res => res.text())
    .then(data => {
        if (data === "ok") {
            alert("Registro exitoso");
            switchTab('login');
        } else {
            alert(data);
        }
    });
});