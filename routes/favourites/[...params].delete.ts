import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const params = event.context.params.params;
  const [userId, recipeId] = params.split("/");

  try {
    const favourite = await prisma.favourite.delete({
      where: {
        userId_recipeId: {
          userId: userId,
          recipeId: recipeId,
        },
      },
    });
    return Response.json(favourite, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
