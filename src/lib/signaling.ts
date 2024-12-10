/* eslint-disable @typescript-eslint/no-explicit-any */

// Define the structure of a signaling message
export interface SignalingMessage {
  type: 'offer' | 'answer' | 'candidate';
  senderId: string;
  data: any;
}

// Function to send a signaling message to the server
export async function sendSignal(message: SignalingMessage) {
  try {
    const response = await fetch('/api/signaling', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });
    
    if (!response.ok) {
      throw new Error(`Signaling error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Failed to send signal:', error);
    throw error;
  }
}

// Function to poll for incoming signaling messages for a user
export async function pollSignals(userId: string): Promise<SignalingMessage[]> {
  try {
    const response = await fetch(`/api/signaling?recipientId=${userId}`);
    
    if (!response.ok) {
      throw new Error(`Polling error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    console.error('Failed to poll signals:', error);
    return [];
  }
}
