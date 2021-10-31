## Lab & Homework

[![General Assembly Logo](/ga_cog.png)](https://generalassemb.ly)

# Bookmark'd

![](https://fthmb.tqn.com/N8UHZxApLqho5sUDbpSRyEy1tV8=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/Bookmarks-56d0cca45f9b5879cc7123a4.jpg)

Build a bookmark app that lets you add a title and a link to helpful websites in your coding journey.

#### Learning Objectives

- Full CRUD app with React

#### Prerequisites

- JavaScript 
- Express / Node 
- Mongo / Mongoose 
- React

---

## Overview 

You will be building an app that lets you add a title and a link to helpful websites in your coding journey. When you click on a title, it should take you to the linked website. 
  - GOTCHA - when testing your app out, note that your links must start with `http` or `https` or else it will error!

_Example:_

![](https://i.imgur.com/yq9Ygeu.png) 

✨ **Fun Fact:** This homework was inspired by a coding challenge used during a company's hiring process. So, treat it like you're trying to get that job!

## Deliverables

Listed below is the basic required functionality that your Bookmark'd app should have. Some of the user stories are purposefully ambiguous to allow you to ‘solve’ the problems in a way that is intuitive and makes sense to you, as opposed to just checking off specific steps from homework. In addition, remember this is a Lab and Homework!

#### Express API 
  - You should have a model for bookmarks that has the following schema:
      ```
      title: string
      url: string
       ```
   - You should have routes for...
      - Index: Getting all bookmarks
      - Create: Posting a new bookmark 
      - Delete: Deleting a bookmark
      - Update: Updating a bookmark 
      
#### React Frontend User Stories
  - As a user, I can see a list of all my bookmarks when I visit the page
  - As a user, I can click on one of my bookmarks and have it take me to the linked website
  - As a user, I can create a new bookmark and see that it immediately loads on the page so that I know I successfully added a bookmark
    - Bonus: As a user, when I create a new bookmark, the form should clear after I submit 
  - As a user, I can delete a bookmark so I can keep my list relevant 
  - As a user, I can update a bookmark in case I made a typo or the URL changed
  - Bonus: As a user, I can sort my bookmark by alphabetical order (hint: look into React filters) 
  
#### Styling 
  - Give your app at least a little bit of styling! How it looks is up to you.
  
:red_circle: **Remember to commit often!**
Because your workflow & the way you decide to tackle finishing this app is up to you, it's also up to you what you commit!

## Need Some Guidance? 

While we suggest just trying to build off the user stories and specifications given above, it can be hard to know where to get started! So provided below are some slightly more guided steps to get you started. 

  <details>
   <summary><strong>Start with the back end</strong></summary>

   - Create an express app
     - what npm packages do you need? Now that we are not using sever side templating, are there npm packages that we don't need?
   - Connect it to mongo with mongoose
   - Create a schema that has the following
      ``` 
      title: string
      url: string ( remember: the links must start with http/https )
      ```
   - Create the routes (full CRUD)
   - Test the routes using Postman (or Windows equivalent or using cURL)
  </details>

   <details>
   <summary><strong>Move on to the front end</strong></summary>

   - Your front end should display: 
      - An index of a clickable list of the title of each bookmark that takes you to the url of your bookmark
      - A way to delete a bookmark
      - A way to update a bookmark
      - A working form to add a new record to the database.
        - When the data is submitted and processed, the page should immediately reflect the changes

   - Getting started:
     - Use create-react-app to generate a React App
     - Type out your React Component Architecture
     - Plan what state you have and where it will exist
     - Plan what props components will receive
     - Then execute


## Submission Guidelines

This is a homework, due before class on Monday at 9 AM. Each Group will present their project Monday morning leading into Unit Project 3.

**- In this project you are building**
  - A full CRUD express API for bookmarks
  - A single-page-app built with React with the ability to create new bookmarks 
  - Adding onto your React SPA the ability to see all bookmarks, delete a bookmark, and edit a bookmark 
  - Adding some styling! 
  
---

 ## Hungry For More? 
  
  - Make a searchbox that will filter the bookmark titles 
  - Watch [this video](https://www.youtube.com/watch?v=YFsduR7mBfY) on making a search box (the final code is at around 3:32 - 3:40, skip to that if you like): 
  - Add an array of tags to the schema so you can organize your bookmarks by tags
  - As a user, I should not be able to add a duplicate bookmark so I can keep my list clean
  - Add some authorization to your app. Some possible user stories you can try:
      - As a user, I can only use the app if I am logged in
      - As a user, I can see everyone's bookmarks
      - As a user, I can only update/delete my own bookmarks
  - As always, try to add some CSS! Give your app some style! 
  
---

*Copyright 2020, General Assembly Space. Licensed under [CC-BY-NC-SA, 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)*
