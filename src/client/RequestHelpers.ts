import { BASE_URL } from "./baseClient"

export function getPicture(picture: string) {
    return `${BASE_URL}${picture}`
}

export function handleError(error: any, withMessage: boolean = true, message: string = "Something Went Wrong!!!") {
    console.log(handleError.caller, error)
    console.log(handleError.caller, error.response)

}

