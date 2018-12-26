# Digital Empowerment

We're developing a real-world application for Hobo. Hobo is a day center for homeless people in Brussels. They would like to create a learning tool that teaches basic computer skills and tasks for the people coming to the center.

### Project goals
  - **Teach people without prior experience to use a computer for basic tasks**: this teaching will both be accompanied and unaccompanied. It’s important to have the least amount of text as possible present on the site, everything should be visual and interactive.
  - **Allow Hobo to manage the application without developer interference**: Application administrators at hobo should be able to manage the application’s contents and users easily and without having to consult a developer. 


## Getting started

### Running the application

You will have to install packages for both `client` and `server`.
So in the both folders, run either
```
npm install
```
or
```
yarn
```

You can start both the client and server by running

```
npm start
```

in their folders. They will run on port 3000 and 4000, respectively.

```
MONGODB_URI=mongodb://localhost:27017/digital-empowerment
```

`server/src/controller`  
`server/src/model`  
`server/src/route`  
Each of these folders have one file per resource, [example here](https://github.com/HackYourFutureBelgium/class1-project-digital-empowerment/tree/master/server/src).


## Contributing

Pull requests welcome! Any functional changes will first be discussed with Hobo vzw.

Create an issue -> fork the repository -> make magic -> submit PR <3

## License

MIT
