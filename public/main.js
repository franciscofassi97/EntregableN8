const socket = io();

const autorSchema = new normalizr.schema.Entity("autor", {}, { idAttribute: "mail" });
const mensajesSchema = new normalizr.schema.Entity("mensajes", {
  autor: autorSchema,
});

const crearProducto = () => {
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;

  const producto = { title, price, thumbnail }

  socket.emit("agregarProducto", producto);
  return false;
};

socket.on("leerProductos", (productos) => {
  if (productos.length > 0) {
    document.getElementById("tbodyProductos").innerHTML = "";
    document.getElementById("divErrors").innerHTML = "";

    for (let i = 0; i < productos.length; i++) {
      let producto = productos[i];
      let productoHTML = `
           <tr>
           	<td>${producto.title}</td>
           	<td>${producto.price}</td>
           	<td><img style="width: 50px; height:50px" src=${thumbnail} alt=""></td>
           </tr>
           `;
      document.getElementById("tbodyProductos").innerHTML += productoHTML;
    }
  }
})



const onMessage = () => {

  const mensaje = document.getElementById("message").value;
  const autor = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    edad: document.getElementById("edad").value,
    alias: document.getElementById("alias").value,
    avatar: document.getElementById("avatar").value,
    mail: document.getElementById("mail").value
  }
  let date = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString();

  const data = { mensaje, autor, date: date + " " + time }


  // const mensaje = { mail, message, date: date + " " + time };

  console.log(mensaje);
  socket.emit("agregarMensaje", data);
  return false;
};

socket.on("leerMensajes", (mensajes) => {
  const mensajesdesnormalizado = normalizr
    .denormalize(mensajes.result,
      [mensajesSchema],
      mensajes.entities
    );


  if (mensajesdesnormalizado.length > 0) {
    document.getElementById("messagesDiv").innerHTML = "";
    document.getElementById("porcentajeDiv").innerHTML = "";

    for (let i = 0; i < mensajesdesnormalizado.length; i++) {
      let mensaje = mensajesdesnormalizado[i];
      let mensajeHTML = `
      <p><spam><strong>${mensaje.autor.mail}</strong> </spam>
      <spam class="date">${mensaje.date} </spam> :
      <spam class="message">${mensaje.mensaje}</spam></p>
      `;
      document.getElementById("messagesDiv").innerHTML += mensajeHTML;
    }
    let porcentajeHtml = `
      <p>${(((JSON.stringify(mensajes).length) * 100) / JSON.stringify(mensajesdesnormalizado).length).toFixed(2)} %</p>
     `
    document.getElementById("porcentajeDiv").innerHTML += porcentajeHtml;
  } else {
    document.getElementById("messagesDiv").innerHTML =
      "<h1>No hay Mensajes</h1>";
  }
});




