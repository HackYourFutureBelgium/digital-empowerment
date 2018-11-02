# HackYourFuture Belgium
# Hobo Project Analysis

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

