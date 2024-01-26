import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;

  try {
    const data = await prisma.favourite.findMany({
      where: { userId },
      include: { recipe: { include: { recipeIngredients: true } } },
    });

    const favourites = data.map((i) => i.recipe);

    return Response.json(favourites, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
