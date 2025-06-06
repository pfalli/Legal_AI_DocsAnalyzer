import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [extracted, setExtracted] = useState<any>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setMessage('');
      setExtracted(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/documents/upload/', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      setMessage(`Upload successful: ${result.filename} - ${result.message}`);
      setExtracted(result.extracted_clauses);
      setSelectedFile(null);
      (event.target as HTMLFormElement).reset();

      navigate('/analyze', {
        state: {
          extractedData: result.extracted_clauses,
          documentText: result.extracted_text,
        },
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setMessage(`Upload failed: ${errorMessage}`);
      console.error('Upload error:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="slogan-3d" style={{ marginBottom: '1.5rem' }}>
        Upload & Analyze Legal Documents
      </div>
      <div className="content-box" style={{ width: '100%', maxWidth: 600 }}>
        <h2 style={{ color: '#0a2342', textShadow: 'none' }}>Upload Legal Document</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="document">Choose document (PDF/DOCX):</label>
            <input
              type="file"
              id="document"
              name="document"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              required
              style={{ marginLeft: '10px' }}
            />
          </div>
          <nav>
            <button type="submit" disabled={!selectedFile} style={{ marginTop: '1rem' }}>
              Upload
            </button>
          </nav>
        </form>
        {message && <p style={{ marginTop: '1rem', color: message.startsWith('Upload failed') ? 'red' : '#0a2342' }}>{message}</p>}
      </div>
      {extracted && (
        <div className="content-box" style={{ marginTop: '2rem', background: '#fffbe6' }}>
          <h2 style={{ color: '#0a2342', textShadow: 'none' }}>Extracted Information</h2>
          {extracted.error ? (
            <pre style={{ color: 'red' }}>{JSON.stringify(extracted, null, 2)}</pre>
          ) : (
            <>
              <h3>Document Type</h3>
              <p>{extracted.document_type}</p>
              <h3>Metadata</h3>
              <pre>{JSON.stringify(extracted.metadata, null, 2)}</pre>
              <h3>Clauses</h3>
              <pre>{JSON.stringify(extracted.clauses, null, 2)}</pre>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;