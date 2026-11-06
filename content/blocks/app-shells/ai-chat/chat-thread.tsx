"use client";

import { defaultChatTranslate } from "./types";

import { AIConversation, AIMessage, AIMessageActions } from "@pycolors/ui";
import type { AIChatProps } from "./types";

export function ChatThread({
  messages,
  disabled,
  onCopy,
  translate = defaultChatTranslate,
}: Pick<AIChatProps, "messages" | "onCopy" | "translate"> & {
  disabled: boolean;
}) {
  return (
    <AIConversation>
      {messages.map((message) => (
        <AIMessage
          key={message.id}
          data-slot="ai-chat-message"
          author={translate(message.role === "user" ? "You" : "Assistant")}
          actions={
            <AIMessageActions
              value={message.text}
              disabled={disabled}
              copyAriaLabel={translate(
                message.role === "user"
                  ? "Copy your message"
                  : "Copy assistant message",
              )}
              copyLabel={translate("Copy")}
              pendingLabel={translate("Copying…")}
              successLabel={translate("Copied.")}
              errorLabel={translate(
                "Could not copy. Select the text to copy it manually.",
              )}
              onCopy={(text) => onCopy({ ...message, text })}
            />
          }
        >
          {message.text || translate("Waiting for a response…")}
        </AIMessage>
      ))}
    </AIConversation>
  );
}
