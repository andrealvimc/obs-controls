import gql from "graphql-tag";
import { Event } from "../../../types/interfaces";
import { EVENT_FRAGMENT } from "../fragment/event";

export interface EVENT_SUBSCRIPTION_TYPE {
  eventSubscription: Event;
}
export const EVENT_SUBSCRIPTION = gql`
subscription($eventKey: String!){
    eventSubscription(eventKey: $eventKey){
     ...Event
    }
  }
  ${EVENT_FRAGMENT}`