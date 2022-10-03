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
                    <button type="button" class="btn btn-danger boton-agregar" onclick="quitarSinte(${sinte.id})"><i class="bi bi-trash"></i></button>`
        
        contenedorCarrito.appendChild(div)

        localStorage.setItem("carrito", JSON.stringify(carrito))
    })
    // Contador del carrito
    numCarrito.innerText = carrito.lenght
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
}



// Funcion para vaciar el carrito
const vaciarCarrito = document.querySelector("#vaciar-carrito")
vaciarCarrito.addEventListener("click", () =>{
    carrito.length = 0
    localStorage.removeItem("carrito")
    renderCarrito()
})





























/*


// Funcion para agregar productos al carrito
function addToCart() {
    let productoId = Number(prompt("Ingrese un Nro. de Id para agregar un instrumento al carrito \n" + info))
    let cantidad = Number(prompt(`Cuantas unidades de instrumento desea agregar?`))
    let producto = sintesStock.find(producto => producto.id === productoId)
    producto.cantidad = cantidad
    producto.total = producto.precio * cantidad
    carrito.push(producto)
}

// Funcion para eliminar productos del carrito segun id
function elimProdCarrito(){
    let idEliminar = Number(prompt("Ingrese el Id del producto a eliminar del carrito"))
    let prodEliminar = carrito.find(producto => producto.id == idEliminar)
    let iCarrito = carrito.indexOf(prodEliminar)
    carrito.splice(iCarrito, 1)
    alert("El producto fue eliminado con exito")
}

// Funcion para calcular el total del carrito
function total(carrito){
    let total = 0;
    carrito.forEach(Sintetizador => {
        total += Sintetizador.total
    })
    return total
}

// Funcion para vaciar el carrito
function vaciarCarrito(carrito){
    let carritoVacio = carrito.splice(0, carrito.lenght)
    return carritoVacio
}



alert("Bienvenido a CYBERSINTH")

// Mostrando instrumentos disponibles
let info = "Sintetizadores disponibles \n"

// Funcion para iterar cada objeto del array "stock" y mostrarselo al usuario
sintesStock.forEach((Sintetizador) => {
    info += `${Sintetizador.id}. ${Sintetizador.marca} - ${Sintetizador.modelo} \n`
}) 

alert(info)

// Preguntamos al usuario si quiere realizar una compra o no
let seleccion = prompt("Desea realizar una compra? Ingrese 'si' para agregar productos, ingrese 'no' para salir")


// Ciclos para comprobar si quiere realizar una compra 
while (seleccion != "si" && seleccion != "no") {
    alert("Por favor ingrese una opcion correcta")
    seleccion = prompt("Ingrese si para comprar, no para salir")
}

let continuar;// Variable que uso para validar si el usuario quiere seguir agregando productos o no

// Ciclo if y do para que el usuario agregue los productos que quiera al carrito, llamando a la funcion correspondiente
if (seleccion === "si") {
    do {
        addToCart()
        continuar = prompt("Ingrese 'fin' para finalizar y ver el carrito")
    } while (continuar != "fin");
    
} else if(seleccion === "no") {
    alert("Muchas gracias, vuelva pronto!")
}

let opcion = ``

// Si ingresa la palabra fin, damos las opciones de como continuar con la compra
// Con el .map recorro el carrito e itero los productos que el usuario agrego y se los muestro por alert
if (continuar == "fin") {
    let prodEnCarrito = carrito.map((carrito) => carrito.cantidad + " x " + carrito.marca + " - " + carrito.modelo + " - USD$" + carrito.precio)
    alert("Su carrito:\n" + prodEnCarrito.join("\n"))
    opcion = Number(prompt(`Que desea hacer ahora?
                            1. Ver total a abonar y finalizar compra.
                            2. Eliminar un producto del carrito.
                            3. Vaciar carrito.`))
} 


/*

// Ciclo if y switch para las distintas opciones 

while (opcion == 1 || opcion == 2 || opcion == 3) {
    switch (opcion) {
        case 1:
            alert(`El total de su compra es: ${total(carrito)}`)
            alert(`Muchas gracias por su compra!!! ✨`) // Aca se me genera un bucle sin salida y no se porque, el break no lo corta
            break;
        case 2:
            elimProdCarrito()
            break;
        case 3:
            vaciarCarrito(carrito)
            alert("El carrito ha sido vaciado")
            break;
        default:
            break;
    }

}

if (opcion != 1 && opcion != 2 && opcion != 3) {
    alert("Ingrese una opcion valida")
}

*/




