import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService, public modal: NgbModal) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users, error => console.log(error));
  }

  validate = (string: string) => {
    if (string && string !== '') {
      return true;
    } else {
      return false;
    }
  }

  getCompleteAddress(user: User) {
    const { houseNumber, street, city, postalCode } = user;
    let address = '';
    if (this.validate(houseNumber.toString())) {
      address += houseNumber;
    }
    if (this.validate(street)) {
      if (this.validate(address)) {
        address += ', ';
      }
      address += street;
    }
    if (this.validate(city)) {
      if (this.validate(address)) {
        address += ', ';
      }
      address += city;
    }
    if (this.validate(postalCode)) {
      if (this.validate(address)) {
        address += ', ';
      }
      address += postalCode;
    }
    return address;
  }


}
