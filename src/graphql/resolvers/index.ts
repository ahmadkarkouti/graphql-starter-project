import { GraphQLJSONObject } from "graphql-type-json";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

import testResolvers from "./test.js";

const customScalarResolvers: any[] = [
  {
    JSON: GraphQLJSONObject,
    Upload: GraphQLUpload,
  },
];

export const APP_RESOLVERS: any[] = [testResolvers];

export const resolvers = customScalarResolvers.concat(APP_RESOLVERS);
