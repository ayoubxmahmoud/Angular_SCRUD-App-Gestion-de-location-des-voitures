# Location de voitures

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` or `npm start` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.


## Connecting the App with Firebase

This project can be connected to Firebase for various functionalities such as authentication, database, and storage. Here's a step-by-step guide on how to set up Firebase for your Angular app:

1. **Create a Firebase Project:**
   - If you don't already have one, go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add Project" and follow the setup wizard to create a new Firebase project.

2. **Initialize Firebase in Your Angular App:**
   - In your Angular project directory, install the Firebase CLI if you haven't already by running:
     ```
     npm install -g firebase-tools
     ```
   - Log in to your Firebase account using the command:
     ```
     firebase login
     ```
   - Initialize Firebase in your project directory:
     ```
     firebase init
     ```
   - Follow the prompts and select the Firebase features you want to use (e.g., Firestore, Authentication).
   - Configure your Firebase settings during the initialization.

3. **Firebase Configuration:**
   - Once initialized, you will receive a `firebaseConfig` object with your Firebase project configuration. You can find this information in your project's Firebase Console under Project Settings.

4. **Integrate Firebase in Your Angular App:**
   - In your Angular project, import Firebase and initialize it with the `firebaseConfig` object you obtained in the previous step. For example:
     ```javascript
     import firebase from 'firebase/app';
     import 'firebase/firestore';
     import 'firebase/auth';

     const firebaseConfig = {
       apiKey: 'YOUR_API_KEY',
       authDomain: 'YOUR_AUTH_DOMAIN',
       projectId: 'YOUR_PROJECT_ID',
       storageBucket: 'YOUR_STORAGE_BUCKET',
       messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
       appId: 'YOUR_APP_ID'
     };

     firebase.initializeApp(firebaseConfig);
     ```

5. **Using Firebase:**
   - You can now use Firebase services in your Angular app. For example, for Firestore, you can interact with the database as follows:
     ```javascript
     import { AngularFirestore } from '@angular/fire/firestore';
     // Use AngularFirestore in your components or services.
     ```

6. **Authentication and Security Rules:**
   - Configure Firebase Authentication and Firestore security rules to control access to your data.

7. **Deployment:**
   - When deploying your Angular app, ensure that you have the Firebase CLI set up, and you can use `firebase deploy` to deploy your app.

### Screenshots:

![client](https://github.com/ayoubxmahmoud/Angular_SCRUD-App-Gestion-de-location-des-voitures/assets/116462151/c5c3b69e-a4b4-48ee-a530-1d371e49b964)

### Quick Demo:

  https://drive.google.com/file/d/1ZOorh5gJqSky3sV4Uf6b74lWK1tufeuy/view?usp=sharing

That's it! Your Angular app is now connected to Firebase for data storage and authentication.

For more detailed instructions and information, refer to the [Firebase Documentation](https://firebase.google.com/docs).

If you have any questions or need further assistance, please don't hesitate to reach out.


## Further help


To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
