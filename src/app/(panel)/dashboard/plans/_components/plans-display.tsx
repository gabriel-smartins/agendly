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
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
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
                        <CardDescription>{plan.description}</CardDescription>
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
                                plan.id === 'BASIC' ? 'BASIC' : 'PROFESSIONAL'
                            }
                        />
                    </CardFooter>
                </Card>
            ))}
        </section>
    )
}
