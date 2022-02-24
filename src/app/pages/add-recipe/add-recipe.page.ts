import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo} from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform } from '@ionic/angular';

export interface CapturedPhoto{
  name: string;
  path: string;
  data: string;
}
const IMAGE_DIR = 'stored-images';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.page.html',
  styleUrls: ['./add-recipe.page.scss'],
})
export class AddRecipePage implements OnInit {
  capturedPhotos: CapturedPhoto[] = [];

  constructor(private platfom: Platform, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadFiles();
  }

  async selectImage()
  {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt
    });
    console.log(image);
    if (image){
      this.saveImageToGallery(image);
    }
  }

  async saveImageToGallery(photo: Photo)
  {
    const base64Data = await this.readAsBase64(photo);
    const fileName = new Date().getTime + '.jpg';
    const savedFile = await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${IMAGE_DIR}/${fileName}`,
      data:base64Data
    });
    console.log('saved:', savedFile);
    this.loadFiles();
  }

  async loadFiles()
  {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
    });
    this.capturedPhotos = [];
    Filesystem.readdir({
      directory: Directory.Data,
      path: IMAGE_DIR
    }).then(result => {
      this.loadFileData(result.files);
    }, async error => {
      console.log('error: ', error);
      await Filesystem.mkdir({
        directory: Directory.Data,
      path: IMAGE_DIR
      });
    }).then(_ => {
      loading.dismiss();
    });
  }

  async loadFileData(filesNames: string[]){
    for (const f of filesNames) {
      const filePath = `${IMAGE_DIR}/${f}`;
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath
      });
      this.capturedPhotos.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`
      });
    }
  }
  private async readAsBase64(photo: Photo)
  {
    if(this.platfom.is('android'))
    {
      const file = await Filesystem.readFile({
        path: photo.path
      });
      return file.data;
    }
  }

}
