export interface WebSocketEvent {
  type: string;
  data: any;
  timestamp: string;
}

export type WebSocketHandler = (data: any) => void;