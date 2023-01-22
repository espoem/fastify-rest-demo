import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { deleteSuperpower, getSuperpower, getSuperpowers } from "../../prisma";
import {
  deleteSuperpowerSchema,
  getSuperpowerSchema,
  getSuperpowersSchema,
} from "../../schemas/superpower";

const superpowers: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  opts
): Promise<void> => {
  fastify.get(
    "/",
    getSuperpowersSchema,
    async function (request: FastifyRequest, reply: FastifyReply) {
      const superpowers = await getSuperpowers();
      return superpowers;
    }
  );

  fastify.get(
    "/:id",
    getSuperpowerSchema,
    async function (request: FastifyRequest, reply: FastifyReply) {
      const { id } = request.params as { id: string };
      const superpower = await getSuperpower(+id);

      if (!superpower) {
        reply.status(404).send({ message: "Superpower not found" });
        return;
      }

      return superpower;
    }
  );

  fastify.delete(
    "/:id",
    deleteSuperpowerSchema,
    async function (request: FastifyRequest, reply) {
      const { id } = request.params as { id: string };
      try {
        await deleteSuperpower(+id);
      } catch (error) {
        reply.status(404).send({ message: "Superpower not found" });
        return;
      }

      reply.status(204).send();
    }
  );
};

export default superpowers;
