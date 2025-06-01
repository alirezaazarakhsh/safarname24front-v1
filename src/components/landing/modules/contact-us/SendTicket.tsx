'use client';

import { TopBarConfig } from '../../shared';
import { sendTicket as formSchema } from '@/schema';
import SendTicketReaction from './molecules/SendTicketReaction';

import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

type ReactionType = 'success' | 'fail';
const url = 'https://cps.safarnameh24.com/api/v1/contact/message/';
type FormStates = 'subject' | 'fullName' | 'phoneNumber' | 'email' | 'desc';

// -----------------------------------------

type Data = {
  title: string;
  full_name: string;
  phone_number: string;
  email: string;
  text: string;
};

export function SendTicket() {
  const [reactionOpen, setReactionOpen] = useState(false);
  const [reactionType, setReactionType] = useState<ReactionType>('success');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: 'trhrhrthrthrthrthrthrth',
      fullName: 'rthrthrthrthrthrth',
      phoneNumber: '09399862846',
      email: 'mtn@sdf.ocm',
      desc: 'rthrthrth',
    },
  });

  // const mutation = useMutation({
  //   mutationFn: () => {
  //     return fetch(url, {
  //       method: 'post',
  //       body: {
  //         title: 'string',
  //         full_name: 'string',
  //         phone_number: '09399862846',
  //         email: 'user@example.com',
  //         text: 'string',
  //       },
  //     });
  //   },
  //   onSuccess: () => {
  //     console.log('پیام شما با موفقیت ارسال شد!');
  //   },
  //   onError: (error) => {
  //     console.error('خطا در ارسال پیام: ' + error.message);
  //   },
  // });

  function handleSetError(state: FormStates) {
    const errors = form.formState.errors;
    return errors[state] ? 'ring-red-400' : '';
  }

  function handleSetReaction(type: 'success' | 'fail', isOpen: boolean) {
    setReactionType(type);
    setReactionOpen(isOpen);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    // values.subject === 'incorrect-subject'
    //   ? handleSetReaction('fail', true)
    //   : handleSetReaction('success', true);
    // mutation.mutate();
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        'https://cps.safarnameh24.com/api/v1/config/faqs/',
      );

      console.log(data);
      const json = await data.json();
      console.log(json);
    };

    fetchData();
  }, []);

  return (
    <div>
      <TopBarConfig
        title={{ type: 'single', text: 'تماس با شبکه سفرنامه 24' }}
        subtitle="دوست داریم نظرات و پیشنهادات شما را بشنویم پیام هایتان را با ما در میان بذارید."
      />

      <SendTicketReaction
        reactionType={reactionType}
        isOpen={reactionOpen}
        setOpen={setReactionOpen}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 lg:grid-cols-[1fr_2fr]"
        >
          <div className="space-y-4">
            {/* =============== Subject */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        className={`pl-28 ${handleSetError('subject')}`}
                        placeholder="* موضوع مورد نظر را وارد نمایید"
                      />

                      <div className="absolute top-1/2 -translate-y-1/2 left-4 h-7 px-3 bg-zinc-100 text-zinc-500 text-cs07 font-extrabold pt-0.5 flex-center gap-1 rounded-md">
                        <span className="w-3 text-center">
                          {35 - form.getValues('subject').length >= 0
                            ? 35 - form.getValues('subject').length
                            : 0}
                        </span>
                        <span>کاراکتر</span>
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* =============== FullName */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className={handleSetError('fullName')}
                      placeholder="* نام و نام خانوادگی خود را وارد نمایید"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* =============== PhoneNumber */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className={handleSetError('phoneNumber')}
                      placeholder="* شماره همراه خود را وارد نمایید"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* =============== Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="* ایمیل خود را وارد نمایید"
                      className={handleSetError('email')}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* =============== Description */}
          <FormField
            name="desc"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="* توضیحات خود را وارد نمایید ..."
                    className={`h-full resize-none ${handleSetError('desc')}`}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-max px-8">
            ارسال پیام
          </Button>
        </form>
      </Form>
    </div>
  );
}
