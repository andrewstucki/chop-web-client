// flow-typed signature: facb7ea38908f6663550f3fd58834738
// flow-typed version: <<STUB>>/@lifechurch/react-draftable_v2.1.0/flow_v0.98.1

/**
 * This is an autogenerated libdef stub for:
 *
 *   '@lifechurch/react-draftable'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare module '@lifechurch/react-draftable' {
  import type { ComponentType } from 'react';

  declare export var FORMAT_HTML:string;
  declare export var FORMAT_MARKDOWN:string;

  declare type FormatType = typeof FORMAT_HTML | typeof FORMAT_MARKDOWN;

  declare export class DraftableState {
    // draft-js flow types don't play well with libdefs
    static toString(editorState:any, format:FormatType): string;
    static createFromString(markup: string, format: FormatType): any;
  }

  declare export type StyleButtonType = {
    label: string,
    style: string,
    Icon: ComponentType<any>,
    type: 'style',
    toggle: 'inline' | 'block' | 'indent',
  };

  declare export type CustomButtonType = {
    label: string,
    Icon: ComponentType<any>,
    type: 'custom',
    action: Function,
  };

  declare export type ToolbarButtonType =
    | StyleButtonType
    | CustomButtonType;

  declare export type ToolbarConfigType = {
    groups: Array<string>,
    [string]: Array<ToolbarButtonType>
  };

  declare export var defaultToolbarConfig:ToolbarConfigType;

  declare type DraftableProps = {
    initialState?: any,
    onChange?: (editorState:any) => void,
    toolbarConfig?: ToolbarConfigType,
  }

  declare export function Draftable(props:DraftableProps):any;
}