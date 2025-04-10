import { gql } from "graphql-tag";

export default gql`
  extend type Mutation {
    testMutation(
      uid: String
      chatId: String
      limit: Int
      startAfter: String
    ): String
  }

  extend type Subscription {
    testSubscription(id: String!): String
  }
`;
