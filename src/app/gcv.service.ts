import { Injectable, Type } from '@angular/core';
import { ExampleControlComponent } from './example-control/example-control.component';

@Injectable({
    providedIn: 'root',
})
export class GcvService {
    private CUSTOM_CVA_REGISTRY = new Map<string, Type<any>>();
    constructor() {
        this.CUSTOM_CVA_REGISTRY.set('custom-cva-quantity-setter', ExampleControlComponent);
    }
    getComponent(componentName: string): Type<any> {
        return this.CUSTOM_CVA_REGISTRY.get(componentName)!;
    }
}
