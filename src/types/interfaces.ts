export type LayoutType = 'Layout01' | 'Layout02'
export type WidgetType = 'Network' | 'CallToAction' | 'Question' | 'Chat' | 'PDF' | 'Poll' | 'Default';

export interface Event {
  key: string;
  title: string;
  onlineUsersCount: number;
  streamId: string;
  streamUrl: string;
  type: "AUDIO_ROOM" | "STREAM";
  status: 'wait' | 'live' | 'finish';
  scenes: Scene[];
  layout: LayoutType;
  widget: Widget | null;
  isAdmin: boolean;
  theme: Theme;
}

export interface Scene {
  key: string;
  title: string;
  isLive: boolean;
  type: WidgetType;
  widgetKey: string;
}

export interface Theme {
  logo: string;
  background: string;
  title: string;
  startBtn?: string;
  logoSize?: string;
  themeStyles: string;
}

export interface Widget {
  widgetKey: string;
  title: string;
  type: WidgetType;
}