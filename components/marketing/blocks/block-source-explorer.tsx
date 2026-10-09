"use client";

import { useId, useRef, useState } from "react";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Files, Folder } from "fumadocs-ui/components/files";
import {
  Check,
  ChevronDown,
  Copy,
  Download,
  FileCode2,
  LoaderCircle,
  PanelLeft,
} from "lucide-react";
import { SiteButton as Button } from "@/components/site-button";

import type { BlockSource, BlockSourceFile } from "@/lib/blocks/source";
import styles from "./block-source-explorer.module.css";

type FileNode =
  | { kind: "file"; name: string; path: string; file: BlockSourceFile }
  | { kind: "folder"; name: string; path: string; children: FileNode[] };

function fileTree(source: BlockSource): FileNode[] {
  const tree: FileNode[] = [];
  for (const file of source.files) {
    const parts = `${source.directory}/${file.path}`.split("/");
    let children = tree;
    parts.forEach((name, index) => {
      const path = parts.slice(0, index + 1).join("/");
      if (index === parts.length - 1) {
        children.push({ kind: "file", name, path, file });
        return;
      }
      let folder = children.find(
        (node) => node.kind === "folder" && node.path === path,
      );
      if (!folder || folder.kind !== "folder") {
        folder = { kind: "folder", name, path, children: [] };
        children.push(folder);
      }
      children = folder.children;
    });
  }
  return tree;
}

function FileTree({
  nodes,
  selectedPath,
  onSelect,
}: Readonly<{
  nodes: readonly FileNode[];
  selectedPath: string;
  onSelect: (path: string) => void;
}>) {
  return (
    <ul className={styles.tree}>
      {nodes.map((node) => (
        <li key={node.path}>
          {node.kind === "folder" ? (
            <Folder name={node.name} defaultOpen className={styles.folder}>
              <FileTree
                nodes={node.children}
                selectedPath={selectedPath}
                onSelect={onSelect}
              />
            </Folder>
          ) : (
            <button
              type="button"
              className={styles.file}
              aria-label={node.file.path}
              aria-pressed={selectedPath === node.file.path}
              onClick={() => onSelect(node.file.path)}
              title={node.file.path}
            >
              <FileCode2 aria-hidden="true" />
              <span>{node.name}</span>
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export function BlockSourceExplorer({
  source,
  active,
}: Readonly<{ source: BlockSource; active: boolean }>) {
  const id = useId();
  const [selectedPath, setSelectedPath] = useState(source.files[0].path);
  const [showFiles, setShowFiles] = useState(true);
  const [feedback, setFeedback] = useState<
    "idle" | "copied" | "copy-failed" | "download-requested" | "download-failed"
  >("idle");
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadPending = useRef(false);
  const feedbackRequest = useRef(0);
  const codeRef = useRef<HTMLDivElement>(null);
  const file =
    source.files.find((item) => item.path === selectedPath) ?? source.files[0];
  const fullPath = `${source.directory}/${file.path}`;
  const multiple = source.files.length > 1;

  function selectFile(path: string) {
    feedbackRequest.current += 1;
    setSelectedPath(path);
    setFeedback("idle");
    codeRef.current?.scrollTo?.({ top: 0, left: 0 });
  }

  async function copyFile() {
    const request = ++feedbackRequest.current;
    try {
      await navigator.clipboard.writeText(file.content);
      if (request === feedbackRequest.current) setFeedback("copied");
    } catch {
      if (request === feedbackRequest.current) setFeedback("copy-failed");
    }
  }

  async function downloadBlock() {
    if (downloadPending.current) return;
    downloadPending.current = true;
    setIsDownloading(true);
    setFeedback("idle");
    const request = ++feedbackRequest.current;
    try {
      const { downloadBlockSource } = await import("@/lib/blocks/download");
      downloadBlockSource(source);
      if (request === feedbackRequest.current)
        setFeedback("download-requested");
    } catch {
      if (request === feedbackRequest.current) setFeedback("download-failed");
    } finally {
      downloadPending.current = false;
      setIsDownloading(false);
    }
  }

  return (
    <div className={styles.explorer}>
      <div className={styles.toolbar}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={styles.toggle}
          aria-expanded={showFiles}
          aria-controls={`${id}-files`}
          onClick={() => setShowFiles((current) => !current)}
        >
          <PanelLeft className="size-4" aria-hidden="true" />
          Files
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={styles.copy}
          onClick={copyFile}
          aria-label={feedback === "copied" ? "File copied" : "Copy file"}
          title={`Copy ${file.path}`}
        >
          {feedback === "copied" ? (
            <Check className="size-3.5" aria-hidden="true" />
          ) : (
            <Copy className="size-3.5" aria-hidden="true" />
          )}
          <span>{feedback === "copied" ? "Copied" : "Copy file"}</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className={styles.download}
          onClick={downloadBlock}
          disabled={isDownloading}
          aria-busy={isDownloading}
          aria-label="Download complete block as ZIP"
          title={`Download all ${source.files.length} ${multiple ? "files" : "file"}`}
        >
          {isDownloading ? (
            <LoaderCircle
              className="size-3.5 animate-spin motion-reduce:animate-none"
              aria-hidden="true"
            />
          ) : (
            <Download className="size-3.5" aria-hidden="true" />
          )}
          Download ZIP
        </Button>

        <div
          className={styles.filename}
          data-multiple={multiple}
          title={fullPath}
        >
          <FileCode2 aria-hidden="true" />
          <span className={styles.directory}>{source.directory}/</span>
          <span>{file.path}</span>
        </div>

        {multiple ? (
          <div className={styles.mobileSelect}>
            <FileCode2 aria-hidden="true" />
            <select
              aria-label="Source file"
              value={file.path}
              onChange={(event) => selectFile(event.target.value)}
            >
              {source.files.map((item) => (
                <option key={item.path} value={item.path}>
                  {item.path}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" />
          </div>
        ) : null}
      </div>

      <div className={styles.body} data-files-open={showFiles}>
        <nav
          id={`${id}-files`}
          aria-label="Block source files"
          className={styles.sidebar}
          hidden={!showFiles}
        >
          <div className={styles.sidebarHeading}>
            <span>Files</span>
            <span>{source.files.length}</span>
          </div>
          <Files className={styles.files}>
            <FileTree
              nodes={fileTree(source)}
              selectedPath={file.path}
              onSelect={selectFile}
            />
          </Files>
        </nav>

        <div
          className={styles.code}
          role="region"
          aria-label={`Source code: ${file.path}`}
          tabIndex={0}
          ref={codeRef}
        >
          {active ? (
            <DynamicCodeBlock
              key={file.path}
              code={file.content}
              lang={file.language}
              codeblock={{ allowCopy: false }}
              options={{
                themes: { light: "github-light", dark: "github-dark" },
              }}
            />
          ) : null}
        </div>
      </div>

      <div className={styles.statusbar}>
        <p role="status" aria-live="polite">
          {feedback === "copy-failed"
            ? "Copy unavailable. Select the code and copy it manually."
            : feedback === "copied"
              ? `${file.path} copied.`
              : feedback === "download-failed"
                ? "Download could not start. Try again or copy each file."
                : feedback === "download-requested"
                  ? "ZIP download requested. Extract the folder into your app."
                  : "Download the block or copy files, keeping this folder structure."}
        </p>
        <span className={styles.language}>{file.language.toUpperCase()}</span>
      </div>
    </div>
  );
}
