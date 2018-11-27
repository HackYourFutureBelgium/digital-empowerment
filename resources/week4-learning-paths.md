# Week 4 - Learning paths


## Checklist

**I can**

- [ ] create a path
- [ ] update a path’s title
- [ ] delete a path (which also deletes its modules)
- [ ] get all existing paths and display them properly on the page
- [ ] search paths on the page (search by title, case insensitive)
- [ ] click on a path to see that path’s modules (not all modules)
- [ ] display paths in a way that matches my current styles


### Bonus

- [ ] I can duplicate a path by providing a new title - which makes a copy of its modules (not its module IDs)
- [ ] Every asynchronous action shows user feedback (loaders)


## Clarifications

### Path naming

To clear up some confusion, you can rename what we call `Path` to `LearningPath` and also adjust your routes.

`path` is widely used within JavaScript/Node (such as in the path structure for `react-router` and the built-in node `path` library).

### URL Structure

As addressed by Frederik in class - the current way we use URLs, means they can collide if hosted on the same server.

For example, when requesting `/paths`, does our server handle this, or our client (`react-router`)?

To clear this up, we'll do something that is very common practice: URL prefixing. Every route that is part of the API, we'll prefix with `/api`.

This means we now have the following routes:

```
/api/learning-path
/api/learning-path/:pathId
/api/learning-path/:pathId/module
/api/module
/api/module/:moduleId
```

Client-side:

```
/ or /learning-path or /learning-paths or /index -> an overview of all paths
/learning-path/:pathId -> modules of a specific path
```


## Notes & Tips


### 1. Creating learning-path routes and testing with Postman

To start, I would create routes for CRUD of learning paths. Experiment with creating, reading, updating and deleting paths from postman before you proceed.

For now the LearningPath schema/model only has a title, don't worry about modules just yet.

Remember that if we click a path, we make a request for a specific path's modules. So in addition to an `GET /api/learning-path` route, you will also need a `GET /api/learning-path/:pathId` route.

Create some learning paths from Postman, so you have some to display client-side.

### 2. Display learning paths using React

You've implemented routes and they work, sweet. You can now create some api functions (like the ones in `src/api/modules.js`) to use them on the client. I created a `src/api/learning-paths.js` file for this which looks very similar to the modules file.

Now, like you did for modules, you can get all of the learning-paths when the component mounts, and style and display them on the page (don't forget your loaders).

You can then add add, edit and delete buttons. Again this will be the same principle as modules, you've been here before.

### 3. Searching paths

Implementing a search in React can be incredibly easy, it only takes 3 ingredients:

- an input field to enter the search query
- a state field that keeps track of the currently entered search query
- an onchange handler on the input field that updates the state
- a filter function to only render paths that have a title that includes the current search query

Normally you'd do something like this to loop over your paths to display them:

```
paths.map(learningPath => <LearningPath path={learningPath} />);
```

Instead, we only want to display the paths that include the search query that the user entered 🧐

```
paths
  .filter(path => path.title.toLowerCase().includes(searchQuery.toLowerCase()))
  .map(learningPath => <LearningPath path={learningPath} />);
```

So we're filtering out any learning path with a title that doesn't include the value the user entered in the search field.

Pay special attention to the `toLowerCase()` function. We're saying that we want to display the path regardless of both its title's capitalization and the user entered search query's capitalization.

Your turn :)

### 4. The tricky bit: making modules learning-path specific

We have complete learning path CRUD implemented, we can search and (ideally) you've made everything pretty. NEAT.

We want to tie modules to a learning path. In principle, you could accomplish this by not having any `module` schema/model at all anymore, and adding modules to the path schema, the same way you added module contents to the module schema.

Instead, I said that a path contains a *reference* to an existing Module object 🤯. This could make our life a lot easier in the future, for when we want to display ALL modules at some point in the future, or if we want to link modules with one another.

`server/src/model/path.model.js`

```
const mongoose = require('mongoose');

const LearningPathSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    modules: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module'
    }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('LearningPath', LearningPathSchema);
```

We're saying `LearningPath.modules` is an array of `ObjectId`s. Beautiful.
Let's create a route for adding a module to a learning path instead of creating it and adding it to the heap.

`POST /learning-path/:pathId/module`

You can create a new module like you usually would, *BUT* this new module also has to be added to the `learningPath.modules` array. All you need for this is the `id` of the learning path and the `id` of the module you just created.

```
const addModuleToPath = async (pathId, moduleId) => {
  const path = await Path.findById(pathId);
  path.modules.push(moduleId);
  await path.save();
  return Path.findOneAndUpdate({ _id: pathId }, path, { new: true });
};
```

Boom. Paths now contain references to existing modules.

Things to think about:

	* For now, when deleting a path you can also safely delete its modules (make sure to do this so we have no modules that aren't tied to a path)
	* On path *duplication* you have to make a copy of the path's modules, and not it's module IDs. Otherwise, if you update a module in a duplicated path, it will also be updated in the original path.


### 5. Displaying learning path-specific modules

So we now get back a path that can contain modules, wonderful. Now on the client side when someone clicks a path, I no longer want to see ALL modules, I want to see that path's modules.

For this we need to `GET /api/learning-path/:pathId`, which we created in step 1.
**Important:** mongoose will not replace `moduleId`s in the module array automatically. You need to explicitly tell it to `populate` the `modules` key.

`LearningPath.findById(req.params.pathId).populate('modules')`.

In the Modules component, our `GET /api/module` request that sets the modules in the state array, is now the path-specific request.

```
// get the pathId that was passed by react-router
const { pathId } = this.props.match.params;

// make the request to the aforementioned API route
const path = await pathsAPI.getPath(pathId);

// set both path information and modules to state and the rest of your implementation shouldn't change client-side
this.setState({
  path,
  modules: path.modules,
  modulesAreLoading: false
});
```

### 6. Module duplication

Coming soon :)
