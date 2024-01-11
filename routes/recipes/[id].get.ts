import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: { recipeIngredients: true },
    });
    return Response.json(recipe, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
