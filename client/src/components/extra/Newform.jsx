import React, { useState, useRef, useEffect } from 'react';

const EventFormModal = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  // Toggle the form visibility
  const handleShowModal = () => setShowModal(true);

  // Hide the form when clicking outside
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal]);

  return (
    <div>
      <button onClick={handleShowModal}>Create New Event</button>
      
      {showModal && (
        <div style={overlayStyle}>
          <div style={modalStyle} ref={modalRef}>
            <h2>Create New Event</h2>
            <form>
              <label>
                Event Name:
                <input type="text" name="name" />
              </label>
              <label>
                Date:
                <input type="date" name="date" />
              </label>
              <label>
                Location:
                <input type="text" name="location" />
              </label>
              <button type="submit">Create Event</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Basic styles for the modal and overlay
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '300px',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
};

export default EventFormModal;
