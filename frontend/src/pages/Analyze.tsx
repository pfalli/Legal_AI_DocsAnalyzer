import React from 'react';
import { useLocation, Link } from 'react-router-dom';

interface Metadata {
  [key: string]: any;
}
interface Clauses {
  [key: string]: string;
}
interface ExtractedData {
  document_type?: string;
  metadata?: Metadata;
  clauses?: Clauses;
  error?: string;
  raw_response?: string;
}

const Analyze: React.FC = () => {
  const location = useLocation();
  const extractedData = location.state?.extractedData as ExtractedData | undefined;
  const documentText = location.state?.documentText as string | undefined;

  if (!extractedData) {
    return <Link to="/dashboard" replace />;
  }

  if (extractedData.error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="slogan-3d" style={{ marginBottom: '1.5rem' }}>
          Error Analyzing Document
        </div>
        <div className="content-box" style={{ maxWidth: 600 }}>
          <h2 style={{ color: '#0a2342', textShadow: 'none' }}>Error</h2>
          <p style={{ color: 'red' }}>{extractedData.error}</p>
          {extractedData.raw_response && (
            <>
              <h4>Raw Response:</h4>
              <pre>{extractedData.raw_response}</pre>
            </>
          )}
        </div>
      </div>
    );
  }

  const { document_type, metadata, clauses } = extractedData;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="slogan-3d" style={{ marginBottom: '1.5rem' }}>
        Document Analysis Results
      </div>
      <div style={{ display: 'flex', gap: '32px', width: '100%', maxWidth: 1400, justifyContent: 'center' }}>
        {/* Left: Document Text */}
        <div className="content-box" style={{ flex: 1, minWidth: 0, maxHeight: '70vh', overflowY: 'auto' }}>
          <h2 style={{ color: '#0a2342', textShadow: 'none' }}>Document Text</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '1em', color: '#222' }}>
            {documentText || 'No document text available.'}
          </pre>
        </div>

        {/* Right: Extracted Data */}
        <div className="content-box" style={{ flex: 1, minWidth: 0, maxHeight: '70vh', overflowY: 'auto' }}>
          <h2 style={{ color: '#0a2342', textShadow: 'none' }}>Extracted Data</h2>
          {document_type && (
            <section style={{ marginBottom: '16px' }}>
              <strong>Document Type:</strong> {document_type}
            </section>
          )}
          {metadata && (
            <section style={{ marginBottom: '16px' }}>
              <strong>Metadata:</strong>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {Object.entries(metadata).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key.replace(/_/g, ' ')}:</strong> {Array.isArray(value) ? value.join(', ') : (value || 'Not found')}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {clauses && (
            <section>
              <strong>Clauses:</strong>
              {Object.entries(clauses).map(([clauseName, clauseText]) => (
                <div key={clauseName} style={{ marginBottom: '12px' }}>
                  <strong>{clauseName.replace(/_/g, ' ')}:</strong>
                  <div style={{ background: '#f9f9f9', borderRadius: '4px', padding: '8px', marginTop: '4px', color: '#222' }}>
                    {clauseText || 'Not found'}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyze;