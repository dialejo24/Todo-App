# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for some interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode

### Screenshot

![App screenshot](/src/images/screenshot.png)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- Vanilla Javascript
- Webpack

### What I learned

This project required some things that i either didn't know or i had forgotten. I learned how to use LocalStorage,
used factory functions to create objects, used modules to split code and remembered how call, apply and bind work.

Some meaningful code snippets:
```css
.circle-filled::before {
    content: "";
    width: 20px;
    height: 20px;
    background: url("./images/icon-check.svg");
    background-position: center;
    background-repeat: no-repeat;
}
```
```js
localStorage.setItem("todosList", JSON.stringify(todos_list));
let ids = new Set(
    todos_list
      .filter((todoItem) => getState.call(todoItem) == rule)
      .map((todoItem) => getId.call(todoItem))
);
```

### Continued development

I want to continue improving my JS skills, so my next step is to learn concepts like asyncronous javascript

## Author

- Frontend Mentor - [@dialejo24](https://www.frontendmentor.io/profile/dialejo24)

## Acknowledgments

A huge shout out to all the people who kindly uploads content related to programming for free. They are literlly chaging many people's lives.
