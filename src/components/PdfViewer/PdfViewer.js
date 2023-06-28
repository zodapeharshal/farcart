import { useState, useEffect } from "react";

const PdfViewer = () => {
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await fetch(
                    "https://pdf-manager-u6c8.onrender.com/pdf-manager/files/402880f388f231c20188f23628720000",
                    {
                        headers: {
                            "Content-Type": "application/pdf",
                        },
                    }
                );

                const blob = await response.blob();

                const objectUrl = URL.createObjectURL(blob);
                setFileUrl(objectUrl);
            } catch (error) {
                console.error("Error fetching file:", error);
            }
        };

        fetchFile();

        return () => {
            // Clean up the object URL when the component unmounts
            URL.revokeObjectURL(fileUrl);
        };
    }, []);
    return (
        <div>
            <iframe
                src={fileUrl}
                width="100%"
                height="600"
                title="File Viewer"
            />
        </div>
    );
};
export default PdfViewer;
