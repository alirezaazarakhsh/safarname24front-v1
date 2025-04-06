import { rules } from '@/constants/landing';
import { NavBar } from '@/components/landing/modules/rules';
import StickyArea from '@/components/landing/shared/header/StickyArea';

// --------------------------------------------

export default function Rules() {
  // const [activeSection, setActiveSection] = useState('');

  return (
    <>
      <StickyArea>
        <NavBar sectionList={rules.navbar} />
      </StickyArea>

      <div className='h-screen'>
        {/* Navigation */}
        {/* <nav className="bg-blue-100 fixed top-24 flex gap-2">
        {sections.map((section) => (
          <a
          key={section.id}
          href={`#${section.id}`}
          className={activeSection === section.id ? 'text-red-500' : ''}
          >
          {section.label}
          </a>
          ))}
          </nav> */}

        {/* Sections */}
        {/* <div className="h-[200vh] mt-20 flex flex-col justify-between">
        {sections.map((section) => (
          <Section
          key={section.id}
          id={section.id}
          setActiveSection={setActiveSection}
          >
          <h2>{section.label}</h2>
          <p>محتوای {section.label} ...</p>
          </Section>
          ))}
          </div>
          */}
      </div>
    </>
  );
}

// --------------------------------------------

// const Section = ({ id, setActiveSection, children }) => {
//   const { ref, inView } = useInView({
//     threshold: 0.6, // وقتی ۶۰٪ سکشن تو ویو بود فعال شه
//   });

//   React.useEffect(() => {
//     if (inView) {
//       setActiveSection(id);
//     }
//   }, [inView, id, setActiveSection]);

//   return (
//     <div ref={ref} id={id} className="section">
//       {children}
//     </div>
//   );
// };
