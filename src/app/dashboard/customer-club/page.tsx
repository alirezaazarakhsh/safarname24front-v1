// Importing part
import { redirect } from 'next/navigation';

// Creating and exporting This Page which doesnt render anything and force navigates user to given url
export default function Page() {
  redirect('/dashboard/customer-club/gifts');
}
