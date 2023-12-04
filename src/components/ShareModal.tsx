import React, { useState } from 'react';

function ShareModal({ isOpen, onClose, onShare, fileId }: any) {
  const [emails, setEmails] = useState<string[]>(['abc@gmail.com', 'final-dsy@gmail.com']);
  const [emailInput, setEmailInput] = useState('');

  const handleAddEmail = () => {
    if (emailInput && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setEmails([...emails, emailInput]);
      setEmailInput('');
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const handleShare = () => {
    onShare(fileId, emails);
    setEmails([]);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', minWidth: '500px' }}>
        <div style={{ marginBottom: '20px' }} className='flex justify-between'>
          <h2 className='font-bold text-xl'>Share File</h2>
        </div>
        <div>
          <input
            type="email"
            placeholder="Enter email to share with"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            style={{ padding: '10px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
          <button onClick={handleAddEmail} style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#007bff', color: 'white', border: 'none' }}>Add Email</button>
        </div>
        {emails.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <strong>Share with:</strong>
            <ul>
              {emails.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
          </div>
        )}
        <div className='flex justify-end mt-10'>
          <button onClick={onClose}>Close</button>
          <button onClick={handleShare} style={{ padding: '10px', borderRadius: '4px', backgroundColor: '#28a745', color: 'white', border: 'none', marginLeft: '20px' }}>Share</button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
