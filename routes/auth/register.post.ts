import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const user = await prisma.user.create({ data: body });
    return Response.json(user, { status: 201 });
  } catch (error) {
    return error.message;
  }
});
