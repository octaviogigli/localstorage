let productos = [];

document.addEventListener("DOMContentLoaded", function(){
    importar()
    mostrarProductos()
})

function agregarProducto() {
    const producto = {
        nombre: document.getElementById("nombre").value,
        precio: Number(document.getElementById("precio").value),
        stock: Number(document.getElementById("stock").value),
        categoria: document.getElementById("categoria").value
    };
    productos.push(producto);
    guardar()
    mostrarProductos();
    alert("Producto agregado");

}
function guardar(){
    localStorage.setItem("productos", JSON.stringify(productos))
}

function importar(){
    let productosGuardados = localStorage.getItem("productos")
    if (productosGuardados != null) {
        productos = JSON.parse(productosGuardados)
    }
 }

function buscarProductos() {
    const categoria = document.getElementById("buscarCategoria").value;
    let encontrados = [];
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].categoria == categoria) {
            encontrados.push(productos[i]);
        }
    }
    mostrarProductos(encontrados);
}

function actualizarStock() {
    const nombre = document.getElementById("actualizarNombre").value;
    const nuevoStock = Number(document.getElementById("nuevoStock").value);
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].nombre == nombre) {
            productos[i].stock = nuevoStock;
            mostrarProductos();
            alert("Stock actualizado");
            return;
        }
    }
    alert("Producto no encontrado");
}

function eliminarProducto() {
    const nombre = document.getElementById("eliminarNombre").value;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].nombre == nombre) {
            productos.splice(i, 1);
            mostrarProductos();
            alert("Producto eliminado");
            return;
        }
    }
    alert("Producto no encontrado");
}

function calcularTotal() {
    let total = 0;
    for (let i = 0; i < productos.length; i++) {
        total += productos[i].precio * productos[i].stock;
    }
    document.getElementById("total").innerHTML = "Total: $" + total;
}

function mostrarProductos() {

    document.getElementById("listaProductos").innerHTML = ""

    productos.forEach( (producto) => {
        document.getElementById("listaProductos").innerHTML += "<div class='producto'>" +
                     "<strong>" + producto.nombre + "</strong><br>" +
                     "Precio: $" + producto.precio + "<br>" +
                     "Stock: " + producto.stock + "<br>" +
                     "Categoría: " + producto.categoria +
                     "</div>";
    })
}
