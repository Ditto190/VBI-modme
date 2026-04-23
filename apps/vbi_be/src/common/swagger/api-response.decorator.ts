import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

type DataResponseOptions = {
  description: string;
  isArray?: boolean;
  status: number;
  type: Type<unknown>;
};

const getDataSchema = ({
  isArray,
  type,
}: Pick<DataResponseOptions, 'isArray' | 'type'>) =>
  isArray
    ? { type: 'array', items: { $ref: getSchemaPath(type) } }
    : { $ref: getSchemaPath(type) };

export const ApiDataResponse = (options: DataResponseOptions) =>
  applyDecorators(
    ApiExtraModels(options.type),
    ApiResponse({
      status: options.status,
      description: options.description,
      schema: {
        type: 'object',
        properties: {
          code: { type: 'number', example: options.status },
          message: { type: 'string', example: 'Success' },
          data: getDataSchema(options),
        },
      },
    }),
  );

export const ApiErrorResponse = ({
  description,
  message,
  status,
}: {
  description: string;
  message: string;
  status: number;
}) =>
  applyDecorators(
    ApiResponse({
      status,
      description,
      schema: {
        type: 'object',
        example: {
          code: status,
          message,
          data: null,
        },
        properties: {
          code: { type: 'number', example: status },
          message: { type: 'string', example: message },
          data: { type: 'null', nullable: true },
        },
      },
    }),
  );
