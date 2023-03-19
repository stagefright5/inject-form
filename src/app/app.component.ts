import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSwitch, NgSwitchDefault, NgSwitchCase, CommonModule } from '@angular/common';
import { GenericCvaComponent } from './generic-cva/generic-cva.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        NgSwitch,
        NgSwitchDefault,
        NgSwitchCase,
        RouterOutlet,
        GenericCvaComponent,
        ReactiveFormsModule,
        CommonModule,
    ],
})
export class AppComponent {
    title = 'inject-form';
    form = new FormGroup({
        quantity: new FormControl(0),
    });
}
