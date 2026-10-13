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
  agentDefinition?: AgentDefinitionControl;
  errorMessage?: string;
  disabled?: boolean;
  className?: string;
}

export interface AgentDefinitionFields {
  name: string;
  purpose: string;
  instructions: string;
}

export interface AgentDefinitionDraft extends AgentDefinitionFields {
  id: string;
  /** Increment on every change, including provenance and requested capabilities. */
  revision: number;
  requestedCapabilities?: readonly string[];
  sourceReferences?: readonly { id: string; label: string }[];
}

export type AgentDefinitionState = {
  draft: AgentDefinitionDraft;
  errors?: Partial<Record<keyof AgentDefinitionFields, string>>;
  errorMessage?: string;
} & (
  | {
      status: "draft" | "confirming" | "error" | "cancelled";
      confirmed?: never;
    }
  | { status: "created"; confirmed: AgentDefinitionDraft }
);

export type AgentDefinitionControl = AgentDefinitionState & {
  onChange: (fields: AgentDefinitionFields) => void;
  /** Set confirming synchronously; validate and guard request identity in your consumer. */
  onConfirm: (snapshot: AgentDefinitionDraft) => void;
  /** Cancel this revision locally; this does not delete a remote resource. */
  onCancel: (identity: Pick<AgentDefinitionDraft, "id" | "revision">) => void;
};
