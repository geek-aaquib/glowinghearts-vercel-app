export const data1 = [
    // JSON Raffle Data:

    // Event Call:
    // “Req_RaffleDetails”

    // Required JSON sent to Server:
    {
        Guid_RaffleId : "1"
    },

    // Event Response Message:
    // “Rtn_RaffleDetails”

    // return raffle details response
    {
        Guid_DrawId: "",
        Guid_CharityId: "",
        VC_CharityDesc: "This is Rib fest charity.....",
        Txt_GameDetails: "",
        Int_TicketSold: "",
        Dec_MoneyRaised: "12,345",
        obj_Prizes: [
            {
                Int_Place: "",
                VC_Description: "",
                Dt_Draw: "",
                Dec_Value: "",
                Guid_TicketId: "",
            }
        ],
        obj_BuyIns: [
            {
                Guid_BuyInId: "",
                Int_NumbTicket: "",
                Dec_Price: "",
                VC_Description: ""
            }
        ]
    },

    // Create Ticket Packages JSON:
    // Event Call:
    // “Req_CreatePlayer_Package”
    // Required JSON sent to Server:

    {
        Guid_RaffleId: "",
        obj_BuyIns: [
            {
                Guid_BuyIn: "",
                Int_Package_Count: ""
            }
        ]
    },

    // Event Response Message:
    // “Rtn_CreatePlayer_Package”

    {
        err_Code: "",
        Message: "",
        obj_Results: {
            Dec_TotalPrice: "",
            Guid_DrawId: "",
            Int_TotalTickets: "",
            obj_Packages:[
                {
                    Guid_BuyIn: "",
                    Dec_Price: "",
                    Int_Package: "",
                    obj_Tickets: [
                    ]
                }
            ]
        }
    },


        // Purchase Tickets JSON:
        // Event Call:
        // “Req_PlayerPurchase”
        // Required JSON sent to Server:

        {
            Guid_DrawId: "",
            Guid_PurchaseId: "",
            Dt_Purchase: "",
            Dec_PurchaseAmount: "",
            VC_PlayerEmail: "",
            VC_PlayerFirst: "",
            VC_PlayerLast: "",
            VC_PlayerAddr1: "",
            VC_PlayerAddr2: "",
            VC_PlayerCity: "",
            VC_PlayerProvince: "",
            VC_PlayerPostalCode : "",
            obj_Packages : ""
        },


        // Event Response Message:
        // “Rtn_PlayerPurchase”
        //  Returned JSON Data:
        { 
            Guid_DrawId: "",
            VC_Status: ""
        },

        //         JSON Tickets By Purchase:
        // Event Call:
        // “Req_PlayerTickets_Purchase”
        // Required JSON sent to Server:
        {   Guid_RaffleId: "",
            Guid_PurchaseId: ""
        },


        // Event Response Message:
        // “Rtn_PlayerTickets_Purchase”
        // Returned JSON Data:
        {
            Guid_DrawId: "",
            Guid_PurchaseId: "",
            Dt_Purchased: "",
            obj_BuyIns:[
                    { 
                        Guid_BuyInId: "",
                        Int_NumbTickets: "",
                        Dec_Price: "",
                        VC_Description : "",
                        obj_Tickets:[

                        ]
                    }
                ]
        },

        





]