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
                            'h-10 select-none border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700 focus-visible:ring-2 focus-visible:ring-blue-600',
                            selectedTime === slot.time &&
                                'border-blue-600 bg-blue-600 text-white hover:bg-blue-700 hover:text-white',
                            !slotEnabled &&
                                'border-slate-200 bg-slate-100 text-slate-400 opacity-100 cursor-not-allowed hover:bg-slate-100 hover:text-slate-400'
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
