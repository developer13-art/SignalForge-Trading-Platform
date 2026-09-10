export interface TelegramConnectRequest {
  phoneNumber: string;
  countryCode: string;
}

export interface TelegramVerifyRequest {
  phoneNumber: string;
  phoneCodeHash: string;
  code: string;
  password?: string;
}

export interface TelegramSession {
  id: string;
  userId: string;
  phoneNumber: string;
  isConnected: boolean;
  lastConnectedAt?: string;
  channels: TelegramChannelInfo[];
}

export interface TelegramChannelInfo {
  id: string;
  channelId: string;
  channelName: string;
  channelType: string;
  isMonitored: boolean;
}

export interface SourceMessagePayload {
  signalSourceId: string;
  externalMessageId: string;
  senderId?: string;
  senderName?: string;
  messageText: string;
  mediaReference?: string;
  isEdited?: boolean;
  isDeleted?: boolean;
  replyToMessageId?: string;
  receivedAt: string;
}