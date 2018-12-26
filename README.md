# Digital Empowerment

Hobo is a day center for homeless people in Brussels, Belgium. During the project module of the first class of HackYourFuture Belgium, we developed a learning tool that teaches basic digital literacy to the people coming to the center.

There is minimal styling and branding - and all content is supplied via the WYSIWYG editor, so it's quite simple to reuse for other resource-collection purposes as well.


### Project goals
  - **Teach people without prior experience to use a computer for basic tasks**: this teaching will both be accompanied and unaccompanied. It’s important to have the least amount of text as possible present on the site, everything should be visual and interactive.
  - **Allow Hobo to manage the application without developer interference**: Application administrators at hobo should be able to manage the application’s contents and users easily and without having to consult a developer. 


## Getting started

### Prerequisites

Make sure you have Node >= v8 and MongoDB >=3.5 installed on your system.

### Running the application

You will have to install packages for both `client` and `server`.
So in the both folders, run either `npm install` or `yarn` (if installed)

You can start both the client and server by running `npm start` in their respective folders. The client will run on port 3000, the server will run on port 4000.
You can configure the ports by supplying a `REACT_APP_PORT` to the client or `PORT` to the server.

Server-side **required** environment variables (you can supply these using a `.env` file (adjust these to your environment):

```
MONGODB_URI=mongodb://localhost:27017/digital-empowerment
JWT_SECRET='SECRET'
SPARKPOST_API_KEY=<required for password resets and account registration>
```

Optional server variables:
```
FRONTEND_HOST=<defaults to localhost:3000, used in password reset and registration emails>
NODE_ENV=development
```

Optional client variables:
```
REACT_APP_API_URL=<alternate URL for the API, defaults to http://localhost:4000/api>
```


## Contributing

Pull requests welcome! Any functional changes will first be discussed with Hobo vzw.

Create an issue -> fork the repository -> make magic -> submit PR <3

## License

MIT
