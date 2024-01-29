import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const params = event.context.params.params;
  const [userId, recipeId] = params.split("/");

  try {
    const result = await prisma.cart.findUnique({
      where: { userId_recipeId: { userId: userId, recipeId: recipeId } },
    });

    const count = result.count;

    if (count == 1) {
      const result = await prisma.cart.delete({
        where: { userId_recipeId: { userId: userId, recipeId: recipeId } },
      });
      return Response.json(result, { status: 200 });
    }

    const recipe = await prisma.cart.update({
      where: { userId_recipeId: { userId: userId, recipeId: recipeId } },
      data: { count: { decrement: 1 } },
    });

    return Response.json(recipe, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
