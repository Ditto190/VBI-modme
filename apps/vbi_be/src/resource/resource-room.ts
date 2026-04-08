import { BadRequestException } from '@nestjs/common';
import { RESOURCE_TYPES, type ResourceKind } from './resource.types';

export const buildRoomName = (type: ResourceKind, id: string) =>
  `${type}:${id}`;

export const parseRoomName = (value: string) => {
  const [type, ...rest] = value.split(':');
  const id = rest.join(':');

  if (!RESOURCE_TYPES.includes(type as ResourceKind) || !id) {
    throw new BadRequestException(`Invalid room name "${value}"`);
  }

  return { type: type as ResourceKind, id };
};
