import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-root',
    imports: [ButtonModule, ToolbarModule, InputTextModule, FormsModule, CommonModule, CardModule, RouterModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-primeng';


  cards = [
    { title: 'Karta 1', subtitle: 'Opis 1', imageUrl: 'https://picsum.photos/id/1015/600/400' },
    { title: 'Karta 2', subtitle: 'Opis 2', imageUrl: 'https://picsum.photos/id/1016/600/400' },
    { title: 'Karta 3', subtitle: 'Opis 3', imageUrl: 'https://picsum.photos/id/1018/600/400' },
  ];

}


