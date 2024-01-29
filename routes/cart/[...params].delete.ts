import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const params = event.context.params.params;
  const [userId, recipeId] = params.split("/");

  try {
    await prisma.cart.delete({
      where: {
        userId_recipeId: {
          userId: userId,
          recipeId: recipeId,
        },
      },
    });
    return Response.json("Removed from cart successfully", { status: 200 });
  } catch (error) {
    return error.message;
  }
});
