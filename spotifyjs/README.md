
# Spotify.js

  Spotify.js is Universal wrapper for Spotify web API

1. 🧰 No dependencies

1. ✨ Universal (React.js hook , Vue.js Plugin, Anywhere )

1. 🍐Lightweight

1. 🔐 Support multiple Auth flows to spotify API (Authorization Code, Implicit Grant,Client Credentials)

 
## install

```sh
yarn add @soubai/spotifyjs
```

## Usage

### React

```js
import { useSpotify } from  "@soubai/spotifyjs";

function  MyComponent(){
const { client } =  useSpotify({
clientId: process.env.CLIENT_ID,
clientSecret: process.env.CLIENT_SECRET
})
const  res  =  await client.search('Fur Elise', 'track')
return  <div  />;
}
```
- OR

```js
import useSpotify from  "@soubai/spotifyjs";
const [data, setData] =  useState([]);
const [q, setQ] =  useState("");
const { client , isAuthorized } =  useSpotify(
{
clientId: process.env.CLIENT_ID,
clientSecret: process.env.CLIENT_SECRET
})

const  search  =  async () => {
// query take search string and limit results (default 20)
if(isAuthorized){
const  data  =  await client.search(q);
setData(data);
}
};

```

  

### Vue
```js
import { vueSpotify } from  "@soubai/spotifyjs";
const  opts  = {
clientId: process.env.CLIENT_ID,
clientSecret: process.env.CLIENT_SECRET
}
Vue.use(vueSpotify, opts)
if(this.$spotifyClient.isAuthorized){
const  res  =  await  this.$spotifyClient.search('21Savage','Artist',20)
}
```

### Other
```js
import { Client } from  "@soubai/spotifyjs";
const  opts  = {
clientId: process.env.CLIENT_ID,
clientSecret: process.env.CLIENT_SECRET
}
const  client  =  Client(opts)
if(client.isAuthorized){
const  res  =  await client.getArtist('some id')
}
```
## Example

Install dependencies

```sh
$ yarn
$ cd spotifyjs && yarn
```
rename .env file

```sh
$ cp .env.local.dist .env.local
```
And fill `CLIENT_ID` and `CLIENT_SECRET` with your Spotify App id and secret

```sh
$ cp .env.local.dist .env.local
```
```sh
$ yarn watch
```

## Reference
The client is typical javascript class that take object with a combinasion of property depending on how you want to authenticate:


### Authentication

1. Authorization Code :
```js
const  opts  = {
clientId: process.env.CLIENT_ID, // REQUIRED | Spotify app client id
clientSecret: process.env.CLIENT_SECRET  // REQUIRED | Spotify app client secret
redirectURI : 'http://localhost:3000/callback'  // Spotify app client redirect URI
}

const  client  =  Client(opts)
const  scopes  = ['user-read-private', 'user-read-email']
const  state  =  'some-state-of-my-app'
const  authorizationUrl  = client.createAuthorizeURL(scopes,state)
console.log(authorizationUrl);

// https://accounts.spotify.com/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-app
```

1. Implicit Grant :

  

```js

const  opts  = {

clientId: process.env.CLIENT_ID, // Spotify app client id

clientSecret: process.env.CLIENT_SECRET  // Spotify app client secret

redirectURI : 'localhost:3000/callback'  // Spotify app client redirect URI

}

  

const  client  =  Client(opts)

const  scopes  = ['user-read-private', 'user-read-email']

const  state  =  'some-state-of-my-app'

const  authorizationUrl  = client.createAuthorizeURL(scopes,state,true) // set the 3th param to true (isImplicit)


```

  

1. Client Credential flow:

  

```js

const  opts  = {

clientId: process.env.CLIENT_ID, // Spotify app client id

clientSecret: process.env.CLIENT_SECRET  // Spotify app client secret

}

  

const  client  =  Client(opts)

```

  

Plus the client instance expose a promise-based method `authenticate(credentials: Object)` that take object as param with different types of credentials :

  

1. `const accessToken = await client.authenticate({ code })` : Issued from Authorization Code

1. `const accessToken = await client.authenticate({ accessToken })` If you have access token stored some where

1. `const accessToken = await client.authenticate({ refreshToken })` if you want refresh your access token after expiration

  

If success the `client` is automatically authenticated.

  
  

### Methods signature

  

```js
// search
async search(query, type: "track" | "artist" ='track', limit: Number =20, offset: Number =0)

// Albums
async getAlbums(id: Strings: Array<string>)
async getAlbum(id: String)
async getAlbumTracks(id: String, limit: Number =20)

// Show
async getShows(id: Strings: Array<string>
async getShow(id: String)
async getShowEpisodes(id: String, limit: Number =20)

// Artist
async getArtist(id: String)
async getArtists(id: Strings: Array<string>)
async getArtistAlbums(id: String, limit: Number =20, offset: Number =0)
async getArtistTopTracks(id: String)
async getArtistRelatedArtists(id: String)

// Users
async getCurrentUser()
async getCurrentUserPersonalization(type, limit: Number =20, offset: Number =0)
async getUser(id: String)

// Browse
async getCategory(id: String)
async getCategoryPlaylist(id: String, limit: Number =20, offset: Number =0)
async getCategories(limit: Number =20, offset: Number =0)
async getFeaturedPlaylists(limit: Number =20, offset: Number =0)
async getNewReleases(limit: Number =20, offset: Number =0)
async getRecommendations(limit: Number =20, offset: Number =0)

// Episodes
async getCategory(id: String)
async getEpisode(id: String)
async getEpisode(id: Strings: Array<string>)

// Follow
async isFollowUserOrArtist(id: Strings: Array<string>, type)
async isFollowPlaylist(playlist_id, ids)

// Tracks
async getTrack(id: String)
async getTracks(id: Strings: Array<string>)

// Player
async getDevices()
async getCurrentPlayback()
async getRecentlyPlayed(limit: Number =20)

```
## Next :
- [ ] Complate list of methods.
- [ ] Add Vue.js Example
- [ ] Improve code documentation
- [ ] Add unit test