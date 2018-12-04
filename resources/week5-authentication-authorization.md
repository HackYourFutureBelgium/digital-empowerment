# Week 5 - Authentication & Authorization


## Checklist

**I can**

- [ ] Log in
- [ ] Log out
- [ ] See create, update and delete actions when I'm logged in
- [ ] Not see CUD actions when I'm not logged in
- [ ] Not see passwords in the database as plain text, they are hashed
- [ ] Not use CUD API routes without sending an authentication token


### Bonus (these are quite tricky, save them for the very last)

- [ ] Admins have access to a user management module, in which they can add, remove and update users. Additionally, they can set user roles to either “user or “admin”
- [ ] Added users receive an email & users can reset their passwords
- [ ] Users can reset their password by providing their email address



## Notes & Tips

### 1. Logging out is client-side only

You don't have to do anything server-side to log out a user. Set the expiry of a signed token reasonably, and their token will invalidate in time.
Delete their cookie client-side, and the token isn't stored anywhere else - so it won't be used again. By deleting the cookie, your check in the `App.js` constructor will set the app state to "not logged in".

### 2. Avoid repetition by using [express middleware](https://expressjs.com/en/guide/using-middleware.html)

Middleware functions have access to the `req` and `res` objects, and additionally receive a `next` function as a parameter. This means you can read, alter, or intercept requests before they get to their respective handlers.

Instead of running the same JWT verification in every route you want to protect (by adding it to the controller), add middleware that does it for you and then proceed to the controller normally by calling `next`.

I use a `verifyToken` function that I use to extract a token from a `Authorization: Bearer <token>` header, find the user from the decoded token, and append that user to the request object. Without giving the actual code, it looks like this:

```
const extractToken = (req) => {
  const token = null; // this is where you get the token from the req object
  return token;
};

exports.verifyToken = (req, res, next) => {
  const token = extractToken(req);
  if (!token) return res.status(403).send({ message: 'No token provided' });

  return jwt.verify(token, <your secret>, async (err, decoded) => {
    if (err) res.status(500).send({ message: 'Failed to authenticate' });

    const user = null; // find the user here using `decoded.id` (assuming you set the user id when you encoded the token)
    if (!user) res.status(403).send({ message: 'User does not exist' });
    req.user = user;
    next();
  });
};
```

Every next route the request hits, will have the user **object** tied to it's `req` parameter. So in the future you can easily check if for example `user.role === admin` :)

In your route files, you can require your `verifyToken` middleware and just add it to every route that requires authentication to use:

`app.post('/api/learning-path', verifyToken, learningPath.create);`

