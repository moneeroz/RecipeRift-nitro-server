import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v2 } from "cloudinary";

export const cloudinary = v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const prisma = new PrismaClient().$extends({
  query: {
    user: {
      $allOperations({ operation, args, query }) {
        if (
          ["create", "update"].includes(operation) &&
          "data" in args &&
          args.data["password"]
        ) {
          args.data["password"] = bcrypt.hashSync(args.data["password"], 10);
        }

        return query(args);
      },
    },
  },
});

async function main() {}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
