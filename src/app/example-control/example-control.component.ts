import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-example-control',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="choose-quantity">
            <button (click)="onRemove()" color="primary">-</button>
            <div class="quantity">{{ value }}</div>
            <button (click)="onAdd()" color="primary">+</button>
        </div>
    `,
    styles: [
        `
            .choose-quantity {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 200px;
            }
            .quantity {
                width: 50px;
                text-align: center;
            }
            .choose-quantity button {
                border-radius: 4px;
                width: 50px;
                border: none;
                background-color: #fff;
                font-size: 1.5rem;
                color: #ccc;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .choose-quantity button:hover {
                background-color: #ccc;
                color: #fff;
            }
        `,
    ],
    styleUrls: ['./example-control.component.scss'],
})
export class ExampleControlComponent {
    @Input('props') props: { increment: number } = {
        increment: 0,
    };
    @Input('value') value = 0;
    @Input('disabled') disabled = false;
    @Output('change') change = new EventEmitter<number>();

    onAdd() {
        if (!this.disabled) {
            this.value += this.props.increment;
            this.change.next(this.value);
        }
    }

    onRemove() {
        if (!this.disabled) {
            this.value -= this.props.increment;
            this.change.next(this.value);
        }
    }

    validate(control: AbstractControl): ValidationErrors | null {
        const quantity = control.value;
        if (quantity <= 0) {
            return {
                mustBePositive: {
                    quantity,
                },
            };
        }
        return null;
    }
}
