import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // 按需加载
import relativeTime from 'dayjs/plugin/relativeTime'
import weekday from 'dayjs/plugin/weekday'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
dayjs.extend(weekday)

