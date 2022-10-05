// Constructor para crear objetos, en este caso sintetizadores (instr. musical electronico),
class Sintetizador {
    constructor (marca ,modelo, id, polifonia, precio, cantidad, img){
        this.marca = marca
        this.modelo = modelo
        this.id = id
        this.polifonia = polifonia
        this.precio = parseFloat(precio)
        this.cantidad = parseFloat(cantidad)
        this.img = img
    }
}



// Array carrito inicializado vacio
let carrito = []
// Array del stock y objetos pusheados
let sintesStock = [];

sintesStock.push(new Sintetizador("Korg", "Ms-20", 1, "Monofonico", 550, 1, "../img/ms20.jpg"))
sintesStock.push(new Sintetizador("Roland", "Juno 106", 2, "Polifonico", 2500, 1, "../img/juno106.jpg"))
sintesStock.push(new Sintetizador("SEQUENTIAL", "Prophet 5", 3, "Polifonico", 3000, 1, "../img/prophet5.jpg"))
sintesStock.push(new Sintetizador("TE", "OP-1", 4, "Polifonico", 1200, 1, "../img/op1.jpg"))
sintesStock.push(new Sintetizador("Moog", "Minimoog", 5, "Monofonico", 5000, 1, "../img/minimoog.jpg"))
sintesStock.push(new Sintetizador("Moog", "Moog Source", 6, "Monofonico", 2000, 1, "../img/moogsource.jpg"))
sintesStock.push(new Sintetizador("Oberheim", "OB-Xa", 7, "Polifonico", 7000, 1, "../img/obxa.jpg"))
sintesStock.push(new Sintetizador("YAMAHA", "CS-80", 8, "Polifonico", 50000, 1, "../img/cs80.jpg"))
sintesStock.push(new Sintetizador("Linn Electronics", "LinnDrum", 9, "Monofonico", 2000, 1, "../img/linndrum.jpg"))
sintesStock.push(new Sintetizador("Roland", "TR-808", 10, "Monofonico", 5000, 1, "../img/tr808.jpg"))



// DOMContentLoaded (operador ternario aplicado)
document.addEventListener("DOMContentLoaded", () => {
    localStorage.getItem("carrito") ? (
        carrito = JSON.parse(localStorage.getItem("carrito")),
        renderCarrito()
        ):(null) 
}) 



// Variable para llamar por id al contenedor de las cards de cada producto
const contenedorSintes = document.querySelector("#contenedor");


//Funcion para "pintar" las cards de productos en el HTML
function renderCards() {
    sintesStock.forEach((sinte) => {
        const div = document.createElement("div");
        div.classList.add("sinte-card");
        div.innerHTML = `
        <div class="card my-3 mx-3 border-info" style="width: 18rem;">
                <img src="${sinte.img}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${sinte.marca} - ${sinte.modelo}</h5>
                    <p class="card-text">USD$${sinte.precio}</p>
                    <button type="button" class="btn btn-primary boton-agregar" id="agregar${sinte.id}">Agregar al Carrito</button>
                </div>
            </div>`;

        contenedorSintes.appendChild(div);

        // Evento que se le aplica al boton para agregar productos al carrito, llamando a la funcion addToCart
        const botonAgregar = document.querySelector(`#agregar${sinte.id}`);
        botonAgregar.addEventListener("click", () => {
            addToCart(sinte.id);
            // Alert que notifica si agregaste un producto al carrito (Toastify)
            Toastify({
                text: `Agregaste ${sinte.marca} - ${sinte.modelo} al carrito!`,
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style: {
                    background: "linear-gradient(to right, rgb(240, 120, 0), rgb(240, 80, 0))",
                }
                }).showToast();
        });
    });
}

renderCards()



// Variables para llamar por id al contenedor del carrito, al contador de prod dentro del carrito y al total del carrito
const contenedorCarrito = document.querySelector("#contenedor-carrito");
const numCarrito = document.querySelector("#num-carrito")
const totalCarrito = document.querySelector("#total")


// Funcion para ir actualizando el carrito a medida que se van agregando productos
function renderCarrito() {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((sinte) => {
        const div = document.createElement("div")
        div.classList.add("lista-carrito")
        div.innerHTML = `
                    <span class="border border-2"><img src="${sinte.img}" class="img-carrito rounded" alt=""></span>
                    <p>${sinte.marca} - ${sinte.modelo}</p>
                    <p>USD$${sinte.precio}</p>
                    <p>Cantidad: ${sinte.cantidad}</p>
                    <button type="button" class="btn btn-danger" id="quitar-sinte" onclick="quitarSinte(${sinte.id})"><i class="bi bi-trash"></i></button>`
        
        contenedorCarrito.appendChild(div)

        localStorage.setItem("carrito", JSON.stringify(carrito))

    })
    // Contador del carrito
    numCarrito.innerText = carrito.length
    // Acumulador del precio total, va acumulando el precio del prod por la cantidad agregada al carrito
    totalCarrito.innerText = carrito.reduce((acc, sinte) => acc + sinte.precio * sinte.cantidad, 0)

}




// Funcion para añadir productos al carrito
const addToCart = (sinteId) => {
    // Primero pregunto si existe el producto en el carrito con el metodo .some, usando el id de cada uno
    const existe = carrito.some (sinte => sinte.id === sinteId)
    if(existe){
        const sinte = carrito.map (sinte => {
            sinte.id === sinteId && sinte.cantidad ++  // Operador logico && y ++ aplicado
        })
    } else { // Si no, lo agrega al carrito
        const instrumAgregado = sintesStock.find((sinte) => sinte.id === sinteId)
        carrito.push(instrumAgregado)
    }
    renderCarrito()
}



// Funcion para quitar un producto del carrito
const quitarSinte = (sinteId) => {
    const sinte = carrito.find((sinte) => sinte.id === sinteId)
    const i = carrito.indexOf(sinte)
    carrito.splice(i, 1)
    renderCarrito()
    // Alert que notifica si quitaste un producto del carrito (Toastify)
    Toastify({
        text: `Quitaste ${sinte.marca} - ${sinte.modelo} del carrito`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
            background: "linear-gradient(to right, rgb(240, 80, 0), rgb(240, 120, 0))",
        }
        }).showToast();
}



// Funcion para vaciar el carrito
const vaciarCarrito = document.querySelector("#vaciar-carrito")
vaciarCarrito.addEventListener("click", () =>{
    carrito.length = 0
    localStorage.removeItem("carrito")
    renderCarrito()
    // Alert que notifica cuando se vacia el carrito (Toastify)
    Toastify({
        text: `Vaciaste el carrito`,
        duration: 3000,
        gravity: "bottom",
        position: "right",
        style: {
            background: "linear-gradient(to right, #1ba2f6, #6f42c1)",
        }
        }).showToast();
});


