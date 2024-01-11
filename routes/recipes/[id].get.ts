import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        recipeIngredients: {
          include: {
            ingredient: { select: { name: true, extra: true, img: true } },
          },
        },
      },
    });

    const result = {
      ...recipe,
      recipeIngredients: recipe.recipeIngredients.map((i) => {
        return {
          id: i.ingredientId,
          name: i.ingredient.name,
          extra: i.ingredient.extra,
          quantity: i.quantity,
          unit: i.unit,
          img: i.ingredient.img,
        };
      }),
    };

    return Response.json(result, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
