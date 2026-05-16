// hooks/useVoiceControl.ts
import { useState } from 'react'

export function useVoiceControl(opts?: { onResult?: (msg: string) => void }) {
  const [isListening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  function listen() {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Speech recognition not supported")
      return
    }
    let SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    let rec = new SR()
    rec.continuous = false
    rec.lang = 'en-US'
    rec.interimResults = false
    setListening(true)
    rec.onresult = (e: any) => {
      const res = e.results[0][0].transcript
      setTranscript(res)
      opts?.onResult?.(res)
      setListening(false)
    }
    rec.onerror = (e:any)=>{ setListening(false); }
    rec.onend = ()=>setListening(false)
    rec.start()
  }
  return { isListening, listen, transcript }
}
