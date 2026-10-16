"use client";

import { useState } from "react";
import {
  AIConversation,
  AIMessage,
  AIMessageActions,
  Button,
} from "@pycolors/ui";
import { MessageSquare, RotateCcw, Plus, TriangleAlert } from "lucide-react";
import { Preview } from "@/components/docs/preview";

export function AIMessageExample() {
  return (
    <Preview>
      <ol className="m-0 list-none p-0" aria-label="Example messages">
        <AIMessage author="You">What should I build first?</AIMessage>
        <AIMessage author="Assistant">
          Start with one useful flow. Include empty, loading and recovery states
          before adding more features.
        </AIMessage>
      </ol>
    </Preview>
  );
}

export function AIMessageActionsExample() {
  const [fail, setFail] = useState(false);
  const text = "Start with one useful flow, including recovery from errors.";
  return (
    <Preview className="space-y-4">
      <p className="text-sm leading-6 text-foreground">{text}</p>
      <AIMessageActions
        value={text}
        copyAriaLabel="Copy example response"
        onCopy={async (value) => {
          if (fail) throw new Error("Simulated copy failure");
          await navigator.clipboard.writeText(value);
        }}
      />
      <Button
        variant="outline"
        size="sm"
        aria-pressed={fail}
        onClick={() => setFail(!fail)}
      >
        <TriangleAlert aria-hidden="true" />
        {fail ? "Disable simulated failure" : "Simulate copy failure"}
      </Button>
      <p className="text-xs leading-5 text-muted-foreground">
        Copy writes this sample text to your clipboard. Enable the failure
        toggle to try recovery; disable it to retry.
      </p>
    </Preview>
  );
}

export function AIConversationExample() {
  const [count, setCount] = useState(6);
  return (
    <Preview className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <MessageSquare className="size-4 text-primary" aria-hidden="true" />
        <span className="text-sm font-medium">Local conversation example</span>
      </div>
      <AIConversation
        label="Example conversation"
        messagesLabel="Example messages"
        viewportClassName="max-h-64"
      >
        {Array.from({ length: count }, (_, index) => (
          <AIMessage key={index} author={index % 2 ? "Assistant" : "You"}>
            {index % 2
              ? "Start with one clear outcome and keep recovery visible. This is a fixed sample response."
              : "How can I make the next step clearer for the person using this interface?"}
          </AIMessage>
        ))}
      </AIConversation>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={count >= 30}
          onClick={() => setCount(count + 1)}
        >
          <Plus aria-hidden="true" />
          Add sample message
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setCount(6)}>
          <RotateCcw aria-hidden="true" />
          Reset example
        </Button>
      </div>
      <p className="text-xs leading-5 text-muted-foreground">
        Scroll up, then add a message: your reading position stays put. Choose
        Jump to latest to resume following. No model is connected.
      </p>
    </Preview>
  );
}
