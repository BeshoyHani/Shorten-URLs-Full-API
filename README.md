# Shotern URLs Full API
an API to shorten URLs. It also works as URL store where you can save your shorten URLs, categorize them and search for specific one.

## Features
1) Shorten your long URLs with short one you can use easily.
2) Support 2 modes: 
    - Guest mode: where the shorten link will be valid till 12 hours only.
    - Signed in mode: where the shorten link will be valid forever and will be stored in your account.

3) Categorize your URLs into several categories so, you can organize your URls and find them faster than usual.
4) Search for specific URL with it's title.
5) Provide you with a screenshot of the provided URL so, you can find the URL you want more faster.

## Tools
- Node.js
- Express
- Typescript
- MogoDB
- JWT

## Endpoints
- ## Users

| Action | Method | Route | Parameters | Token|
| ------------- | ------------- | -------------| ------------- | ------ |
| Create User  | `POST`  | `/register` | username <br> email <br> password   | Not Required |
| Sign in  | `POST`  | `/login` | (username \|\| email) <br> password | Not Required |
| update password | `POST`  | `/account/edit` | password | Required |

## URL

| Action | Method | Route | Parameters | Token|
| ------------- | ------------- | -------------| ------------- | ------ |
| shorten URL  | `POST`  | `/link/shorten` | originalURL* <br> title <br>  category   | Not Required |
| search for URL  | `GET`  | `/link/search` | query* | Required |
| Update URL info  | `POST`  | `/link/update` | linkID* <br> title <br> category | Required |
| Delete URL | `POST`  | `/link/delete` | linkID* | Required |
| find my URLs | `GET`  | `/my/link` | pageNo* | Required |
