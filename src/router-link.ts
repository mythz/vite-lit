import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ElementMixin } from './mixin'
import { useConfig } from './config'

@customElement('router-link')
export class RouterLink extends ElementMixin(LitElement) {
    static properties = {
        target: { type: String },
        rel: { type: String },
    };
    target = null
    rel = null

    @property({ type: String })
    to?: string

    @property({ type: String, attribute:'link-class' })
    linkClass?: string

    @property({ type: String, attribute:'link-style' })
    linkStyle?: string

    render() {
        return html`<a .className=${this.linkClass??''} @click=${this._navigate} .title=${this.to} href="javascript:void(0)" .style=${this.linkStyle} ${this.spread(['target','rel'])}><slot></slot></a>`
    }

    private _navigate(e:MouseEvent) {
        e.preventDefault()
        const { config } = useConfig()
        config.value.navigate!(this.to ?? '/')
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'router-link': RouterLink
    }
}
