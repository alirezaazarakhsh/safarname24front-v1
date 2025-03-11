type Props = {
  src: {
    phone: { icon: React.ReactNode; value: string };
    email: { icon: React.ReactNode; value: string };
    address: { icon: React.ReactNode; value: string };
  };
};

// ----------------------------------------

export default function CommunicationWays(props: Props) {
  const {
    src: { phone, email, address },
  } = props;

  return (
    <div className='w-full flex flex-col gap-y-3 lg:gap-y-2'>
      <h4 className='w-full text-zinc-800 text-cs07 font-bold mb-3 lg:text-cs08'>راه ارتباطی با ما :</h4>

      <CommunicationWay icon={phone.icon} type='phone'>
        {phone.value}
      </CommunicationWay>

      <CommunicationWay icon={email.icon} type='email'>
        {email.value}
      </CommunicationWay>

      <CommunicationWay icon={address.icon} type='address'>
        {address.value}
      </CommunicationWay>
    </div>
  );
}

// ----------------------------------------

type CommunicationWayProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  type: 'phone' | 'email' | 'address';
};

function CommunicationWay(props: CommunicationWayProps) {
  const { icon, children, type } = props;

  return (
    <div className='bg-zinc-100 w-full h-[3.3rem] p-2 pl-3 flex items-center gap-3 rounded-cs-10'>
      <div className='bg-zinc-200 w-9 aspect-square flex-center rounded-lg'>{icon}</div>
      <div
        dir={type === 'phone' ? 'ltr' : 'rtl'}
        className={`text-zinc-800 text-cs75 font-semibold flex-1 ${type === 'address' ? '' : 'font-inter truncate'} ${
          type === 'phone' ? 'text-right' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
}
