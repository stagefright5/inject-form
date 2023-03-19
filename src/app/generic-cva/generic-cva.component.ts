import { CommonModule } from '@angular/common';
import { Component, ComponentRef, EventEmitter, Input, ViewContainerRef } from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
} from '@angular/forms';
import { GcvService } from '../gcv.service';

@Component({
    selector: 'app-generic-cva',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './generic-cva.component.html',
    styleUrls: ['./generic-cva.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: GenericCvaComponent,
        },
        {
            provide: NG_VALIDATORS,
            multi: true,
            useExisting: GenericCvaComponent,
        },
    ],
})
export class GenericCvaComponent implements ControlValueAccessor, Validator {
    @Input('props') props: any;
    @Input('value') value: any;
    @Input('componentId') componentId!: string;
    // onChange = (v: number) => {};

    onTouched = () => {};

    touched = false;

    disabled = false;
    private _attachedComponentRef!: ComponentRef<DynFormControlComponent>;

    constructor(private vcr: ViewContainerRef, private readonly gcvService: GcvService) {}

    ngOnInit() {
        console.log('vcr', this.vcr);
        this._attachedComponentRef = this.vcr.createComponent(this.gcvService.getComponent(this.componentId));
        this._attachedComponentRef.instance.props = this.props;
    }

    writeValue(val: number) {
        this.value = val;
    }

    registerOnChange(onChange: any) {
        this._attachedComponentRef.instance.change.subscribe((val: number) => {
            this.writeValue(val);
            this.onTouched();
            onChange(val);
        });
    }

    registerOnTouched(onTouched: any) {
        this.onTouched = onTouched;
    }

    markAsTouched() {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
        }
    }

    setDisabledState(disabled: boolean) {
        this._attachedComponentRef.instance.disabled = disabled;
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return this._attachedComponentRef.instance.validate(control) || null;
    }

    ngOnDestroy() {
        this._attachedComponentRef.destroy();
    }
}

interface DynFormControlComponent<T = any> {
    props: any;
    disabled: boolean;
    change: EventEmitter<T>;
    value: T;
    validate(control: AbstractControl): ValidationErrors | null;
}
