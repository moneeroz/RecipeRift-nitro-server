export default defineEventHandler((event) => {
  if (isPreflightRequest(event)) {
    event.node.res.statusCode = 204;
    event.node.res.statusMessage = "No Content";
    return "OK";
  }
  event.headers.set("Access-Control-Allow-Origin", "*");
  event.headers.set("Access-Control-Allow-Methods", "*");
});
