import axios from 'axios'


export const itunesMusicService = {
	albumsFromItunes
}

async function albumsFromItunes (artist) {
	const requestOptions = {
    method: 'get',
    url: `http://localhost:8000/itunes/music/albums?term=${artist}&entity=album`,
		// url: `${ api.apiUrl
		// 	+ api.user.users
		// 	+ user.id
		// 	+ api.file.files }`,
		// headers: authHeader()
	}
	try {
		const response = await axios.request(requestOptions)
		// console.log('documentsService.getAllFilesFromUser response', response)
		return response.data

	} catch (error) {
		console.error('albumsFromItunes', error)
	}
}
