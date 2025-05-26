import { useState, useEffect, useCallback, useRef } from "react";

export default function AudioUpload({ onAnalyze }) {
    const [file, setFile] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [recording, setRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [file]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files?.[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleFileSelect = (e) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
                const recordedFile = new File([blob], "recorded-audio.webm", { type: "audio/webm" });
                setFile(recordedFile);
            };

            mediaRecorder.start();
            setRecording(true);
        } catch (err) {
            console.error("Microphone access denied:", err);
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setRecording(false);
    };

    return (
        <div
            className={`bg-black ring-1 ring-gray-700 p-6 rounded-lg space-y-4 text-white transition-shadow duration-300 ${
                dragActive ? "shadow-[0_0_20px_#3b82f6]" : "hover:shadow-[0_0_15px_#3b82f6]"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            {/* Upload Area */}
            <label
                htmlFor="audio-upload"
                className="block w-full p-10 border-2 border-dashed border-blue-400 rounded cursor-pointer text-center hover:bg-gray-700 transition"
            >
                {file ? (
                    <span>{file.name}</span>
                ) : (
                    <span>Drag & Drop your audio file here, or click to browse</span>
                )}
                <input
                    id="audio-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </label>

            {/* Audio Controls */}
            {audioUrl && (
                <audio controls src={audioUrl} className="w-full rounded">
                    Your browser does not support the audio element.
                </audio>
            )}

            {/* Recording Controls */}
            <div className="flex justify-center gap-4">
            <div className="">
                {!recording ? (
                    <button
                        onClick={startRecording}
                        className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        🎙️ Start Recording
                    </button>
                ) : (
                    <button
                        onClick={stopRecording}
                        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
                    >
                        ⏹️ Stop Recording
                    </button>
                )}
            </div>

            {/* Analyze Button */}
            <div className="">
                <button
                    onClick={() => file && onAnalyze(file)}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={!file}
                >
                    Analyze Audio
                </button>
            </div>
            </div>
        </div>
    );
}
