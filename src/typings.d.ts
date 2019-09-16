/* SystemJS module definition */
declare var module: NodeModule;
declare const $: any;
interface NodeModule {
  id: string;
}

interface Window {
  $: any;
  Pace: any;
}
