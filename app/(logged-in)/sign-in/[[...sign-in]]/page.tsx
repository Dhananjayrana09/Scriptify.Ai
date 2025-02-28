import { SignIn } from '@clerk/nextjs';
import BgGradient from '@/components/Common/Bg-Gradient';

export default function Page() {
  return (
    <div className="flex justify-center items-center py-16">
     <BgGradient><SignIn /></BgGradient>
    </div>
  );
}