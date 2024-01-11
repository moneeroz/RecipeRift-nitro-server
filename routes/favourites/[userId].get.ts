import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;

  try {
    const favourites = await prisma.favourite.findMany({
      where: { userId },
      include: { recipe: { include: { recipeIngredients: true } } },
    });
    return Response.json(favourites, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
