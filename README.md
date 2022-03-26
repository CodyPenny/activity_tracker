# Streak - A Social Activity Tracker

***

## Introduction

Streak is a social networking app that allows users to create an activity and keep track of its progress alongside friends incentivizing completion in a fun and enjoyable way.

Deployed here: https://activity-tracker-peach.vercel.app/

## Project Description

Revamped a previous project with considerations improving the features with Google Firebase. 

The application takes a mobile first approach and shifts the development process to adapt to mobile screens while scaling down on desktop screens to showcase its capabilities as a mobile product as if it is a iOS or Android app but on the web.

<img width="872" alt="Screen Shot 2022-03-26 at 2 20 10 AM" src="https://user-images.githubusercontent.com/53372490/160233248-692a31d1-1ea0-4c98-9e9e-1888f428a525.png">

## Technologies

- React
- Chakra UI
- Styled Components
- Firebase Web SDK
- Firebase Authentication
- Firebase Realtime Database

## Frontend Setup

1. Install specified packages

        npm i
  
2. Setup the dotenv file with Firebase's app configuration
        
   Documentation here: https://firebase.google.com/docs/web/setup
  
3. Run the project

       npm run dev
       
## Features

1. Users can register or login with an email/password or use their Google account for authentication.
        
<img width="353" alt="Screen Shot 2022-03-26 at 2 55 35 AM" src="https://user-images.githubusercontent.com/53372490/160234381-8faf0ae6-f1a0-44ad-b238-a181602cab72.png">

2. The presence of a valid access token permits users access to protected routes such as the main dashboard.

3. The dashboard displays the user's avatar, name, activities called challenges, overall metrics in real time, and the nav bar.

<img width="344" alt="Screen Shot 2022-03-26 at 3 45 59 AM" src="https://user-images.githubusercontent.com/53372490/160236031-0e225699-85a1-4bc1-b559-b05c06a6c052.png">

4. Selecting the avatar allows making account changes such as uploading an image file or deleting the account. The image file is uploaded to Firebase Storage and reflected on the user's profile.

<img width="336" alt="Screen Shot 2022-03-26 at 3 49 50 AM" src="https://user-images.githubusercontent.com/53372490/160236138-b72889df-702e-4681-8f82-91c268fa7f69.png">

5. 
