"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, Loader2, X } from "lucide-react"
import Image from "next/image"
import { createClient } from "@/lib/supabase/client"
import imageCompression from 'browser-image-compression'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  value?: string
  bucket?: string
}

export function ImageUpload({ value, onChange, disabled, bucket = process.env.SUPABASE_BUCKET || "app-smsaudeeseguros-institucional" }: ImageUploadProps) {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true)
      const file = e.target.files?.[0]
      if (!file) return

      // Compress image
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      }
      const compressedFile = await imageCompression(file, options)

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, compressedFile)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath)

      onChange(data.publicUrl)
    } catch (error) {
      console.error(error)
      alert("Erro ao fazer upload da imagem")
    } finally {
      setLoading(false)
    }
  }

  const onRemove = async () => {
    onChange("")
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-[200px] h-[200px] bg-slate-100 rounded-md overflow-hidden border border-dashed flex items-center justify-center">
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
        ) : value ? (
          <>
            <div className="absolute top-2 right-2 z-10">
              <Button type="button" onClick={onRemove} variant="destructive" size="icon" className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Image"
              src={value}
            />
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-500">
             <ImagePlus className="h-8 w-8" />
             <span className="text-xs">Upload de Imagem</span>
          </div>
        )}
      </div>
      <div>
         <Button type="button" disabled={disabled || loading} variant="secondary" onClick={() => document.getElementById('file-upload')?.click()}>
            Escolher Imagem
         </Button>
         <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onUpload}
            disabled={disabled || loading}
         />
      </div>
    </div>
  )
}
