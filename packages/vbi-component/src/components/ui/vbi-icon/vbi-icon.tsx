import { Component, Host, Prop, h } from '@stencil/core'
import type { AbstractNode, IconDefinition } from '@ant-design/icons-svg/lib/types'

@Component({
  tag: 'vbi-icon',
  styleUrl: 'vbi-icon.css',
  shadow: true,
})
export class VbiIcon {
  /** The icon definition object from `@ant-design/icons-svg`. */
  @Prop() icon: IconDefinition
  /** The size of the icon (e.g., '16px', '1em', '2rem'). */
  @Prop() size: string = '1em'
  /** The color of the icon. Defaults to 'currentColor'. */
  @Prop() color: string = 'currentColor'

  // Recursive function to translate AST into Stencil JSX
  renderNode(node: AbstractNode) {
    if (!node) return null

    // Get the tag name (path, rect, circle...)
    const Tag = node.tag

    return (
      <Tag {...node.attrs}>{node.children && node.children.map((child: AbstractNode) => this.renderNode(child))}</Tag>
    )
  }

  render() {
    if (!this.icon || !this.icon.icon) return null

    let svgData = this.icon.icon as AbstractNode
    if (typeof this.icon.icon === 'function') {
      svgData = this.icon.icon(this.color, this.color)
    }

    return (
      <Host>
        <svg {...svgData.attrs} width={this.size} height={this.size} fill={this.color}>
          {/* Loop through SVG children (usually path tags) */}
          {svgData.children && svgData.children.map((child: AbstractNode) => this.renderNode(child))}
        </svg>
      </Host>
    )
  }
}
