import { CheckCircle2 } from "lucide-react"

export function About() {
  const benefits = [
    "Mais de 10 anos de experiência no mercado segurador",
    "Parceria com as maiores seguradoras nacionais e internacionais",
    "Atendimento consultivo e personalizado (Humanizado)",
    "Foco total na proteção patrimonial e familiar",
    "Agilidade na resolução de sinistros",
    "Transparência total nas apólices"
  ]

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
              Sobre a SM Saúde e Seguros
            </h2>
            <p className="text-lg text-slate-700">
              Fundada por <strong>Matheus</strong> e <strong>Silvio</strong>, a SM Saúde e Seguros nasceu de uma necessidade clara: oferecer um atendimento que vai além da venda. Nós entendemos que contratar um seguro é um ato de responsabilidade e amor.
            </p>
            <p className="text-slate-600">
              Com mais de uma década de atuação, nos especializamos em atender clientes que buscam não apenas um preço, mas a certeza de que estarão amparados quando mais precisarem. Nossa missão é simplificar o complexo e garantir sua tranquilidade.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
           <div className="relative mx-auto aspect-video overflow-hidden rounded-xl shadow-xl sm:w-full lg:order-last">
             {/* Placeholder for About Image */}
            <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
                <span className="text-slate-400 font-medium">[Foto dos Sócios / Escritório]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
