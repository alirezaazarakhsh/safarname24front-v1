### Profile Page

#### Info for natural and juridical profiles

- User should have 1 profile with natural and juridical
- The `PUT` methods on both of them shouldn't get `<ID>` of user . since user can have 1 profile at time we edit the profile by default
- For any related api for these remove any usable `<ID>` or `{ profile: 1 // Number of profile }`

#### General

- [ ] The required api for fetching balance of user is not found in redoc
- [ ] For `/natural-profiles/` and `/juridical-profiles/` if user has no profile in them it should return the object with null or `""` values not `404` Error

#### /natural-profiles/

- [ ] `GET` Remove `level_name`
- [ ] `PUT` Shouln't use id at the end of url to change the info of user.
- [ ] Api for uploading image is not defined . in section of `اطلاعات بانکی و پروفایل` in actual ui.

#### /juridical-profiles/

- [ ] Api for uploading image is not defined . in section of `اطلاعات بانکی شرکت` in actual ui.
- [ ] `PUT` Shouln't use id at the end of url to change the info.

#### /juridical-profile-documents/

- [ ] `POST` It shouln't accept the profile object inside sent body.

### Passengers Page

#### /hotel/passengers/

- [ ] `GET` Doesnt return `id` prop which will be needed in editing and deleting passengers

### Favorites

#### /profile/favorite-collections/<ID>/

- [ ] Images are not loading by server. Test them out

### Customer Club

#### General

- [ ] `GET` All apis of this page Doesnt seem to return id and the current users score
- [ ] The api for `اطلاع رسانی کد تخفیف!` is not defined
