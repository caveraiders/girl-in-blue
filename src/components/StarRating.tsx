import React, { FC } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'

interface StarRatingProps {
  breakLimit: number
}

const StarRating: FC<StarRatingProps> = ({ breakLimit }) => (
  <div className="flex items-center">
    {Array.from({ length: breakLimit }, (_, index) => (
      <StarIcon
        key={index + 1}
        className={`h-4 w-4 ${index < 3 ? 'text-yellow-400' : 'text-sky-400'}`}
      />
    ))}
  </div>
)

export default StarRating
