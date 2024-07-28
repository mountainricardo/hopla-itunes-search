+ # [Task 1. Coding Challenge: hopla-itunes-search](#hopla-itunes-search)
+ # [Task 2. Analysis Challenge](#analysis-challenge)

## hopla-itunes-search

- [**Description**](#description)
- [**Set up**](#set-up)
- [**Start**](#start-application)
- [**Testing**](#testing)


### Description

The nopla-itunes-search application has been developed after the requirements as two independent services:

- [**Express 4.17.x**](https://expressjs.com/) server which plays as middleware intermediate and make http axios requests to [ITunes API](https://tinyurl.com/itunes-search-api) for Music Albums from an artist name, could be one or more words, and serves the search results, after removing duplicated results based on album's name, througt a simple REST API.  
  It serves on [localhost:8000/itunes](http://localhost:8000/itunes)
- [**Vue.js 2.x**](https://v2.vuejs.org/) front application which querys the artist name to the Express API and shows up to 200 found artist's albums result as a paginated and filterable responsive grid. UI components has been implemented with [Vuetify UI Library v2.6.3](https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides).  
  It serves on [localhost:8080](http://localhost:8080/)
- Node v14.16.1 and npm 7.11.2 were used.
- Some unit tests were implemented with Jest and Vue front application to test Vuetify UI components integration, but they are far from exhaustive and lack testing for Vuex and routing.
- No testing was implemented for Express API server

#### Documentation

+ [Apple Services Performance Partners](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/)
+ [Express 4.17.2](https://expressjs.com/)
  * [cors](https://www.npmjs.com/package/cors)
  * [axios](https://www.npmjs.com/package/axios)
+ [Vue.js 2.x](https://v2.vuejs.org/v2/guide/)
  * [Vuetify v2.6.3](https://vuetifyjs.com/en/introduction/why-vuetify/)
+ [Jest](https://jestjs.io/es-ES/docs/testing-frameworks) 

#### Reference samples

+ [NodeJS proxy api for iTunes](https://medium.com/nerd-for-tech/nodejs-proxy-api-for-itunes-c15c2c09ed1c)


### Set up

```
$> git clone https://github.com/mountainricardo/hopla-itunes-search.git
$> cd hopla-itunes-search/server
$> npm install
$> cd ../view
$> npm install
```

### Start application

```
$> cd ../server
$> npm run start
$> cd ../view
$> npm run serve
```

**hopla-ituner-search** should be running on http://localhost:8080/

### Testing

```
$> cd ../view
$> npm run test:unit
```


