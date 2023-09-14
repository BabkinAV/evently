import dayjs from "dayjs";

export const formattedDate = (date: string) => {
	const formattedDate = dayjs(date).format('DD.MM.YYYY')
  return formattedDate
}