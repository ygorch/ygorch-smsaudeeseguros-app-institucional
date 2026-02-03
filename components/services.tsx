import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeartPulse, Home, Car, Umbrella } from "lucide-react"

const services = [
  {
    title: "Planos de Saúde",
    description: "Acesso aos melhores hospitais e médicos. Proteção completa para você e sua família não dependerem do sistema público.",
    icon: HeartPulse,
  },
  {
    title: "Seguro de Vida",
    description: "Garanta o futuro financeiro de quem você ama. Indenizações para imprevistos e sucessão patrimonial.",
    icon: Umbrella,
  },
  {
    title: "Seguro Residencial",
    description: "Proteja seu patrimônio contra incêndios, roubos e danos elétricos. Assistência 24h para emergências.",
    icon: Home,
  },
  {
    title: "Seguro Auto",
    description: "Dirija com tranquilidade. Cobertura contra colisões, roubos e terceiros, com assistência guincho rápida.",
    icon: Car,
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
            Nossas Soluções
          </h2>
          <p className="mt-4 text-slate-600 md:text-lg">
            Coberturas completas para todas as áreas da sua vida.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card key={index} className="border-t-4 border-t-primary shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-primary">
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-slate-600">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
