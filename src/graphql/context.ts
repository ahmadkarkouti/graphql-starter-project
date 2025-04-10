import { GraphQLError } from "graphql";
import { PubSub } from "graphql-subscriptions";
import admin from "firebase-admin";

export const pubsub = new PubSub();

export async function context({ req }) {
  const authHeader = req?.headers?.authorization || "";

  const approved = isApproved(req.body.query);
  if (approved) {
    return returnApproved();
  }

  return verifyApollo(authHeader);
}

// For paths that don't require authentication
async function returnApproved() {
  return { uid: "", pubsub };
}

export async function subscriptionContext(ctx: any, message: any) {
  const approved = isApproved(message.payload.query);

  if (approved) {
    return returnApproved();
  } else {
    const authHeader = ctx?.connectionParams.Authorization || "";
    if (!authHeader) {
      console.error("Missing Authorization in connectionParams");
    } else {
      console.log("Authorization Header:", authHeader);
    }
    return verifyApollo(authHeader);
  }
}

async function verifyApollo(authHeader: string) {
  if (!authHeader) throw new GraphQLError("Unauthorized");

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    return {
      uid: decodedToken.sub,
      pubsub,
    };
  } catch (error) {
    console.error(error);
    throw new GraphQLError("Unauthorized");
  }
}

function isApproved(query: string) {
  let name = query.replace(/\s/g, "").split("{")[1];
  if (name.includes("(")) name = name.split("(")[0];
  if (name.includes("{")) name = name.split("{")[0];
  if (name.includes("}")) name = name.split("}")[0];

  const approvedMethods = ["testMutation", "testSubscription", "__schema"];
  return approvedMethods.includes(name);
}
