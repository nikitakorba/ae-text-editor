import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

export interface IEditorSelection {
  selectedText: string;
  parentNode: Node;
  fromIndex: number;
}

@Injectable()
export class TextService {
  private _textStream: BehaviorSubject<string> = new BehaviorSubject<string>('A year ago I was in the audience at a gathering of ' +
    'designers in San Francisco. ' +
    'There were four designers on stage, and two of them worked for me. I was there to support them. ' +
    'The topic of design responsibility came up, possibly brought up by one of my designers, I honestly don’t remember the details. ' +
    'What I do remember is that at some point in the discussion I raised my hand and suggested, to this group of designers, ' +
    'that modern design problems were very complex. And we ought to need a license to solve them.');
  private _selection: IEditorSelection;
  private _selectionStream: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public getTextStream() {
    return this._textStream.asObservable();
  }

  public getText() {
    return this._textStream.getValue();
  }

  public updateText(value: string) {
    this._textStream.next(value);
  }
  // this stuff should be unified
  public updateSelection(value: IEditorSelection) {
    this._selection = value;
    this._selectionStream.next(value.selectedText);
  }

  public getSelectionText() {
    return this._selection && this._selection.selectedText;
  }

  public getSelectionTextStream() {
    return this._selectionStream.asObservable();
  }
}
