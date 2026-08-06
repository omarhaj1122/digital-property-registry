import { Request, Response } from 'express';
import { CreatePropertyUseCase } from '../../application/use-cases/CreatePropertyUseCase';
import { TransferPropertyUseCase } from '../../application/use-cases/TransferPropertyUseCase';

export class PropertyController {
  constructor(
    private createPropertyUseCase: CreatePropertyUseCase,
    private transferPropertyUseCase: TransferPropertyUseCase
  ) {}

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const property = await this.createPropertyUseCase.execute(req.body);
      res.status(201).json({
        success: true,
        message: 'Property registered successfully',
        data: {
          id: property.id,
          parcelNumber: property.parcelNumber,
          ownerId: property.ownerId,
          areaSqm: property.areaSqm,
          geometryPolygon: property.geometryPolygon,
          status: property.status,
          createdAt: property.createdAt,
        },
      });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  public transfer = async (req: Request, res: Response): Promise<void> => {
    try {
      const property = await this.transferPropertyUseCase.execute(req.body);
      res.status(200).json({
        success: true,
        message: 'Property ownership transferred successfully',
        data: {
          id: property.id,
          parcelNumber: property.parcelNumber,
          ownerId: property.ownerId,
          status: property.status,
        },
      });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
}