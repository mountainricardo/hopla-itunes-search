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
- Unit tests were implemented with Jest, both Epress middleware and Vue front applications.

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
+ [How to test Express.js with Jest and Supertest](https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/)
+ [Write the first Vue.js Component Unit Test in Jest](https://alexjover.com/blog/write-the-first-vue-js-component-unit-test-in-jest/)

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

## Analysis Challenge

- [**Analyzed commented code**](#analyzed-commented-code)
- [**Sample code refactor for discussion**](#sample-refactor-for-discussion)
- [**Documentation**](#analysis-documentation)

---

+ What do I think is wrong with the code:
	+ On calling *User.findOneAndUpdate*:
		* within update parameter object, there is an unnecessary *authId* parameter, as it doesn’t make sense to overwrite the found User *authId* with the same *authId* we used to find it
		* within options parameter, there is *new* parameter which is not described in the Mongoose API to find either write operations options parameter, so it should be removed 
	+ Operations within *Shop.findById* callback function doesn’t actually update the model ([see code comments](#sample-refactor-for-discussion))
+ Potential problems that could lead to exceptions
	+ Query response doesn’t manage errors
+ How would I [refactor this code](#sample-refactor-for-discussion) to:
	+ Make it easier to read
		* Abstract callbacks to organize code
	+ Increase code reusability
		* Abstract callbacks to organize code
	+ Improve the stability of the system
		* Implement error management
	+ Improve the testability of the code
		* Abstraction of callback functions will allow better testing of each one
	+ How might you use the latest JavaScript features to refactor the code?
		* Use of async/await asynchronous behaviour.
		* Destructuring objects to break references and modify  safely and securely.


### Analyzed commented code:

```javascript
exports.inviteUser = function(req, res) {
  var invitationBody = req.body;
  var shopId = req.params.shopId;
  var authUrl = "https://url.to.auth.system.com/invitation";
  superagent
    .post(authUrl)
    .send(invitationBody)
    .end(function(err, invitationResponse) {
      if (invitationResponse.status === 201) {
        User.findOneAndUpdate({
          authId: invitationResponse.body.authId
        }, {
          authId: invitationResponse.body.authId,	// What for?
          email: invitationBody.email
        }, {
          upsert: true,
          new: true,	// param not described in Mongoose API
        }, function(err, createdUser) {
          Shop.findById(shopId).exec(function(err, shop) {
            if (err || !shop) {
              return res.status(500).send(err || { message: 'No shop found' });
            }
            if (shop.invitations.indexOf(invitationResponse.body.invitationId)) {	// condition should be < 0
              shop.invitations.push(invitationResponse.body.invitationId);		// it doesn't update the model
            }
            if (shop.users.indexOf(createdUser._id) === -1) {
              shop.users.push(createdUser);		// it doesn't update the model
            }
            shop.save();	// it doesn't update the model
            // should be Shop.updateOne({id: shopId}, {users: shop.users, invitations: shop.invitations})
          });
        });
      } else if (invitationResponse.status === 200) {
        res.status(400).json({
          error: true,
          message: 'User already invited to this shop'
        });
        return;
      }
      res.json(invitationResponse);
    });
};
```

### Sample refactor for discussion

```javascript
exports.inviteUser = async (req, res) => {
  const invitationBody = req.body;
  const shopId = req.params.shopId;
  const authUrl = "https://url.to.auth.system.com/invitation";
  let invitationResponse;
  let createdUser;

  const updateUser = async () => {
  	try {
  	createdUser = await User.findOneAndUpdate(
	  		{authId: invitationResponse.body.authId},
	  		{email: invitationBody.email},
	  		{upsert: true},
	  		updateShop
  		);
  	} catch(err){
  		console.error(error)
  	}
  }

  const updateShop = async () => {
  	let shop;
  	try {
  		shop = await Shop.findById(shopId);
  		const { invitations, users } = shop;
  		if(invitations.indexOf(invitationResponse.body.invitationId) < 0) {
  			invitations.push(invitationResponse.body.invitationId)
  		}
  		if(users.indexOf(createdUser._id) === -1) {
  			users.push(createdUser);
  		}
  		Shop.updateOne({id: shopId}, {users: users, invitations: invitations})
  	} catch(err) {
  		console.error(err);
  	}
  }

  try {
  	invitationResponse = await superagent.post(authUrl);
  	if (invitationResponse.status === 201) {
  		res.json(invitationResponse);
  	}
  	else if (invitationResponse.status === 200) {
        res.status(400).json({
          error: true,
          message: 'User already invited to this shop'
        });
  		throw error
  	}
  	updateUser();
  } catch(err) { console.error(err); }

};
```

#### Analysis Documentation

+ [Mongoose](https://mongoosejs.com/)
+ [superagent](https://www.npmjs.com/package/superagent)
+ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

