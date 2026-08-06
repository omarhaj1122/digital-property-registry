export type PropertyStatus = 'ACTIVE' | 'DISPUTED' | 'TRANSFERRED';

export interface PropertyProps {
  id: string;
  parcelNumber: string;
  ownerId: string;
  areaSqm: number;
  geometryPolygon: string; // WKT or GeoJSON format representation for spatial mapping
  status: PropertyStatus;
  createdAt: Date;
}

export class Property {
  private props: PropertyProps;

  constructor(props: PropertyProps) {
    this.validate(props);
    this.props = props;
  }

  private validate(props: PropertyProps): void {
    if (!props.parcelNumber || props.parcelNumber.trim().length === 0) {
      throw new Error('Parcel Number is required.');
    }
    if (props.areaSqm <= 0) {
      throw new Error('Property area must be greater than zero square meters.');
    }
    if (!props.ownerId) {
      throw new Error('Property must be assigned to a valid owner.');
    }
  }

  // Business Logic Methods
  public markAsDisputed(): void {
    this.props.status = 'DISPUTED';
  }

  public transferOwnership(newOwnerId: string): void {
    if (this.props.status === 'DISPUTED') {
      throw new Error('Cannot transfer ownership of a disputed property.');
    }
    this.props.ownerId = newOwnerId;
    this.props.status = 'TRANSFERRED';
  }

  // Getters
  get id(): string { return this.props.id; }
  get parcelNumber(): string { return this.props.parcelNumber; }
  get ownerId(): string { return this.props.ownerId; }
  get areaSqm(): number { return this.props.areaSqm; }
  get geometryPolygon(): string { return this.props.geometryPolygon; }
  get status(): PropertyStatus { return this.props.status; }
  get createdAt(): Date { return this.props.createdAt; }
}