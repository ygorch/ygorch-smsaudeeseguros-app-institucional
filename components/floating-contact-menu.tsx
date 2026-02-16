"use client"

import * as React from "react"
import { Mail, MessageCircle, Phone, User } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface FloatingContactMenuProps {
  data?: {
    contact_whatsapp_matheus?: string
    contact_whatsapp_silvio?: string
    contact_phone?: string
    contact_email?: string
  }
}

export function FloatingContactMenu({ data }: FloatingContactMenuProps) {
  const whatsappMatheus = data?.contact_whatsapp_matheus || "https://wa.me/5515991849321"
  const whatsappSilvio = data?.contact_whatsapp_silvio || "https://wa.me/5511992668941"
  const phone = data?.contact_phone || "(15) 99999-9999"
  const email = data?.contact_email || "contato@smsaudeseguros.com.br"

  // Remove non-numeric characters for tel link
  const phoneLink = `tel:${phone.replace(/\D/g, '')}`

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg hover:scale-110 transition-all duration-300 animate-bounce"
            aria-label="Fale conosco"
          >
            <MessageCircle className="h-7 w-7" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-2 mb-2 mr-2" side="top" align="end">
          <div className="flex flex-col gap-1">
            <p className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase">Fale Conosco</p>

            {/* WhatsApp Matheus */}
            <a
              href={whatsappMatheus}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors group"
            >
               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 group-hover:bg-green-200">
                  <User className="h-5 w-5" />
               </div>
               <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">WhatsApp</span>
                  <span className="text-sm font-semibold text-slate-800">Especialista Matheus</span>
               </div>
            </a>

            {/* WhatsApp Silvio */}
            <a
              href={whatsappSilvio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors group"
            >
               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 group-hover:bg-green-200">
                  <User className="h-5 w-5" />
               </div>
               <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">WhatsApp</span>
                  <span className="text-sm font-semibold text-slate-800">Especialista Silvio</span>
               </div>
            </a>

            <div className="my-1 h-px bg-slate-100" />

            {/* Phone */}
            <a
              href={phoneLink}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors group"
            >
               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200">
                  <Phone className="h-5 w-5" />
               </div>
               <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Ligar Agora</span>
                  <span className="text-sm font-semibold text-slate-800">{phone}</span>
               </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-colors group"
            >
               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600 group-hover:bg-orange-200">
                  <Mail className="h-5 w-5" />
               </div>
               <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium">Enviar E-mail</span>
                  <span className="text-sm font-semibold text-slate-800 break-all">{email}</span>
               </div>
            </a>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
