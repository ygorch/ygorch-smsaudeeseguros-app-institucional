"use client"

import * as React from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "Como funciona a contratação de um plano de saúde?",
    answer: "O processo é simples e consultivo. Primeiro, entendemos suas necessidades (rede preferencial, abrangência, orçamento). Depois, apresentamos as melhores opções do mercado. Após a escolha, cuidamos de toda a burocracia até a implantação.",
  },
  {
    question: "O seguro de vida cobre apenas falecimento?",
    answer: "Não! Os seguros modernos oferecem coberturas em vida, como indenização por doenças graves, invalidez e diárias de internação, protegendo você também no presente.",
  },
  {
    question: "Vocês atendem apenas em Sorocaba?",
    answer: "Nossa sede é em Sorocaba e temos forte atuação na capital e Vale do Paraíba, mas graças ao atendimento digital, conseguimos atender clientes em todo o território nacional.",
  },
  {
    question: "Quanto custa uma cotação?",
    answer: "A cotação e a consultoria inicial são 100% gratuitas. Nosso objetivo é apresentar a melhor solução para você sem compromisso.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <section id="faq" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter text-primary">
            Dúvidas Frequentes
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border bg-white shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-4 text-left font-medium text-slate-900"
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-secondary" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 pt-0 text-slate-600 border-t border-slate-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
