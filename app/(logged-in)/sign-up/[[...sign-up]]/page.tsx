import { SignUp } from '@clerk/nextjs'
import BgGradient from '@/components/Common/Bg-Gradient';

export default function Page() {
  return ( <div className='flex justify-center items-center py-16'> <BgGradient><SignUp /></BgGradient> </div> );
}