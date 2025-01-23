export default function ModalDialog({ score, onClose }) {
  return (
    <dialog open>
      <p>You got {score}!</p>
      <button onClick={onClose}>Close</button>
    </dialog>
  );
}
