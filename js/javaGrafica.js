//fetch api dolar
let dolarBlue = document.getElementById("dolarBlue")
fetch("https://criptoya.com/api/dolar")
.then(response => response.json())
.then(datos => {
	let datosDolar = {...datos}	
	let {blue} = datosDolar
	dolarBlue.innerHTML = `
		<p>Dolar a tiempo real que usamos para cotizar: ${blue}</p>
		`
})


//Productos y carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) ?? []
fetch("./productos.json")
.then(response => response.json())
.then(productos => {
	productos.forEach((producto) => {
		let {id, nombre, precio, stock} = producto
		divproductos.innerHTML += `
			<div id="producto${id}">
			<img class="imagenesA" src="${producto.imagen}">
			<button id="boton${producto.id}" class="carritoBoton botonclick">Añadir al carrito</button>	
		`
	})
	productos.forEach(producto => {
		document.getElementById(`boton${producto.id}`).addEventListener("click", () =>{
			if(carrito.some(producto => producto.nombre == producto.nombre)) {
				let indice = carrito.findIndex(producto => producto.nombre == producto.nombre)
				carrito[indice].cant++
			} else{let productoCarrito ={
				...producto1,
				cant: 1
			}}
			carrito.push(producto)
			localStorage.setItem("CarritoDeCompra", JSON.stringify(carrito))
			Toastify({
				text: "¡Producto agregado con éxito!",
				duration: 3000,
				close: true,
				gravity: "bottom",
				position: "right",
				stopOnFocus: true, 
				style: {
				  background: "linear-gradient(to right, #43be4d, cornflowerblue)",
				},
				onClick: function(){}
			}).showToast();
		})
	})
})

//Inicio de sesión
class usuario {
	constructor (usuario, contraseña){
		this.usuario = usuario;
		this.contraseña = contraseña;
	}
}

//DOM
let iniciarSesion = document.getElementById("formIniciarSesion")
let buscarInput = document.querySelector(".buscador")
let consultaFooter = document.getElementById("consultaFooter")


//escuchadores y uso de localStorage
let user = []
localStorage.setItem("user", JSON.stringify(user))
iniciarSesion.addEventListener("submit", (event) => {
	event.preventDefault()
	let email = document.querySelector(".usuarioInput").value
	let contraseña = document.querySelector(".contraseñaInput").value
	let user = {usuario: email, contraseña: contraseña}
	localStorage.setItem("user", JSON.stringify(user))
	Swal.fire({
		position: 'top-end',
		icon: 'success',
		title: '¡Bienvenido a GráficaB377!',
		showConfirmButton: false,
		timer: 3000
  	})
	iniciarSesion.reset()
})
let buscador = []
buscarInput.addEventListener("input", (event) => {
	event.preventDefault()
	let buscador = buscarInput.value
	localStorage.setItem("resultados", JSON.stringify (producto.filter (producto => producto.nombre.includes(buscador.toLowerCase()))))	
})
let correoConsulta = []
localStorage.setItem("correoConsulta", JSON.stringify(correoConsulta))
consultaFooter.addEventListener("submit",(event) => {
	event.preventDefault()
	let email = document.querySelector(".correoFooter").value
	let asunto = document.querySelector(".asuntoFooter").value
	let consulta = document.querySelector(".textoFooter").value
	let correoConsulta = {contacto: email, Asunto: asunto, consulta: consulta}
	localStorage.setItem("correoConsulta", JSON.stringify(correoConsulta))
	Swal.fire({
		title: '¡Consulta Enviada con Exito! <br> Te responderemos a la brevedad.',
		showClass: {
		  popup: 'animate__animated animate__fadeInDown'
		},
		hideClass: {
		  popup: 'animate__animated animate__fadeOutUp'
		}
	  })
	consultaFooter.reset()
})








