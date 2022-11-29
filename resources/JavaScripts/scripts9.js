 // inicio: cargar los datos almacenados en el localstorage y crear la tabla
 document.addEventListener("DOMContentLoaded" , function (event){
    cargacategoria(); // carga las categorias
    let datosarray = JSON.parse(localStorage.getItem("datosJSON")) || []; // en caso de no existir datosJSON lo genera vacio
    datosarray.forEach( function (datosarray) {
        agregolinea(datosarray);  // carga los datos del localstorage en la tabla
        
    }); 
});


const form = document.getElementById("cargadatos");

form.addEventListener("submit", function(event) {
        if (form.importe.value>=0.01 && form.descrip.value){
        event.preventDefault();  /* impide que se vuelva a cargar la pagina y mantiene los datos*/
        let datosform = new FormData(form);
        let datosobjeto = convertformdatatoobjeto(datosform);
        guardaenlocalstorage(datosobjeto);
        agregolinea(datosobjeto);
        form.reset();   // resetea el formulario y lo deja en blanco para proxima carga
        }
        else
        {
            if (form.importe.value<=0){
                alert("El importe debe ser >= a 0.01")}
            else
                {
                    alert("Descripcion no puede estar vacio")
                }
            
        }
    }
   )  
   
   function convertformdatatoobjeto(datosform){
    let ingresoegresovalor = datosform.get("ingresoegreso");
    let descripvalor = datosform.get("descrip");
    let importevalor = datosform.get("importe");
    let categvalor = datosform.get("categ");
    let numid = generanuevoid();
    return {
        "ingresoegreso" : ingresoegresovalor ,
        "descrip" : descripvalor ,
        "importe" : importevalor , 
        "categ" : categvalor,
        "id" : numid
    }
   }

   function generanuevoid(){
        let ultimoid = JSON.parse(localStorage.getItem("NumId")) || 0;
        let nuevoid = JSON.stringify(ultimoid+1);
        localStorage.setItem("NumId",nuevoid);
    return nuevoid
   }

    function guardaenlocalstorage(datosobjeto){
        let datosarray = JSON.parse(localStorage.getItem("datosJSON")) || []; // en caso de no existir datosJSON lo genera vacio
        datosarray.push(datosobjeto); //agrega al array los datos
        datosarrayJSON = JSON.stringify(datosarray); // convierto array a JSON string
        localStorage.setItem("datosJSON",datosarrayJSON); // guargo en localstorage
    }

   function agregolinea(datosobjeto){
        let datostablaRef = document.getElementById("tabladatos");
        let nuevodatostablaRef = datostablaRef.insertRow(-1);  /* inserta una fila al final de la tabla */
        nuevodatostablaRef.setAttribute("data-numid",datosobjeto["id"]);
        let nuevodatoceldaRef = nuevodatostablaRef.insertCell(0);
        nuevodatoceldaRef.textContent =  datosobjeto["ingresoegreso"];
        nuevodatoceldaRef = nuevodatostablaRef.insertCell(1);
        nuevodatoceldaRef.textContent =  datosobjeto["descrip"];
        nuevodatoceldaRef = nuevodatostablaRef.insertCell(2);
        nuevodatoceldaRef.textContent =  datosobjeto["importe"];
        nuevodatoceldaRef = nuevodatostablaRef.insertCell(3);
        nuevodatoceldaRef.textContent =  datosobjeto["categ"];
       
       // agrego boton Eliminar en la tabla
        let borralinea = nuevodatostablaRef.insertCell(4);
        let deletebuttom = document.createElement("button");
        deletebuttom.textContent = "Eliminar";
        borralinea.appendChild(deletebuttom);
        deletebuttom.addEventListener("click", (event) => { 
            let linea = event.target.parentNode.parentNode;
            let idlinea = linea.getAttribute("data-numid");
            linea.remove(); // borra el elemento de HTML
            borraundato(idlinea);

        })
   }

   function borraundato(iddelete){
        //importo localstorage
        let datosarrayobj= JSON.parse(localStorage.getItem("datosJSON"));
        //busco el id a borrar
        let nuevodatosindexarray = datosarrayobj.findIndex(elemento => elemento.id === iddelete);
        // elimino el id seleccionado
        datosarrayobj.splice(nuevodatosindexarray,1);
        let datosarrayJSON = JSON.stringify(datosarrayobj); // convierto array a JSON string
        localStorage.setItem("datosJSON",datosarrayJSON); // guardo en localstorage
   }

   function cargacategoria(){
        let todascategoria = [
            "Sueldo",
            "Alquiler",
            "Supermercado",
            "Servicios",
            "Impuestos",
            "Diversion",
            "Delivery"
        ]
        for (let index = 0; index <todascategoria.length; index++) {
                insertarcategoria(todascategoria[index]);
        }
   
    }


   function insertarcategoria(categoria){
        const selectelemento = document.getElementById("categ");
        let htmltoinsert = '<option>'+categoria+'</option>';
        selectelemento.insertAdjacentHTML("beforeend",htmltoinsert);
   }