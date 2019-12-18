# Descripción 

El proyecto cuenta con varios servicios y cada servicio utiliza es una
aplicacion con nodejs y express. 
Docker levanta cada servicio de forma independiente en un container
y estos se pueden comunicar.

# Tecnologias

Nodejs
Express
Docker

# UNQfy

Diagrama de clases:
Exportado como PDF.

Los comandos se utilizan de la siguiente forma en consola:

node main.js comandoAUtilizar parametros

Los comandos que se pueden utilizar por consola son los siguientes:

--------------------------------------------------------------------------

(Muestra los comandos por consola)

_help

node main.js _help

--------------------------------------------------------------------------

addArtist unNombre unPais

node main.js addArtist "Dani" "Argentina"

--------------------------------------------------------------------------

addAlbum idArtista unNombre unAnio

node main.js addAlbum 0 "Nuevo Album" 2019

--------------------------------------------------------------------------

addTrack idAlbum unNombre unaDuracion generos

Ambas formas son validas (varian en la forma de escribir la duracion):

node main.js addTrack 1 "tema 1" 300 "rock" "pop"

node main.js addTrack 2 "tema 2" 400 "rock"

--------------------------------------------------------------------------

createPlaylist unNombre listaDeGenerosAIncluir maximaDuracion

node main.js createPlaylist "metal 2017" ["rock","pop","new metal"] 1400

--------------------------------------------------------------------------

tracksMatchingGenres unaListaDeGeneros

node main.js tracksMatchingGenres ["rock","punk"]

--------------------------------------------------------------------------

tracksMatchingArtist unNombreDeArtista

node main.js tracksMatchingArtist "Dani"

--------------------------------------------------------------------------

getAlbum idAlbum

node main.js getAlbumByName 1

--------------------------------------------------------------------------

getTrack idTrack

node main.js getTrack 2

--------------------------------------------------------------------------

getArtist idArtist

node main.js getArtist 0

--------------------------------------------------------------------------

getPlaylist idPlaylist

node main.js getPlaylist 4

--------------------------------------------------------------------------

getUser idUser

node main.js getUser 5

--------------------------------------------------------------------------

allArtists

node main.js allArtists

--------------------------------------------------------------------------

allTracksByAlbum idAlbum

node main.js 1

--------------------------------------------------------------------------

allAlbumsByArtist idArtist

node main.js allAlbumsByArtist 0

--------------------------------------------------------------------------

searchByName cualquierNombre

node main.js searchByName "dani"

--------------------------------------------------------------------------

addUser nombreUsuario

node main.js addUser "Uriel"

--------------------------------------------------------------------------

hear idUser idTrack

node main.js hear 7 6

--------------------------------------------------------------------------

timesHeard idUser idTrack

node main.js timesHeard 7 6

--------------------------------------------------------------------------

tracksHeard idUser

node main.js tracksHeard 7

--------------------------------------------------------------------------

tracksMostListened idArtist

node main.js tracksMostListened 0

--------------------------------------------------------------------------

removeArtist idArtist

node main.js removeArtist 0

--------------------------------------------------------------------------

removeAlbum idAlbum

node main.js removeAlbum 1

--------------------------------------------------------------------------

removeTrack idTrack

node main.js removeTrack 2

--------------------------------------------------------------------------




