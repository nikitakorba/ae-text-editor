import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

@Injectable()
export class SynonymFinder {

  constructor(private http: HttpClient) {
  }
  private URL = 'http://api.datamuse.com/words';
  private synonymStream = new Subject<string>();

  public getSynonyms(word: string) {
    // trim in case you accidentally selected whitespace
    return this.http.get(`${this.URL}?rel_syn=${word.trim()}`);
  }

  public getSelectedSynonymStream() {
    return this.synonymStream.asObservable();
  }

  public updateSelectedSynonym(synonym) {
    this.synonymStream.next(synonym);
  }
}

