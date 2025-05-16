import { useEffect, useState } from 'react'

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }

  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
  }
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState<boolean>(false)

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    const checkInstalled = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true
    setIsInstalled(checkInstalled)

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
  }

  if (isInstalled || !deferredPrompt) return null

  return (
    <button onClick={handleInstallClick}>
      Install App to enable offline mode and enjoy everything Yomu has to offer.
    </button>
  )
}

export default InstallPrompt
