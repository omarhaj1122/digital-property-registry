import { Property } from '../../domain/entities/Property';
import { IPropertyRepository } from '../../domain/repositories/IPropertyRepository';
import { TransferPropertyDTO } from '../dtos/PropertyDTOs';

export class TransferPropertyUseCase {
  constructor(private propertyRepository: IPropertyRepository) {}

  async execute(dto: TransferPropertyDTO): Promise<Property> {
    const property = await this.propertyRepository.findById(dto.propertyId);
    if (!property) {
      throw new Error(`Property with ID ${dto.propertyId} not found.`);
    }

    if (property.ownerId !== dto.currentOwnerId) {
      throw new Error('Unauthorized transfer attempt: Only the current owner can initiate a transfer.');
    }

    property.transferOwnership(dto.newOwnerId);
    await this.propertyRepository.update(property);
    return property;
  }
}