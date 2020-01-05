import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlPanelComponent {

  public applyStyling(commandId: string): void {
    document.execCommand(commandId, false, null);
  }
  public onColorChange(event: Event): void {
    const color = (event.target as HTMLInputElement).value;
    document.execCommand('foreColor', false, color);
  }
}
