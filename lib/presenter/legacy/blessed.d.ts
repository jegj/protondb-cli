declare module 'blessed' {
  export interface Screen {
    append(child: Element): void
    render(): void
    key(keys: string[], listener: (ch?: unknown, key?: unknown) => void): void
    children: Element[]
    focused: Element | null
  }

  export interface Element {
    focus(): void
    show(): void
    hide(): void
    detach(): void
    width?: number | string
    setData(data: string[][]): void
    key(keys: string[], listener: (ch?: unknown, key?: unknown) => void): void
    up(offset?: number): void
    down(offset?: number): void
    selected: number
    select(index: number): void
  }

  export interface ListTable extends Element {
    on(event: string, listener: (...args: unknown[]) => void): void
  }

  export interface List extends Element {
    on(event: string, listener: (...args: unknown[]) => void): void
    items: string[]
    ritems: string[]
  }

  export interface Box extends Element {
    setContent(content: string): void
  }

  const blessed: {
    screen(options?: Record<string, unknown>): Screen
    listtable(options?: Record<string, unknown>): ListTable
    list(options?: Record<string, unknown>): List
    box(options?: Record<string, unknown>): Box
  }

  export default blessed
}
