// 'use client';

// import {
//   Accordion,
//   AccordionItem,
//   AccordionContent,
//   AccordionTrigger,
// } from '@/components/ui/accordion';

// import { axiosInstance } from '@/utils';
// import { TopBarConfig } from '../../shared';
// import { useQuery } from '@tanstack/react-query';
// import { Skeleton } from '@/components/ui/skeleton';

// type FAQS = {
//   answer: string;
//   question: string;
// };

// // ------------------------------------------------

// export function FrequentlyQuestions() {
//   const { data, isPending } = useQuery({
//     queryKey: ['config-faqs'],
//     queryFn: () => {
//       return axiosInstance('/config/faqs/');
//     },
//   });

//   console.log(data);

//   const source = data?.data?.data;
//   const half = Math.ceil(source?.length / 2);

//   const column1 = half && source.slice(0, half);
//   const column2 = half && source.slice(half);

//   if (!isPending && (!source || !source?.length)) return null;

//   return (
//     <div>
//       <TopBarConfig
//         title={{ type: 'single', text: 'سوالات متداول' }}
//         subtitle="پرسش و پاسخ های مهم در رابط با رزرواسیون !"
//       />

//       {/* Small-Device */}
//       <div className="lg:hidden">
//         {isPending ? (
//           <div className='grid gap-3'>
//             {Array(4)
//               .fill(null)
//               .map((_, index) => (
//                 <Skeleton key={index} className="h-14 rounded-lg" />
//               ))}
//           </div>
//         ) : (
//           <Questions src={source} />
//         )}
//       </div>

//       {/* Large-Device */}
//       <div className="hidden grid-cols-2 gap-20 lg:grid">
//         <Questions src={column1} />
//         <Questions src={column2} />
//       </div>
//     </div>
//   );
// }

// // ---------------------------------------

// type QuestionProps = {
//   src: Array<FAQS>;
// };

// function Questions(props: QuestionProps) {
//   if (!props.src) return null;

//   return (
//     <Accordion type="multiple">
//       {props?.src?.map((item, index) => (
//         <AccordionItem
//           key={index}
//           value={`item-${index}`}
//           className="border-b last:border-none"
//         >
//           <AccordionTrigger className="text-zinc-800 text-cs85 font-bold py-5">
//             {item.question}
//           </AccordionTrigger>

//           <AccordionContent className="text-cs08/6">
//             {item.answer}
//           </AccordionContent>
//         </AccordionItem>
//       ))}
//     </Accordion>
//   );
// }
