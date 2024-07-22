function temperatura() {
  //Script de obtener datos de la temperatura
  document.addEventListener("DOMContentLoaded", function () {
    var slider = document.getElementById("tempTemperatura");
    var intervalId = null;

    function actualizarTiempoTemperatura() {
      var time = slider.value * 2000; // Multiplica por 2000 para obtener milisegundos
      console.log(time);
      clearInterval(intervalId);
      intervalId = setInterval(datosTemperatura, time); // Establecemos un nuevo intervalo
    }

    function cargarDatosTemperatura() {
      datosTemperatura();
    }

    cargarDatosTemperatura();

    slider.addEventListener("input", function () {
      actualizarTiempoTemperatura();
    });

    var lastData = "";

    function datosTemperatura() {
      fetch("enviardatosTemp.php?idSensT=1")
        .then((res) => res.json())
        .then((response) => {
          if (response.length > 0 && !response[0].error) {
            //Formateo de la fecha y hora de unix
            const newData = response;
            //Comparacion de datos nuevos y viejos, para realizar el intercambios de datos
            if (newData !== lastData) {
              const date = new Date(response[0].tmpUnixRegTemp * 1000);
              const options = {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              };
              const fechaFormateada = date.toLocaleDateString("es-ES", options);
              document.getElementById("temperatura").innerText =
                response[0].valTemp;
              document.getElementById("hora-temp").innerText = fechaFormateada;
              document.getElementById("sensor-temp").innerText =
                response[0].marcaSensor;
              //Se guarda los datos nuevos, para realizar el proceso de comparacion de datos
              lastData = newData;
              console.log("Datos actaulizados");
            } else {
              console.error("No se encontraron nuevos datos");
            }
          }
        })
        .catch((error) => console.error("Error:", error));
    }
    actualizarTiempoTemperatura(); // Llamamos la funcion para la actualizacion de los datos
  });
}

temperatura();

