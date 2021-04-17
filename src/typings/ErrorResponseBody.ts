export default interface ErrorResponseBody {
  error: {
    message: string,
    code: number,
    title: string
  }
}
