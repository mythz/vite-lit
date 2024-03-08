import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import style from '../tailwind.input.css?inline'
import { ElementMixin } from './mixin'
import { cn } from './utils'
import { Ref, createRef, ref } from 'lit/directives/ref.js'
import { input } from './css'
import { errorResponse, humanize, toPascalCase } from "@servicestack/client"
import type { ResponseStatus } from './types'

@customElement('text-input')
export class TextInput extends ElementMixin(LitElement) {
  static styles = [css`:host {display:block}`, unsafeCSS(style)];

  @property({ type: String, attribute: 'button-class' })
  inputClass?: string

  @property({ type: String, attribute:'input-type' })
  inputType?: string

  @property({ type: String })
  label?: string

  @property({ type: String })
  labelClass?: string

  @property({ type: String })
  help?: string

  @property({ type: String })
  placeholder?: string

  @property({ type: String })
  value?: string

  @property({ type: Object })
  status?: ResponseStatus

  refInput: Ref<HTMLInputElement> = createRef()
  //<slot name="header" :inputElement="inputElement" id="${this.id}" :modelValue="modelValue" :status="status" v-bind="$attrs"></slot>

  render() {
    const useType = this.inputType || 'text'
    const useLabel = this.label ?? humanize(toPascalCase(this.id))
    const usePlaceholder = this.placeholder ?? useLabel

    //let ctx: ApiState|undefined = inject('ApiState', undefined)
    const errorField = errorResponse.call({ responseStatus: this.status }, this.id) // ?? ctx?.error.value
    const cls = [input.base, errorField ? input.invalid : input.valid, this.inputClass]

    return html`<slot name="header"></slot>
      ${!useLabel ? null
        : html`<label for="${this.id}" class="${cn('block text-sm font-medium text-gray-700 dark:text-gray-300',this.labelClass)}">${useLabel}</label>`}
        <div class="mt-1 relative rounded-md shadow-sm">
          <input ${ref(this.refInput)} 
                 .type=${useType}
                 .name=${this.id}
                 .id=${this.id}
                 .className=${cn(cls)}
                 .placeholder=${usePlaceholder}
                 .value=${this.value ?? ''}
                 @input=${this._onInput}
                 ?aria-invalid=${errorField != null}
                 .aria-describedby=${this.id + '-error'}
                 .step="any">
          ${!errorField ? null
          : html`<div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>`}
        </div>
        ${errorField
          ? html`<p class="mt-2 text-sm text-red-500" .id=${this.id + '-error'}>${errorField}</p>`
          : this.help
            ? html`<p class="mt-2 text-sm text-gray-500" .id=${this.id + '-description'}>${this.help}</p>`
            : null}
        <slot name="footer"></slot>`
  }

  _onInput(e:Event) {
    this.value = (e.target as HTMLInputElement).value
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'text-input': TextInput
  }
}
