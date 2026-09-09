export type ActionResult<T> =
    | {
          success: true
          data: T
          error?: never
      }
    | {
          success: false
          data?: never
          error: string
      }

export function successAction<T>(data: T): ActionResult<T> {
    return {
        success: true,
        data,
    }
}

export function errorAction(message: string): ActionResult<never> {
    return {
        success: false,
        error: message,
    }
}
