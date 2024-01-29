import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;

  try {
    const cart = await prisma.cart.findMany({
      where: { userId },
      include: { recipe: { include: { recipeIngredients: true } } },
    });

    const cartItems = cart.map((i) => ({ ...i.recipe, count: i.count }));
    return Response.json(cartItems, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
