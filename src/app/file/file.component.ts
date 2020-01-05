import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {TextService} from '../text-service/text.service';
import {Observable, Subject} from 'rxjs';
import {SynonymFinder} from '../synonym-finder-service/synonym-finder.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit, OnDestroy {
  text$: Observable<string>;
  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private textService: TextService, private synonymService: SynonymFinder) {
  }

  ngOnInit() {
    this.text$ = this.textService.getTextStream().pipe(takeUntil(this.onDestroy$));
    this.synonymService.getSelectedSynonymStream().pipe(takeUntil(this.onDestroy$)).subscribe(synonym => {
      this.replaceWordWithSynonym(synonym);
    });
  }

  public onMouseUp(event: MouseEvent) {
    const selection = document.getSelection();
    this.textService.updateSelection({
      selectedText: selection.toString(),
      parentNode: selection.baseNode.parentNode,
      fromIndex: selection.baseOffset,
    });
  }

  public onEditorInput(event: Event) {
    this.textService.updateText((<Element>event.target).innerHTML);
  }

  public replaceWordWithSynonym(synonym: string) {
    let text = this.textService.getText();
    const selectionText = this.textService.getSelectionText().trim();
    text = text.replace(selectionText, synonym);
    this.textService.updateText(text);
  }

  public onTab(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      document.execCommand('insertHTML', false, '&emsp;');
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
