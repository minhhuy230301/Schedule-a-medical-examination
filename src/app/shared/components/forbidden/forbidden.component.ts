import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent {
constructor(private fireStotage:AngularFireStorage){}
  onImageSelected(event:any){
    const file = event.target.files[0];
    const path = `specialist/${file.name}`;
    const fileref = this.fireStotage.ref(path);
    this.fireStotage.upload(path,file).snapshotChanges().pipe(
      finalize(()=>{
          fileref.getDownloadURL().subscribe((url) =>{
            console.log(url);
          })
      })
    ).subscribe();
  }
}
