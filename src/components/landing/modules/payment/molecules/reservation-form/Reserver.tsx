import { Input } from './Input';

// ------------------------------

export function Reserver() {
  return (
    <fieldset className="space-y-3.5 border-b pb-6">
      <legend className="flex gap-2 text-cs85 font-bold">
        مشخصات رزرو کننده :
      </legend>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-5">
        <Input placeholder="* نام" name={'reserver.first_name'} />
        <Input placeholder="* نام خانوادگی" name={`reserver.last_name`} />

        <Input
          isPhone
          placeholder="* شماره همراه"
          name={`reserver.phone_number`}
        />

        <Input
          isNationalId
          name={`reserver.national_code`}
          placeholder="کد ملی یا پاسپورت (اختیاری)"
        />
      </div>
    </fieldset>
  );
}
