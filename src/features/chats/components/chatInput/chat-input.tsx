import React, { useState } from "react";
import { FilePicker } from "../file-picker/file-picker";
import "./chat-input.css";
import type { FileType } from "@core/types/core-types";
import { AudioRecorder } from "../audio-recorder/audio-recorder";

type Props = {
    onSend: (content: string, file?: File, tipo?: FileType) => void;
}

export function ChatInput({ onSend }: Props) {
    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const content = message.trim();

        if (!content && !selectedFile) return;

        const tipo: FileType | undefined = selectedFile
            ? selectedFile.type.startsWith("image/")
                ? "photos"
                : "multimedia"
            : undefined;
        onSend(content, selectedFile ?? undefined, tipo);

        setMessage("");
        setSelectedFile(null);

    }

    function handleFileSelected(file: File) {
        setSelectedFile(file);
    }

    function handleRecordingComplete(file: File) {
        onSend("", file, "audio");
    }

    return (
        <div className="chat-input-container">
            {selectedFile && (
                <div className="chat-selected-file">
                    <div className="chat-selected-file__icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="3" y="3" width="18" height="18" rx="3" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="m21 15-5-5L5 21" />
                        </svg>
                    </div>
                    <span className="chat-selected-file__name">{selectedFile.name}</span>
                    <button
                        type="button"
                        className="chat-selected-file__remove"
                        onClick={() => setSelectedFile(null)}
                        aria-label="Quitar archivo seleccionado"
                    >
                        ×
                    </button>
                </div>
            )}
            <form onSubmit={handleSubmit} className="chat-input">
                <FilePicker onFileSelected={handleFileSelected} />

                <input value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    type="text"
                    className="message-input"
                    placeholder="Escribe un mensaje..."
                />

                <button className="send-button" type="submit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M22 2 11 13" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="m22 2-7 20-4-9-9-4 20-7Z" />
                    </svg>
                </button>

                <AudioRecorder onRecordingComplete={handleRecordingComplete} />
            </form>
        </div>
    )
}