export type ChatStatus =
  "idle" | "submitting" | "streaming" | "stopped" | "error";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export interface ChatSuggestion {
  id: string;
  label: string;
  prompt: string;
}

/** Source-copy API. Requests, IDs, draft and persistence belong to the consumer. */
export interface AIChatProps {
  messages: readonly ChatMessage[];
  draft: string;
  status: ChatStatus;
  onDraftChange: (draft: string) => void;
  onSubmit: (draft: string) => void;
  onStop?: () => void;
  onRetry?: () => void;
  /** Resolve only after the clipboard operation succeeds; reject on failure. */
  onCopy: (message: ChatMessage) => Promise<void>;
  suggestions?: readonly ChatSuggestion[];
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
}
