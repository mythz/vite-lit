import { LitElement, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import style from '../tailwind.input.css?inline'
import { ifDefined } from 'lit/directives/if-defined.js'
import { ElementMixin } from './mixin'
import { cn } from './utils'

type ButtonType = "button" | "submit" | "reset"

@customElement('secondary-button')
export class SecondaryButton extends ElementMixin(LitElement) {
    static styles = [unsafeCSS(style)];

    static properties = {
        target: { type: String },
        rel: { type: String },
        disabled: { type: Boolean },
    };
    target = null
    rel = null

    @property({ type: String })
    type?: ButtonType

    @property({ type: String })
    href?: string

    @property({ type: String, attribute:'button-class' })
    buttonClass?: string

    render() {

        const cls = cn("inline-flex justify-center rounded-md border border-gray-300 py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-black",
            this.buttonClass)
    
        return this.href
            ? html`<a class="${cls}" href="${ifDefined(this.href)}" ${this.spread(['target','rel'])}>
                    <slot></slot>
                </a>`
            : html`<button type="${ifDefined(this.type)}" class="${cls}">
                    <slot></slot>
                </button>`                        
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'secondary-button': SecondaryButton
    }
}
