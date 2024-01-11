import { prisma } from "..";

export default defineEventHandler(async (event) => {
  const { userId } = event.context.params;

  try {
    const cart = await prisma.cart.deleteMany({
      where: { userId },
    });
    return Response.json(cart, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
