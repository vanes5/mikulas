import { Material, PrismaClient } from '@prisma/client'
import{ faker }from '@faker-js/faker'
const prisma = new PrismaClient()


async function main() {
    for (let i = 0; i < 50; i++) {
        await prisma.children.create({
            data: {
                name: faker.person.fullName(),
                address: faker.location.country() + " "+ faker.location.city() + " " + faker.location.streetAddress({useFullAddress: true}),
                behaviour: true
            }
        })
        
        const values = Object.values(Material);

        await prisma.toys.create({
            data: {
                name: faker.word.noun(),
                material: values[faker.number.int({max:3, min: 0})],
                weight: faker.number.int()
            }
        })
    }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })