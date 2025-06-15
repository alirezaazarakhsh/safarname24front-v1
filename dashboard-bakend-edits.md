### Profile Page

#### General

- [ ] The required api for fetching balance of user is not found in redoc
- [ ] For `/natural-profiles/` and `/juridical-profiles/` if user has no profile in them it should return the object with null or `""` values not `404` Error

#### /natural-profiles/

- [ ] `GET` Shouldn't return `level_name` Prop
- [ ] `GET` Explain `level` prop for `Mahdi Tasha`
- [ ] `PUT` Shouln't use id at the end of url to change the info.

#### /juridical-profiles/

- [ ] `PUT` Shouln't use id at the end of url to change the info.

#### /juridical-profile-documents/<ID>

- [ ] `POST` It shouln't accept the profile object inside sent body.

### Passengers Page

#### /hotel/passengers/

- [ ] `GET` Doesnt return `id` prop which will be needed in editing and deleting passengers

### Favorites

#### /profile/favorite-collections/<ID>/

- [ ] `GET` has `500` Error while includes item

### Custom Club

#### General

- [ ] `GET` All 2 apis Dont return id and the current users score
- [ ] The api for `اطلاع رسانی کد تخفیف!` is not defined
