import { adapter } from "./adapter";
import { setAdapter } from "../basic-pragma/adapter";
import { VNode } from "../basic-pragma/element";

setAdapter(adapter);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Node<T = any> = VNode<T> | null;

export { createElement, Fragment } from "../basic-pragma/element";
export { render } from "../basic-pragma/reconciler";
