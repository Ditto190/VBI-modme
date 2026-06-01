import { SetMetadata, Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Response as ExpressResponse } from 'express'

const skipResponseEnvelopeMetadataKey = 'vbi:skip-response-envelope'

export const SkipResponseEnvelope = () => SetMetadata(skipResponseEnvelopeMetadataKey, true)

export interface Response<T> {
  code: number
  message: string
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T> | T> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T> | T> {
    if (
      Reflect.getMetadata(skipResponseEnvelopeMetadataKey, context.getHandler()) ||
      Reflect.getMetadata(skipResponseEnvelopeMetadataKey, context.getClass())
    ) {
      return next.handle()
    }

    return next.handle().pipe(
      map((data: T) => ({
        code: context.switchToHttp().getResponse<ExpressResponse>().statusCode,
        message: 'Success',
        data,
      })),
    )
  }
}
