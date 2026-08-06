import { Property } from '../entities/Property';

export interface IPropertyRepository {
  save(property: Property): Promise<void>;
  findById(id: string): Promise<Property | null>;
  findByParcelNumber(parcelNumber: string): Promise<Property | null>;
  findByOwnerId(ownerId: string): Promise<Property[]>;
  update(property: Property): Promise<void>;
}