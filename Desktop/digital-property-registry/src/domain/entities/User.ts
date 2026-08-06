export type UserRole = 'CITIZEN' | 'GOVT_OFFICER' | 'ADMIN';

export interface UserProps {
  id: string;
  nationalId: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.validate(props);
    this.props = props;
  }

  private validate(props: UserProps): void {
    if (!props.nationalId || props.nationalId.trim().length === 0) {
      throw new Error('National ID is required and cannot be empty.');
    }
    if (!props.email || !props.email.includes('@')) {
      throw new Error('Invalid email address provided.');
    }
    if (!props.fullName || props.fullName.trim().length < 2) {
      throw new Error('Full name must be at least 2 characters long.');
    }
  }

  // Getters
  get id(): string { return this.props.id; }
  get nationalId(): string { return this.props.nationalId; }
  get fullName(): string { return this.props.fullName; }
  get email(): string { return this.props.email; }
  get passwordHash(): string { return this.props.passwordHash; }
  get role(): UserRole { return this.props.role; }
  get createdAt(): Date { return this.props.createdAt; }
}
