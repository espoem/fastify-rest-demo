import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { FastifyInstance } from "fastify";

import fp from "fastify-plugin";

async function swaggerGenerator(fastify: FastifyInstance, opts: any) {
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: "Astronauts API",
        description: "Simple REST API to manage astronauts",
        version: "0.0.1",
      },
      externalDocs: {
        url: "https://github.com/espoem",
        description: "Find more info here",
      },
      host: "localhost", // and your deployed url
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json", "text/html"],
    },
  });

  await fastify.register(swaggerUI, { routePrefix: "/docs" });
}

export default fp(swaggerGenerator);
