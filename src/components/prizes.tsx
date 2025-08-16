// components/PrizesTable.tsx
import React from 'react'
import {format} from 'date-fns';

export interface Prize {
  Guid_PrizeId: number
  Dec_Value: string
  VC_Description: string
  Dt_Draw: string
  Guid_TicketId: string
}

interface PrizesTableProps {
  prizes: Prize[]
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',

  })
}



export default function PrizesTable({ prizes }: PrizesTableProps) {
  return (
    <div className="px-2">
      <div className="-mx-4 mt-8 sm:-mx-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="table-fixed w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="w-1/4 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Prize Value
              </th>
              <th
                scope="col"
                className="w-1/4 hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Description
              </th>
              <th
                scope="col"
                className="w-1/4 hidden lg:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Date
              </th>
              <th
                scope="col"
                className="w-1/4 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Winner
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {prizes.map((p) => (
              <tr key={p.Guid_PrizeId}>
                <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {/* Mobile stacked */}
                  <dl className="lg:hidden">
                    <dt className="sr-only">Prize</dt>
                    <dd className="block font-semibold text-gray-900 truncate">${p.Dec_Value}</dd>
                    <dt className="sr-only">Description</dt>
                    <dd className="mt-1 text-gray-500 truncate">$ {p.VC_Description}</dd>
                    <dt className="sr-only">Date</dt>
                    <dd className="mt-1 text-gray-400 text-xs truncate">{format (new Date(p.Dt_Draw), 'MMMM d, yyyy h:mm a')}</dd>
                  </dl>
                  {/* Desktop title only */}
                  <div className="hidden lg:block">
                    $ {p.Dec_Value}
                  </div>
                </td>
                <td className="hidden lg:table-cell px-3 py-4 text-sm text-gray-500">
                  {p.VC_Description}
                </td>
                <td className="hidden lg:table-cell px-3 py-4 text-sm text-gray-500">
                  {format( new Date(p.Dt_Draw), 'MMMM d, yyyy h:mm a')}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {p?.Guid_TicketId || 'TBD'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}