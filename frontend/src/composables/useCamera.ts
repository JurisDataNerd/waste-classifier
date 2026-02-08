import { ref, onUnmounted } from 'vue'

export function useCamera() {
  const stream = ref<MediaStream | null>(null)
  const isActive = ref(false)
  const error = ref<string | null>(null)
  const facingMode = ref<'user' | 'environment'>('environment')
  const capturedPreviewUrl = ref<string | null>(null)
  const capturedFile = ref<File | null>(null)

  async function start(videoEl: HTMLVideoElement) {
    error.value = null

    if (!navigator.mediaDevices?.getUserMedia) {
      error.value = 'Kamera tidak didukung di browser ini. Gunakan HTTPS atau browser terbaru.'
      return
    }

    stop()

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode.value,
          width: { ideal: 1280 },
          height: { ideal: 960 },
        },
        audio: false,
      })
      stream.value = mediaStream
      videoEl.srcObject = mediaStream
      await videoEl.play()
      isActive.value = true
    } catch (err) {
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        error.value = 'Akses kamera ditolak. Silakan izinkan akses kamera di pengaturan browser.'
      } else if (err instanceof DOMException && err.name === 'NotFoundError') {
        error.value = 'Tidak ada kamera yang ditemukan pada perangkat ini.'
      } else {
        error.value = 'Gagal mengakses kamera.'
      }
      isActive.value = false
    }
  }

  function stop() {
    if (stream.value) {
      stream.value.getTracks().forEach((t) => t.stop())
      stream.value = null
    }
    isActive.value = false
  }

  async function switchCamera(videoEl: HTMLVideoElement) {
    facingMode.value = facingMode.value === 'user' ? 'environment' : 'user'
    await start(videoEl)
  }

  function capture(videoEl: HTMLVideoElement): Promise<File | null> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      canvas.width = videoEl.videoWidth
      canvas.height = videoEl.videoHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve(null)
        return
      }
      ctx.drawImage(videoEl, 0, 0)
      capturedPreviewUrl.value = canvas.toDataURL('image/jpeg', 0.92)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null)
            return
          }
          const file = new File([blob], `kamera-${Date.now()}.jpg`, {
            type: 'image/jpeg',
          })
          capturedFile.value = file
          resolve(file)
        },
        'image/jpeg',
        0.92,
      )
    })
  }

  function captureFrame(videoEl: HTMLVideoElement): Promise<File | null> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      canvas.width = videoEl.videoWidth
      canvas.height = videoEl.videoHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve(null)
        return
      }
      ctx.drawImage(videoEl, 0, 0)
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null)
            return
          }
          resolve(new File([blob], `live-${Date.now()}.jpg`, { type: 'image/jpeg' }))
        },
        'image/jpeg',
        0.7,
      )
    })
  }

  function resetCapture() {
    capturedPreviewUrl.value = null
    capturedFile.value = null
  }

  onUnmounted(() => {
    stop()
  })

  return {
    stream,
    isActive,
    error,
    facingMode,
    capturedPreviewUrl,
    capturedFile,
    start,
    stop,
    switchCamera,
    capture,
    captureFrame,
    resetCapture,
  }
}
