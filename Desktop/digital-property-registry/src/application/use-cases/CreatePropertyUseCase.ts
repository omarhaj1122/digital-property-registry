import { Property } from '../../domain/entities/Property';
import { IPropertyRepository } from '../../domain/repositories/IPropertyRepository';
import { CreatePropertyDTO } from '../dtos/PropertyDTOs';

export class CreatePropertyUseCase {
  constructor(private propertyRepository: IPropertyRepository) {}

  async execute(dto: CreatePropertyDTO): Promise<Property> {
    const existingProperty = await this.propertyRepository.findByParcelNumber(dto.parcelNumber);
    if (existingProperty) {
      throw new Error(`Property with parcel number ${dto.parcelNumber} already exists.`);
    }

    const newProperty = new Property({
      id: dto.id,
      parcelNumber: dto.parcelNumber,
      ownerId: dto.ownerId,
      areaSqm: dto.areaSqm,
      geometryPolygon: dto.geometryPolygon,
      status: 'ACTIVE',
      createdAt: new Date(),
    });

    await this.propertyRepository.save(newProperty);
    return newProperty;
  }
}