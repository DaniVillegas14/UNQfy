

const fs = require('fs'); // necesitado para guardar/cargar unqfy
const unqmod = require('./unqfy'); // importamos el modulo unqfy

// Retorna una instancia de UNQfy. Si existe filename, recupera la instancia desde el archivo.
function getUNQfy(filename = 'data.json') {
  let unqfy = new unqmod.UNQfy();
  if (fs.existsSync(filename)) {
    unqfy = unqmod.UNQfy.load(filename);
  }
  return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
  unqfy.save(filename);
}

/*
 En esta funcion deberán interpretar los argumentos pasado por linea de comandos
 e implementar los diferentes comandos.

  Se deberán implementar los comandos:
    - Alta y baja de Artista
    - Alta y Baja de Albums
    - Alta y Baja de tracks

    - Listar todos los Artistas
    - Listar todos los albumes de un artista
    - Listar todos los tracks de un album

    - Busqueda de canciones intepretadas por un determinado artista
    - Busqueda de canciones por genero

    - Dado un string, imprimmir todas las entidades (artistas, albums, tracks, playlists) que coincidan parcialmente
    con el string pasado.

    - Dada un nombre de playlist, una lista de generos y una duración máxima, crear una playlist que contenga
    tracks que tengan canciones con esos generos y que tenga como duración máxima la pasada por parámetro.

  La implementacion de los comandos deberá ser de la forma:
   1. Obtener argumentos de linea de comando
   2. Obtener instancia de UNQfy (getUNQFy)
   3. Ejecutar el comando correspondiente en Unqfy
   4. Guardar el estado de UNQfy (saveUNQfy)

*/

function main() {
  const params = process.argv.slice(2);
  const unqfy = getUNQfy('database');

  switch (params[0])
  {
  case 'addArtist':{
    const artist = unqfy.addArtist({name: params[1], country: params[2]});
    console.log(artist);
    break;
  } 

  case 'addAlbum':{
    const album = unqfy.addAlbum(params[1], {name: params[2], year: params[3]});
    console.log(album);
    break;
  } 

  case 'addTrack':{
    const track = unqfy.addTrack(params[1], {name: params[2], duration: params[3], genres: params.slice(4)});
    console.log(track);
    break;
  }
  
  case 'getArtist': {
    const artist = unqfy.getArtistById(params[1]);
    console.log(artist);
    break;
  }

  case 'getAlbum': {
    const album = unqfy.getAlbum.getAlbumById(params[1]);
    console.log(album);
    break;
  }

  case 'getTrack': {
    const track = unqfy.getTrackById(params[1]);
    console.log(track);
    break;
  }

  case 'removeArtist':{
    unqfy.removeArtist(params[1]);
    console.log(unqfy.artists);
    break;
  } 

  case 'removeAlbum':{
    unqfy.removeAlbum(params[1]);
    break;
  } 

  case 'removeTrack':{
    unqfy.removeTrack(params[1]);
    break;
  }

  case 'allArtists': {
    const artists = unqfy.artists;
    console.log(artists);
    break;
  }

  case 'allAlbumsByArtist': {
    const albumsByArtist = unqfy.getAlbumsByArtist(params[1]);
    console.log(albumsByArtist);
    break;
  }

  case 'allTracksByAlbum': {
    const tracksByAlbum = unqfy.getTracksByAlbum(params[1]);
    console.log(tracksByAlbum);
    break;
  }

  case 'tracksMatchingArtist': {
    const artist = unqfy.getArtistById(params[1]);
    const tracks = unqfy.getTracksMatchingArtist(artist);
    console.log(tracks);
    break;
  }

  case 'tracksMatchingGenres': {
    //const tracks = params[1];
    const tracks = unqfy.getTracksMatchingGenres(params.slice(1));
    console.log(tracks);
    break;
  }

  case 'searchByName': {
    const contains = unqfy.searchByName(params[1]);
    console.log(contains);
    break;
  }

  case 'createPlaylist': {
    const playlist = unqfy.createPlaylist(params[1],params[2],params[3]);
    console.log(playlist);
    break;
  }

  case 'addUser': {
    const user = unqfy.addUser(params[1]);
    console.log(user);
    break;
  }

  case 'getUser': {
    const user = unqfy.getUser(params[1]);
    console.log(user);
    break;
  }

  case 'hear': {
    const user = unqfy.getUser(params[1]);
    const track = unqfy.getTrackById(params[2]);
    user.listenTrack(track);
    break;
  }

  case 'tracksHeard': {
    const user = unqfy.getUser(params[1]);
    const tracks = user.getTracksHeard();
    console.log(tracks);
    break;
  }

  case 'timesHeard': {
    const user = unqfy.getUser(params[1]);
    const times = user.manyTimesListenTrack(params[2]);
    console.log(times);
    break;
  }
  
  default:{
    console.log('No existe el comando dado');
  }
  }

  saveUNQfy(unqfy,'database');
}

main();
