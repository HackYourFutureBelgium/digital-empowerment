# Week 2 - Modules & WYSIWYG

## Checklist

- [ ] I can add module contents (explanation, exercise, evaluation)
- [ ] I can update module contents
- [ ] When I click a module, its contents are shown
- [ ] Only one module can be open at a time -> when I click a module a currently open module should close
- [ ] Adding and updating contents should be possible using a WYSISWYG editor (I used [`react-quill`](https://github.com/zenoamaro/react-quill))
- [ ] WYSIWYG output should be styled correctly
- [ ] I can progress through module stages by clicking next
- [ ] I can mark a module as finished in the evaluation step, and the next module will open


### Bonus

- [ ] I can reorder modules by dragging them
- [ ] A loader is displayed while I wait for a network request to finish
- [ ] Errors are shown when network requests fail
- [ ] Errors are shown when the user supplies bad input

**Check the user stories in the project brief!**

## Notes & Tips

### 1. Making contents storeable
To add module contents and store them in a database, you will have to tell mongo that a module can have those contents. You'll have to update the schema (model).

```
const ModuleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
```

There are a few ways you could make it so this accepts contents:

```
const ModuleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    explanation: String,
    exercise: String,
    evaluation: String
  },
  {
    timestamps: true
  }
);
```
```
const ModuleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    contents: {
      explanation: String,
      exercise: String,
      evaluation: String
    }
  },
  {
    timestamps: true
  }
);
```
Maybe you can think of a better way?

### 2. Adding the WYSIWYG editor

There are many packages that make using WYSIWYG (what you see is what you get) editors very easy.

`Quill.js` is one such editor, it's used by LinkedIn and Slack and is well maintained and supported. We'll use its react wrapper, [`react-quill`](https://github.com/zenoamaro/react-quill).
Before continuing, try installing and adding `react-quill` by following the **README**. Reading documentation, installing and using libraries and packages from other developers is one of the most important things you'll have to learn - take this as a chance to start :)

#### If you're not feeling so adventurous:

Install in the client folder: `npm install react-quill --save`.

Import it and its css in the component where you'd like to display the editor:

```
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
```

You can now display an editor anywhere:

```
<ReactQuill
  value={this.state.someText}
  onChange={this.handleContentChange}
/>
```

You can keep the value in state like you would with any input element. The contents of your editor will be passed directly to `handleContentChange` (instead of an event object).


#### Additional configuration:

You can define which types of formatting you allow your user to do. Again, I implemented mine by following the `README`. Support more formats if you want to :)

```
const editorOptions = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    ['bold', 'italic', 'underline', 'strike'],
    [
      { list: 'ordered' }, { list: 'bullet' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ]
};
```

Now you pass these options to the editor component:

```
<ReactQuill
  value={this.state.someText}
  onChange={this.handleContentChange}
  modules={editorOptions}
/>
```

Saving or updating your modules happens the exact same way it does currently, you just pass the module contents along with your title!

### 3. Displaying module contents

The output of the editor is an HTML string. It's very dangerous to set html contents that were **user provided**, because it leaves your site vulnerable to `XSS` - [Cross Site Scripting](https://en.wikipedia.org/wiki/Cross-site_scripting). Because we're only letting administrators provide this content, we don't mind - we trust them not to ruin their website :).

React creators know this - and have called the equivalent of doing `.innerHTML` in JavaScript `dangerouslySetInnerHTML`.

```
<div dangerouslySetInnerHTML={{ __html: module.explanation }} />
```

Should render the HTML exactly the way it was entered, BUT - we implemented `normalize.css`, which resets and normalizes certain styles across browsers. When we write something in bold in the editor, it ouputs it in a `<strong>` tag. Normalize resets this styling.

Here's some useful default styling for the editor's outputs - the rest is up to you:

```
.module__contents__stage strong {
  font-weight: bold;
}

.module__contents__stage em {
  font-style: italic;
}

.module__contents__stage u {
  text-decoration: underline;
}

.module__contents__stage img {
  max-width: 100%;
}

.module__contents__stage iframe {
  width: 100%;
  height: 48rem;
}
```
**Note**: `.module__contents__stage` is the div I set `innerHTML` for. It's import to only set the staging for those elements, not for your entire application.
