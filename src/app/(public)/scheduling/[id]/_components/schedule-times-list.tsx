'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { TimeSlot } from './schedule.content'
import {
    isSlotInThePast,
    isSlotSequenceAvailable,
    isToday,
} from './schedule-utils'

interface ScheduleTimeListProps {
    selectedDate: Date
    selectedTime: string
    requiredSlots: number
    blockedTimes: string[]
    availableTimeSlots: TimeSlot[]
    profileTimes: string[]
    onSelectTime: (time: string) => void
}

export function ScheduleTimeList({
    selectedDate,
    selectedTime,
    requiredSlots,
    blockedTimes,
    availableTimeSlots,
    profileTimes,
    onSelectTime,
}: ScheduleTimeListProps) {
    const dateIsToday = isToday(selectedDate)

    return (
        <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
            {availableTimeSlots.map((slot) => {
                const sequenceOk = isSlotSequenceAvailable(
                    slot.time,
                    requiredSlots,
                    profileTimes,
                    blockedTimes
                )
                const slotIsPast = dateIsToday && isSlotInThePast(slot.time)

                const slotEnabled =
                    slot.isAvailable && sequenceOk && !slotIsPast

                return (
                    <Button
                        type="button"
                        variant="outline"
                        key={slot.time}
                        className={cn(
                            'h-10 select-none hover:bg-gray-200',
                            selectedTime === slot.time &&
                                'border-2 border-emerald-500 text-primary',
                            !slotEnabled && 'opacity-50 cursor-not-allowed'
                        )}
                        disabled={!slotEnabled}
                        onClick={() => slotEnabled && onSelectTime(slot.time)}
                    >
                        {slot.time}
                    </Button>
                )
            })}
        </div>
    )
}
