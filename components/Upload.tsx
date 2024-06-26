import { useState, ChangeEvent } from "react";

interface UploadProps {
    onUploadSuccess: (uploadId: string) => void;
}

const Upload: React.FC<UploadProps> = ({ onUploadSuccess }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError(null);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to get upload URL: ${response.statusText}`
                );
            }

            const data = await response.json();
            const uploadUrl = data.uploadUrl;
            const uploadId = data.uploadId;

            const uploadResponse = await fetch(uploadUrl, {
                method: "PUT",
                body: file,
            });

            if (!uploadResponse.ok) {
                throw new Error(`Upload failed: ${uploadResponse.statusText}`);
            }

            console.log("Upload ID:", uploadId);
            onUploadSuccess(uploadId);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
    );
};

export default Upload;
