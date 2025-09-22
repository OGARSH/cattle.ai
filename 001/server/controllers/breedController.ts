import { Request, Response } from 'express';
import db, { getBreeds } from '../utils/db';

export const getBreedInfo = async (req: Request, res: Response) => {
  try {
    const { breedName } = req.params;
    const normalize = (str: string) =>
      str
        .toLowerCase()
        .replace(/[-\s]/g, '')
        .trim();

    const breeds = await getBreeds();
    const normBreedName = normalize(breedName);
    const breedInfo = breeds.find((breed) => {
      return (
        normalize(breed.id) === normBreedName ||
        normalize(breed.name) === normBreedName ||
        (breed.nameHi && normalize(breed.nameHi) === normBreedName)
      );
    });

    if (!breedInfo) {
      return res.status(404).json({ message: 'Breed not found' });
    }

    res.status(200).json(breedInfo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};