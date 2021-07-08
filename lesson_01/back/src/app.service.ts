import { Injectable } from '@nestjs/common';


type UserCreate =  {
  name: string;
  email: string;
  role: string;
}
type User =  {
  id: number
  name: string;
  status: number;
}
@Injectable()
export class AppService {
  private readonly users: User[] = [];

  async createUser(user: UserCreate) {
    this.users.push({...user, id: this.users.length + 1, status: 1})
    return this.users[this.users.length - 1]
  }
  getUsers(){
    const users =[]
    this.users.forEach(user => {
      users.push(user)
    })
    return  users ? users : []
  }
  deleteUser(id: number){
    this.users.forEach(user => {
      console.log(+user.id)
      console.log(+id)
      if (+user.id === +id){
        if (user.status === 21) {
          user.status = 1
        } else {
          user.status = 21
        }
      }
    })
    return true
  }
  getUserById(id: number){
    return this.users.find(user => {
      if (+user.id === +id){
        return user
      }
    })
  }
}
