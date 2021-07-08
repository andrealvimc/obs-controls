import gql from "graphql-tag";

export const EVENT_FRAGMENT = gql`
fragment Event on Event{
  key
  title
  widget{
    widgetKey
    title
    type
  }
}
`