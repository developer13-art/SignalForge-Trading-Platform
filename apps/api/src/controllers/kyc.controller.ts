import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { kycService } from '../services/kyc/kyc.service';
import { documentService } from '../services/kyc/document.service';
import { reviewService } from '../services/kyc/review.service';

export class KycController {
  async getStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const status = await kycService.getStatus(req.user!.id);
      res.json({ success: true, data: status });
    } catch (error) {
      next(error);
    }
  }

  async startApplication(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const application = await kycService.startApplication(req.user!.id);
      res.status(201).json({ success: true, data: application });
    } catch (error) {
      next(error);
    }
  }

  async submitPersonalInfo(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await kycService.submitPersonalInfo(req.user!.id, req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async uploadDocument(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { applicationId, documentTypeId, documentNumber } = req.body;
      const file = req.file;

      if (!file) {
        throw new Error('Document file is required');
      }

      const document = await kycService.uploadDocument(
        req.user!.id,
        applicationId,
        documentTypeId,
        documentNumber,
        file
      );

      res.status(201).json({ success: true, data: document });
    } catch (error) {
      next(error);
    }
  }

  async submitForReview(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { applicationId } = req.body;
      const result = await kycService.submitForReview(req.user!.id, applicationId);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async resubmit(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const application = await kycService.resubmit(req.user!.id);
      res.status(201).json({ success: true, data: application });
    } catch (error) {
      next(error);
    }
  }

  async getDocumentTypes(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const documentTypes = await documentService.getAllDocumentTypes();
      res.json({ success: true, data: documentTypes });
    } catch (error) {
      next(error);
    }
  }

  // Admin endpoints
  async getReviewQueue(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { status } = req.query;
      const queue = await reviewService.getReviewQueue(status as string);
      res.json({ success: true, data: queue });
    } catch (error) {
      next(error);
    }
  }

  async getApplicationForReview(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const application = await reviewService.getApplicationForReview(id);
      res.json({ success: true, data: application });
    } catch (error) {
      next(error);
    }
  }

  async reviewApplication(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status, rejectionReason, reviewNotes } = req.body;
      const result = await kycService.reviewApplication(
        id,
        req.user!.id,
        status,
        rejectionReason,
        reviewNotes
      );
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getReviewStats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stats = await reviewService.getReviewStats();
      res.json({ success: true, data: stats });
    } catch (error) {
      next(error);
    }
  }

  async createDocumentType(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;
      const documentType = await documentService.createDocumentType(name, description);
      res.status(201).json({ success: true, data: documentType });
    } catch (error) {
      next(error);
    }
  }

  async updateDocumentType(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, description, isActive } = req.body;
      const documentType = await documentService.updateDocumentType(id, { name, description, isActive });
      res.json({ success: true, data: documentType });
    } catch (error) {
      next(error);
    }
  }
}

export const kycController = new KycController();