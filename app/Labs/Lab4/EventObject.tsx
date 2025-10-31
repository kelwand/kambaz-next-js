import { useState } from "react";

interface EventInfo {
  target: string;
  type: string;
  [key: string]: unknown;
}

export default function EventObject() {
  const [event, setEvent] = useState<EventInfo | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventInfo: EventInfo = {
      target: (e.target as HTMLButtonElement).outerHTML,
      type: e.type,
    };
    setEvent(eventInfo);
  };

  return (
    <div>
      <h2>Event Object</h2>
      <button
        onClick={handleClick}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr />
    </div>
  );
}
