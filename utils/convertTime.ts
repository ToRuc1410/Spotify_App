// Hàm chuyển đổi từ milliseconds sang định dạng HH:MM
import moment from 'moment'

export const convertMillisecondsToHHMM = (timeMS: number) => {
  const minutes = Math.floor(timeMS / 60000)
  const seconds = ((timeMS % 60000) / 1000).toFixed(0)
  return minutes + ':' + (Number(seconds) < 10 ? '0' : '') + seconds
}
