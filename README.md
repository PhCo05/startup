# Calorie Tracker

[My Notes](notes.md)

An app to record meals eaten and calories per day with functionality to track weekly progress and view past logs. 

> [!NOTE]
>  This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
>  If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Whether it's to gain, lose, or maintain weight a lot of us, myself included, track the calories we eat in a day so that we can meet our goals. It's a huge pain to have to go write down every food you ate that day and look up the calorie count for each food item and I often find myself forgetting to write things down and getting an inaccurate calorie count at the end of the day. It would be so much easier if there was an app on your phone that you could use to quickly search foods and automatically add them and their corresponding calorie count to your daily total. Such an app would also make it so much easier to track your progress long term by storing your data and providing visuals. 

### Design

<img src="photos/design1.png" alt="Design image" width="300">
<img src="photos/design2.png" alt="Design image" width="300">
<img src="photos/design3.png" alt="Design image" width="300">
<img src="photos/design4.png" alt="Design image" width="300">
<img src="photos/design5.png" alt="Design image" width="300">

### Key features

- Daily calorie log
- Weekly progress tracking 
- Food database integration (Food API)
- User authentication
- A database that stores user info
- Realtime updates when goals are met and fod is logged

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Structure for a signup/login page, a home page, daily log page, and progress page.
- **CSS** - Style for different screen sizes, style buttons and potentially add animations when switching pages or logging meals.
- **React** - Use for login, daily meal log, meal logging form, and progress graph.
- **Service** - Use a food API with data on food and colorie information.
- **DB/Login** - Register and login the user, store user data (meals logged, calorie totals).
- **WebSocket** - Notify user in real time when a meal is logged or the calorie goal is met.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://calorietracker.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - I created four html pages: index.html, tracker.html, progress.html, and log.html.
- [x] **Proper HTML element usage** - I employed proper usage of Head, Header, Body, Main, Footer, Div, etc. elements.
- [x] **Links** - I included links to navigate between each of the pages.
- [x] **Text** - I added text when necessary both as placeholders for database elements and general headings and subheadings for the final webpage.
- [x] **3rd party API placeholder** - I included a search bar titled "Search Food" that will connect to a food database API to allow users to search for nutrition information for different foods. 
- [ ] **Images** - I did not complete this part of the deliverable.
- [x] **Login placeholder** - I included a login placeholder.
- [x] **DB data placeholder** - I included database placeholder text.
- [x] **WebSocket placeholder** - I added a placeholder for the websocket notifications.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - Routing between login and voting components.

## 🚀 React part 2: Reactivity

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.

## 🚀 DB/Login deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **User registration** - I did not complete this part of the deliverable.
- [ ] **User login and logout** - I did not complete this part of the deliverable.
- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Restricts functionality based on authentication** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
