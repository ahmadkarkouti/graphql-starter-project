import { gql } from "graphql-tag";

import otherSchema from "./other.js";

const linkSchema = [
  gql`
    scalar Date
    scalar JSON
    scalar Upload

    type Query {
      _: Boolean
    }

    type Mutation {
      _: Boolean
    }

    type Subscription {
      _: Boolean
    }
  `,
];

export const SCHEMA_TYPES: any[] = [otherSchema];

export const typeDefs = linkSchema.concat(SCHEMA_TYPES);
