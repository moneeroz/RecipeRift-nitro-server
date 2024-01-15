import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname;
  const isFavourites = path.startsWith("/favourites");
  const isCartPath = path.startsWith("/cart");
  const isAuthPutPath = path.startsWith("/auth") && event.method === "PUT";
  const isRecipe = path.startsWith("/recipes") && event.method !== "GET";

  if (isFavourites || isCartPath || isAuthPutPath || isRecipe) {
    const token = event.headers.get("authorization");

    if (!token) {
      return Response.json("You are not authorized", { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      event.context.user = decoded;
    } catch (error) {
      return Response.json("Invalid token", { status: 403 });
    }
  }
});
