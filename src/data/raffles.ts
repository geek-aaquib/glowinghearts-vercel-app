// src/data/testRaffles.ts

export interface Prize {
  Int_Place: number
  VC_Description: string
  Int_PrizeValuePercent: number
  Dec_Value: number
  Dt_Draw: string
  Guid_TicketId: string
  obj_WinNumbers: null | any
}

export interface BuyIn {
  Guid_BuyIn: string
  Int_NumbTicket: number
  Dec_Price: number
  VC_Description: string
}

export interface RaffleResponse {
  err_Code: number
  message: string
  obj_RaffleData: {
    Guid_DrawId: string
    VC_CharityDesc: string
    Dt_SalesClose: string
    Int_DrawStatus: number
    VC_DrawStatus: string
    Int_TicketSold: number
    Dec_MoneyRaised: number
    obj_Prizes: Prize[]
    obj_BuyIns: BuyIn[]
  }
}

export const testRaffles: RaffleResponse[] = [
  {
    err_Code: 0,
    message: "Retrieved Raffle.Retrieved Prizes.Retrieved BuyIns.",
    obj_RaffleData: {
      Guid_DrawId: "f1a8c2d0-1234-4e5f-8123-abcdef123456",
      VC_CharityDesc: "Hope for Tomorrow Foundation",
      Dt_SalesClose: "2025-08-15T23:59:00.000Z",
      Int_DrawStatus: 2,
      VC_DrawStatus: "Active",
      Int_TicketSold: 150,
      Dec_MoneyRaised: 150,
      obj_Prizes: [
        {
          Int_Place: 1,
          VC_Description: "Grand Prize",
          Int_PrizeValuePercent: 50,
          Dec_Value: 75,
          Dt_Draw: "2025-08-20T18:00:00.000Z",
          Guid_TicketId: "",
          obj_WinNumbers: null
        },
        {
          Int_Place: 2,
          VC_Description: "Runner Up",
          Int_PrizeValuePercent: 25,
          Dec_Value: 37.5,
          Dt_Draw: "2025-08-20T18:00:00.000Z",
          Guid_TicketId: "",
          obj_WinNumbers: null
        }
      ],
      obj_BuyIns: [
        {
          Guid_BuyIn: "a1b2c3d4-5678-90ab-cdef-111213141516",
          Int_NumbTicket: 1,
          Dec_Price: 1,
          VC_Description: "1 Ticket for $1"
        },
        {
          Guid_BuyIn: "b2c3d4e5-6789-01ab-cdef-212223242526",
          Int_NumbTicket: 5,
          Dec_Price: 5,
          VC_Description: "5 Tickets for $5"
        }
      ]
    }
  },
  {
    err_Code: 0,
    message: "Retrieved Raffle.Retrieved Prizes.Retrieved BuyIns.",
    obj_RaffleData: {
      Guid_DrawId: "d2e9f3a1-2345-4f6e-9234-bcdef7890123",
      VC_CharityDesc: "Children's Smile Fund",
      Dt_SalesClose: "2025-09-01T20:00:00.000Z",
      Int_DrawStatus: 2,
      VC_DrawStatus: "Active",
      Int_TicketSold: 300,
      Dec_MoneyRaised: 600,
      obj_Prizes: [
        {
          Int_Place: 1,
          VC_Description: "Luxury Vacation",
          Int_PrizeValuePercent: 100,
          Dec_Value: 600,
          Dt_Draw: "2025-09-05T19:00:00.000Z",
          Guid_TicketId: "",
          obj_WinNumbers: null
        },
        {
          Int_Place: 2,
          VC_Description: "Early Bird Discount",
          Int_PrizeValuePercent: 0,
          Dec_Value: 0,
          Dt_Draw: "0000-00-00 00:00:00",
          Guid_TicketId: "null",
          obj_WinNumbers: null
        }
      ],
      obj_BuyIns: [
        {
          Guid_BuyIn: "c3d4e5f6-7890-12ab-cdef-313233343536",
          Int_NumbTicket: 2,
          Dec_Price: 2,
          VC_Description: "2 Tickets for $2"
        },
        {
          Guid_BuyIn: "d4e5f6a7-8901-23ab-cdef-414243444546",
          Int_NumbTicket: 10,
          Dec_Price: 10,
          VC_Description: "10 Tickets for $10"
        }
      ]
    }
  },
  // add 8 more raffle entries with unique GUIDs, dates, and details
  {
    err_Code: 0,
    message: "Retrieved Raffle.Retrieved Prizes.Retrieved BuyIns.",
    obj_RaffleData: {
      Guid_DrawId: "e3f1a2b3-3456-4a7d-1345-cdef56789012",
      VC_CharityDesc: "Green Earth Initiative",
      Dt_SalesClose: "2025-10-10T17:00:00.000Z",
      Int_DrawStatus: 1,
      VC_DrawStatus: "Upcoming",
      Int_TicketSold: 0,
      Dec_MoneyRaised: 0,
      obj_Prizes: [
        {
          Int_Place: 1,
          VC_Description: "Eco-Friendly Car",
          Int_PrizeValuePercent: 80,
          Dec_Value: 20000,
          Dt_Draw: "2025-10-15T12:00:00.000Z",
          Guid_TicketId: "",
          obj_WinNumbers: null
        },
        {
          Int_Place: 2,
          VC_Description: "Tree Planting Kit",
          Int_PrizeValuePercent: 0,
          Dec_Value: 0,
          Dt_Draw: "0000-00-00 00:00:00",
          Guid_TicketId: "null",
          obj_WinNumbers: null
        }
      ],
      obj_BuyIns: [
        {
          Guid_BuyIn: "e5f6a7b8-9012-34cd-ef01-515253545556",
          Int_NumbTicket: 1,
          Dec_Price: 2,
          VC_Description: "1 Ticket for $2"
        },
        {
          Guid_BuyIn: "f6a7b8c9-0123-45de-f012-616263646566",
          Int_NumbTicket: 4,
          Dec_Price: 8,
          VC_Description: "4 Tickets for $8"
        }
      ]
    }
  },
  {
    err_Code: 0,
    message: "Retrieved Raffle.Retrieved Prizes.Retrieved BuyIns.",
    obj_RaffleData: {
      Guid_DrawId: "a4b5c6d7-4567-4b8e-2456-def678901234",
      VC_CharityDesc: "Health Heroes Fund",
      Dt_SalesClose: "2025-07-20T21:00:00.000Z",
      Int_DrawStatus: 2,
      VC_DrawStatus: "Active",
      Int_TicketSold: 500,
      Dec_MoneyRaised: 1000,
      obj_Prizes: [
        {
          Int_Place: 1,
          VC_Description: "Home Theater System",
          Int_PrizeValuePercent: 100,
          Dec_Value: 1000,
          Dt_Draw: "2025-07-25T18:00:00.000Z",
          Guid_TicketId: "",
          obj_WinNumbers: null
        },
        {
          Int_Place: 2,
          VC_Description: "Wellness Basket",
          Int_PrizeValuePercent: 0,
          Dec_Value: 0,
          Dt_Draw: "0000-00-00 00:00:00",
          Guid_TicketId: "null",
          obj_WinNumbers: null
        }
      ],
      obj_BuyIns: [
        {
          Guid_BuyIn: "b5c6d7e8-5678-56ef-0123-171819202122",
          Int_NumbTicket: 3,
          Dec_Price: 3,
          VC_Description: "3 Tickets for $3"
        },
        {
          Guid_BuyIn: "c6d7e8f9-6789-67f0-1234-282930313233",
          Int_NumbTicket: 6,
          Dec_Price: 6,
          VC_Description: "6 Tickets for $6"
        }
      ]
    }
  },
  {
    err_Code: 0,
    message: "Retrieved Raffle.Retrieved Prizes.Retrieved BuyIns.",
    obj_RaffleData: {
      Guid_DrawId: "b7c8d9e0-5678-4d9f-4567-345678901234",
      VC_CharityDesc: "Education Empowers Trust",
      Dt_SalesClose: "2025-08-01T19:30:00.000Z",
      Int_DrawStatus: 2,
      VC_DrawStatus: "Active",
      Int_TicketSold: 250,
      Dec_MoneyRaised: 500,
      obj_Prizes: [
        {
          Int_Place: 1,
          VC_Description: "Scholarship Fund",
          Int_PrizeValuePercent: 100,
          Dec_Value: 500,
          Dt_Draw: "2025-08-05T15:00:00.000Z",
          Guid_TicketId: "",
          obj_WinNumbers: null
        },
        {
          Int_Place: 2,
          VC_Description: "Book Bundle",
          Int_PrizeValuePercent: 0,
          Dec_Value: 0,
          Dt_Draw: "0000-00-00 00:00:00",
          Guid_TicketId: "null",
          obj_WinNumbers: null
        }
      ],
      obj_BuyIns: [
        {
          Guid_BuyIn: "d8e9f0a1-7890-78f1-2345-343536373839",
          Int_NumbTicket: 2,
          Dec_Price: 2,
          VC_Description: "2 Tickets for $2"
        },
        {
          Guid_BuyIn: "e9f0a1b2-8901-89f2-3456-454647484950",
          Int_NumbTicket: 8,
          Dec_Price: 8,
          VC_Description: "8 Tickets for $8"
        }
      ]
    }
  },
  {
    err_Code: 0,
    message: "Retrieved Raffle.Retrieved Prizes.Retrieved BuyIns.",
    obj_RaffleData: {
      Guid_DrawId: "c9d0e1f2-6789-4eab-5678-567890123456",
      VC_CharityDesc: "Animal Care Coalition",
      Dt_SalesClose: "2025-07-15T17:45:00.000Z",
      Int_DrawStatus: 2,
      VC_DrawStatus: "Active",
      Int_TicketSold: 400,
      Dec_MoneyRaised: 800,
      obj_Prizes: [
        {
          Int_Place: 1,
          VC_Description: "Pet Care Package",
          Int_PrizeValuePercent: 100,
          Dec_Value: 800,
          Dt_Draw: "2025-07-20T16:00:00.000Z",
          Guid_TicketId: "",
          obj_WinNumbers: null
        },
        {
          Int_Place: 2,
          VC_Description: "Grooming Voucher",
          Int_PrizeValuePercent: 0,
          Dec_Value: 0,
          Dt_Draw: "0000-00-00 00:00:00",
          Guid_TicketId: "null",
          obj_WinNumbers: null
        }
      ],
      obj_BuyIns: [
        {
          Guid_BuyIn: "f0a1b2c3-9012-90f3-4567-545556575859",
          Int_NumbTicket: 5,
          Dec_Price: 5,
          VC_Description: "5 Tickets for $5"
        },
        {
          Guid_BuyIn: "a1b2c3d4-0123-01f4-5678-656667686970",
          Int_NumbTicket: 15,
          Dec_Price: 15,
          VC_Description: "15 Tickets for $15"
        }
      ]
    }
  },
  {
    err_Code: 0,
    message: "Retrieved Raffle.Retrieved Prizes.Retrieved BuyIns.",
    obj_RaffleData: {
      Guid_DrawId: "d0e1f2a3-7890-4fcd-6789-678901234567",
      VC_CharityDesc: "Arts & Culture Collective",
      Dt_SalesClose: "2025-09-10T18:15:00.000Z",
      Int_DrawStatus: 1,
      VC_DrawStatus: "Upcoming",
      Int_TicketSold: 0,
      Dec_MoneyRaised: 0,
      obj_Prizes: [
        {
          Int_Place: 1,
          VC_Description: "Gallery Membership",
          Int_PrizeValuePercent: 100,
          Dec_Value: 300,
          Dt_Draw: "2025-09-15T14:00:00.000Z",
          Guid_TicketId: "",
          obj_WinNumbers: null
        },
        {
          Int_Place: 2,
          VC_Description: "Event Tickets",
          Int_PrizeValuePercent: 0,
          Dec_Value: 0,
          Dt_Draw: "0000-00-00 00:00:00",
          Guid_TicketId: "null",
          obj_WinNumbers: null
        }
      ],
      obj_BuyIns: [
        {
          Guid_BuyIn: "e1f2a3b4-8901-01d5-6789-767778798081",
          Int_NumbTicket: 1,
          Dec_Price: 3,
          VC_Description: "1 Ticket for $3"
        },
        {
          Guid_BuyIn: "f2a3b4c5-9012-12e6-7890-878889909192",
          Int_NumbTicket: 6,
          Dec_Price: 18,
          VC_Description: "6 Tickets for $18"
        }
      ]
    }
  },
  {
    err_Code: 0,
    message: "Retrieved Raffle.Retrieved Prizes.Retrieved BuyIns.",
    obj_RaffleData: {
      Guid_DrawId: "e1f2a3b4-9012-4fab-7890-789012345678",
      VC_CharityDesc: "Community Food Bank Drive",
      Dt_SalesClose: "2025-07-25T20:30:00.000Z",
      Int_DrawStatus: 2,
      VC_DrawStatus: "Active",
      Int_TicketSold: 600,
      Dec_MoneyRaised: 1800,
      obj_Prizes: [
        {
          Int_Place: 1,
          VC_Description: "Grocery Gift Card",
          Int_PrizeValuePercent: 100,
          Dec_Value: 1800,
          Dt_Draw: "2025-07-30T17:00:00.000Z",
          Guid_TicketId: "",
          obj_WinNumbers: null
        },
        {
          Int_Place: 2,
          VC_Description: "Cooking Set",
          Int_PrizeValuePercent: 0,
          Dec_Value: 0,
          Dt_Draw: "0000-00-00 00:00:00",
          Guid_TicketId: "null",
          obj_WinNumbers: null
        }
      ],
      obj_BuyIns: [
        {
          Guid_BuyIn: "f3a4b5c6-0123-23f7-8901-898990101112",
          Int_NumbTicket: 4,
          Dec_Price: 4,
          VC_Description: "4 Tickets for $4"
        },
        {
          Guid_BuyIn: "a4b5c6d7-1234-34g8-9012-909192939495",
          Int_NumbTicket: 12,
          Dec_Price: 12,
          VC_Description: "12 Tickets for $12"
        }
      ]
    }
  }
]
