import "./infoContent.scss";

export default function infoContent({ onClose }: { onClose: () => void }) {
  return (
   <div>
    info content here
    <button onClick={onClose}>Close</button>

    
   </div>
  )
}
