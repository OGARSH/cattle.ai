import { Request, Response } from 'express';
import axios from 'axios';

export const predict = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    // Check if ROBOFLOW_API_KEY is configured
    if (!process.env.ROBOFLOW_API_KEY) {
      return res.status(500).json({ 
        message: 'Roboflow API key not configured. Please set ROBOFLOW_API_KEY environment variable.' 
      });
    }

    const imageBase64 = req.file.buffer.toString('base64');

    const response = await axios({
      method: 'POST',
      url: `https://detect.roboflow.com/cattel-scan001-xsyt6/1?api_key=${process.env.ROBOFLOW_API_KEY}&name=${req.file.originalname}`,
      data: imageBase64,
      headers: {
        'Content-Type': 'text/plain'
      },
      timeout: 30000 // 30 second timeout
    });

    if (!response.data || !response.data.predictions || !Array.isArray(response.data.predictions)) {
      return res.status(404).json({ message: 'Invalid response from prediction service' });
    }

    const prediction = response.data.predictions[0];

    if (!prediction) {
      return res.status(404).json({ message: 'No cattle detected in the image' });
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
  } catch (error: any) {
    console.error('Prediction error:', error);
    
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({ message: 'Request timeout - please try again' });
    }
    
    if (error.response) {
      // API returned an error response
      return res.status(error.response.status).json({ 
        message: 'Prediction service error',
        details: error.response.data?.message || 'Unknown API error'
      });
    }
    
    res.status(500).json({ 
      message: 'Server error during prediction',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};