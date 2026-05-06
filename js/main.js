document.addEventListener('DOMContentLoaded', () => {
    // 1. Menú Hamburguesa
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    const contenedor = document.getElementById('contenedor-productos');
    const inputBusqueda = document.getElementById('input-busqueda');
    const btnBuscar = document.getElementById('btn-buscar');

    // 2. NUESTRO ESTANTE LOCAL (Plan de Respaldo)
    const productosLocales = [
        { title: "Alimento Pro Plan Adulto 3kg", price: 185, thumbnail: "https://storage.googleapis.com/eddress/market-products/merchants/7wg0D5ChQU-pXxzCDmVhkA/5e2a2624350e5401d9b37537.png?v=13" },
        { title: "Cama acolchada para Perro L", price: 120, thumbnail: "https://tottoco.vtexassets.com/arquivos/ids/514234/PDCBCA1009-222-G98L_2.jpg?v=638860197170830000" },
        { title: "Shampoo para Mascotas 500ml", price: 35, thumbnail: "https://storage.googleapis.com/eddress/market-products/merchants/7wg0D5ChQU-pXxzCDmVhkA/nlyxC5dE.png?v=1" },
        { title: "Juguete Cuerda Resistente", price: 25, thumbnail: "https://m.media-amazon.com/images/I/81V3yf82dcL._AC_UF1000,1000_QL80_.jpg" },
        { title: "Plato de acero inoxidable", price: 30, thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw27gL6xLSUqSPKy6UFP6npHy66T2vgYOf-w&s" }
    ];

    // 3. Función de búsqueda local (¡No falla nunca!)
    function buscarProductosLocal(query) {
        contenedor.innerHTML = ''; 
        
        // Filtramos la lista según lo que escribas
        const resultados = productosLocales.filter(p => 
            p.title.toLowerCase().includes(query.toLowerCase())
        );

        if (resultados.length > 0) {
            mostrarProductos(resultados);
        } else {
            contenedor.innerHTML = `<p>No encontramos "${query}" en nuestro inventario local.</p>`;
        }
    }

    function mostrarProductos(productos) {
        contenedor.innerHTML = '';
        productos.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${prod.thumbnail}" alt="${prod.title}">
                <div class="card-info">
                    <h3>${prod.title}</h3>
                    <p class="price">Bs. ${prod.price}</p>
                </div>
            `;
            contenedor.appendChild(card);
        });
    }

    // 4. Eventos
    if (btnBuscar) {
        btnBuscar.addEventListener('click', () => {
            const query = inputBusqueda.value.trim();
            if (query) buscarProductosLocal(query);
        });

        inputBusqueda.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = inputBusqueda.value.trim();
                if (query) buscarProductosLocal(query);
            }
        });
    }

    // Carga inicial
    buscarProductosLocal('a'); // Muestra todo lo que tenga una "a"
});