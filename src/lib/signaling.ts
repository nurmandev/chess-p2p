export interface SignalingMessage {
  type: 'offer' | 'answer' | 'candidate';
  senderId: string;
  data: any;
}

export async function sendSignal(message: SignalingMessage) {
  await fetch('/api/signalling', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  });
}

export async function pollSignals(userId: string): Promise<SignalingMessage[]> {
  const response = await fetch(`/api/signalling?recipientId=${userId}`);
  const data = await response.json();
  return data.messages || [];
}
