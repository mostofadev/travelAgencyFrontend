import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { 
  LayoutDashboard, 
  Plane, 
  MapPin, 
  Users, 
  Calendar,
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Hotel,
  Briefcase,
  Globe,
  MessageCircle,
  FileText,
  CreditCard,
  Plus,
  List,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  UserPlus,
  UserCheck,
  MapPinned,
  Building,
  Palmtree,
  Ship,
  Package,
  Receipt,
  BarChart3,
  PieChart,
  Icon
} from 'lucide-react';

// app/page.js
export default function Home() {
  // const handleClick = () => {
  //   alert('button clicked!');
  // }
  return (
    <div className="p-8 space-y-4">
      <div className="bg-primary text-white p-4 rounded">
        Primary Color
      </div>
      
      <button className="bg-primary-light hover:bg-primary-dark text-white px-6 py-2 rounded">
        Button
      </button>
      
      <p className="text-primary text-2xl font-bold">
        Primary Text
      </p>

      <div className="border-4 border-secondary hover:border-secondary-dark p-4 rounded">
        Box with Secondary Border
      </div>
      <Input placeholder="Input with Primary Border" className="" />
     
{/* <Button onClick={handleClick}>Click Me</Button> */}
<Button type="submit">Submit</Button>
<Button href="/about">Link</Button>
<Button loading={true}>Loading...</Button>
{/* <Button icon={<Icon />}>With Icon</Button> */}
    </div>
  );
}