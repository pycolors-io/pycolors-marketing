"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Copy,
  MessagesSquare,
  Plus,
  RotateCcw,
  TextCursorInput,
} from "lucide-react";
import {
  AIConversation,
  AIMessage,
  AIMessageActions,
  Button,
} from "@pycolors/ui";

const response =
  "Start with one useful flow. Keep messages readable, copying recoverable, and the reader in control of scrolling.";
const primitives = [
  {
    name: "AIConversation",
    slug: "ai-conversation",
    icon: MessagesSquare,
    detail:
      "Follow new messages while keeping your place when you scroll back.",
  },
  {
    name: "AIMessage",
    slug: "ai-message",
    icon: TextCursorInput,
    detail: "Compose an author, message content and optional actions.",
  },
  {
    name: "AIMessageActions",
    slug: "ai-message-actions",
    icon: Copy,
    detail: "Copy a response with visible success and retry feedback.",
  },
] as const;

export function UiConversationPreview() {
  const [count, setCount] = useState(2);
  return (
    <section
      id="conversation-primitives"
      aria-labelledby="conversation-primitives-heading"
      className="scroll-mt-24 border-t border-border/50 p-5 sm:p-7"
    >
      <div className="grid min-w-0 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="min-w-0">
          <p className="text-xs font-medium text-primary">
            Conversation primitives · Free UI
          </p>
          <h3
            id="conversation-primitives-heading"
            className="mt-3 text-2xl font-semibold tracking-tight"
          >
            Your assistant. Your visual language.
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The same colors, typography and controls, now in a conversation.
            Switch the appearance above, copy a response or add sample messages.
          </p>
          <ul className="mt-5 divide-y divide-border/50">
            {primitives.map(({ name, slug, icon: Icon, detail }) => (
              <li key={slug} className="py-3">
                <Link
                  href={`/docs/ui/${slug}`}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <Icon aria-hidden="true" className="size-4 text-primary" />
                  {name}
                </Link>
                <p className="text-xs leading-6 text-muted-foreground">
                  {detail}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">
            Check the guides for package-version availability. Compose these
            with{" "}
            <Link
              href="/docs/ui/ai-composer"
              className="underline underline-offset-4"
            >
              AIComposer
            </Link>
            ; your app supplies the model connection.
          </p>
        </div>
        <div className="min-w-0 self-start overflow-hidden rounded-md border border-border bg-background shadow-sm">
          <div className="flex items-center gap-3 border-b border-border px-5 py-4">
            <MessagesSquare
              aria-hidden="true"
              className="size-5 text-primary"
            />
            <div>
              <p className="text-sm font-medium">Product assistant</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Sample conversation · No model connected
              </p>
            </div>
          </div>
          <AIConversation
            label="Product assistant demo"
            messagesLabel="Product assistant messages"
            viewportClassName="h-80 max-h-80"
            className="rounded-none border-0"
          >
            {Array.from({ length: count }, (_, index) => (
              <AIMessage
                key={index}
                author={index % 2 ? "Assistant" : "You"}
                actions={
                  index % 2 ? (
                    <AIMessageActions
                      value={response}
                      copyAriaLabel={`Copy sample response ${Math.ceil(index / 2)}`}
                      onCopy={async (value) => {
                        await navigator.clipboard.writeText(value);
                      }}
                    />
                  ) : undefined
                }
              >
                {index % 2
                  ? response
                  : "How can I make my first assistant interface easier to use?"}
              </AIMessage>
            ))}
          </AIConversation>
          <div className="space-y-3 border-t border-border bg-muted/30 p-4">
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={count >= 20}
                onClick={() => setCount((value) => Math.min(value + 2, 20))}
              >
                <Plus aria-hidden="true" />
                Add sample exchange
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setCount(2)}>
                <RotateCcw aria-hidden="true" />
                Reset conversation
              </Button>
            </div>
            <p role="status" className="text-xs text-muted-foreground">
              {count} sample messages · Stored only in this preview.
            </p>
            <p className="text-xs leading-6 text-muted-foreground">
              Scroll back, then add an exchange. Choose Jump to latest when you
              are ready to catch up. Copy writes sample text to your clipboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
