const menuNav = document.getElementById("menu");

// FUNCIONES LAYOUT

function light() {
    // MODO LIGHT
    root.style.setProperty("--light", "#afafaf");
    root.style.setProperty("--dark", "#161616");
}

function dark() {
    // MODO DARK
    root.style.setProperty("--light", "#161616");
    root.style.setProperty("--dark", "#afafaf");
}

function changeMode() {
    // CAMBIAR DE UN MODO A OTRO
    localStorage.mode =
        (localStorage.mode || "dark") === "dark" ? "light" : "dark";

    localStorage.mode === "dark" ? dark() : light();
}

// ESTADOS DE LOGIN

function pushLogin() {
    // VENTANA PUSH PARA LOGEARSE
    swal("Escribe tu usuario", {
        content: "input",
    }).then((value) => {
        if (value != '') {
            sessionStorage.setItem('usuario_logeado', value)

            nombre = () => {
                let nombre = value;
                return nombre;
            };

            userVerificado = (verif) => {
                verif = true;
                return verif;
            };

            cargarBody(nombre)

        } else {
            swal('Debes escribir tu nombre')
        }

    });
}

function cargarBody(nombre) {
    const li = document.getElementById('login')
    const loginbtn = document.getElementById('loginBtn')
    const textFooter = document.getElementById('textFooter')

    loginbtn.style.display = "none";
    contenedorCarrito.style.display = "block"

    let img = document.createElement('img')
    img.src = 'assets/avatar.png'
    img.classList.add('circle')
    img.classList.add('left')
    img.classList.add('side-nav-user-avatar')
    img.classList.add('fotoPerfil')

    let name = document.createElement('p')
    name.textContent = nombre()
    name.classList.add('name')

    let luna = document.createElement('img')
    luna.src = 'assets/luna.png'
    luna.classList.add('circle')
    luna.classList.add('left')
    luna.classList.add('side-nav-user-avatar')
    luna.classList.add('fotoPerfil')
    luna.classList.add('luna')
    luna.onclick = () => {
        changeMode();
    }

    li.appendChild(img)
    li.appendChild(name)
    li.appendChild(luna)

    let btnFooter = document.createElement('button')
    btnFooter.textContent = 'Cerrar sesión'
    btnFooter.classList.add('btnFooter')
    btnFooter.onclick = () => {
        cerrarSesion()
    }

    textFooter.appendChild(btnFooter)

    const tituloBienvenida = document.createElement('p')
    if (localStorage.carrito_de_compras.lenght > 1) {
        tituloBienvenida.textContent = "¡Bienvenido/a, " + nombre() + "! Tu carrito de compras quedó con productos pendientes"
    } else {
        tituloBienvenida.textContent = "¡Bienvenido/a, " + nombre() + "!"
    }
    tituloBienvenida.classList.add('tituloBienvenida')

    inicio.appendChild(tituloBienvenida)


    //// BUSCAMOS SI HAY COMPRAS EN EL CARRITO

    if (localStorage.carrito_de_compras !== undefined) {
        let t = localStorage.getItem('carrito_de_compras');
        let tJSON = JSON.parse(t);

        let user = sessionStorage.getItem('usuario_logeado')

        let nuevoArray = tJSON.filter((x) => {
            return x.nombre === user;
        });

        mostrarCarrito(nuevoArray)

    }

    //// BUSCAMOS SI EXISTE UN HISTORIAL DE COMPRAS

    if (localStorage.compras_confirmadas !== undefined) {
        let f = localStorage.getItem('compras_confirmadas');
        let fJSON = JSON.parse(f);

        let user = sessionStorage.getItem('usuario_logeado')

        let nuevoArrayf = fJSON.filter((x) => {
            return x.nombre === user;
        });

        let num = 1;

        cargarHistorial(nuevoArrayf, num)
    }
}

function cerrarSesion() {
    location.reload()
}


// FUNCIONES GENERALES DEL BODY



function cards() {

    const monedas = [{
            id: 1,
            name: "Dolar",
            price: respuesta.dolar,
            img: "assets/dolar.jfif",
            signo: "USD",
        },
        {
            id: 2,
            name: "Euro",
            price: respuesta.euro,
            img: "assets/euro.jfif",
            signo: "EURO",
        },
        {
            id: 3,
            name: "Yen",
            price: respuesta.yen,
            img: "assets/yen.jpg",
            signo: "YEN",
        },
        {
            id: 4,
            name: "Libra",
            price: respuesta.libra,
            img: "assets/libra.jfif",
            signo: "LBR",
        },
        {
            id: 5,
            name: "Bitcoin",
            price: respuesta.yen,
            img: "assets/bitcoin.jpg",
            signo: "BTC",
        },
        {
            id: 6,
            name: "Ethereum",
            price: respuesta.libra,
            img: "assets/ethereum.jpg",
            signo: "ETH",
        },
        {
            id: 7,
            name: "Tether",
            price: respuesta.libra,
            img: "assets/tether.jpg",
            signo: "TTH",
        },
        {
            id: 8,
            name: "USD Coin",
            price: respuesta.libra,
            img: "assets/usdCoin.jpg",
            signo: "USD",
        },
    ];

    monedas.forEach((moneda) => {


        const divMoneda = document.createElement("div");

        const tituloMoneda = document.createElement("h3");
        tituloMoneda.textContent = moneda.name;

        const imgMoneda = document.createElement("img");
        imgMoneda.src = moneda.img;
        imgMoneda.classList.add("imagen-moneda");

        const precioMoneda = document.createElement("price");
        precioMoneda.textContent = "El valor actual es " + moneda.price + "$";

        const btnFavorito = document.createElement("button");
        btnFavorito.textContent = "Cotizar";
        btnFavorito.onclick = () => {
            sessionStorage.usuario_logeado === undefined ?
                swal({
                    text: "Aún no estás logeado o tu usuario no está definido, en ese caso cierra tu sesión y vuelve a logearte",
                }) : pushMonto(nombre, moneda.name, moneda.price);
        };


        if (moneda.id <= 4) {
            divMoneda.classList.add("cards")
            btnFavorito.className = "btn-favorito"
        } else {
            let titulo = document.createElement('h2')
            titulo.textContent = 'Criptomonedas'
            divMoneda.classList.add("cardsCripto");
            btnFavorito.className = "btn-favorito-cripto"
        }


        divMoneda.appendChild(tituloMoneda);
        divMoneda.appendChild(imgMoneda);
        divMoneda.appendChild(precioMoneda);
        divMoneda.appendChild(btnFavorito);

        contenedorMonedas.appendChild(divMoneda);
    });
}

function pushMonto(usuario, monedaNombre, monedaPrecio) {
    // VENTANA PUSH DONDE PONGO EL MONTO A CONVERTIR

    swal("¿Cuánto quieres cotizar?:", {
        content: {
            element: "input",
            attributes: {
                type: "number",
            },
        },
    }).then((value) => {
        value !== null || 0 ? confirmAgregar(value, usuario, monedaNombre, monedaPrecio) : swal('Debes escribir un monto legible')
    }, 1000000)
}

function confirmAgregar(monto, usuario, monedaNombre, monedaPrecio) {
    // MOSTRAR CONFIRMACIÓN DE COMPRA

    const confirmacionCarrito = document.querySelector("#confirmacionCarrito");

    confirmacion.style.display = "block";

    let calculo = monto / parseInt(monedaPrecio);

    let calculoLegible = calculo.toFixed(3);

    let iniciales;

    switch (iniciales) {
        case (monedaNombre = "Dolar"):
            iniciales = "USD";

        case (monedaNombre = "Euro"):
            iniciales = "EUR";

        case (monedaNombre = "Yen"):
            iniciales = "YEN";

        case (monedaNombre = "Libra"):
            iniciales = "LBR";
    }

    const total = document.getElementById("titulo");
    total.className = "txtFinal";
    total.textContent =
        "Usted tiene " +
        monto +
        ", siendo que la moneda vale " +
        monedaPrecio +
        " usted puede comprar " +
        calculoLegible +
        " " +
        iniciales;

    const btnCompra = document.getElementById("boton");
    btnCompra.className = "btn-favorito-cripto"
    btnCompra.textContent = "Agregar al carrito";
    btnCompra.onclick = () => {
        localCarrito(usuario, monedaNombre, monto, calculoLegible);
        swal("Agregado al carrito");
    };

    confirmacion.appendChild(total);
    confirmacion.appendChild(btnCompra);

    contenedorMensajeCarrito.appendChild(confirmacion);
}

function localCarrito(usuario, monedaNombre, monto, calculoLegible) {

    confirmacion.style.display = "none";
    let user = sessionStorage.usuario_logeado

    const random = Math.random().toString().substr(2, 8);

    const miTransaccion = new misTransacciones(
        random,
        user,
        monedaNombre,
        monto,
        calculoLegible,
        moment().format("MMM Do YY")
    );

    let clientsArr = JSON.parse(localStorage.getItem("carrito_de_compras")) || [];
    clientsArr.push(miTransaccion);
    localStorage.setItem("carrito_de_compras", JSON.stringify(clientsArr));

    let nuevoArray = clientsArr.filter((x) => {
        return x.nombre === user;
    });

    mostrarCarrito(nuevoArray)
}

function mostrarCarrito(transacciones) {
    //TABLA QUE MUESTRA MIS TRANSACCIONES

    const gastoTotal = document.getElementById("gastoTotal");
    miTabla = document.getElementById("miTabla");

    miTabla.innerHTML = ""

    sectionListado.style.display = "block"

    transacciones.forEach((transaccion) => {


        let tbody = document.createElement("tbody");

        let tdNombre = document.createElement("td");
        tdNombre.textContent = transaccion.nombre;

        let tdMoneda = document.createElement("td");
        tdMoneda.textContent = transaccion.moneda;

        let tdGasto = document.createElement("td");
        tdGasto.textContent = transaccion.gasto;

        let tdAdquisicion = document.createElement("td");
        tdAdquisicion.textContent = transaccion.adquiscion;

        let tdFecha = document.createElement("td");
        tdFecha.textContent = transaccion.fecha;

        let tdDelete = document.createElement("td");
        tdDelete.textContent = 'eliminar'
        tdDelete.classList.add("deleteItem")
        tdDelete.onclick = () => {
            deleteItem(transaccion.id);
        }

        let tdBuy = document.createElement("td");
        tdBuy.textContent = 'comprar'
        tdBuy.classList.add("buyItem")
        tdBuy.onclick = () => {
            cargarHistorial(transaccion);
        }

        tbody.appendChild(tdNombre);
        tbody.appendChild(tdMoneda);
        tbody.appendChild(tdGasto);
        tbody.appendChild(tdAdquisicion);
        tbody.appendChild(tdFecha);
        tbody.appendChild(tdDelete);
        tbody.appendChild(tdBuy);

        miTabla.appendChild(tbody);

        sectionListado.appendChild(miTabla);
    });
}

function deleteItem(id) {


    miTabla.innerHTML = ""
    let arr = localStorage.getItem('carrito_de_compras');
    let arrJSON = JSON.parse(arr);

    let nuevoArray = arrJSON.filter((x) => {
        return x.id !== id;
    });

    localStorage.removeItem('carrito_de_compras')

    localStorage.setItem('carrito_de_compras', JSON.stringify(nuevoArray));

    mostrarCarrito(nuevoArray)
}

function cargarHistorial(transaccion, num) {

    if (num) { //num es una variable que viene inicializada desde 

        historial.style.display = "block";

        correrHistorial(transaccion)

    } else {
        document.getElementById("miTablaMov").innerHTML = "";

        miTablaMov = document.getElementById("miTablaMov");
        historial = document.getElementById("historial");

        historial.style.display = "block";

        let arr = localStorage.getItem('carrito_de_compras');
        let arrJSON = JSON.parse(arr);

        let nuevoArray = arrJSON.filter((x) => {
            return x.id === transaccion.id;
        });

        const miCompra = new misCompras(
            nombre = transaccion.nombre,
            adquiscion = transaccion.adquiscion,
            fecha = transaccion.fecha
        );

        let compras = JSON.parse(localStorage.getItem("compras_confirmadas")) || [];
        compras.push(miCompra);
        localStorage.setItem("compras_confirmadas", JSON.stringify(compras));

        let num = 1;
        let user = sessionStorage.usuario_logeado

        let nuevoArrayf = compras.filter((x) => {
            return x.nombre === user;
        });

        correrHistorial(nuevoArrayf, nuevoArray, num)
    }
}

function correrHistorial(param, id, num) {

    param.forEach((transac) => {

        let tbody = document.createElement("tbody");

        let tdAdq = document.createElement("td");
        tdAdq.textContent = transac.adquiscion;
        tdAdq.classList.add("tdCompras");

        let tdFech = document.createElement("td");
        tdFech.textContent = transac.fecha;
        tdFech.classList.add("tdCompras");

        let tdButton = document.createElement("td");
        tdButton.textContent = "Descargar comprobante"
        tdButton.classList.add("descargarComprob")
        tdButton.onclick = (args) => {
            var data, filename, link;
            var csv = "data:text/json;charset=utf-8," + JSON.stringify(param);
            filename = args.filename || "export.docx";
            data = encodeURI(csv);

            link = document.createElement("a");
            link.setAttribute("href", data);
            link.setAttribute("download", filename);
            link.click();
        }

        tbody.appendChild(tdAdq);
        tbody.appendChild(tdFech);
        tbody.appendChild(tdButton);

        miTablaMov.appendChild(tbody);

        sectionListadoMov.appendChild(miTablaMov);
    });
}