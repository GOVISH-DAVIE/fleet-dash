import { useState } from 'react';
import { Save, User, Bell, Lock, Globe, Database, Mail, Phone, CreditCard, MessageSquare } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Profile Settings</h2>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/3">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary mb-4">
                    <img 
                      src="https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="btn btn-outline w-full">Change Photo</button>
                  <p className="text-xs text-gray-500 mt-2">Recommended: 200x200 px</p>
                </div>
              </div>
              
              <div className="w-full sm:w-2/3 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input id="firstName" type="text" className="input" defaultValue="James" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input id="lastName" type="text" className="input" defaultValue="Mwangi" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input id="email" type="email" className="input" defaultValue="james.mwangi@example.com" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input id="phone" type="tel" className="input" defaultValue="+254 712 345 678" />
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input id="position" type="text" className="input" defaultValue="Fleet Manager" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea id="address" className="input" rows={3} defaultValue="123 Moi Avenue, Nairobi, Kenya"></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button className="btn btn-primary flex items-center gap-2">
                    <Save size={16} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Notification Settings</h2>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-4">Email Notifications</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Alerts</p>
                      <p className="text-sm text-gray-500">Receive alerts when vehicles need maintenance</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Fuel Reports</p>
                      <p className="text-sm text-gray-500">Weekly summary of fuel consumption</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Driver Updates</p>
                      <p className="text-sm text-gray-500">Changes in driver status or performance</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">System Updates</p>
                      <p className="text-sm text-gray-500">Updates about system changes and new features</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-4">SMS Notifications</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Emergency Alerts</p>
                      <p className="text-sm text-gray-500">Critical vehicle or driver issues</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Reminders</p>
                      <p className="text-sm text-gray-500">Day-of reminders for scheduled maintenance</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="btn btn-primary flex items-center gap-2">
                  <Save size={16} />
                  <span>Save Preferences</span>
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Security Settings</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-4">Change Password</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <input id="currentPassword" type="password" className="input" />
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <input id="newPassword" type="password" className="input" />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <input id="confirmPassword" type="password" className="input" />
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="btn btn-primary">Update Password</button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-4">Two-Factor Authentication</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-medium">Enable 2FA</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <button className="btn btn-outline w-full">Setup Two-Factor Authentication</button>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-4">Login Sessions</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start justify-between pb-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium">Safari on macOS</p>
                      <p className="text-sm text-gray-500">Nairobi, Kenya • Current session</p>
                    </div>
                    <button className="text-primary text-sm font-medium hover:underline">This Device</button>
                  </div>
                  
                  <div className="flex items-start justify-between pb-3 border-b border-gray-100">
                    <div>
                      <p className="font-medium">Chrome on Windows</p>
                      <p className="text-sm text-gray-500">Nairobi, Kenya • Last active: 2 days ago</p>
                    </div>
                    <button className="text-error text-sm font-medium hover:underline">Logout</button>
                  </div>
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Safari Fleet Mobile App</p>
                      <p className="text-sm text-gray-500">iPhone • Last active: Today</p>
                    </div>
                    <button className="text-error text-sm font-medium hover:underline">Logout</button>
                  </div>
                </div>
                
                <button className="btn btn-outline w-full mt-4 text-error border-error hover:bg-error/10">Logout of All Devices</button>
              </div>
            </div>
          </div>
        );
        
      case 'company':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Company Settings</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-4">Company Information</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input id="companyName" type="text" className="input" defaultValue="Safari Transport Ltd" />
                    </div>
                    <div>
                      <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">Tax ID / Registration Number</label>
                      <input id="taxId" type="text" className="input" defaultValue="KE123456789X" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
                    <textarea id="companyAddress" className="input" rows={3} defaultValue="456 Kenyatta Avenue, Nairobi, Kenya"></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input id="phone" type="tel" className="input" defaultValue="+254 20 123 4567" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input id="email" type="email" className="input" defaultValue="info@safaritransport.co.ke" />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input id="website" type="url" className="input" defaultValue="https://safaritransport.co.ke" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-4">Branding</h3>
                
                <div className="flex flex-col sm:flex-row gap-6">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Company Logo</p>
                    <div className="w-40 h-40 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                      <div className="h-8 w-8" dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="4" fill="#056b2f" />
  <path d="M6 12H18" stroke="white" stroke-width="2" stroke-linecap="round" />
  <path d="M12 6V18" stroke="white" stroke-width="2" stroke-linecap="round" />
  <circle cx="12" cy="12" r="4" fill="#ff6347" stroke="white" stroke-width="1" />
</svg>` }} />
                    </div>
                    <button className="btn btn-outline mt-2 w-full">Upload Logo</button>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700 mb-2">Brand Colors</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="primaryColor" className="block text-sm text-gray-500 mb-1">Primary Color</label>
                        <div className="flex">
                          <span className="inline-block w-10 h-10 rounded-l border border-r-0 border-gray-300 bg-primary"></span>
                          <input id="primaryColor" type="text" className="input rounded-l-none" defaultValue="#056b2f" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="secondaryColor" className="block text-sm text-gray-500 mb-1">Secondary Color</label>
                        <div className="flex">
                          <span className="inline-block w-10 h-10 rounded-l border border-r-0 border-gray-300 bg-secondary"></span>
                          <input id="secondaryColor" type="text" className="input rounded-l-none" defaultValue="#ff6347" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="accentColor" className="block text-sm text-gray-500 mb-1">Accent Color</label>
                        <div className="flex">
                          <span className="inline-block w-10 h-10 rounded-l border border-r-0 border-gray-300 bg-accent"></span>
                          <input id="accentColor" type="text" className="input rounded-l-none" defaultValue="#ffd700" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="btn btn-primary flex items-center gap-2">
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-800">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and application settings</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings tabs */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-semibold text-gray-800">Settings</h3>
          </div>
          
          <nav className="p-2">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-md transition-colors ${activeTab === 'profile' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <User size={18} />
              <span>Profile</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-md transition-colors ${activeTab === 'notifications' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Bell size={18} />
              <span>Notifications</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-md transition-colors ${activeTab === 'security' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Lock size={18} />
              <span>Security</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('company')}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-md transition-colors ${activeTab === 'company' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Globe size={18} />
              <span>Company</span>
            </button>
            
            <div className="border-t border-gray-200 my-2 pt-2">
              <button 
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Database size={18} />
                <span>API Access</span>
              </button>
              
              <button 
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <CreditCard size={18} />
                <span>Billing</span>
              </button>
              
              <button 
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <MessageSquare size={18} />
                <span>Support</span>
              </button>
            </div>
          </nav>
        </div>
        
        {/* Content area */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;