import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { logger } from '@signalforge/logger';
import { redis } from '../config/redis';

interface AuthenticatedSocket extends WebSocket {
  userId?: string;
  isAlive?: boolean;
}

export class WsServer {
  private wss: WebSocketServer;
  private clients: Map<string, Set<AuthenticatedSocket>> = new Map();

  constructor(server: Server) {
    this.wss = new WebSocketServer({ server, path: '/ws' });

    this.wss.on('connection', (socket: AuthenticatedSocket, req) => {
      this.handleConnection(socket, req);
    });

    this.setupHeartbeat();
    this.subscribeToRedis();

    logger.info('WebSocket server started');
  }

  private handleConnection(socket: AuthenticatedSocket, req: any) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const token = url.searchParams.get('token');

    if (!token) {
      socket.close(4001, 'Authentication required');
      return;
    }

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
      socket.userId = decoded.userId;
      socket.isAlive = true;

      // Add to clients map
      if (!this.clients.has(decoded.userId)) {
        this.clients.set(decoded.userId, new Set());
      }
      this.clients.get(decoded.userId)!.add(socket);

      logger.debug(`WebSocket connected: user ${decoded.userId}`);

      socket.on('message', (data) => this.handleMessage(socket, data));
      socket.on('pong', () => { socket.isAlive = true; });
      socket.on('close', () => this.handleDisconnect(socket));
    } catch (error) {
      socket.close(4002, 'Invalid token');
    }
  }

  private handleMessage(socket: AuthenticatedSocket, data: any) {
    try {
      const message = JSON.parse(data.toString());
      
      if (message.type === 'ping') {
        socket.send(JSON.stringify({ type: 'pong' }));
      }
    } catch (error) {
      logger.error('WebSocket message error:', error);
    }
  }

  private handleDisconnect(socket: AuthenticatedSocket) {
    if (socket.userId) {
      const userSockets = this.clients.get(socket.userId);
      if (userSockets) {
        userSockets.delete(socket);
        if (userSockets.size === 0) {
          this.clients.delete(socket.userId);
        }
      }
      logger.debug(`WebSocket disconnected: user ${socket.userId}`);
    }
  }

  private setupHeartbeat() {
    const interval = setInterval(() => {
      this.wss.clients.forEach((socket: AuthenticatedSocket) => {
        if (socket.isAlive === false) {
          return socket.terminate();
        }
        socket.isAlive = false;
        socket.ping();
      });
    }, 30000);

    this.wss.on('close', () => clearInterval(interval));
  }

  private subscribeToRedis() {
    const subscriber = redis.duplicate();
    
    subscriber.subscribe('signalforge:events', (err) => {
      if (err) {
        logger.error('Redis subscribe failed:', err);
      }
    });

    subscriber.on('message', (channel, message) => {
      try {
        const event = JSON.parse(message);
        this.broadcastEvent(event);
      } catch (error) {
        logger.error('Redis message parse error:', error);
      }
    });
  }

  private broadcastEvent(event: { type: string; userId?: string; data: any }) {
    if (event.userId) {
      this.sendToUser(event.userId, event);
    } else {
      this.broadcast(event);
    }
  }

  sendToUser(userId: string, event: any) {
    const sockets = this.clients.get(userId);
    if (!sockets) return;

    const message = JSON.stringify(event);
    sockets.forEach(socket => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      }
    });
  }

  broadcast(event: any) {
    const message = JSON.stringify(event);
    this.wss.clients.forEach((socket: AuthenticatedSocket) => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(message);
      }
    });
  }

  // Event helpers
  async emitSignal(userId: string, signal: any) {
    await redis.publish('signalforge:events', JSON.stringify({
      type: 'signal:new',
      userId,
      data: signal,
      timestamp: new Date().toISOString(),
    }));
  }

  async emitTrade(userId: string, trade: any) {
    await redis.publish('signalforge:events', JSON.stringify({
      type: 'trade:update',
      userId,
      data: trade,
      timestamp: new Date().toISOString(),
    }));
  }

  async emitNotification(userId: string, notification: any) {
    await redis.publish('signalforge:events', JSON.stringify({
      type: 'notification:new',
      userId,
      data: notification,
      timestamp: new Date().toISOString(),
    }));
  }
}

let wsServer: WsServer | null = null;

export function initializeWebSocket(server: Server): WsServer {
  wsServer = new WsServer(server);
  return wsServer;
}

export function getWsServer(): WsServer {
  if (!wsServer) {
    throw new Error('WebSocket server not initialized');
  }
  return wsServer;
}