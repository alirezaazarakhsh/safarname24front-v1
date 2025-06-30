### General

- [x] Api for getting notifications is not defined
  - `DELETE`, `GET`

### Profile Page

#### Info for natural and juridical profiles

- User should have 1 profile with natural and juridical
- [x] The `PUT` methods on both of them shouldn't get `<ID>` of user . since user can have 1 profile at time we edit the profile by default
- [x] For any related api for these remove any usable `<ID>` or `{ profile: 1 // Number of profile }`

#### General

- [x] The required api for fetching balance of user is not found in redoc
- [x] For `/natural-profiles/` and `/juridical-profiles/` if user has no profile in them it should return the object with null or `""` values not `404` Error

#### /natural-profiles/

- [x] `PUT` Shouln't use id at the end of url to change the info of user.
- [x] Api for uploading image is not defined . in section of `اطلاعات بانکی و پروفایل` in actual ui.

#### /juridical-profiles/

- [x] Api for uploading image is not defined . in section of `اطلاعات بانکی شرکت` in actual ui.
- [x] `PUT` Shouln't use id at the end of url to change the info.

#### /juridical-profile-documents/

- [x] `POST` It shouln't accept the `profile` and `id` object inside sending body.

### Passengers Page

#### /hotel/passengers/

- [x] `GET` Doesnt return `id` prop which will be needed in editing and deleting passengers

### Favorites

#### /profile/favorite-collections/<ID>/

- [ ] Images are not loading by server. Test them out

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
