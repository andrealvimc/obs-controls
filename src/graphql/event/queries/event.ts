import gql from "graphql-tag";
import { Event } from "../../../types/interfaces";
import { EVENT_FRAGMENT } from "../fragment/event";

export interface EVENT_TYPE {
  event: Event;
}
export const EVENT = gql`
query($eventKey: String!){
    event(eventKey: $eventKey){
      ...Event
    }
  }
  ${EVENT_FRAGMENT}`