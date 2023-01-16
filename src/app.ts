import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import cors from "@fastify/cors";
import { FastifyPluginAsync } from "fastify";
import { join } from "path";

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!
  fastify.addSchema({
    $id: "superpower",
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
      astronautId: { type: "number" },
    },
  });

  fastify.addSchema({
    $id: "astronaut",
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      surname: { type: "string" },
      birthdate: { type: "string", format: "date-time" },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
      superpowers: {
        type: "array",
        items: { $ref: "superpower#" },
      },
    },
  });

  fastify.addSchema({
    $id: "astronauts",
    type: "array",
    items: { $ref: "astronaut#" },
  });

  fastify.register(cors);

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: { ...{ prefix: "/api" }, ...opts },
  });
};

export default app;
export { app, options };
