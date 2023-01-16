import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const astronauts: Prisma.AstronautCreateInput[] = [
	{
		name: 'John',
		surname: 'Doe',
		birthdate: new Date('1980-01-01'),
		superpowers: {
			create: [
				{
					name: 'Super Strength',
				},
				{
					name: 'Super Intelligence',
				},
				{
					name: 'Super Speed',
				},
				{
					name: 'Super Endurance',
				},
			],
		},
	},
	{
		name: 'Jane',
		surname: 'Smith',
		birthdate: new Date('1985-02-15'),
		superpowers: {
			create: [
				{
					name: 'Super Speed',
				},
			],
		},
	},
	{
		name: 'Bob',
		surname: 'Johnson',
		birthdate: new Date('1990-03-22'),
		superpowers: {
			create: [
				{
					name: 'Super Endurance',
				},
				{
					name: 'Super Agility',
				},
			],
		},
	},
	{
		name: 'Alice',
		surname: 'Williams',
		birthdate: new Date('1995-04-30'),
		superpowers: {
			create: [
				{
					name: 'Super Healing',
				},
				{
					name: 'Super Stamina',
				},
			],
		},
	},
	{
		name: 'Charlie',
		surname: 'Brown',
		birthdate: new Date('2000-05-10'),
	},
];

async function seedData() {
	for (const astronaut of astronauts) {
		await prisma.astronaut.create({
			data: astronaut,
		});
	}
}

seedData()
	.catch((e) => {
		console.error(e);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
