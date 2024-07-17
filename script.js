function temperatura (){
  //Script de obtener datos de la temperatura
  document.addEventListener('DOMContentLoaded', function () {
    var slider = document.getElementById('tempTemperatura');
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

    slider.addEventListener('input', function () {
        actualizarTiempoTemperatura();
    });

    var lastData = "";

    function datosTemperatura() {
        fetch('enviardatosTemp.php?idSensT=1')
            .then(res => res.json())
            .then(response => {
                if (response.length > 0 && !response[0].error) {
                    //Formateo de la fecha y hora de unix
                    const newData = response;
                    //Comparacion de datos nuevos y viejos, para realizar el intercambios de datos
                    if (newData !== lastData) {
                        const date = new Date(response[0].tmpUnixRegTemp * 1000);
                        const options = {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        };
                        const fechaFormateada = date.toLocaleDateString('es-ES', options);
                        document.getElementById('temperatura').innerText = response[0].valTemp;
                        document.getElementById('hora-temp').innerText = fechaFormateada;
                        document.getElementById('sensor-temp').innerText = response[0].marcaSensor;
                        //Se guarda los datos nuevos, para realizar el proceso de comparacion de datos
                        lastData = newData;
                        console.log("Datos actaulizados");
                    } else {
                        console.error("No se encontraron nuevos datos");
                    }
                }
            })
            .catch(error => console.error('Error:', error));
    }
    actualizarTiempoTemperatura(); // Llamamos la funcion para la actualizacion de los datos
});
}

temperatura();

function oxigeno (){
 //Obtener datos del Oxigeno
 document.addEventListener('DOMContentLoaded', function () {
    var sliderOxigeno = document.getElementById('tempOxigeno');
    var mostrarPantalla = document.getElementById('timeOxigeno');
    var intervalOxigeno = null;

    function actualizarTiempoOxigeno() {
        mostrarPantalla, innerText = sliderOxigeno.value;
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
        fetch('enviardatosOxig.php?idSensT=1')
            .then(res => res.json())
            .then(response => {
                const nuevodatosoxigeno = response;
                if (nuevodatosoxigeno !== viejosdatosoxigeno) {
                    const date = new Date(response[0].tmpUnixRegTemp * 1000);
                    const options = {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    };
                    const fechaFormateada = date.toLocaleDateString('es-ES', options);
                    document.getElementById('oxigeno').innerText = response[0].valOxig;
                    document.getElementById('hora-oxig').innerText = fechaFormateada;
                    document.getElementById('sensor-oxig').innerText = response[0].marcaSensor;
                    viejosdatosoxigeno = nuevodatosoxigeno;
                    console.log("Datos actualizados");
                } else {
                    console.log("No se encontraron datos nuevos");
                }
            })
            .catch(error => console.error("Error: ", error));
    }
    actualizarTiempoOxigeno();
});
}

oxigeno();

function ph (){
    document.addEventListener('DOMContentLoaded', function () {
        var sliderPh = document.getElementById('tempPH');
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

        sliderPh.addEventListener('input', function () {
            actualizarTiempoPH();
        });

        var viejosdatosph = "";

        function datosPH() {
            fetch('enviardatosPh.php?idSensT=1')
                .then(res => res.json())
                .then(response => {
                    const nuevosdatosph = response;
                    if (nuevosdatosph != viejosdatosph) {
                        const date = new Date(response[0].tmpUnixRegTemp * 1000);
                        const options = {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        };
                        const fechaFormateada = date.toLocaleDateString('es-ES', options);
                        document.getElementById('ph').innerText = response[0].valPh;
                        document.getElementById('hora-ph').innerText = fechaFormateada;
                        document.getElementById('sensor-ph').innerText = response[0].marcaSensor;
                        viejosdatosph = nuevosdatosph;
                        console.log("Datos actualizados")
                    } else {
                        console.log('asdas');
                    }
                })
                .catch(error => console.error("Error: ", error));
        }
        actualizarTiempoPH();

    });
}

ph();