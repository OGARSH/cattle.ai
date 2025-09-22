import { Request, Response } from 'express';
import { getHistory as getHistoryFromDb, addHistoryRecord, removeHistoryRecord } from '../utils/db';

export const getHistory = async (req: Request, res: Response) => {
  try {
    const history = await getHistoryFromDb();
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createHistoryRecord = async (req: Request, res: Response) => {
  try {
    const { breedId, confidence, earTagId, userId, imageUrl } = req.body;
    
    if (!breedId || confidence === undefined) {
      return res.status(400).json({ message: 'breedId and confidence are required' });
    }

    const newRecord = {
      id: Date.now().toString(), // Simple ID generation
      breedId,
      confidence,
      earTagId: earTagId || null,
      userId: userId || null,
      imageUrl: imageUrl || null,
      timestamp: new Date().toISOString()
    };

    await addHistoryRecord(newRecord);
    res.status(201).json(newRecord);
  } catch (error) {
    console.error('Error creating history record:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteHistoryRecord = async (req: Request, res: Response) => {
  try {
    const { recordId } = req.params;
    
    if (!recordId) {
      return res.status(400).json({ message: 'recordId is required' });
    }

    const success = await removeHistoryRecord(recordId);
    
    if (!success) {
      return res.status(404).json({ message: 'Record not found' });
    }

    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting history record:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};