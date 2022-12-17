# Shotern URLs Full API
an API to shorten URLs. It also works as URL store where you can save your shorten URLs, categorize them and search for specific one.

## Features
1) Replace your long URL with a short one you can use easily.
2) Support 2 modes: 
    - `Guest mode`: where the shorten link will be valid till 12 hours only.
    - `Signed in mode`: where the shorten link will be valid forever and will be stored in your account.

3) Categorize your URLs into several categories so, you can organize your URls and find them faster than usual.
4) Search for specific URL with it's title.
5) Import URL that is created by someone else into you URL list.
6) Share your URLs with friends (such as URLs for study or work) and let them use these URLs directly or import them into their own URL lists.
7) remove or edit your URL info.
8) Provide you with an image preview of the provided URL so, you can find the URL you want more faster.

## Tools
- Node.js
- Express
- Typescript
- MogoDB
- JWT

## Dependancies
- `bcrypt` : to hash password before store it in DB
- `link-preview-js` : get  an image preview of the URL
- `cloudinary`: to store the image in cloudinary
- `nanoid` : generate unique IDs of specific length to be used as the new short URL
- `mongoose` : to connect and deal with MongoDB

## How to install
1) clone this repo
2) in the root directory run `npm install`
3) run `npm run start` to start the Node.js server

## Endpoints
- ## Users

| Action | Method | Route | Parameters | Token|
| ------------- | ------------- | -------------| ------------- | ------ |
| Create User  | `POST`  | `/register` | username* <br> email* <br> password*   | Not Required |
| Sign in  | `POST`  | `/login` | (username \|\| email)\*<br> password* | Not Required |


## URL

| Action | Method | Route | Parameters | Token|
| ------------- | ------------- | -------------| ------------- | ------ |
| shorten URL  | `POST`  | `/link/shorten` | originalURL* <br> title <br>  category   | Not Required |
| Go to original URL | `GET`  | `/link/redirect/:URL` | N/A | Not Required |
| search for URL  | `GET`  | `/link/search` | query* | Required |
| Update URL info  | `POST`  | `/link/update` | linkID* <br> title <br> category | Required |
| Delete URL | `POST`  | `/link/delete` | linkID* | Required |
| find my URLs | `GET`  | `/my/link` | pageNo* | Required |


> Note that `*` that followes parameter name means that this parameter is required otherwise, it's optional.

## Database Schema
### Link Table

|  Column | Type | Description |
| --------- | --------- | -----|
| UserID | String | ID of the user who owns the url |
| shortURL | String | the full url after being shortened |
| shortID | String |  the parameter of the shorten url |
| originalURL | String | the original url|
| Date | DateTime | time and date in which the url was created|
| clicks | number | how many time the url is clicked |
| img | String | the url of the image that is generated as a preview for each url |
| title | String | the title that is describe the url |
| category | String | the category for which the url belongs to |
| creatorID | String | ID of the user who created the url |

### User Table

|  Column | Type |
| --------- | --------- |
| email | String |
| username | String |
| password | String |