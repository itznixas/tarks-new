const FromtimesTamp = timeTamp => new Date(timeTamp * 1000)
console.log(FromtimesTamp(1720490881).toLocaleString());

// Marca de tiempo Unix en segundos
const unixTimestamp = 1625247600;
// Convertir la marca de tiempo Unix a milisegundos
const date = new Date(unixTimestamp * 1000).toLocaleString();
console.log(date);
