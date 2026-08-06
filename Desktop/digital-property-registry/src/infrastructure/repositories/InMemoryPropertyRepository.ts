import { Property } from '../../domain/entities/Property';
import { IPropertyRepository } from '../../domain/repositories/IPropertyRepository';

export class InMemoryPropertyRepository implements IPropertyRepository {
  private properties: Map<string, Property> = new Map();

  async save(property: Property): Promise<void> {
    this.properties.set(property.id, property);
  }

  async findById(id: string): Promise<Property | null> {
    const property = this.properties.get(id);
    return property || null;
  }

  async findByParcelNumber(parcelNumber: string): Promise<Property | null> {
    for (const property of this.properties.values()) {
      if (property.parcelNumber === parcelNumber) {
        return property;
      }
    }
    return null;
  }

  async findByOwnerId(ownerId: string): Promise<Property[]> {
    const results: Property[] = [];
    for (const property of this.properties.values()) {
      if (property.ownerId === ownerId) {
        results.push(property);
      }
    }
    return results;
  }

  async update(property: Property): Promise<void> {
    this.properties.set(property.id, property);
  }
}