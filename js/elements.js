//API QUE TRAE EL PRECIO DE LAS CRIPTO
let criptoApi = "https://api.binance.com/api/v3/ticker/price";

fetch(criptoApi)
    .then((respuesta) => respuesta.json())
    .then((datos) => mostrarData(datos))
    .catch((e) => console.log(e));

const mostrarData = (data) => {
    let body = "";

    for (let i = 0; i < 10; i++) {
        body += `<span class="espaciado"><b style="color: rgb(255, 242, 58);">  ${data[i].symbol}</b>  ${data[i].price}<b style="color: #ff4953;"> -3.79% </b></span>`;
    }

    document.getElementById("data").innerHTML = body;
};

//TRAE EL PRECIO DE LAS MONEDAS

let euroApi = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

fetch(euroApi)
    .then((respuesta) => respuesta.json())
    .then(
        (datos) =>
        (respuesta = {
            dolar: datos[3].casa.compra,
            euro: datos[4].casa.compra,
            yen: datos[0].casa.compra,
            libra: datos[7].casa.compra
        })
    )
    .then((respuesta) => cards());


//VARIABLES

let valor;
let nombre;

const inicio = document.getElementById("inicio");
const contenedorMonedas = document.getElementById("contenedor-monedas");
const confirmacion = document.getElementById("confirmacion");
const btnLogin = document.getElementById("login");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const contenedorMensajeCarrito = document.getElementById("contenedorMensajeCarrito");
const sectionListado = document.getElementById("misTransacciones");
const sectionListadoMov = document.getElementById("misTransaccionesMov");

const root = document.documentElement;

let verif = false;


// OBJETOS


class misTransacciones {
    // CLASE DONDE GUARDO MIS TRANSACCIONES

    constructor(id, nombre, moneda, gasto, adquiscion, fecha) {
        this.id = id;
        this.nombre = nombre;
        this.moneda = moneda;
        this.gasto = gasto;
        this.adquiscion = adquiscion;
        this.fecha = fecha;
    }
}

class misCompras {
    // CLASE DONDE GUARDO MIS COMPRAS REALIZADAS

    constructor(nombre, adquiscion, fecha) {
        this.nombre = nombre;
        this.adquiscion = adquiscion;
        this.fecha = fecha;
    }
}