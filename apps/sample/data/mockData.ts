import { HotelProperty, EmailTemplate, GuestJourneyStage } from '../types';

export const mockHotels: HotelProperty[] = [
  {
    id: 'hotel-1',
    name: 'A by Adina, Sydney',
    location: 'Sydney, Australia',
    imageUrl: 'https://apimedia.tfehotels.com/media-green/filer_public/b1/ea/b1ea1111-6e51-4a86-ae0b-efeaff165749/a-by-adina-sydney-stay-banner.jpg',
  },
  {
    id: 'hotel-2',
    name: 'Adina Brisbane',
    location: 'Brisbane, Australia',
    imageUrl: 'https://apimedia.tfehotels.com/media-green/filer_public/ef/fd/effd72c2-883e-4ae8-89ae-ae59f1dde66a/adina-brisbane-room-01.jpg',
  },
  {
    id: 'hotel-3',
    name: 'Adina Town Hall',
    location: 'Sydney, Australia',
    imageUrl: 'https://apimedia.tfehotels.com/media-green/filer_public/e9/70/e970b1fa-0017-4c65-ac00-e0b1ef315b23/adina-town-hall-003.jpg',
  },
  {
    id: 'hotel-4',
    name: 'The EVE Hotel',
    location: 'Sydney, Australia',
    imageUrl: 'https://apimedia.tfehotels.com/media-green/filer_public/64/7e/647e77bc-f279-4fbb-a99e-316b119b6a9c/eve_gxp_002.jpg',
  },
  {
    id: 'hotel-5',
    name: 'A by Adina, Vienna',
    location: 'Vienna, Austria',
    imageUrl: 'https://apimedia.tfehotels.com/media-green/filer_public/ad/07/ad07065e-0163-448a-8be1-92e86d8e094e/a-by-adina-vienna-lobby-area.jpg',
  },
  {
    id: 'hotel-6',
    name: 'A by Adina, Canberra',
    location: 'Canberra, Australia',
    imageUrl: 'https://apimedia.tfehotels.com/media-green/filer_public/65/e4/65e43ae6-a967-4dd8-a6ec-d5e43644049c/a-by-adina-canberra-lobby.jpg',
  },
  {
    id: 'hotel-7',
    name: 'Adina Southbank',
    location: 'Melbourne, Australia',
    imageUrl: 'https://apimedia.tfehotels.com/media-green/filer_public/c6/1a/c61a1ec1-c27b-4463-b43b-7de6af695503/adina-melbourne-southbank-exterior.jpg',
  },
  {
    id: 'hotel-8',
    name: 'Adina Flinders',
    location: 'Melbourne, Australia',
    imageUrl: 'https://apimedia.tfehotels.com/media-green/filer_public/61/23/61230cfb-9087-4c95-99fa-98ed9376a22f/adina-melbourne-flinders-lobby.jpg',
  },
];

const welcomeMjml = `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-image width="150px" src="https://picsum.photos/seed/logo/150/50"></mj-image>
        <mj-divider border-color="#F45E43"></mj-divider>
        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">Welcome, {{guestName}}!</mj-text>
        <mj-text>We are thrilled to welcome you to {{hotelName}} for your upcoming stay. Get ready for an unforgettable experience.</mj-text>
        <mj-button background-color="#F45E43" href="#">View Your Reservation</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

const checkinMjml = `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="24px" font-weight="bold" align="center">Ready to Check In?</mj-text>
        <mj-text>You can check in online now to save time upon arrival. We look forward to seeing you at {{hotelName}}.</mj-text>
        <mj-button background-color="#2a9d8f" href="#">Online Check-In</mj-button>
        <mj-text font-size="12px" color="gray">Our check-in time is 3:00 PM.</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

const checkedInMjml = `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="24px" font-weight="bold">Welcome to {{hotelName}}!</mj-text>
        <mj-text>You are officially checked in. We hope you have a fantastic stay with us. Your room number is {{roomNumber}}.</mj-text>
        <mj-text>Here are some quick links to help you settle in:</mj-text>
        <mj-button background-color="#2ecc71" href="#">Hotel Amenities</mj-button>
        <mj-button background-color="#f1c40f" href="#">Local Guide</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

const roomIsReadyMjml = `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="24px" font-weight="bold">Your Room is Ready!</mj-text>
        <mj-text>Great news, {{guestName}}! Your room at {{hotelName}} is now ready for you. Please come to the front desk at your convenience to pick up your key.</mj-text>
        <mj-text>We can't wait to welcome you.</mj-text>
        <mj-button background-color="#2a9d8f" href="#">View Hotel Map</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

const addOnConfirmationMjml = `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px" color="#2a9d8f">Your Add-on is Confirmed!</mj-text>
        <mj-text>We've successfully processed your request for {{addOnName}}. It will be ready for you. Enjoy the little extras that make your stay at {{hotelName}} special.</mj-text>
        <mj-button background-color="#2a9d8f" href="#">View Details</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

const addOnDeclinedMjml = `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px" color="#e76f51">Add-on Request Update</mj-text>
        <mj-text>Unfortunately, we were unable to confirm your request for {{addOnName}} at this time. We apologize for any inconvenience. Please contact the front desk to see if other options are available.</mj-text>
        <mj-button background-color="#e76f51" href="#">Contact Us</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

const checkoutMjml = `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px">We're sad to see you go!</mj-text>
        <mj-text>Your check-out is scheduled for tomorrow at 11:00 AM. For a seamless departure, you can review your bill and check out via the link below.</mj-text>
        <mj-button background-color="#e76f51" href="#">Express Check-Out</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

const invoiceMjml = `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px">Your Invoice from {{hotelName}}</mj-text>
        <mj-text>Dear {{guestName}},</mj-text>
        <mj-text>Thank you for your recent stay. Please find your invoice attached. For any questions, please contact our front desk.</mj-text>
        <mj-table>
          <tr style="border-bottom:1px solid #ecedee;text-align:left;">
            <th style="padding: 0 15px 0 0;">Item</th>
            <th style="padding: 0 15px;">Amount</th>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">Room Charge</td>
            <td style="padding: 0 15px;">$XXX.XX</td>
          </tr>
          <tr>
            <td style="padding: 0 15px 0 0;">Room Service</td>
            <td style="padding: 0 15px;">$XX.XX</td>
          </tr>
           <tr>
            <td style="padding: 0 15px 0 0; font-weight: bold;">Total</td>
            <td style="padding: 0 15px; font-weight: bold;">$XXX.XX</td>
          </tr>
        </mj-table>
        <mj-button background-color="#3498db" href="#">Download PDF Invoice</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

const checkoutFollowUpMjml = `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px">How was your stay at {{hotelName}}?</mj-text>
        <mj-text>We value your feedback! Please take a moment to complete our guest survey to let us know how we did. Your insights help us improve.</mj-text>
        <mj-button background-color="#1abc9c" href="#">Take the Survey</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

const payByLinkMjml = `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px">Action Required: Your Payment</mj-text>
        <mj-text>Dear {{guestName}}, a payment is required for your booking at {{hotelName}}. Please use the secure link below to complete the transaction.</mj-text>
        <mj-button background-color="#e67e22" href="#">Pay Now</mj-button>
        <mj-text font-size="12px" color="gray">This is a secure payment link.</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

const resendGuestFlowMjml = `
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-size="20px">Following up on your stay at {{hotelName}}</mj-text>
        <mj-text>Hello {{guestName}}, this is a follow-up regarding your reservation. Please use the button below to complete any pending actions.</mj-text>
        <mj-button background-color="#9b59b6" href="#">Access Guest Portal</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;

export const baseTemplates = [
  // Pre-Arrival
  { name: 'Welcome', stage: GuestJourneyStage.PRE_ARRIVAL, mjml: welcomeMjml },
  { name: 'Check-in Reminder', stage: GuestJourneyStage.PRE_ARRIVAL, mjml: checkinMjml },
  
  // Check-In
  { name: 'Checked In', stage: GuestJourneyStage.CHECK_IN, mjml: checkedInMjml },
  { name: 'Room is Ready', stage: GuestJourneyStage.CHECK_IN, mjml: roomIsReadyMjml },
  
  // Add-ons
  { name: 'Add-on Confirmation', stage: GuestJourneyStage.ADD_ONS, mjml: addOnConfirmationMjml },
  { name: 'Add-on Declined', stage: GuestJourneyStage.ADD_ONS, mjml: addOnDeclinedMjml },
  
  // Check-Out
  { name: 'Express Check-out', stage: GuestJourneyStage.CHECK_OUT, mjml: checkoutMjml },

  // Post-Stay
  { name: 'Invoice', stage: GuestJourneyStage.POST_STAY, mjml: invoiceMjml },
  { name: 'Guest Survey', stage: GuestJourneyStage.POST_STAY, mjml: checkoutFollowUpMjml },

  // General
  { name: 'Pay By Link', stage: GuestJourneyStage.GENERAL, mjml: payByLinkMjml },
  { name: 'Resend Guest Flow', stage: GuestJourneyStage.GENERAL, mjml: resendGuestFlowMjml },
];

let templateIdCounter = 1;

export const mockTemplates: EmailTemplate[] = mockHotels.flatMap(hotel =>
  baseTemplates.map(baseTemplate => ({
    id: `t${templateIdCounter++}`,
    hotelId: hotel.id,
    name: baseTemplate.name,
    stage: baseTemplate.stage,
    mjml: baseTemplate.mjml,
  }))
);