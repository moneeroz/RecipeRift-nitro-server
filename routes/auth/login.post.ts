import jwt from "jsonwebtoken";
import { prisma } from "..";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;

  try {
    const data = await prisma.user.findUnique({
      where: { email },
    });

    if (!data) {
      return Response.json("User not found", { status: 404 });
    }

    const match = bcrypt.compareSync(password, data.password);

    if (!match) {
      return Response.json("Invalid Password", { status: 401 });
    }

    const token = jwt.sign(
      { id: data.id, email: data.email, username: data.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const user = {
      id: data.id,
      email: data.email,
      username: data.username,
    };

    event.headers.set("authorization", token);

    return Response.json({ user, token }, { status: 200 });
  } catch (error) {
    return error.message;
  }
});
