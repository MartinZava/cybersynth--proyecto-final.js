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
// Array y objetos pusheados
let sintesStock = [];

sintesStock.push(new Sintetizador("Korg", "Ms-20", 1, "Monofonico", 550, 4, "../img/ms20.jpg"))
sintesStock.push(new Sintetizador("Roland", "Juno 106", 2, "Polifonico", 2500, 2, "../img/juno106.jpg"))
sintesStock.push(new Sintetizador("SEQUENTIAL", "Prophet 5", 3, "Polifonico", 3000, 1, "../img/prophet5.jpg"))
sintesStock.push(new Sintetizador("TE", "OP-1", 4, "Polifonico", 1200, 5, "../img/op1.jpg"))
sintesStock.push(new Sintetizador("Moog", "Minimoog", 5, "Monofonico", 5000, 1, "../img/minimoog.jpg"))
sintesStock.push(new Sintetizador("Moog", "Moog Source", 6, "Monofonico", 2000, 3, "../img/moogsource.jpg"))
sintesStock.push(new Sintetizador("Oberheim", "OB-Xa", 7, "Polifonico", 7000, 1, "../img/obxa.jpg"))
sintesStock.push(new Sintetizador("YAMAHA", "CS-80", 8, "Polifonico", 50000, 1, "../img/cs80.jpg"))
sintesStock.push(new Sintetizador("Linn Electronics", "LinnDrum", 9, "Monofonico", 2000, 1, "../img/linndrum.jpg"))
sintesStock.push(new Sintetizador("Roland", "TR-808", 10, "Monofonico", 5000, 2, "../img/tr808.jpg"))



function renderCards() {

    const contenedorSintes = document.getElementById('contenedor')

    sintesStock.forEach((sinte) => {
        const div = document.createElement("div")
        div.classList.add("card my-3 mx-3 sinte-card")
        div.innerHTML = `
        <img src="${sinte.img}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${sinte.marca} - ${sinte.modelo}</h5>
            <p class="card-text">USD$${sinte.precio}</p>
            <a href="#" class="btn btn-primary">Agregar al Carrito</a>
        </div>`


    contenedorSintes.appendChild(div)
    })
}






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




