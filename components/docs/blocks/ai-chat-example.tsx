"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import * as React from "react";
import { Badge, Button } from "@pycolors/ui";
import {
  AIChat,
  type AgentDefinitionDraft,
  type AgentDefinitionState,
  type ChatMessage,
  type ChatStatus,
} from "@/content/blocks/app-shells/ai-chat";

import { useLocalChatFile } from "./use-local-chat-file";
import {
  useWorkSimulation,
  WorkSimulationControls,
  workSamplePrompt,
} from "./work-simulation";

const filePrompt =
  "Create a local definition using the selected file as a reference.";

const agentPrompt = "Create a local definition for a product review assistant.";

const response =
  "Start with one clear outcome.\n\n1. Describe the person using your product and the task they need to finish.\n2. Build the smallest useful flow, including empty, loading and error states.\n3. Validate it in a real project before adding more features.\n\nThis is a fixed local example, not a generated answer.";

export function AIChatExample() {
  const tSite = useCopy();

  const workSimulation = useWorkSimulation();
  const localizedResponse = tSite(response);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [draft, setDraft] = React.useState("");
  const [status, setStatus] = React.useState<ChatStatus>("idle");
  const [failNext, setFailNext] = React.useState(false);
  const [agent, setAgent] = React.useState<AgentDefinitionState>();
  const [failConfirmation, setFailConfirmation] = React.useState(false);
  const agentRun = React.useRef(0);
  const agentPending = React.useRef(false);
  const agentTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelAgent = React.useCallback(() => {
    agentRun.current++;
    agentPending.current = false;
    if (agentTimer.current) clearTimeout(agentTimer.current);
    agentTimer.current = null;
  }, []);
  React.useEffect(() => cancelAgent, [cancelAgent]);

  function confirmAgent(snapshot: AgentDefinitionDraft) {
    if (agentPending.current) return;
    cancelAgent();
    agentPending.current = true;
    const token = agentRun.current;
    const fail = failConfirmation;
    setFailConfirmation(false);
    setAgent({ draft: snapshot, status: "confirming" });
    agentTimer.current = setTimeout(() => {
      if (token !== agentRun.current) return;
      agentPending.current = false;
      agentTimer.current = null;
      setAgent((current) => {
        if (
          !current ||
          current.status !== "confirming" ||
          current.draft.id !== snapshot.id ||
          current.draft.revision !== snapshot.revision
        )
          return current;
        return fail
          ? {
              draft: current.draft,
              status: "error",
              errorMessage: tSite(
                "Simulated confirmation failure. Your edits are kept; try again.",
              ),
            }
          : { draft: current.draft, status: "created", confirmed: snapshot };
      });
    }, 900);
  }

  const fileIntent = React.useRef<string | null>(null);
  const localFile = useLocalChatFile({
    onUseSource: (source) => {
      fileIntent.current = source.id;
      setDraft(tSite(filePrompt));
    },
    onRemoveSource: (id) => {
      if (fileIntent.current === id) fileIntent.current = null;
      if (!agent?.draft.sourceReferences?.some((source) => source.id === id))
        return;
      cancelAgent();
      setAgent((current) =>
        current
          ? {
              status: "draft",
              draft: {
                ...current.draft,
                revision: current.draft.revision + 1,
                sourceReferences: current.draft.sourceReferences?.filter(
                  (source) => source.id !== id,
                ),
              },
            }
          : current,
      );
    },
  });

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
      position = Math.min(position + 32, localizedResponse.length);
      setMessages((current) => {
        const next = {
          id,
          role: "assistant" as const,
          text: localizedResponse.slice(0, position),
        };
        return current.some((item) => item.id === id)
          ? current.map((item) => (item.id === id ? next : item))
          : [...current, next];
      });
      if (position === localizedResponse.length) {
        cancel();
        setStatus("idle");
      } else setStatus("streaming");
    }, 160);
  }

  return (
    <div className="not-prose space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge variant="outline">{tSite("Local demo — no AI request")}</Badge>
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
            {tSite("Fail next response")}
          </Button>
          {agent &&
          agent.status !== "created" &&
          agent.status !== "cancelled" ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="min-h-11"
              aria-pressed={failConfirmation}
              disabled={agent.status === "confirming"}
              onClick={() => setFailConfirmation((value) => !value)}
            >
              {tSite("Fail next confirmation")}
            </Button>
          ) : null}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="min-h-11"
            onClick={() => {
              cancel();
              cancelAgent();
              localFile.reset();
              workSimulation.reset();
              fileIntent.current = null;
              setAgent(undefined);
              setFailConfirmation(false);
              setMessages([]);
              setDraft("");
              setStatus("idle");
              setFailNext(false);
              lastResponse.current = null;
            }}
          >
            {tSite("Reset demo")}
          </Button>
        </div>
      </div>
      <AIChat
        translate={tSite}
        messages={messages}
        draft={draft}
        status={status}
        onDraftChange={setDraft}
        attachments={{
          ...localFile.control,
          policy: {
            ...localFile.control.policy,
            formatsLabel: tSite(localFile.control.policy.formatsLabel),
            readLabel: tSite(localFile.control.policy.readLabel),
            description: tSite(localFile.control.policy.description),
          },
          errorMessage: tSite(localFile.control.errorMessage),
          announcement: tSite(localFile.control.announcement),
          items: localFile.control.items.map((item) =>
            item.status === "error"
              ? { ...item, errorMessage: tSite(item.errorMessage) }
              : item,
          ),
        }}
        work={
          workSimulation.work
            ? {
                ...workSimulation.work,
                title: tSite(workSimulation.work.title),
                description: tSite(workSimulation.work.description),
                steps: workSimulation.work.steps.map((step) => ({
                  ...step,
                  label: tSite(step.label),
                  detail: tSite(step.detail),
                })),
                errorMessage: tSite(workSimulation.work.errorMessage),
                actionError: tSite(workSimulation.work.actionError),
                result: workSimulation.work.result
                  ? {
                      ...workSimulation.work.result,
                      text: tSite(workSimulation.work.result.text),
                      links: workSimulation.work.result.links?.map((link) => ({
                        ...link,
                        label: tSite(link.label),
                      })),
                    }
                  : undefined,
              }
            : undefined
        }
        agentDefinition={
          agent
            ? {
                ...agent,
                onChange: (fields) => {
                  cancelAgent();
                  setAgent((current) =>
                    current
                      ? {
                          draft: {
                            ...current.draft,
                            ...fields,
                            revision: current.draft.revision + 1,
                          },
                          status: "draft",
                        }
                      : current,
                  );
                },
                onConfirm: confirmAgent,
                onCancel: (identity) => {
                  cancelAgent();
                  setAgent((current) =>
                    current &&
                    current.draft.id === identity.id &&
                    current.draft.revision === identity.revision
                      ? { draft: current.draft, status: "cancelled" }
                      : current,
                  );
                },
              }
            : undefined
        }
        suggestions={[
          {
            id: "work",
            label: tSite("Review a task plan (demo)"),
            prompt: tSite(workSamplePrompt),
          },
          {
            id: "agent",
            label: tSite("Define an agent (demo)"),
            prompt: tSite(agentPrompt),
          },
          {
            id: "plan",
            label: tSite("Plan a product"),
            prompt: tSite(
              "Help me plan the first useful version of my product.",
            ),
          },
          {
            id: "review",
            label: tSite("Review an interface"),
            prompt: tSite(
              "What should I check before shipping a new interface?",
            ),
          },
        ]}
        errorMessage={tSite(
          "This is a simulated error. Retry to play the local response.",
        )}
        onSubmit={(text) => {
          if (busy.current || !text.trim()) return;
          const id = `demo-${++sequence.current}`;
          lastResponse.current = `${id}-reply`;
          setMessages((current) => [...current, { id, role: "user", text }]);
          setDraft("");
          if (text.trim() === tSite(workSamplePrompt)) {
            workSimulation.start();
            lastResponse.current = null;
            setStatus("idle");
            setMessages((current) => [
              ...current,
              {
                id: `${id}-reply`,
                role: "assistant",
                text: tSite(
                  "Work simulation only. Review the fictional plan below, then use the simulation controls to supply states. No task is executing.",
                ),
              },
            ]);
            return;
          }
          const fileRequest = text.trim() === tSite(filePrompt);
          const fileSource =
            fileRequest && localFile.source?.id === fileIntent.current
              ? localFile.source
              : undefined;
          if (fileRequest && !fileSource) {
            lastResponse.current = null;
            setStatus("idle");
            setMessages((current) => [
              ...current,
              {
                id: `${id}-reply`,
                role: "assistant",
                text: tSite(
                  "Read a supported local file and choose Use as reference before sending this sample request. No definition was created.",
                ),
              },
            ]);
            return;
          }
          if (text.trim() === tSite(agentPrompt) || fileSource) {
            cancelAgent();
            setAgent({
              draft: {
                id: `${id}-agent`,
                revision: 0,
                name: tSite("Product review assistant"),
                purpose: tSite(
                  "Help a product team review a proposed interface.",
                ),
                instructions: tSite(
                  "Review clarity, keyboard access and error recovery. Explain tradeoffs. Ask before recommending changes outside the supplied context.",
                ),
                requestedCapabilities: [
                  tSite("Read user-provided product context"),
                ],
                sourceReferences: [
                  ...(fileSource ? [fileSource] : []),
                  {
                    id: id,
                    label: tSite(
                      "Explicit sample request in this conversation",
                    ),
                  },
                ],
              },
              status: "draft",
            });
            lastResponse.current = null;
            setStatus("idle");
            setMessages((current) => [
              ...current,
              {
                id: `${id}-reply`,
                role: "assistant",
                text: tSite(
                  fileSource
                    ? "Sample definition with a locally read source reference. The file was not analyzed by a model and its text is not part of the JSON. Review and confirm explicitly."
                    : "Simulated draft from the exact sample request. Review the fields below, then confirm explicitly. No agent is running.",
                ),
              },
            ]);
          } else begin(lastResponse.current);
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
      <WorkSimulationControls simulation={workSimulation} translate={tSite} />
      <p className="text-xs leading-5 text-muted-foreground">
        {tSite(
          "Responses, agent drafts and Work states are fixed examples. Only the exact agent sample requests open a definition. A file is read only when you choose Read locally; it is not analyzed by a model. Nothing is sent to a provider or stored remotely. Confirmed definitions can be copied or downloaded locally.",
        )}
      </p>
    </div>
  );
}
