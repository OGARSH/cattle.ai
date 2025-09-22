import { Request, Response } from 'express';
import axios from 'axios';

export const predict = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const imageBase64 = req.file.buffer.toString('base64');

    const response = await axios({
      method: 'POST',
      url: `https://detect.roboflow.com/cattel-scan001-xsyt6/1?api_key=${process.env.ROBOFLOW_API_KEY}&name=${req.file.originalname}`,
      data: imageBase64,
      headers: {
        'Content-Type': 'text/plain'
      }
    });

    const prediction = response.data.predictions[0];

    if (!prediction) {
      return res.status(404).json({ message: 'No prediction found' });
    }

    res.status(200).json({
      breed: prediction.class,
      confidence: prediction.confidence,
      boundingBox: {
        x: prediction.x,
        y: prediction.y,
        width: prediction.width,
        height: prediction.height,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};