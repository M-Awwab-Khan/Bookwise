'use client';

import { differenceInDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const DueDate = ({
  createdAt,
  dueDate,
}: {
  createdAt: Date;
  dueDate: string;
}) => {
  const [isDue, setIsDue] = useState(false);
  const [dueDifference, setDueDifference] = useState(0);
  
  useEffect(() => {
    const result = differenceInDays(
      new Date(dueDate),
      createdAt
    );

    if (result <= 0) {
      setIsDue(true);
    } else {
      setDueDifference(result);
    }
  }, [createdAt, dueDate]);

  return (
    <>
      <p className="flex items-center gap-1">
        <Image
          src={isDue ? '/icons/caution-alert.svg' : '/icons/calendar.svg'}
          alt="borrowed date"
          width={18}
          height={18}
        />
        {isDue ? (
          <>
            <span className="text-red-overdue">Overdue Return</span>
            <Image
              src="/icons/caution-alert.svg"
              alt="caution"
              width={29}
              height={29}
              className="absolute -top-0.5 -left-0.5"
            />
          </>
        ) : (
          <span className="text-light-100">{`${dueDifference} days left to due`}</span>
        )}
      </p>
    </>
  );
};

export default DueDate;