# Restaurant Management Backend
This repository contains backend part of [Restaurant Management App](https://github.com/DomSas/Restaurant-Management-App) to communicate with Stripe for online payments. Tutorial is available on this Medium blog.

### Files

`index.js` - contains code for Express server  
`Procfile` - description for Heroku deployment to determine how to start the app

### How to use

1. Fork or download the repository.
2. Insert secret key obtained from Stripe website on line 4: 
https://github.com/DomSas/Restaurant-Management-Backend/blob/2eda4e39a80d0ab7ea6701fb67fc375c9755a466/index.js#L3-L5
3. Start the server locally with `npm run start`, or deploy the app on Heroku to be publicly available.
