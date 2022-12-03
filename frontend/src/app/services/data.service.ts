import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private _proyectoId: number;
  private _usuarioId: number;

  private _subject: Subject<number>;

  constructor() { }

  setProyectoId(proyectoId: number) {
    this._proyectoId = proyectoId;
    //this._subject.next(proyectoId);
  }

  getProyectoId() {
    return this._proyectoId;
  }

  setUsuarioId(usuarioId: number) {
    this._usuarioId = usuarioId;
  }

  getUsuarioId() {
    return this._usuarioId;
  }

}
