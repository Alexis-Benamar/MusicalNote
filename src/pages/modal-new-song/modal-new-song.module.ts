import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalNewSongPage } from './modal-new-song';

@NgModule({
  declarations: [
    ModalNewSongPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalNewSongPage),
  ],
})
export class ModalNewSongPageModule {}
