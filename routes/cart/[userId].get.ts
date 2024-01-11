import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;

  try {
    const cart = await prisma.cart.findMany({
      where: { userId },
      include: { recipe: { include: { recipeIngredients: true } } },
    });
    return Response.json(cart, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
