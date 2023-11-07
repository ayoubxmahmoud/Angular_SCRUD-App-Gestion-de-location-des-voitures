import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit {

  username: string = ''; // Add a new property to store the username

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  getUser() {
    const username = localStorage.getItem('username');
    if (username) {
      this.username = username;
    }
  }
  
}

