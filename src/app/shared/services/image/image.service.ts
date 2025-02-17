import { Injectable } from '@angular/core';
import {
  deleteObject,
  getDownloadURL,
  percentage,
  ref,
  Storage,
  uploadBytesResumable
} from '@angular/fire/storage'
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public uploadPercent = 0;

  constructor(private storage: Storage) { }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    folder = 'images/products';
    const path = `${folder}/${name}`;
    name = name;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe((data: { progress: number; }) => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);
  }



  // async uploadFile(
  //   folder: string,
  //   name: string,
  //   file: File | null): Promise<string> {
  //   folder = 'images/categories';
  //   name = name;
  //   const path = `${folder}/${name}`;
  //   let url = "";

  //   if (file) {
  //     try {
  //       const storageRef = ref(this.storage, path);
  //       const task = uploadBytesResumable(storageRef, file);
  //       percentage(task).subscribe((data: { progress: number; }) => {
  //         this.uploadPercent = data.progress;
  //       });
  //       await task;
  //       url = await getDownloadURL(storageRef);
  //     } catch (e: any) {
  //       console.error(e);
  //     }
  //   }
  //   else {
  //     console.log("wrong format");
  //   }
  //   return Promise.resolve(url);
  // }






  deleteUploadFile(imagePath: string): Promise<void> {
    const task = ref(this.storage, imagePath);
    return deleteObject(task)
  }
}
