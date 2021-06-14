# Excrum - P.E.T project

&bull; Install packages and dependencies &rarr; `npm i`

&bull; Dev environment run app &rarr; `npm start`

## PROJECT STRUCTURE

```
EXCRUM
├── node_modules
|
├── public
|   ├── *.jpg
|   ├── *.ico
|   └── index.html
|
├── public
|   ├── api
|   |   ├── Authenticate.js
|   |   ├── CreateSprint.js
|   |   ├── CreateTeam.js
|   |   ├── CreateUser.js
|   |   ├── GetMembersCapacityList.js
|   |   ├── GetSprintData.js
|   |   ├── GetSprints.js
|   |   ├── GetTeamsList.js
|   |   ├── GetTeamSprintStats.js
|   |   └── UpdateSprintDetails.js
|   |
|   ├── app
|   |   ├── App.css
|   |   ├── App.js
|   |   ├── App.test.js
|   |   ├── Header.jsx
|   |   ├── logo.svg
|   |   ├── RouterProtected.js
|   |   └── Router.js
|   |
|   ├── common
|   |   ├── GetInitialSprintSetup.js
|   |   ├── GetTasksList.js
|   |   └── Tools.js
|   |
|   ├── components
|   |   ├── capacity
|   |   |   ├── CapacityDetails.jsx
|   |   |   └── CapacitySummery.jsx
|   |   |
|   |   ├── members
|   |   |   ├── CreateNewMember.jsx
|   |   |   ├── MemberCapacityCalendar.jsx
|   |   |   ├── MemberCard.jsx
|   |   |   ├── MemberCard2.jsx
|   |   |   ├── MemberIcon.jsx
|   |   |   ├── Profile.jsx
|   |   |   ├── TeamMembersList.jsx
|   |   |   └── UserImageModal.jsx
|   |   |
|   |   ├── sprints
|   |   |   ├── SprintCapacityChart.jsx
|   |   |   ├── SprintCard.jsx
|   |   |   ├── SprintDetails.jsx
|   |   |   └── SprintSummary.jsx
|   |   |
|   |   └── tasks
|   |       ├── DragDropList.jsx
|   |       ├── Task.jsx
|   |       └── TasksForm.jsx
|   |
|   ├── css
|   |   ├── Dashboard.css
|   |   ├── Sprint.css
|   |   └── Team.css
|   |
|   ├── redux
|   |   ├── ActionTypes.js
|   |   ├── Reducers.js
|   |   ├── SprintActions.js
|   |   ├── SprintReducer.js
|   |   ├── Store.js
|   |   ├── TeamActions.js
|   |   ├── TeamReducer.js
|   |   ├── UserActions.js
|   |   └── UserReducer.js
|   |
|   ├── views
|   |   ├── dashboard
|   |   |   └── Dashboard.jsx
|   |   |
|   |   ├── login
|   |   |   ├── Login.jsx
|   |   |   └── Logout.js
|   |   |
|   |   ├── newSprint
|   |   |   └── SprintCreateForm.jsx
|   |   |
|   |   ├── newTeam
|   |   |   └── CreateTeamForm.jsx
|   |   |
|   |   ├── newUser
|   |   |   └── UserCreateForm.jsx
|   |   |
|   |   └── sprintsOverview
|   |       └── SprintsOverview.jsx
|   |
|   ├── index.js
|   ├── registerServiceWorker.js
|   └── SprintsOverview.jsx
|
|
├── .editorconfig
├── .eslintrc
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .gitignore
├── LICENSE
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── yarn.lock
```

Commands

- `npm install` or `npm i` to install packages.json
- `npm start` to start react application


## UPDATES

<b>Amir Diary Update </b>
- [x] Update all the APIs to work with newly adjusted Lambdas to read and write data from DynamoDB

- [x]  Adjusted backend lambdas to cover all previous lambdas functionalities (lambdas that was working with mLab)

- [x] Added sorting to the sprints list

- [x] Created User App Pool (on DEV account) and linked it with test project (HEXAL following this tutorial https://www.youtube.com/watch?v=EaDMG4amEfk)

- [x] Created API gateway with authorizer as cognito, works with postman, but not with the react test project (CORS - unauthorized)


<b> Mariane Diary Update </b>

<i> 15-04-20 </i>

- [x] Cognito test: Created User App Pool (on DSCI DEV account) and linked it with test project (HEXAL following this tutorial https://www.youtube.com/watch?v=EaDMG4amEfk)

- [x]  Created API gateway with authorizer as cognito, works with postman.

<i> 23-06-20 </i>

- [x] Check cognito and client side role management, found this video with this amazing overview: https://www.youtube.com/watch?v=kmVUbngCyOw&t=551s
Came up with a plan on how to do it.

    &bull; Registration and login

    &bull; Tenancy (add custom attributes in cognito for role/scope, and dynamodb for linking tenant and role)

    &bull; Role management

