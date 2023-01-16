import prisma from "../database";

export function getAstronauts() {
  return prisma.astronaut.findMany({
    include: { superpowers: true },
  });
}

export function createAstronaut({
  name,
  surname,
  birthdate,
  superpowers,
}: {
  name: string;
  surname: string;
  birthdate: string;
  superpowers: { name: string }[];
}) {
  return prisma.astronaut.create({
    data: {
      name: name,
      surname: surname,
      birthdate: new Date(birthdate),
      superpowers: {
        create: (superpowers ?? [])
          .map((superpower) => ({ name: superpower.name }))
          .filter((superpower) => !!superpower.name),
      },
    },
    include: { superpowers: true },
  });
}

export function getAstronaut(id: number) {
  return prisma.astronaut.findUnique({
    where: { id: +id },
    include: { superpowers: true },
  });
}

export async function deleteAstronaut(id: number) {
  const deleteSuperpowers = prisma.superpower.deleteMany({
    where: { astronautId: +id },
  });
  const deleteAstronauts = prisma.astronaut.delete({
    where: { id: +id },
  });

  await prisma.$transaction([deleteSuperpowers, deleteAstronauts]);
}

export function updateAstronaut({
  id,
  name,
  surname,
  birthdate,
  superpowers,
}: {
  id: number;
  name: string;
  surname: string;
  birthdate: string;
  superpowers: { name: string; id: number }[];
}) {
  return prisma.astronaut.update({
    where: { id: +id },
    data: {
      name: name,
      surname: surname,
      birthdate: new Date(birthdate),
      updatedAt: new Date(),
      superpowers: {
        create: (superpowers ?? [])
          .filter((superpower) => !superpower.id && !!superpower.name)
          .map((superpower) => ({
            name: superpower.name,
          })),
        update: (superpowers ?? [])
          .filter((superpower) => !!superpower.id && !!superpower.name)
          .map((superpower) => ({
            where: { id: +superpower.id },
            data: { name: superpower.name, updatedAt: new Date() },
          })),
        delete: (superpowers ?? [])
          .filter((superpower) => !!superpower.id && !superpower.name)
          .map((superpower) => ({ id: +superpower.id })),
      },
    },
    include: { superpowers: true },
  });
}

export async function deleteSuperpower(id: number) {
  await prisma.superpower.delete({
    where: { id },
  });
}

export function getSuperpower(id: number) {
  return prisma.superpower.findUnique({
    where: { id },
  });
}
