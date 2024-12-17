import React, { useState } from "react";
import "../../style/ratingModal.css"; // Optional for styling
import RatingComponent from "../rating/SetRating";

function Modal({ name, eventID }) {
  const [showModal, setShowModal] = useState(false);

  // Toggle function
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div >
      {/* Button to toggle modal */}
      <button onClick={toggleModal} className="plus-btn">דרג את החברה</button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay-rate">
          <div className="modal-rate">
            <span className="close-btn-rate" onClick={toggleModal}>
              &times;
            </span>
            <RatingComponent  name={name}
            eventID={eventID}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
