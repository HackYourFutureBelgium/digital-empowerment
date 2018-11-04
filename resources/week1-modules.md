# Week 1 - Modules

## Checklist

- [ ] I can fetch & display all modules
- [ ] When I add a module it is saved in the database and added to the page
- [ ] When I delete a module it is deleted in the database and deleted on the page
- [ ] When I update a module it is updated in the database and updated on the page
- [ ] Modules are displayed and styled well
- [ ] Only one module can be open at a time
- [ ] I can progress through explanation, exercise, evaluation by clicking next
- [ ] I can mark a module as completed
- [ ] When I mark a module as completed the next module opens


### Bonus

- [ ] A loader is displayed while I wait for a network request to finish
- [ ] Errors are shown when network requests fail
- [ ] Errors are shown when the user supplies bad input
- [ ] I can order modules by dragging them

**Check the user stories in the project brief!**

## Notes & Tips

First some vocabulary for this project.
A **learning path** or **path** is a trajectory of computer skills to be acquired by someone using the platform. For example:

- Sending an email
- Using a web browser
- Looking for housing

Every path contains a couple of **modules**. These are smaller steps that are required to reach the path goal. For example, to send an email, I need to:

- Be able to use a keyboard
- Be able to use a mouse
- Create an email address
- Send the actual email

So we could say the "sending emails" **path** contains these 4 **modules**.

We are only connecting modules to a path in week 3. Right now, modules can exist by themselves and are thrown on one pile.

### Developing with the provided skeleton

Let's take the class example, **creating modules**, and go through it.

If we divide it into small bits, creating a module means:

  1. The client needs to be able to display modules
  2. The client needs a button that queries the server to add a module
  3. The server needs to be able to receive requests to add modules
  4. The server should add the module to the database
  5. The server should return the newly created module
  6. The client should add the new module to local state and display it


#### 1. The client needs to be able to display modules

All this means is that a Module (that currently only has a title) should be shown on the page and styled correctly.

Look at te following line of code:
```
{modules.map((module) => <div key={module._id}>{module.title}</div>)}
```

For every module (that we get out of state), we render a div containing a title.
Tip: the mongo database currently doesn't have any modules, so our array of modules will always be empty.
Populate it yourself with some *dummy modules*:

```
state = {
  modules: [
    {
      _id: 1,
      title: 'Using google'
    },
    {
      _id: 2,
      title: 'Using the address bar'
    }
  ]
};
```

If you remove the fetch request in `componentDidMount`, your page should now render 2 modules. Style them with CSS your own way or like they're shown in the wireframes.



#### 2. The client needs a button that queries the server to add a module

You already know how to add a button with an `onClick` handler.

Our `Modules.jsx` component's render method currently looks like this

```
render() {
  const { modules } = this.state;

  return (
    <div>
      <button onClick={this.addModule}>Add module</button>
      {modules.map((module) => <div key={module._id}>{module.title}</div>)}
    </div>
  );
}
```

As mentioned by Paul in class, there is no way for the user to supply a module title yet.
You'll need a form with an input field (probably with an `onChange` handler?) that makes the network request to create a module on submit.

Take a look at `client/src/api/modules.js`. We know how to write a `GET` request, we've been querying the server for all its modules this whole time.

Let's use `fetch` to make a `POST` request. `POST` is what you use when your request results in a **new resource**.

```
export const createModule = (title) => {
  return fetch(`${API_URL}/module`, {
    method: 'POST',
    body: {
      title: title
    }
  }).then(response => response.json());
};
```

Note that the function accepts a title as an argument. You will have to retreive the title from user input and pass it to the function.

So:

Enter title -> submit form -> make fetch request

