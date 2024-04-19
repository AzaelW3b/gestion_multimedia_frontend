import dayjs from "dayjs"
import { es } from "dayjs/locale/es"
import utc from "dayjs/plugin/utc"

export const formatDate = (fecha) => {
    dayjs.extend(utc)
    return dayjs(fecha).utc().locale("es").format("DD/MMMM/YYYY")

}
