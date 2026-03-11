const socket = io();
const contenedor = document.getElementById("contenedorProductos");
const btn = document.getElementById("btnEnviar");
socket.on("productos", (data) => {
	contenedor.innerHTML = "";
	data.forEach((prod) => {
		contenedor.innerHTML += `
	<div style="border: 1px solid #ccc; margin: 5px; padding: 5px;">
	<p><strong>${prod.title}</strong> - $${prod.price}</p> <button
	onclick="eliminarProducto('${prod.id}')">Eliminar</button> </div>`;
	});
});
btn.onclick = () => {
	const title = document.getElementById("title").value;
	const price = document.getElementById("price").value;
	socket.emit("nuevoProducto", { title, price });
};
function eliminarProducto(id) {
	socket.emit("eliminarProducto", id);
}
