import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password1 : string = '';
  password2 : string = '';
  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }
  register(){
    if(this.email == ''){
      alert('Please enter email');
      return;
    }
    if(this.password1 !== '' && this.password2 !== ''){
      if (this.password1 !== this.password2){
        alert('Password and Confirm password should be the saame');
        return;
      }
    }else{
      alert('Please enter password');
      return;
    }
    this.auth.register(this.email,this.password1);
    //clear the inputs
    this.email = '';
    this.password1 = '';
    this.password2 = '';
  }

}
