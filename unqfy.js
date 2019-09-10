
const picklify = require('picklify'); // para cargar/guarfar unqfy
const fs = require('fs'); // para cargar/guarfar unqfy
const Track = require('./track');
const Artist = require('./artist');
const Album = require('./album');
const Playlist = require('./playlist');
const User = require('./user');
const NonExistentArtistException = require('./exceptions/nonexistentartistexception');
const NonExistentAlbumException = require('./exceptions/nonexistentalbumexception');
const TheArtistWithThatNameAlreadyExistsException = require('./exceptions/theartistwiththatnamealreadyexistsexception');
class UNQfy {

  constructor() {
    
    this.artists = [];
    this.playlists = [];
    this.idGenerator = 0;
    this.tracks = [];
    this.users = [];
  }

  // artistData: objeto JS con los datos necesarios para crear un artista
  //   artistData.name (string)
  //   artistData.country (string)
  // retorna: el nuevo artista creado
  addArtist(artistData) {
  /* Crea un artista y lo agrega a unqfy.
  El objeto artista creado debe soportar (al menos):
    - una propiedad name (string)
    - una propiedad country (string)
  */
    const newArtist = new Artist(this.idGenerator, artistData.name, artistData.country);
    this.idGenerator++;
    this.checkIfThereIsAnArtistWithThatName(artistData.name);
    this.artists.push(newArtist);
    return newArtist;
  }


  // albumData: objeto JS con los datos necesarios para crear un album
  //   albumData.name (string)
  //   albumData.year (number)
  // retorna: el nuevo album creado
  addAlbum(artistId, albumData) {
  /* Crea un album y lo agrega al artista con id artistId.
    El objeto album creado debe tener (al menos):
     - una propiedad name (string)
     - una propiedad year (number)
  */
    const artist = this.getArtistById(artistId);
    const newAlbum = new Album(this.idGenerator, albumData.name, albumData.year);
    this.idGenerator++;
    artist.addAlbum(newAlbum);
    return newAlbum;
  }


  // trackData: objeto JS con los datos necesarios para crear un track
  //   trackData.name (string)
  //   trackData.duration (number)
  //   trackData.genres (lista de strings)
  // retorna: el nuevo track creado
  addTrack(albumId, trackData) {
  /* Crea un track y lo agrega al album con id albumId.
  El objeto track creado debe tener (al menos):
      - una propiedad name (string),
      - una propiedad duration (number),
      - una propiedad genres (lista de strings)
  */
    const album = this.getAlbumById(albumId);
    const newTrack = new Track(this.idGenerator, trackData.name, trackData.duration, trackData.genres);
    this.idGenerator++;
    album.addTrack(newTrack);
    return newTrack;
  }

  addUser(name) {
    const user = new User(this.idGenerator, name);
    this.idGenerator++;
    this.users.push(user);
    return user;
  }

  getUser(userId) {
    return this.users.find( user => user.id === parseInt(userId));
  }

  searchElementById(list, id) {
    return list.find(elem => 
      elem.id === parseInt(id)
    );
  }

  checkIfThereIsAnArtistWithThatName(artistName) {
    const artist = this.artists.find(artist => artist.name === artistName);
    if(artist !== undefined) {
      throw new TheArtistWithThatNameAlreadyExistsException(artistName);
    }
  }

  getArtistById(id) { 
    const element = this.searchElementById(this.artists, id);
    if(element === undefined) {
      throw new NonExistentArtistException(id);
    } 
    return element;
  }

  getAlbumById(id) { 
    const element = this.searchElementById(this.getAllAlbums(), id);
    if(element === undefined) {
      throw new NonExistentAlbumException(id);
    }
    return element;
  }

  getAllAlbums() {
    let albums = [];
    this.artists.forEach( artist => 
      albums = albums.concat(artist.albums)
    );
    return albums;
  }

  getTrackById(id) {
    const albums = this.getAllAlbums();
    return albums.find(album => 
      album.ifContainsTrack(id)
    ).getTrack(id);
  }

  removeTrack(trackId) {
    const album = this.getAllAlbums().find(album =>album.ifContainsTrack(trackId));
    album.removeTrack(trackId);
  }

  removeAlbum(albumId) {
    const artist = this.artists.find(artist => artist.ifContainsAlbum(albumId));
    artist.removeAlbum(albumId);
  }

  removeArtist(artistId) {
    this.artists = this.artists.filter( artist =>
      artist.id !== parseInt(artistId)
    );
  }

  getAlbumsByArtist(artistId) { return this.getArtistById(artistId).albums; }

  getTracksByAlbum(albumId) { return this.getAlbumById(albumId).tracks; }

  getPlaylistById(id) { return this.searchElementById(this.playlists, id); }

  getListByName(list, name) { return list.filter( elem => !elem.name.toLowerCase().includes(name)); }

  getAllTracks() {
    let tracks = [];
    this.artists.forEach(artist => {
      tracks = tracks.concat(this.getTracksMatchingArtist(artist));
    });
    return tracks;
  }

  searchByName(name) {
    return {
      artists: this.getListByName(this.artists, name),
      albums: this.getListByName(this.getAllAlbums(), name),
      tracks: this.getListByName(this.getAllTracks(), name),
      playlists: this.getListByName(this.playlists, name)
    };
  }

  // genres: array de generos(strings)
  // retorna: los tracks que contenga alguno de los generos en el parametro genres
  getTracksMatchingGenres(genres) {
    let tracks = [];
    this.getAllAlbums().forEach( album => {
      const tracksByGenere = album.getTracksByGenres(genres);
      tracks = tracks.concat(tracksByGenere);
    });
    return tracks;
  }

  // artistName: nombre de artista(string)
  // retorna: los tracks interpredatos por el artista con nombre artistName
  getTracksMatchingArtist(_artist) {
    const artist = this.artists.find( artist => 
      artist.isName(_artist.name)
    );
    return artist.getAllTracks();
  }

  // name: nombre de la playlist
  // genresToInclude: array de generos
  // maxDuration: duración en segundos
  // retorna: la nueva playlist creada
  createPlaylist(name, genresToInclude, maxDuration) {
  /*** Crea una playlist y la agrega a unqfy. ***
    El objeto playlist creado debe soportar (al menos):
      * una propiedad name (string)
      * un metodo duration() que retorne la duración de la playlist.
      * un metodo hasTrack(aTrack) que retorna true si aTrack se encuentra en la playlist.
  */
    const newPlaylist = new Playlist(this.idGenerator, name, genresToInclude, maxDuration);
    this.idGenerator++;
    const tracksMatchByGenres = this.getTracksMatchingGenres(genresToInclude);
    tracksMatchByGenres.forEach(track => newPlaylist.addTrack(track));
    this.playlists.push(newPlaylist);
    return newPlaylist;
  }

  save(filename) {
    const listenersBkp = this.listeners;
    this.listeners = [];

    const serializedData = picklify.picklify(this);

    this.listeners = listenersBkp;
    fs.writeFileSync(filename, JSON.stringify(serializedData, null, 2));
  }

  static load(filename) {
    const serializedData = fs.readFileSync(filename, {encoding: 'utf-8'});
    //COMPLETAR POR EL ALUMNO: Agregar a la lista todas las clases que necesitan ser instanciadas
    const classes = [UNQfy, Artist, Album, Track, Playlist, User];
    return picklify.unpicklify(JSON.parse(serializedData), classes);
  }
}

// COMPLETAR POR EL ALUMNO: exportar todas las clases que necesiten ser utilizadas desde un modulo cliente
module.exports = {
  UNQfy,
};

