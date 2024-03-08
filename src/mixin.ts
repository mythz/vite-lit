/* playground-fold */
import { LitElement } from 'lit'
import { spread } from './directives'
import { type DirectiveResult } from 'lit/directive.js'

export type Constructor<T = {}> = new (...args: any[]) => T

export declare class ElementMixinInterface {

    spread(names: string[]): DirectiveResult
}

export const ElementMixin = <T extends Constructor<LitElement>>(superClass: T) => {
    class ElementBase extends superClass {

        spread(names: string[]) : DirectiveResult {
            const attrs:any = {}
            for (const name of names) {
                attrs[name] = (this as any)[name]
            }
            return spread(attrs)
        }
    }

    return ElementBase as Constructor<ElementMixinInterface> & T;
}
