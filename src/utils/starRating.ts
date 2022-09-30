import { StarType } from '../models/Feedback';

export function makeStarRating(score: number): StarType[] {
  const starRating: StarType[] = [];
  const halfStar = score % 1;
  const fullStar = score - halfStar;
  for (let index = 0; index < fullStar; index += 1) {
    starRating.push(StarType.full);
  }
  if (halfStar > 0) {
    starRating.push(StarType.half);
  }
  for (let index = starRating?.length; index < 5; index += 1) {
    starRating.push(StarType.empty);
  }
  return starRating;
}
