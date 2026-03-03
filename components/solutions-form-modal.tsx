"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { maskPhone, maskCNPJ, maskCurrency } from "@/lib/masks"
import { CheckCircle2 } from "lucide-react"

interface SolutionsFormModalProps {
  isOpen: boolean
  onClose: () => void
  serviceTitle: string
  buttonTextForm: string
}

export function SolutionsFormModal({ isOpen, onClose, serviceTitle, buttonTextForm }: SolutionsFormModalProps) {
  const [step, setStep] = useState(1)
  const [tipoContratacao, setTipoContratacao] = useState("Individual")
  const [tipoPessoa, setTipoPessoa] = useState("Física")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cnpj: "",
    vidas: "",
    valorEntrada: "",
    valorVeiculo: "",
    modeloVeiculo: "",
    anoVeiculo: ""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const isPlanoSaude = serviceTitle.toLowerCase().includes("plano de saúde") || serviceTitle.toLowerCase().includes("planos de saúde")
  const isFinanciamento = serviceTitle.toLowerCase().includes("financiamento")

  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setTipoContratacao("Individual")
      setTipoPessoa("Física")
      setFormData({
        name: "", email: "", phone: "", cnpj: "", vidas: "",
        valorEntrada: "", valorVeiculo: "", modeloVeiculo: "", anoVeiculo: ""
      })
      setIsSuccess(false)
    }
  }, [isOpen])

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isSuccess && isOpen) {
        timeout = setTimeout(() => {
            onClose()
        }, 10000)
    }
    return () => clearTimeout(timeout)
  }, [isSuccess, isOpen, onClose])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    let formattedValue = value
    if (name === "phone") formattedValue = maskPhone(value)
    if (name === "cnpj") formattedValue = maskCNPJ(value)
    if (name === "valorEntrada" || name === "valorVeiculo") formattedValue = maskCurrency(value)

    setFormData(prev => ({ ...prev, [name]: formattedValue }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    const metadata: any = {}
    if (isPlanoSaude) {
        metadata.tipoContratacao = tipoContratacao
        if (tipoContratacao === "PME / Empresarial") {
            metadata.cnpj = formData.cnpj
            metadata.vidas = parseInt(formData.vidas) || 0
            if (metadata.vidas >= 2 && metadata.vidas <= 99) {
                metadata.classificacao = "PME"
            } else if (metadata.vidas >= 100) {
                metadata.classificacao = "Empresarial"
            }
        }
    } else if (isFinanciamento) {
        metadata.tipoPessoa = tipoPessoa
        if (tipoPessoa === "Jurídica") {
            metadata.cnpj = formData.cnpj
        }
        metadata.valorEntrada = formData.valorEntrada
        metadata.valorVeiculo = formData.valorVeiculo
        metadata.modeloVeiculo = formData.modeloVeiculo
        metadata.anoVeiculo = formData.anoVeiculo
    }

    try {
        const { error } = await supabase.from('leads').insert({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            interest: serviceTitle,
            metadata: Object.keys(metadata).length > 0 ? metadata : null
        })

        if (error) throw error

        setIsSuccess(true)
    } catch (error) {
        console.error("Error submitting lead:", error)
        toast.error("Ocorreu um erro ao enviar seus dados. Tente novamente.")
    } finally {
        setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[425px] text-center p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
                <DialogTitle className="text-2xl font-bold">Solicitação Enviada!</DialogTitle>
                <DialogDescription className="text-base">
                    Recebemos seus dados com sucesso. Nossa equipe de especialistas entrará em contato em breve para apresentar sua cotação personalizada.
                </DialogDescription>
                <Button onClick={onClose} className="mt-4 bg-brand-gradient hover:opacity-90 transition-opacity">
                    Fechar
                </Button>
            </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Cotação: {serviceTitle}</DialogTitle>
          <DialogDescription>Preencha os dados abaixo para receber uma cotação personalizada.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {isPlanoSaude && step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de contratação</Label>
                <Select value={tipoContratacao} onValueChange={setTipoContratacao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="PME / Empresarial">PME / Empresarial (a partir de 2 vidas)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="button" onClick={() => setStep(2)} className="w-full bg-brand-gradient hover:opacity-90">Continuar</Button>
            </div>
          )}

          {isFinanciamento && step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Tipo de Pessoa</Label>
                <Select value={tipoPessoa} onValueChange={setTipoPessoa}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Física">Pessoa Física (PF)</SelectItem>
                    <SelectItem value="Jurídica">Pessoa Jurídica (PJ)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="button" onClick={() => setStep(2)} className="w-full bg-brand-gradient hover:opacity-90">Continuar</Button>
            </div>
          )}

          {((isPlanoSaude && step === 2) || (isFinanciamento && step === 2) || (!isPlanoSaude && !isFinanciamento)) && (
            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input name="name" value={formData.name} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>E-mail</Label>
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label>Telefone / WhatsApp</Label>
                        <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="(00) 00000-0000" required />
                    </div>
                </div>

                {isPlanoSaude && tipoContratacao === "PME / Empresarial" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>CNPJ</Label>
                            <Input name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" required />
                        </div>
                        <div className="space-y-2">
                            <Label>Quantidade de Vidas</Label>
                            <Input type="number" name="vidas" value={formData.vidas} onChange={handleChange} min="2" required />
                        </div>
                    </div>
                )}

                {isFinanciamento && (
                    <>
                        {tipoPessoa === "Jurídica" && (
                             <div className="space-y-2">
                                <Label>CNPJ</Label>
                                <Input name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" required />
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Valor do Veículo</Label>
                                <Input name="valorVeiculo" value={formData.valorVeiculo} onChange={handleChange} placeholder="R$ 0,00" required />
                            </div>
                            <div className="space-y-2">
                                <Label>Valor de Entrada</Label>
                                <Input name="valorEntrada" value={formData.valorEntrada} onChange={handleChange} placeholder="R$ 0,00" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Modelo do Veículo</Label>
                                <Input name="modeloVeiculo" value={formData.modeloVeiculo} onChange={handleChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label>Ano do Veículo</Label>
                                <Input type="number" name="anoVeiculo" value={formData.anoVeiculo} onChange={handleChange} min="1900" max={new Date().getFullYear() + 1} required />
                            </div>
                        </div>
                    </>
                )}

                <div className="flex gap-2 pt-2">
                    {(isPlanoSaude || isFinanciamento) && (
                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/3">
                            Voltar
                        </Button>
                    )}
                    <Button type="submit" disabled={isSubmitting} className={`bg-brand-gradient hover:opacity-90 text-white ${(isPlanoSaude || isFinanciamento) ? 'w-2/3' : 'w-full'}`}>
                        {isSubmitting ? "Enviando..." : buttonTextForm || "Quero receber minha cotação personalizada"}
                    </Button>
                </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}
