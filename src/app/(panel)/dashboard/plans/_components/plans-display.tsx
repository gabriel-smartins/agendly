import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { subscriptionPlans } from '@/utils/plans'
import { SubButton } from './sub-button'

export function PlansDisplay() {
    return (
        <section className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
                {subscriptionPlans.map((plan, index) => (
                    <Card
                        key={plan.id}
                        className={`flex flex-col w-full mx-auto ${index === 1 && ' border-blue-600'}`}
                    >
                        {index === 1 && (
                            <div className="bg-blue-600 w-full py-3 text-center rounded-t-xl">
                                <p className="font-semibold text-white">
                                    PROMOÇÃO EXCLUSIVA
                                </p>
                            </div>
                        )}
                        <CardHeader>
                            <CardTitle className="text-xl md:text-2xl">
                                {plan.name}
                            </CardTitle>
                            <CardDescription>
                                {plan.description}
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <ul>
                                {plan.features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className="text-sm md:text-base"
                                    >
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-4">
                                <p className="text-slate-500 line-through">
                                    {plan.price}
                                </p>
                                <p className="text-black text-2xl font-bold">
                                    {plan.promoPrice}
                                </p>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <SubButton
                                plan={
                                    plan.id === 'BASIC'
                                        ? 'BASIC'
                                        : 'PROFESSIONAL'
                                }
                            />
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <Card className="border-amber-300 bg-amber-50 text-amber-900 shadow-sm">
                <CardHeader className="pb-3">
                    <CardTitle className="text-base md:text-lg">
                        Stripe em modo de teste
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm md:text-base">
                    <p>
                        Este projeto usa o Stripe em ambiente de teste. Não use
                        cartões reais para simular pagamentos, e nenhum valor
                        será cobrado.
                    </p>
                    <p className="mt-2">
                        Para testar o checkout, utilize o cartão de demonstração
                        abaixo. Todos os demais campos do formulário podem ser
                        preenchidos com dados fictícios, como nome, endereço,
                        e-mail, país e código postal.
                    </p>

                    <div className="mt-3 rounded-lg border border-amber-300 bg-white/70 p-3 font-mono text-xs md:text-sm">
                        <p>
                            <span className="font-semibold">Cartão:</span> 4242
                            4242 4242 4242
                        </p>
                        <p>
                            <span className="font-semibold">Validade:</span>{' '}
                            qualquer data no futuro
                        </p>
                        <p>
                            <span className="font-semibold">CVC:</span> qualquer
                            3 dígitos
                        </p>
                        <p>
                            <span className="font-semibold">
                                Outros campos:
                            </span>{' '}
                            qualquer valor fictício
                        </p>
                    </div>
                </CardContent>
            </Card>
        </section>
    )
}
