import { VNode } from "./element";
import { ClassComponent } from "./reconciler";

export type FunctionalComponent<P> = (props: P) => VNode<P> | null;

export type ComponentType<P> =
	| (new (props: P) => ClassComponent<P>)
	| FunctionalComponent<P>;
