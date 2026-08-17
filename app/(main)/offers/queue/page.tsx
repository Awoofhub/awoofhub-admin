'use client'

import { useModeration } from "@/features/moderation/useModeration"

export default function OfferQueuePage() {

    const moderation = useModeration({/* onSuccess */ })

    // REJECT
    moderation.submit({
        targetType: 'offer',
        targetId: "61ecff8c-27d0-458e-bdd5-0dd5111a641e",
        actionType: 'block',

    })

    // APPROVE
    moderation.submit({
        targetType: 'offer',
        targetId: "61ecff8c-27d0-458e-bdd5-0dd5111a641e",
        actionType: 'restore',

    })

    // SUSPEND
    moderation.submit({
        targetType: 'offer',
        targetId: "61ecff8c-27d0-458e-bdd5-0dd5111a641e",
        actionType: 'suspend',

    })

    return (
        <>

        </>
    )
}