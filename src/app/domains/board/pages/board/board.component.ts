import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [DragDropModule, NavbarComponent],
  templateUrl: './board.component.html',
})
export class BoardComponent {}
