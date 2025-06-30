#### /juridical-profile-documents/

- [ ] `POST` It shouln't accept the `profile` and `id` object inside sending body.

### Favorites

#### /profile/favorite-collections/<ID>/

- [x] Images of hotels are not loading by server. Test them out
- [ ] Images of blogs are not loading by server. Test them out

### Customer Club

#### General

- [ ] The current score of user is not returned
- [ ] The required score for purchasing the prizes it not being returned
- [ ] `GET` All apis of this page Doesnt seem to return id and the current users score
- [ ] The api for `اطلاع رسانی کد تخفیف!` is not defined

### Financial

#### Wallet

- [ ] Api For Charging the wallet is not defined. it should return success for now
- [ ] Api For getting history of users transactions

#### Cart to Cart

- [ ] Api For Takout is not definied
- [ ] Api For emergency fields is not defined
- [ ] `GET` for getting credit card should return these infos :

  ```ts
  export interface CreditCardSubscriptionType {
    type: 'premium' | 'free';
    endsAt: string;
    discountCode: string;
    price: number;
    chart: CreditCardSubscriptionChartType;
  }

  export interface CreditCardType {
    owner: string;
    subscription?: CreditCardSubscriptionType;
    number: {
      shaba: string | number;
      card: string | number;
    };
    name: {
      english: string;
      persian: string;
    };
  }
  ```

#### Factors

- [ ] Api is not defined for `get`

### Reservations

- [ ] `GET` Api for list of reservations is not defined
- [ ] Api for canclation of reservations is not defined
- [ ] Api for getting infos of single reservation item is not defined

### Home Page (Dashboard => `/dashboard`)

- [ ] Api for getting infos of dashboard is not defined. Should return :
  - Successfull Reservations count and its chart data
  - Total ticket counts and its chart data
  - Users score in customer Club and its chart data
  - Total purchases price and its chart data
  - List of latest tickets
  - List of Latest reservations
