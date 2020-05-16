# VideosTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.
Integrating with [YouTube official API](https://developers.google.com/youtube/v3) to get list of videos showing ( thumbnail, title, publish date) of each video in specific channel, and show its details such as ( number of likes, number of views, title, publish date, banner, description, duration of the video) and you can add it to your favorites and as well rate it using Firebase | [Firestore Database](https://firebase.google.com/docs/firestore).

## Project structure

#### Components

1. video list: to list all the video on specific channel.
2. video details: to check specific video details.
3. 404 - Not found: if any wrong route or API failure.

#### Services

1. videos list: dealing with 1 YouTube API to get list videos and seach in them (seach API).
2. video details: dealing with 3 YouTube APIs to get the video details using `part=snippet` to get the main details such as title , published at, and description, `part=contentDetails` to get video duration, `part=statistics` to get likes and views] (video API).
3. rating: dealing with firestore to get your rate on load if you did before, insert your new rate or update an old rate for you.
4. favorites: dealing with firestore to add to your favorites list or delet from it, and on load you can see if the video in your list or not.

## Used Packages

- [@angular/material](https://material.angular.io/) for quick and good components.
- [bootstrap](https://getbootstrap.com/docs/4.4/getting-started/introduction/) for responsive and flex layouts.
- [firebase](https://firebase.google.com/docs/firestore) for small database to add/remove videos to your favorites, and rate your videos as well.
- [ngx-bar-rating](https://www.npmjs.com/package/ngx-bar-rating) for rating each video.
- [@angular/service-worker](https://angular.io/guide/service-worker-intro) for chaching your application, static and http APIs responses as well to work in offline mode.

## Project Screens

#### Videos list Page

Show list of videos in specific channel, and you can set channel url and get its videos in YouTube API, as well seach in the list by title video, and sort the table by title or published date, and you can click on details button to check more about the selected video.

![videos list page](https://i.ibb.co/hX2wZfN/l.png)

#### Details Page

For every video in video List in specific channel. you can add it to your favorites and rate it , and check its details.

![detils page](https://i.ibb.co/cxPzwmD/d.png)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
