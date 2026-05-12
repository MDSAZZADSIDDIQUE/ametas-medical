'use client';

import { useSession } from 'next-auth/react';
import { 
  Users, 
  FileText, 
  Image as ImageIcon, 
  Settings as SettingsIcon,
  TrendingUp,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { name: 'Total Slides', value: '3', icon: ImageIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
  { name: 'Content Blocks', value: '3', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
  { name: 'Site Visits', value: '1,284', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { name: 'Active Users', value: '1', icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' },
];

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Welcome back, {session?.user?.name}</h1>
        <p className="text-slate-500">Here's what's happening with your website today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mr-4`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 flex items-center">
              <Activity className="mr-2 text-primary" size={20} />
              Quick Actions
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-slate-50 hover:bg-primary hover:text-white rounded-xl text-left transition-all group">
              <ImageIcon className="mb-2 text-primary group-hover:text-white" size={20} />
              <p className="font-semibold text-sm">Update Slider</p>
              <p className="text-xs opacity-70">Manage hero images</p>
            </button>
            <button className="p-4 bg-slate-50 hover:bg-primary hover:text-white rounded-xl text-left transition-all group">
              <SettingsIcon className="mb-2 text-primary group-hover:text-white" size={20} />
              <p className="font-semibold text-sm">Settings</p>
              <p className="text-xs opacity-70">Site-wide options</p>
            </button>
            <button className="p-4 bg-slate-50 hover:bg-primary hover:text-white rounded-xl text-left transition-all group">
              <Users className="mb-2 text-primary group-hover:text-white" size={20} />
              <p className="font-semibold text-sm">Profile</p>
              <p className="text-xs opacity-70">Admin account info</p>
            </button>
          </div>
        </div>

        {/* Recent Changes */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Recent Updates</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4 pb-4 border-b border-slate-50 last:border-0">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="text-sm font-medium text-slate-800">Hero title updated</p>
                  <p className="text-xs text-slate-500">2 hours ago • by Admin</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
