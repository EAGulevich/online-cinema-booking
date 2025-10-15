export const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response: unknown }).response;
    if (response && typeof response === 'object' && 'data' in response) {
      const data = (response as { data: unknown }).data;
      if (data && typeof data === 'object' && 'message' in data) {
        return (data as { message: unknown }).message as string;
      }
    }
  }
  if (error && typeof error === 'object' && 'message' in error) {
    return (error as { message: unknown }).message as string;
  }
  return error instanceof Error
    ? error.message
    : String(error) || 'Неизвестная ошибка';
};
