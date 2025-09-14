import { Input } from './Input';

// ------------------------------

export function Reserver() {
  return (
    <fieldset className="pb-7 space-y-4 border-b">
      <legend className="text-cs85 font-bold flex gap-2">
        مشخصات رزرو کننده :
      </legend>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-5">
        <Input placeholder="نام" name={'reserver.first_name'} />
        <Input placeholder="نام خانوادگی" name={`reserver.last_name`} />

        <Input
          isPhone
          placeholder="شماره همراه"
          name={`reserver.phone_number`}
        />
        <Input
          isNationalId
          placeholder="کد ملی"
          name={`reserver.national_code`}
        />
      </div>
    </fieldset>
  );
}
