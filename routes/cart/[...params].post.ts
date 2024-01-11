import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const params = event.context.params.params;
  const [userId, recipeId] = params.split("/");

  try {
    const cartItem = await prisma.cart.create({
      data: { userId, recipeId },
    });
    return Response.json(cartItem, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
