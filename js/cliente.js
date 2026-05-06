const form = document.getElementById("form-cliente");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const datos = new FormData(form);

    const res = await fetch("php/registrar_cliente.php", {
        method: "POST",
        body: datos
    });

    const texto = await res.text();

    // Mostrar en modal
    document.getElementById("modal-info").innerHTML = texto;
    document.getElementById("modal-exito").classList.remove("hidden");
});

// cerrar modal + limpiar formulario
function cerrarModal() {
    document.getElementById("modal-exito").classList.add("hidden");
    document.getElementById("form-cliente").reset();
}