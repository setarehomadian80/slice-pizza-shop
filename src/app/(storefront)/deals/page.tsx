import BundleBuilder from '@/components/deals/BundleBuilder'
import DealsHero from '@/components/deals/DealsHero'
import PromoCodes from '@/components/deals/PromoCodes'
import SetDeals from '@/components/deals/SetDeals'
import DeliveryZones from '@/components/location/DeliveryZones'
import React from 'react'

export default function page() {
  return (
    <div>
        <DealsHero />
        <SetDeals />
        <BundleBuilder />
        <PromoCodes />
    </div>
  )
}
