#hopla-itunes-search

- [**Description**](#description)
- [**Set up**](#set-up)
- [**Start**](#start-application)
- [**Testing**](#testing)


##Description

The nopla-ituner-search applications has been developed after the requirements as two independent services:

- [**Express 4.17.x**](https://expressjs.com/) server which plays as middleware intermediate and make http axios requests to [ITunes API](https://tinyurl.com/itunes-search-api) for Music Albums from an artist name, could be one or more words, and serves the search results, after removing duplicated results based on album's name, througt a simple REST API.  
  It serves on [localhost:8000/itunes](http://localhost:8000/itunes)
- [**Vue.js 2.x**](https://v2.vuejs.org/) front application which querys the artist name to the Express API and shows up to 200 found artist's albums result as a paginated and filterable responsive grid. UI components has been implemented with [Vuetify UI Library v2.6.3](https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides).  
  It serves on [localhost:8080](http://localhost:8080/)
- Node v14.16.1 and npm 7.11.2 were used.
- Unit tests were implemented with Jest, both Epress middleware and Vue front applications.

[oink test](./oink.js)
[oink test](./Oink_ftp_test.docx)


## Set up

```
$> git clone https://github.com/mountainricardo/hopla-itunes-search.git
$> cd hopla-itunes-search/server
$> npm install
$> cd ../view
$> npm install
```

## Start application

```
$> cd ../server
$> npm run start
$> cd ../view
$> npm run serve
```

**hopla-ituner-search** should be running on http://localhost:8080/

## Testing

```
$> cd ../view
$> npm run test:unit

```
