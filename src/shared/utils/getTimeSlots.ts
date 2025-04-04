export const getTimeSlots = (
    start = 9,
    end = 21,
    interval = 30
  ): string[] => {
    const slots: string[] = [];
    for (let hour = start; hour < end; hour++) {
      for (let min = 0; min < 60; min += interval) {
        const h = hour.toString().padStart(2, '0');
        const m = min.toString().padStart(2, '0');
        slots.push(`${h}:${m}`);
      }
    }
    return slots;
  };
  