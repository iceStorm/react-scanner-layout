export function imageDataToObjectUrl(data: ImageData) {
  return URL.createObjectURL(new Blob([Uint8Array.from(data.data)], { type: 'image/png' }))
}
