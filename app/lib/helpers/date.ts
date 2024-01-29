export const formatNumber = (x: number) => x.toLocaleString('en-US', {
  minimumIntegerDigits: 2,
  useGrouping: false
})

export const getDate = (date: string) => {
  const localDate = new Date(date);

  const day = formatNumber(localDate.getDate());
  const month = formatNumber(localDate.getMonth() + 1);
  const year = formatNumber(localDate.getFullYear());

  return { day, month, year };
};

export const transformDate = (date: string, type: "YYYY-MM-DD") => {
  const { day, month, year } = getDate(date);

  switch (type) {
    case "YYYY-MM-DD": {
      return `${year}-${month}-${day}`;
    }
  }
};

export const measureTime = () => new Date().getTime();