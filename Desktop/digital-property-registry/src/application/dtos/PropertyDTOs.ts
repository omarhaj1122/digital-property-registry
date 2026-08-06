export interface CreatePropertyDTO {
  id: string;
  parcelNumber: string;
  ownerId: string;
  areaSqm: number;
  geometryPolygon: string;
}

export interface TransferPropertyDTO {
  propertyId: string;
  currentOwnerId: string;
  newOwnerId: string;
}