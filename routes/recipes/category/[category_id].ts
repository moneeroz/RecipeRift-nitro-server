import { prisma } from "../..";

export default defineEventHandler(async (event) => {
  const { category_id } = event.context.params;

  try {
    const recipes = await prisma.recipe.findMany({
      where: { category_id },
      include: { recipeIngredients: true },
    });
    return Response.json(recipes, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
