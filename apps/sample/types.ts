
export enum GuestJourneyStage {
  PRE_ARRIVAL = 'Pre-Arrival',
  CHECK_IN = 'Check-In',
  ADD_ONS = 'Add ons',
  CHECK_OUT = 'Check-Out',
  POST_STAY = 'Post-Stay',
  GENERAL = 'General',
}

export interface HotelProperty {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
}

export type NewHotelData = Omit<HotelProperty, 'id'>;

export interface EmailTemplate {
  id: string;
  hotelId: string;
  name: string;
  stage: GuestJourneyStage;
  mjml: string;
}