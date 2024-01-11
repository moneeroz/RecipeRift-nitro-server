import { prisma } from "..";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const body = await readBody(event);
  const { old_password, new_password } = body;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return Response.json("User not found", { status: 404 });
    }

    const match = bcrypt.compareSync(old_password, user.password);

    if (!match) {
      return Response.json("Invalid Password", { status: 401 });
    }

    await prisma.user.update({
      where: { id },
      data: { password: new_password },
    });

    return Response.json(user, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
