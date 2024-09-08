function agregarAlCarrito(producto) {
    let memoria = JSON.parse(localStorage.getItem("motos")) || [];
    console.log(memoria);

    let cuenta = 0;
    const indiceProducto = memoria.findIndex(moto => moto.id === producto.id);

    if (indiceProducto === -1) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        memoria.push(nuevoProducto);
        cuenta = 1;
    } else {
        memoria[indiceProducto].cantidad++;
        cuenta = memoria[indiceProducto].cantidad;
    }

    localStorage.setItem("motos", JSON.stringify(memoria));
    actualizarNumeroCarrito();
    return cuenta;
}

function restarAlCarrito(producto) {
    let memoria = JSON.parse(localStorage.getItem("motos")) || [];
    
    if (!memoria.length) return;

    const indiceProducto = memoria.findIndex(moto => moto.id === producto.id);
    
    if (indiceProducto === -1) return;

    if (memoria[indiceProducto].cantidad === 1) {
        memoria.splice(indiceProducto, 1);
    } else {
        memoria[indiceProducto].cantidad--;
    }
    
    localStorage.setItem("motos", JSON.stringify(memoria));
    actualizarNumeroCarrito();
}

/* Crea una nueva instancia del producto con cantidad 1 */
function getNuevoProductoParaMemoria(producto) {
    return {
        ...producto,
        cantidad: 1
    };
}

const cuentaCarritoElement = document.getElementById("cuenta-carrito");

function actualizarNumeroCarrito() {
    let memoria = JSON.parse(localStorage.getItem("motos")) || [];
    if (memoria.length > 0) {
        const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
        cuentaCarritoElement.innerText = cuenta;
        console.log(cuenta);
    } else {
        cuentaCarritoElement.innerText = 0;
    }
}

// Inicializa el número del carrito al cargar la página
actualizarNumeroCarrito();
