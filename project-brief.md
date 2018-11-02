# HackYourFuture Belgium
# Digital Empowerment Project Brief

## Overview
Hobo is a day center for homeless people in Brussels. They would like to have a learning tool that teaches basic computer skills and tasks.
The end result will be a web application where:
  - People from Hobo vzw can create and delete learning paths and add modules to it in a specific order. They can add, update and delete module contents in an Explanation - Exercise - Evaluation format. They can also manage the tool’s active users.
  - Learners can pick learning paths and follow modules in any given order. They should be able to use the tool semi-autonomously, mostly requiring help for exercise evaluation.

## Timeline
  - [ ] **November 4 - Kick-off**  
  Project overview, skeleton set-up, start of module component
  - [ ] **November 11 - Modules & WYSIWYG**  
  Adding module assets, links, videos, “what you see is what you get” editor
  - [ ] **November 18 - Learning paths**  
  Create, fetch, update and delete learning paths that contain the modules
  - [ ] **November 25 - Authentication**  
  Logging in and securing administrative actions
  - [ ] **December 2 - User management**  
  Create, fetch, update and delete users (and user roles) + emailing
  - [ ] **December 9 - Finishing touches**  
  Project cleanup, documentation, refactoring and finishing touches.
  - [ ] **December 12 - Graduation 🎉**

### Main goals
 - **Teach people without prior experience to use a computer for basic tasks**: this teaching will both be accompanied and unaccompanied. It’s important to have the least amount of text as possible present on the site, everything should be visual and interactive.
 - **Allow Hobo to manage the application without developer interference**: Application administrators at hobo should be able to manage the application’s contents and users easily and without having to consult a developer. 
  
  
## Project requirements

### Findability
No landing page or search engine optimizations are required for the project. The project will be accessible on a subdomain provided by Hobo.

### Performance & Devices
The web application should perform as well as any webapp should. With longer asynchronous tasks such as network requests, user feedback should always be present (e.g. loaders, status messages, …).  
Variable performance metrics are connection quality and hardware quality - both of which can be measured at Hobo Dagcentrum. Their desktops, laptops and network metrics are the ones to take into account as they are the only ones being used for now.

All main desktop resolutions should be supported. The webapp teaches mainly desktop use, so smartphone & tablet access are not as relevant and not in scope. Again, the main resolution to support should depend on available hardware at Hobo, but we should at least support mainstream desktop resolutions.

### Language
The project should be in English to start - with French translations being provided by Hobo later down the line. The app should be developed with internationalization in mind.

### Documentation
The final (live) version of the application should include extensive documentation on the project itself and how to run and develop for it, on the GitHub repository. This is mainly directed at open source contributors and future maintainers or collaborators of the project.  
There should also be separate documentation with screenshots and brief explanations on how to use and manage the application - directed to the users/admins at Hobo.

### Authentication
Logins will require email + password authentication. Users will be able to reset their password.

### Technology
Coincidentally, the technologies learned by the HackYourFuture students is perfect for this application’s use case.
  - Node.js: Used to build a RESTful API
  - React.js: Used to create the user interface

## Users & User stories
### Visitor
**As a visitor, I:**
  - can navigate to and view learning paths
  - can start at any module in a learning path regardless of previous progress
  - receive an explanation at the start of a module
  - receive an exercise or multiple exercises to do in a module
  - can mark a module as ready to review

### User
Has all the permissions and functionality of a visitor. 

**As a user, I can:**
  - add a new learning path
  - duplicate a learning path
  - delete a learning path
  - add a module to a learning path
  - update a module
  - remove a module from a learning path
  - copy a module to a different learning path
  - reorder modules within a learning path to show a clear or optimal sequence
  - reset my password
 
 **As a user, I will:**
  - receive an email when an account has been created for me by an administrator

### Administrator
Has all the permissions and functionality of a user.

**As an administrator, I can:**
  - Add a user to the application
  - Remove a user from the application
  - Set a user’s role as either user or administrator

