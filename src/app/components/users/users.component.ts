import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  currentUser: User;

  @ViewChild('confirmation') confirmation: ElementRef;

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

  delete(user: User) {
    this.userService.delete(user).subscribe(() => {
      this.users = this.users.filter(u => u.user_url !== user.user_url);
      this.userService.updateCacheAfterDelete(user);
    })
  }
  open(user: User) {
    this.modal.open(this.confirmation, { centered: true });
    this.currentUser = user;
  }

}
