import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import {
  createAstronaut,
  deleteAstronaut,
  getAstronaut,
  getAstronauts,
  updateAstronaut,
} from "../../prisma";
import {
  createAstronautSchema,
  deleteAstronautSchema,
  getAstronautSchema,
  getAstronautsSchema,
  updateAstronautSchema,
} from "../../schemas/astronauts";

type NewAstronautRequest = FastifyRequest<{
  Body: {
    name: string;
    surname: string;
    birthdate: string;
    superpowers: { name: string }[];
  };
}>;

const astronauts: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  opts
): Promise<void> => {
  fastify.get(
    "/",
    getAstronautsSchema,
    async function (request: FastifyRequest, reply: FastifyReply) {
      const astronauts = await getAstronauts();
      return astronauts;
    }
  );

  fastify.post(
    "/",
    createAstronautSchema,
    async function (request: FastifyRequest, reply: FastifyReply) {
      const {
        body: { name, surname, birthdate, superpowers },
      } = request as NewAstronautRequest; // workaround, throws error if custom type in request param
      const astronaut = await createAstronaut({
        name,
        surname,
        birthdate,
        superpowers,
      });
      return astronaut;
    }
  );

  fastify.get(
    "/:id",
    getAstronautSchema,
    async function (request: FastifyRequest, reply: FastifyReply) {
      const { id } = request.params as { id: string };

      const astronaut = await getAstronaut(+id);

      if (!astronaut) {
        reply.code(404);
        return { error: "Astronaut not found" };
      }

      return astronaut;
    }
  );

  fastify.delete(
    "/:id",
    deleteAstronautSchema,
    async function (request: FastifyRequest, reply: FastifyReply) {
      const { id } = request.params as { id: string };

      try {
        await deleteAstronaut(+id);
      } catch (error) {
        reply.code(404);
        return { error: "Astronaut not found" };
      }

      return reply.code(204).send();
    }
  );

  fastify.patch(
    "/:id",
    updateAstronautSchema,
    async function (request: FastifyRequest, reply: FastifyReply) {
      const { id } = request.params as { id: string };

      const astronaut = await getAstronaut(+id);

      if (!astronaut) {
        reply.code(404);
        return { error: "Astronaut not found" };
      }
      console.log(astronaut);

      const { name, surname, birthdate, superpowers } = request.body as {
        name: string;
        surname: string;
        birthdate: string;
        superpowers: { name: string; id: number }[];
      };

      const updatedAstronaut = await updateAstronaut({
        name: name ?? astronaut.name,
        surname: surname ?? astronaut.surname,
        birthdate: birthdate ?? astronaut.birthdate,
        superpowers: superpowers ?? astronaut.superpowers,
        id: +id,
      });

      return updatedAstronaut;
    }
  );
};

export default astronauts;
