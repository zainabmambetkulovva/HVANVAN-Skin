export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
}

export class PaginationUtil {
  static getPaginationMetadata(
    total: number,
    page: number,
    limit: number,
  ): PaginatedResult<any>['meta'] {
    const totalPages = Math.ceil(total / limit);

    return {
      total,
      page,
      limit,
      totalPages,
      hasPrevious: page > 1,
      hasNext: page < totalPages,
    };
  }
}
