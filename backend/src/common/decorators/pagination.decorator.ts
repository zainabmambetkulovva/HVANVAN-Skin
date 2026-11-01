import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { page = 1, limit = 10, offset = 0 } = request.query;

    return {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    };
  },
);
