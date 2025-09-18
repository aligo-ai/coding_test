import type { ParentProps } from "solid-js";

export function AlgoBase(props: ParentProps) {
  return <div class="container mx-auto py-2">{props.children}</div>;
}
