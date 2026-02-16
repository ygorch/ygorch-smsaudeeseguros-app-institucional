"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, Loader2, X, Trash2 } from "lucide-react"
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

      // Use unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
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

  const onRemove = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the file input
    onChange("")
  }

  return (
    <div className="flex items-center gap-4">
      <div
        onClick={() => !disabled && !loading && document.getElementById('file-upload')?.click()}
        className={`
          relative w-[200px] h-[200px]
          bg-slate-50 dark:bg-slate-900
          rounded-md overflow-hidden border-2 border-dashed
          flex items-center justify-center
          cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Enviando...</span>
          </div>
        ) : value ? (
          <>
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                onClick={onRemove}
                variant="destructive"
                size="icon"
                className="h-8 w-8 rounded-full shadow-md"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Preview"
              src={value}
            />
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400 p-4 text-center">
             <ImagePlus className="h-10 w-10 mb-2" />
             <span className="text-sm font-medium text-slate-600">Clique para selecionar</span>
             <span className="text-xs text-slate-400">JPG, PNG (max 10MB)</span>
          </div>
        )}

        {/* Hidden Input */}
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
