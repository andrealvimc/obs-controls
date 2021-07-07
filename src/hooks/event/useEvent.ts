import { useQuery, useSubscription } from "@apollo/client";
import { EVENT_TYPE, EVENT } from './../../graphql/event/queries/event';
import { EVENT_SUBSCRIPTION_TYPE, EVENT_SUBSCRIPTION } from './../../graphql/event/subscription/event-subscription';
import { Event } from '../../types/interfaces'

export function useEvent(eventKey: string) {

  const { data, loading, error } = useQuery<EVENT_TYPE>(EVENT, {
    variables: {
      eventKey
    }
  });

  useSubscription<EVENT_SUBSCRIPTION_TYPE>(EVENT_SUBSCRIPTION, {
    variables: {
      eventKey
    }
  });

  return {
    event: data ? data.event : {} as Event,
    loading,
    error
  }
}