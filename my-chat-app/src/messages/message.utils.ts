import { Messages } from './message.interface';
//formatting the file content to be saved
export function formatMessageContent(messages: Messages[]): string {
  return messages.map((msg) => `${msg.username}:${msg.text}`).join('\n');
}
//using join because it will convert the array into a single string, with a new line between each new instance
