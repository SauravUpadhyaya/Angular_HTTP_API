import { HttpEventType } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { User } from './interface/user';
import {UserService } from './service/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'AngularAPI';
  private user: User = {
     'id':5,
      
      'name': 'Saurav Upadhyaya',
      'username': 'saysaur',
      'email': 'sauravupadhyaya@gmail',
      'address': {
        'street': 'XYZ',
        'suite': 'Apt. 556',
        'city': 'HE',
        'zipcode': '3874',
        'geo': {
          'lat': '-37.3159',
          'lng': '81.1496'
        }
      },
      'phone': '1-770-736-8031 x56442',
      'website': 'hildegard.org',
      'company': {
        'name': 'Romaguera-Crona',
        'catchPhrase': 'Multi-layered client-server neural-net',
        'bs': 'harness real-time e-markets'
      }
    
  }


  fileStatus= {status:'', percentage:0};

  
 constructor(public userService:UserService) {}


  ngOnInit(): void {
   // this.onUpdateUser();
    this.onGetUsers();
   // this.onGetUser();
   //this.onCreateUser();
   //this.onUpdatePatchUser();
   this.onDeleteUser();
   
  }

  onGetUsers():void{
    this.userService.getUsers().subscribe(
      (response)=>console.log(response),
      (error:any)=>console.log(error),
      ()=>console.log('Done getting users')
    );
  }
  onGetUser():void{
    this.userService.getUser().subscribe(
      (response)=>console.log(response),
      (error:any)=>console.log(error),
      ()=>console.log('Done getting user')
    );
    }

    onCreateUser():void{
      this.userService.createUser(this.user).subscribe(
        (response)=>console.log(response),
        (error:any)=>console.log(error),
        ()=>console.log('Done creating user')
      );
    }

    onUpdateUser():void{
      this.userService.updateUser(this.user).subscribe(
        (response)=>console.log(response),
        (error:any)=>console.log(error),
        ()=>console.log('Done updating user')
      );
      }
      onUpdatePatchUser():void{
        this.userService.updatePatchUser(this.user).subscribe(
          (response)=>console.log(response),
          (error:any)=>console.log(error),
          ()=>console.log('Done updating user using patching strategy')
        );
    }


    onDeleteUser():void{
      this.userService.deleteUser(5).subscribe(
        (response)=>console.log(response),
        (error:any)=>console.log(error),
        ()=>console.log('Deleting user')
      );
    }


    onUploadFiles(files:File[]):void{
      console.log(files);
      const formData = new FormData();
      for (const file of files){
        formData.append('files',file, file.name)

      }

      this.userService.uploadFiles(formData).subscribe(
        (event)=>{
          switch(event.type){
            case HttpEventType.UploadProgress || HttpEventType.DownloadProgress:
              console.log(event);
              if (event.total){
                this.fileStatus.percentage=Math.round(100 * event.loaded/event.total);
                this.fileStatus.status= 'progress';
                console.log(this.fileStatus);
                break;
              }
                
                //console.log(this.fileStatus);
                break;
              
            
              case HttpEventType.Response:
                if (event.status==200){

                this.fileStatus.percentage=0;
                this.fileStatus.status= 'done';
                console.log(event);
                console.log(this.fileStatus);
                  break;
                }
                break;


          }
        },
        (error:any)=>console.log(error),
        ()=>console.log('Deleting user')
      );
    }

}


