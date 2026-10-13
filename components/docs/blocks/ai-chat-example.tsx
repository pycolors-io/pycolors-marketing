"use client";

import * as React from "react";
import { Badge, Button } from "@pycolors/ui";
import {
  AIChat,
  type ChatMessage,
  type ChatStatus,
} from "@/content/blocks/app-shells/ai-chat";

const response =
  "Start with one clear outcome.\n\n1. Describe the person using your product and the task they need to finish.\n2. Build the smallest useful flow, including empty, loading and error states.\n3. Validate it in a real project before adding more features.\n\nThis is a fixed local example, not a generated answer.";

export function AIChatExample() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [draft, setDraft] = React.useState("");
  const [status, setStatus] = React.useState<ChatStatus>("idle");
  const [failNext, setFailNext] = React.useState(false);
  const timer = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const run = React.useRef(0);
  const sequence = React.useRef(0);
  const lastResponse = React.useRef<string | null>(null);
  const busy = React.useRef(false);
  const cancel = React.useCallback(() => {
    run.current++;
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    busy.current = false;
  }, []);
  React.useEffect(() => cancel, [cancel]);

  function begin(id: string) {
    cancel();
    busy.current = true;
    setStatus("submitting");
    const token = run.current;
    const fail = failNext;
    setFailNext(false);
    let position = 0;
    timer.current = setInterval(() => {
      if (run.current !== token) return;
      if (fail) {
        cancel();
        setStatus("error");
        return;
      }
      position = Math.min(position + 32, response.length);
      setMessages((current) => {
        const next = {
          id,
          role: "assistant" as const,
          text: response.slice(0, position),
        };
        return current.some((item) => item.id === id)
          ? current.map((item) => (item.id === id ? next : item))
          : [...current, next];
      });
      if (position === response.length) {
        cancel();
        setStatus("idle");
      } else setStatus("streaming");
    }, 160);
  }

  return (
    <div className="not-prose space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge variant="outline">Local demo — no AI request</Badge>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="min-h-11"
            aria-pressed={failNext}
            disabled={status === "submitting" || status === "streaming"}
            onClick={() => setFailNext((value) => !value)}
          >
            Fail next response
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="min-h-11"
            onClick={() => {
              cancel();
              setMessages([]);
              setDraft("");
              setStatus("idle");
              setFailNext(false);
              lastResponse.current = null;
            }}
          >
            Reset demo
          </Button>
        </div>
      </div>
      <AIChat
        messages={messages}
        draft={draft}
        status={status}
        onDraftChange={setDraft}
        suggestions={[
          {
            id: "plan",
            label: "Plan a product",
            prompt: "Help me plan the first useful version of my product.",
          },
          {
            id: "review",
            label: "Review an interface",
            prompt: "What should I check before shipping a new interface?",
          },
        ]}
        errorMessage="This is a simulated error. Retry to play the local response."
        onSubmit={(text) => {
          if (busy.current || !text.trim()) return;
          const id = `demo-${++sequence.current}`;
          lastResponse.current = `${id}-reply`;
          setMessages((current) => [...current, { id, role: "user", text }]);
          setDraft("");
          begin(lastResponse.current);
        }}
        onStop={() => {
          cancel();
          setStatus("stopped");
        }}
        onRetry={
          lastResponse.current
            ? () => {
                if (lastResponse.current) begin(lastResponse.current);
              }
            : undefined
        }
        onCopy={(message) => navigator.clipboard.writeText(message.text)}
      />
      <p className="text-xs leading-5 text-muted-foreground">
        Responses are fixed examples. Nothing is sent or saved. You can stop,
        retry, edit your next message or test a failure.
      </p>
    </div>
  );
}
