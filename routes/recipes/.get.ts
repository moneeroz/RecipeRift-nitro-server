import { prisma } from "..";

export default defineEventHandler(async () => {
  try {
    const recipes = await prisma.recipe.findMany({
      include: { recipeIngredients: true },
    });

    return Response.json(recipes, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
