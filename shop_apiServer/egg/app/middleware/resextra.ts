// module.exports = options => {
//   return async function resextra(ctx, next) {
//     console.log(options, 77777, ctx);
//     await next();
//     if (typeof options === 'string') {
//       ctx.status = 401;
//     } else {
//       ctx.status = 201;
//     }
//     ctx.body = options;
//   };
// };
