function oxigeno() {
    //Obtener datos del Oxigeno
    document.addEventListener("DOMContentLoaded", function () {
      var sliderOxigeno = document.getElementById("tempOxigeno");
      var mostrarPantalla = document.getElementById("timeOxigeno");
      var intervalOxigeno = null;
  
      function actualizarTiempoOxigeno() {
        mostrarPantalla, (innerText = sliderOxigeno.value);
        var tiempoOxigeno = sliderOxigeno.value * 2000;
        console.log(tiempoOxigeno);
        clearInterval(intervalOxigeno);
        intervalOxigeno = setInterval(datosOxigenos, tiempoOxigeno);
      }
  
      function cargarDatosOxigeno() {
        datosOxigenos();
      }
  
      cargarDatosOxigeno();
  
      sliderOxigeno.addEventListener("input", function () {
        actualizarTiempoOxigeno();
      });
  
      var viejosdatosoxigeno = "";
  
      function datosOxigenos() {
        fetch("enviardatosOxig.php?idSensT=1")
          .then((res) => res.json())
          .then((response) => {
            const nuevodatosoxigeno = response;
            if (nuevodatosoxigeno !== viejosdatosoxigeno) {
              const date = new Date(response[0].tmpUnixRegOxig * 1000);
              const options = {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              };
              var a = 1;
              const fechaFormateada = date.toLocaleDateString("es-ES", options);
              document.getElementById("oxigeno").innerText = response[0].valOxig;
              document.getElementById("hora-oxig").innerText = fechaFormateada;
              document.getElementById("sensor-oxig").innerText =
                response[0].marcaSensor;
              viejosdatosoxigeno = nuevodatosoxigeno;
              console.log("Datos actualizados");
            } else {
              console.log("No se encontraron datos nuevos");
            }
          })
          .catch((error) => console.error("Error: ", error));
      }
      actualizarTiempoOxigeno();
    });
  }
  
  oxigeno();
  