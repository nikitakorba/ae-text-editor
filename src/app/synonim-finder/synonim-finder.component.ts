import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SynonymFinder} from '../synonym-finder-service/synonym-finder.service';
import {TextService} from '../text-service/text.service';


interface ISynonym {
  word: string;
  score: number;
}

@Component({
  selector: 'app-synonim-finder',
  templateUrl: './synonim-finder.component.html',
  styleUrls: ['./synonim-finder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SynonimFinderComponent implements OnInit {

  constructor(private synonymService: SynonymFinder,
              private textService: TextService,
              private cdRef: ChangeDetectorRef) {
  }

  public synonyms: ISynonym[] = [];

  ngOnInit() {
    this.textService.getSelectionTextStream().subscribe(selectedWord => {
      this.getWordSynonyms(selectedWord);
    });
  }


  private getWordSynonyms(word: string) {
    this.synonymService.getSynonyms(word).subscribe((synonims: ISynonym[]) => {
      this.synonyms = synonims;
      this.cdRef.detectChanges();
    });
  }

  onSelect(synonym: string) {
    this.synonymService.updateSelectedSynonym(synonym);
  }

  clear() {
    this.synonyms = [];
  }
}
