import { useEffect, useState } from 'react';
import EventControl from '../components/EventControl';
import SelectEvent from '../components/SelectEvent';

export default () => {
  const [eventKey, setEventKey] = useState('');

  if (!eventKey) {
    return <SelectEvent setEventKey={setEventKey} />
  }

  return (
    <EventControl eventKey={eventKey} setEventKey={setEventKey} />
  )
}
