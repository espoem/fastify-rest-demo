import { RouteShorthandOptions } from "fastify";

export const getAstronautsSchema: RouteShorthandOptions = {
  schema: {
    description: "Get all astronauts",
    response: {
      200: {
        $ref: "astronauts#",
      },
    },
  },
};

export const getAstronautSchema: RouteShorthandOptions = {
  schema: {
    description: "Get astronaut by id",
    response: {
      200: {
        $ref: "astronaut#",
      },
    },
  },
};

export const updateAstronautSchema: RouteShorthandOptions = {
  schema: {
    description:
      "Update astronaut by id. Superpower is deleted if name is empty.",
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        surname: { type: "string" },
        birthdate: { type: "string", format: "date" },
        superpowers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              id: { type: "number" },
            },
            required: ["name"],
          },
        },
      },
    },
  },
};

export const deleteAstronautSchema: RouteShorthandOptions = {
  schema: {
    description: "Delete astronaut by id",
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

export const createAstronautSchema: RouteShorthandOptions = {
  schema: {
    description: "Create new astronaut",
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        surname: { type: "string" },
        birthdate: { type: "string", format: "date" },
        superpowers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
            },
            required: ["name"],
          },
        },
      },
      required: ["name", "surname", "birthdate"],
    },
    response: {
      200: {
        $ref: "astronaut#",
      },
    },
  },
};
