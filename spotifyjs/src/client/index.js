
const baseURLAuth = `https://accounts.spotify.com/api`;
const baseURL = `https://api.spotify.com/v1`;



export default class Client {

    constructor(settings) {

        this.options = settings
        this.authorized = false
        this.authorization = null
        this.authorize()
            .then(token => {
                if (token) {
                    this.authorization = token
                    this.authorized = true
                } else {
                    this.authorized = false


                }

            })
            .catch(e => {
                console.error(e)
            })

    }

    get isAuthorized() {
        return this.authorized
    }

    createAuthorizeURL(scopes = ['user-read-private', 'user-read-email'], state = '', isImplicit = false) {

        const { redirectURI, clientId } = this.options

        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${isImplicit ? 'token' : 'code'}&redirect_uri=${encodeURIComponent(redirectURI)}&scope=${encodeURIComponent(scopes.join('%20'))}&state=${state}`

    }

    async authorize(params = {}) {

        const { code, accessToken, refreshToken } = params

        if (this.options && accessToken) {

            // TODO:verify the token is not expired
            return accessToken


        } else if (this.options && code) {

            const payload = {
                code,
                'grant_type': 'authorization_code',
                'redirect_uri': this.options['redirectUri'],
                'client_id': this.options['clientId'],
                'client_secret': this.options['clientSecret']
            }

            const result = await fetch(`${baseURLAuth}/token`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(payload).toString()
            })
            const data = await result.json();

            return data['access_token']

        } else if (this.options && this.options['clientId'] && this.options['clientSecret']) {

            const token = Buffer.from(`${this.options['clientId']}:${this.options['clientSecret']}`).toString('base64');
            const payload = {
                'grant_type': 'client_credentials'
            }

            if (refreshToken) {
                payload['grant_type'] = 'refresh_token'
                payload['refresh_token'] = refreshToken
            }

            const result = await fetch(`${baseURLAuth}/token`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${token}`
                },
                body: new URLSearchParams(payload).toString()
            })
            const data = await result.json();

            return data['access_token']

        }
        else {
            return null
        }
    }



    async fetcher(url, method = 'GET', payload = {}) {

        if (this.authorization == null) {
            try {
                this.authorization = await this.authorize()
            } catch (error) {
                console.error(error)
            }
        }

        const opts = {
            headers: { 'Authorization': 'Bearer ' + this.authorization }
        }

        if (method !== 'GET') {
            opts['body'] = JSON.stringify({ payload })
            opts['method'] = method
        }

        return fetch(`${url}`, opts)

    }

    // search

    async search(query, type = 'track', limit = 20, offset = 0) {

        const url = `${baseURL}/search?q=${query}&type=${type}&limit=${limit}&offset=${offset}`
        const req = await this.fetcher(url);
        return await req.json()

    }

    // Albums

    async getAlbums(ids) {

        const url = `${baseURL}/albums/?ids=${ids.join(',')}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getAlbum(id) {

        const url = `${baseURL}/albums/${id}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getAlbumTracks(id, limit = 20) {

        const url = `${baseURL}/albums/${id}/tracks?limit=${limit}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    // Show

    async getShows(ids) {

        const url = `${baseURL}/shows/?ids=${ids.join(',')}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getShow(id) {

        const url = `${baseURL}/shows/${id}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getShowEpisodes(id, limit = 20) {

        const url = `${baseURL}/shows/${id}/episodes?limit=${limit}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    // Artist 


    async getArtist(id) {

        const url = `${baseURL}/artists/${id}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getArtists(ids) {

        const url = `${baseURL}/artists/?ids=${ids.join(',')}`;
        const req = await this.fetcher(url);
        return await req.json()
    }


    async getArtistAlbums(id, limit = 20, offset = 0) {

        const url = `${baseURL}/artists/${id}/albums?limit=${limit}&offset=${offset}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getArtistTopTracks(id) {

        const url = `${baseURL}/artists/${id}/top-tracks`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getArtistRelatedArtists(id) {

        const url = `${baseURL}/artists/${id}/related-artists`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    // Users

    async getCurrentUser() {

        const url = `${baseURL}/me`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getCurrentUserPersonalization(type, limit = 20, offset = 0) {

        const url = `${baseURL}/me/top/${type}?limit=${limit}&offset=${offset}&time_range=${time_range}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getUser(id) {

        const url = `${baseURL}/users/${id}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    // Browse 
    async getCategory(id) {

        const url = `${baseURL}/browse/categories/${id}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getCategoryPlaylist(id, limit = 20, offset = 0) {

        const url = `${baseURL}/browse/categories/${id}/playlists&limit=${limit}&offset=${offset}`;
        const req = await this.fetcher(url);
        return await req.json()
    }
    async getCategories(limit = 20, offset = 0) {

        const url = `${baseURL}/browse/categories&limit=${limit}&offset=${offset}`;
        const req = await this.fetcher(url);
        return await req.json()
    }
    async getFeaturedPlaylists(limit = 20, offset = 0) {

        const url = `${baseURL}/browse/featured-playlists&limit=${limit}&offset=${offset}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getNewReleases(limit = 20, offset = 0) {

        const url = `${baseURL}/browse/new-releases&limit=${limit}&offset=${offset}`;
        const req = await this.fetcher(url);
        return await req.json()
    }
    async getRecommendations(limit = 20, offset = 0) {

        const url = `${baseURL}/browse/recommendations&limit=${limit}&offset=${offset}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    // Episodes
    async getCategory(id) {

        const url = `${baseURL}/browse/categories/${id}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getEpisode(id) {

        const url = `${baseURL}/browse/episodes/${id}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getEpisode(ids) {

        const url = `${baseURL}/browse/episodes/?ids=${ids.join(',')}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    // Follow 

    async isFollowUserOrArtist(ids, type) {

        const url = `${baseURL}/me/following/contains?ids=${ids.join(',')}&type=${type}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async isFollowPlaylist(playlist_id, ids) {

        const url = `${baseURL}/playlists/${playlist_id}/followers/contains&ids=${ids.join(',')}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    // Tracks 

    async getTrack(id) {

        const url = `${baseURL}/tracks/${id}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getTracks(ids) {

        const url = `${baseURL}/tracks/?ids=${ids.join(',')}`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    // Player

    async getDevices() {

        const url = `${baseURL}/me/player/devices`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getCurrentPlayback() {

        const url = `${baseURL}/me/player`;
        const req = await this.fetcher(url);
        return await req.json()
    }

    async getRecentlyPlayed(limit = 20) {

        const url = `${baseURL}/me/player/recently-played&limit=${limit}`;
        const req = await this.fetcher(url);
        return await req.json()
    }




}
