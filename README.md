Excrum - P.E.T project

Amir Diary
Update all the APIs to work with newly adjusted Lambdas to read and write data from DynamoDB,
Adjusted backend lambdas to cover all privious lambdas functionalities (lambdas that was working with mLab)
Added sorting to the sprints list
=============================================================================
Amir Diary Update
Created User App Pool (on DEV account) and linked it with test project (HEXAL following this tutorial https://www.youtube.com/watch?v=EaDMG4amEfk )
Created API gateway with authorizer as cognito, works with postman, but not with the react test project (CORS - unauthorized)
=============================================================================
Mariane Diary Update - 15-04-20
Cognito test:
Created User App Pool (on DSCI DEV account) and linked it with test project (HEXAL following this tutorial https://www.youtube.com/watch?v=EaDMG4amEfk )
Created API gateway with authorizer as cognito, works with postman.
=============================================================================
Mariane Diary Update - 23-06-20
Check cognito and client side role management, found this video with this amazing overview: https://www.youtube.com/watch?v=kmVUbngCyOw&t=551s
Came up with a plan on how to do it.
1- Registration and login
2- Tenancy (add custom attributes in cognito for role/scope, and dynamodb for linking tenant and role)
3- Role management
=============================================================================
