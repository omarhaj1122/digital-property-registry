import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/data-source';
import { PropertyOrmEntity } from '../entities/PropertyOrmEntity';
import { Property, PropertyStatus } from '../../../domain/entities/Property';
import { IPropertyRepository } from '../../../domain/repositories/IPropertyRepository';

export class TypeOrmPropertyRepository implements IPropertyRepository {
  private repository: Repository<PropertyOrmEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(PropertyOrmEntity);
  }

  private mapToDomain(ormEntity: PropertyOrmEntity): Property {
    return new Property({
      id: ormEntity.id,
      parcelNumber: ormEntity.parcelNumber,
      ownerId: ormEntity.ownerId,
      areaSqm: ormEntity.areaSqm,
      geometryPolygon: ormEntity.geometryPolygon,
      status: ormEntity.status as PropertyStatus, // Casting string to PropertyStatus
      createdAt: ormEntity.createdAt,
    });
  }

  async save(property: Property): Promise<void> {
    const propertyOrm = this.repository.create({
      id: property.id,
      parcelNumber: property.parcelNumber,
      ownerId: property.ownerId,
      areaSqm: property.areaSqm,
      geometryPolygon: property.geometryPolygon,
      status: property.status,
      createdAt: property.createdAt,
    });
    await this.repository.save(propertyOrm);
  }

  async findById(id: string): Promise<Property | null> {
    const ormEntity = await this.repository.findOne({ where: { id } });
    return ormEntity ? this.mapToDomain(ormEntity) : null;
  }

  async findByParcelNumber(parcelNumber: string): Promise<Property | null> {
    const ormEntity = await this.repository.findOne({ where: { parcelNumber } });
    return ormEntity ? this.mapToDomain(ormEntity) : null;
  }

  async findByOwnerId(ownerId: string): Promise<Property[]> {
    const entities = await this.repository.find({ where: { ownerId } });
    return entities.map((e) => this.mapToDomain(e));
  }

  async update(property: Property): Promise<void> {
    await this.repository.update(property.id, {
      ownerId: property.ownerId,
      status: property.status,
    });
  }
}