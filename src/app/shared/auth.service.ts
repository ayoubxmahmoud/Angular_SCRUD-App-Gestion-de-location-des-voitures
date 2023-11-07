import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}
  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    let result = !!this.fireauth.currentUser;
    console.log(result);
    return result;
  }
  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password)
      .then(() => {
        localStorage.setItem('token', 'true');
        localStorage.setItem('username', email);
        this.router.navigate(['home']);
      })
      .catch(err => {
        alert('Something went wrong');
        this.router.navigate(['/login']);
      });
  }

  // register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        alert('Registration Successful');
        this.router.navigate(['home']);
      })
      .catch(err => {
        alert(err.message);
        this.router.navigate(['/register']);
      });
  }

  // sign out
  logout() {
    this.fireauth.signOut()
      .then(() => {  
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.router.navigate(['/login']);
      })
      .catch(err => {
        alert(err.message);
      });
  }
    //forgot password
    forgotPassword(email : string){
      this.fireauth.sendPasswordResetEmail(email)
        .then( () => {
          this.router.navigate(['/verify-email']);
        },
          err => {
            alert('Something went wrong!');
          })
    }
    
  
    // email varification
    sendEmailForVarification(user : any) {
      console.log(user);
      user.sendEmailVerification().then((res : any) => {
        this.router.navigate(['/varify-email']);
      }, (err : any) => {
        alert('Something went wrong. Not able to send mail to your email.')
      })
    }
  
    //sign in with google
    googleSignIn() {
      return this.fireauth.signInWithPopup(new GoogleAuthProvider)
        .then(res => {
          this.router.navigate(['home']);
          localStorage.setItem('token', JSON.stringify(res.user?.uid));
        }, err => {
          alert(err.message);
        })
    }
}
