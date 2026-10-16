"use client";

import { AIConversation, AIMessage, AIMessageActions } from "@pycolors/ui";
import type { AIChatProps } from "./types";

export function ChatThread({
  messages,
  disabled,
  onCopy,
}: Pick<AIChatProps, "messages" | "onCopy"> & { disabled: boolean }) {
  return (
    <AIConversation>
      {messages.map((message) => (
        <AIMessage
          key={message.id}
          data-slot="ai-chat-message"
          author={message.role === "user" ? "You" : "Assistant"}
          actions={
            <AIMessageActions
              value={message.text}
              disabled={disabled}
              copyAriaLabel={`Copy ${message.role === "user" ? "your" : "assistant"} message`}
              onCopy={(text) => onCopy({ ...message, text })}
            />
          }
        >
          {message.text || "Waiting for a response…"}
        </AIMessage>
      ))}
    </AIConversation>
  );
}
