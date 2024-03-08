import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ElementMixin } from './mixin'

import { apiStateContext, useClient } from './client'
import { provide } from '@lit/context'

@customElement('api-form')
export class ApiForm extends ElementMixin(LitElement) {
    
    @provide({context: apiStateContext})
    context = useClient();

    render() {
        return html`<form @submit=${this._submit}><slot></slot></form>`
    }

    private _submit(e:Event) {
        e.preventDefault()
        console.log('_submit', e)
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'api-form': ApiForm
    }
}
