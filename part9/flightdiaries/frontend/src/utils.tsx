import { AxiosError } from "axios"

export const isAxiosError = (error: AxiosError): boolean => {
    return error instanceof AxiosError
}
