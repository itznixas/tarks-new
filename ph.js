function ph() {
    //Obtener datos del PH
    document.addEventListener("DOMContentLoaded", function () {
      var sliderPh = document.getElementById("tempPH");
      var intervaloPH = null;
  
      function actualizarTiempoPH() {
        var tiempoPH = sliderPh.value * 2000;
        console.log(tiempoPH);
        clearInterval(datosPH, tiempoPH);
        setInterval(intervaloPH);
      }
  
      function cargardatosph() {
        datosPH();
      }
  
      cargardatosph();
  
      sliderPh.addEventListener("input", function () {
        actualizarTiempoPH();
      });
  
      var viejosdatosph = "";
  
      function datosPH() {
        fetch("enviardatosPh.php?idSensT=1")
          .then((res) => res.json())
          .then((response) => {
            const nuevosdatosph = response;
            if (nuevosdatosph != viejosdatosph) {
              const date = new Date(response[0].tmpUnixRegPh * 1000);
              const options = {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              };
              const fechaFormateada = date.toLocaleDateString("es-ES", options);
              document.getElementById("ph").innerText = response[0].valPh;
              document.getElementById("hora-ph").innerText = fechaFormateada;
              document.getElementById("sensor-ph").innerText =
                response[0].marcaSensor;
              viejosdatosph = nuevosdatosph;
              console.log("Datos actualizados");
            } else {
              console.log("No se encontraron nuevos datos");
            }
          })
          .catch((error) => console.error("Error: ", error));
      }
      actualizarTiempoPH();
    });
  }
  
  ph();
  