import { PubSub } from "graphql-subscriptions";

const testMutation = async (
  parent: null,
  args: { uid: string; chatId: string; limit: number; startAfter: string },
  actions: { pubsub: PubSub; uid: string }
) => {
  return "SUCCESS";
};

export default {
  Mutation: {
    testMutation,
  },
  Subscription: {
    testSubscription: {
      subscribe: (_, args: { id: string }, { pubsub }) =>
        pubsub.asyncIterator(args.id),
    },
  },
};
