import { CreatePropertyUseCase } from '../../src/application/use-cases/CreatePropertyUseCase';
import { InMemoryPropertyRepository } from '../../src/infrastructure/repositories/InMemoryPropertyRepository';

describe('CreatePropertyUseCase Unit Tests', () => {
  let repository: InMemoryPropertyRepository;
  let useCase: CreatePropertyUseCase;

  beforeEach(() => {
    repository = new InMemoryPropertyRepository();
    useCase = new CreatePropertyUseCase(repository);
  });

  it('should successfully create a new property', async () => {
    const input = {
      id: 'prop-test-1',
      parcelNumber: 'P-999',
      ownerId: 'usr-1',
      areaSqm: 500,
      geometryPolygon: 'POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))',
    };

    const result = await useCase.execute(input);

    expect(result.id).toBe(input.id);
    expect(result.parcelNumber).toBe(input.parcelNumber);
    expect(result.ownerId).toBe(input.ownerId);

    const saved = await repository.findById(input.id);
    expect(saved).not.toBeNull();
  });

  it('should throw error if parcel number already exists', async () => {
    const input = {
      id: 'prop-test-1',
      parcelNumber: 'P-999',
      ownerId: 'usr-1',
      areaSqm: 500,
      geometryPolygon: 'POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))',
    };

    await useCase.execute(input);

    await expect(
      useCase.execute({
        ...input,
        id: 'prop-test-2',
      })
    ).rejects.toThrow();
  });
});