import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class UserService {
  users = [
    {
      id: 1, 
      name: 'Evgeni Milev', 
      imgUrl: 'https://lh3.googleusercontent.com/a-/AOh14GgnMac8LEPaG5e4m10HtNQy2gcd9_WRotY4KuxL=s24-c',
      email: 'evgeni.milev@infinno.eu'
    },
    {
      id: 2,
      name: 'Ferhan Cherkez', 
      imgUrl: 'https://lh3.googleusercontent.com/a/AATXAJxPlUrEUdTsK0FxQRnnLbZnHdY5kfspNTT2sl7n=s360-p-rw-no-mo',
      email: 'ferhan.cherkez@infinno.eu'
    },
    {
      id: 3,
      name: 'Georgi Binchev', 
      imgUrl: 'https://lh3.googleusercontent.com/a-/AOh14GhxQGd5KwmbxhDvUTYHVamUEydRURHiwTk6ykFT=s24-c',
      email: 'georgi.binchev@infinno.eu'
    },
    {
      id: 4, 
      name: 'Ventsislav Marinov', 
      imgUrl: 'https://lh3.googleusercontent.com/a/AATXAJxVJ1zVOIs6PCjeY5X1gV3Kyn4UOuJ7RKFpVr4R=s24-c-mo',
      email: 'ventsislav.marinov@infinno.eu'
    },
    {
      id: 5,
      name: 'Danail Stoyanov', 
      imgUrl: 'https://lh3.googleusercontent.com/a/AATXAJzzromp_et3Z1FTT_1rqx3FvnJAsj86byMTGTze=s24-c-mo',
      email: 'danail.stoyanov@infinno.eu'
    },
    {
      id: 6,
      name: 'James Jolovski', 
      imgUrl: 'https://play-lh.googleusercontent.com/-r8QP6X6Xggo/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmLa3o3Hu6dqNP2HAZa7F9-7zpSKw/photo.jpg',
      email: 'james.jolovski@infinno.eu'
    }
  ]

  getUserData(ids: number[]) {
    let guests = [];
    for (const id of ids) {
      let user = this.users.find((user: any) => user.id == id);
      guests.push(user);
    }

    return guests;
  }
}