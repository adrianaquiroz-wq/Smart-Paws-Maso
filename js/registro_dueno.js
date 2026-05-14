/**registro_dueno.js */
document.addEventListener("DOMContentLoaded", () => {

    const formCliente = document.getElementById("form-cliente");

    if(formCliente){

        formCliente.addEventListener("submit", async (e) => {

            e.preventDefault();

            const datos = new FormData(formCliente);

            try{

                const res = await fetch("php/registrar_cliente.php", {
                    method: "POST",
                    body: datos
                });

                const texto = await res.text();

                const modalInfo = document.getElementById("modal-info");
                const modalExito = document.getElementById("modal-exito");

                if(modalInfo){
                    modalInfo.innerHTML = texto;
                }

                if(modalExito){
                    modalExito.classList.remove("hidden");
                }

                // LIMPIAR FORMULARIO
                formCliente.reset();

            }catch(err){

                console.error("Error al registrar:", err);

            }

        });

    }

});

function cerrarModal(){

    const modal = document.getElementById("modal-exito");

    if(modal){
        modal.classList.add("hidden");
    }

}