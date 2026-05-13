import { ChatMessage } from '../types';
import Pusher from 'pusher-js';
import { kickFetch } from '../utils/kickApi';

type MessageCallback = (msg: ChatMessage) => void;
type DeleteCallback = (msgId: string) => void;
type StatusCallback = (connected: boolean, error: boolean, details?: string) => void;

class ChatService {
  private messageListeners: MessageCallback[] = [];
  private deleteListeners: DeleteCallback[] = [];
  private statusListeners: StatusCallback[] = [];
  private isConnected = false;
  private pusher: Pusher | null = null;
  private channel: any = null;

  async connect(channelSlug: string) {
    if (this.isConnected) return;
    this.statusListeners.forEach(listener => listener(false, false, 'Fetching channel...'));
    
    try {
      let chatroomId = 1124277; // vilon chatroom id
      if (channelSlug !== 'vilon') {
          const data = await kickFetch(`https://kick.com/api/v2/channels/${channelSlug}`);
          if (!data || !data.chatroom) {
            this.statusListeners.forEach(listener => listener(false, true, 'Failed to fetch chat'));
            return;
          }
          chatroomId = data.chatroom.id;
      }

      this.statusListeners.forEach(listener => listener(false, false, 'Connecting...'));

      if (this.pusher) {
        this.pusher.disconnect();
      }

      this.pusher = new Pusher('32cbd69e4b950bf97679', {
        cluster: 'us2',
        forceTLS: true
      });

      this.pusher.connection.bind('connected', () => {
        this.isConnected = true;
        this.statusListeners.forEach(listener => listener(true, false, 'Connected'));
      });

      this.pusher.connection.bind('disconnected', () => {
        this.isConnected = false;
        this.statusListeners.forEach(listener => listener(false, false, 'Disconnected'));
      });

      this.pusher.connection.bind('error', (err: any) => {
        console.error("Pusher connection error:", err);
        if (err && err.error && err.error.data && err.error.data.code === 4004) {
             console.error("Over limit!");
        }
        this.isConnected = false;
        this.statusListeners.forEach(listener => listener(false, true, 'Connection Error'));
      });

      this.channel = this.pusher.subscribe(`chatrooms.${chatroomId}.v2`);

      this.channel.bind('App\\Events\\ChatMessageEvent', (data: any) => {
        let role = 'user';
        const badges = data.sender?.identity?.badges || [];
        if (badges.some((b: any) => b.type === 'broadcaster')) role = 'owner';
        else if (badges.some((b: any) => b.type === 'moderator')) role = 'moderator';
        else if (badges.some((b: any) => b.type === 'vip')) role = 'vip';

        this.messageListeners.forEach(listener => listener({
          id: data.id || Math.random().toString(),
          content: data.content,
          user: { 
            username: data.sender?.username || 'Unknown', 
            color: data.sender?.identity?.color || '#FFFFFF' 
          },
          role: role as any
        }));
      });

      this.channel.bind('App\\Events\\MessageDeletedEvent', (data: any) => {
        if (data.message && data.message.id) {
          this.deleteListeners.forEach(listener => listener(data.message.id));
        }
      });

    } catch (error) {
      console.error("Chat connection error:", error);
      this.statusListeners.forEach(listener => listener(false, true, 'Error connecting'));
    }
  }

  disconnect() {
    if (this.channel) {
      this.channel.unbind_all();
      this.channel.unsubscribe();
      this.channel = null;
    }
    if (this.pusher) {
      this.pusher.disconnect();
      this.pusher = null;
    }
    this.isConnected = false;
    this.statusListeners.forEach(listener => listener(false, false, 'Disconnected'));
  }

  onMessage(callback: MessageCallback) {
    this.messageListeners.push(callback);
    return () => {
      this.messageListeners = this.messageListeners.filter(cb => cb !== callback);
    };
  }

  onDeleteMessage(callback: DeleteCallback) {
    this.deleteListeners.push(callback);
    return () => {
      this.deleteListeners = this.deleteListeners.filter(cb => cb !== callback);
    };
  }

  onStatusChange(callback: StatusCallback) {
    this.statusListeners.push(callback);
    return () => {
      this.statusListeners = this.statusListeners.filter(cb => cb !== callback);
    };
  }
}

export const chatService = new ChatService();
