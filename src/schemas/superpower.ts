import { RouteShorthandOptions } from "fastify";

export const getSuperpowersSchema: RouteShorthandOptions = {
  schema: {
    description: "Get all superpowers",
    response: {
      200: {
        type: "array",
        items: {
          $ref: "superpower#",
        },
      },
    },
  },
};

export const getSuperpowerSchema: RouteShorthandOptions = {
  schema: {
    description: "Get superpower by id",
    response: {
      200: {
        $ref: "superpower#",
      },
      404: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
    },
  },
};

export const deleteSuperpowerSchema: RouteShorthandOptions = {
  schema: {
    description: "Delete superpower by id",
    response: {
      204: {},
      404: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
    },
  },
};
