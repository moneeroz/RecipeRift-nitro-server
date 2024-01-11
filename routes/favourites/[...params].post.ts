import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const params = event.context.params.params;
  const [userId, recipeId] = params.split("/");

  try {
    const favourite = await prisma.favourite.create({
      data: { userId, recipeId },
    });
    return Response.json(favourite, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
