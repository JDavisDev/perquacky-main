import logo from "./assets/quackle.png";

export default function ModalDialog({ score, onClose, date }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Quackle",
          text: date + " - " + score,
          url: "https://playquackle.com",
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback behavior if Web Share API is not supported
      console.log("Web Share API not supported");
    }
  };

  return (
    <dialog open className="modal-header">
      <div>
        <img
          className="modal-img"
          src={logo}
          alt="Quackle Logo"
          height="112px"
        />
        <h4 className="score-header">You got {score}!</h4>
      </div>
      <div>
        <span>
          <button onClick={handleShare}>Share</button>
          <br></br>
          <button className="modal-close-button" onClick={onClose}>
            Close
          </button>
        </span>
      </div>
    </dialog>
  );
}
