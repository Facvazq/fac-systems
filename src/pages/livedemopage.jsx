import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Check, Settings, LayoutDashboard, ChevronLeft, ChevronRight, Mail, Bell, Star, Briefcase, Plus, X, Save, Edit2, Trash2, ArrowDownCircle } from 'lucide-react';

// --- Components ---

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false }) => {
  const baseStyle = "px-6 py-3 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-200",
    secondary: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    ghost: "bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100",
    sm: "px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700"
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Input = ({ label, type = "text", value, onChange, placeholder, min, max, className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-sm font-semibold text-gray-500 ml-1">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all outline-none text-gray-900"
    />
  </div>
);

const Toast = ({ message, type, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed top-6 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-4 flex items-center gap-3 pr-6">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${type === 'email' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
          {type === 'email' ? <Mail size={16} /> : <Check size={16} />}
        </div>
        <div>
          <h4 className="font-semibold text-sm text-gray-900">{type === 'email' ? 'Notification' : 'Success'}</h4>
          <p className="text-xs text-gray-500">{message}</p>
        </div>
      </div>
    </div>
  );
};

// --- View Components ---

const CustomerView = ({ providerConfig, bookings, onBook }) => {
  const [step, setStep] = useState(0); // 0 = Select Service, 1 = Date/Time, 2 = Details, 3 = Success
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-select first service if not set
  useEffect(() => {
    if (!selectedService && providerConfig.sessionTypes.length > 0) {
      setSelectedService(providerConfig.sessionTypes[0]);
    }
  }, [providerConfig.sessionTypes]);

  // Helper to generate next 14 days correctly
  const getNextDays = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const generateTimeSlots = (date) => {
    if (!selectedService) return [];

    const dayIndex = date.getDay(); // 0 = Sun, 1 = Mon
    // Get schedule specifically from the selected service
    const daySchedule = selectedService.schedule[dayIndex];
    
    // Explicitly check for inactive day
    if (!daySchedule || !daySchedule.active) return null; 
    if (daySchedule.ranges.length === 0) return [];

    const slots = [];
    const dateStr = date.toISOString().split('T')[0];
    const duration = selectedService.duration;

    daySchedule.ranges.forEach(range => {
      let [startH, startM] = range.start.split(':').map(Number);
      let [endH, endM] = range.end.split(':').map(Number);
      
      let currentMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;

      while (currentMinutes + duration <= endMinutes) {
        const h = Math.floor(currentMinutes / 60);
        const m = currentMinutes % 60;
        const timeString = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        
        // Check availability against existing bookings
        const isBooked = bookings.some(b => b.date === dateStr && b.time === timeString);
        if (!isBooked) slots.push(timeString);

        currentMinutes += duration;
      }
    });

    return slots.sort();
  };

  const availableSlots = generateTimeSlots(selectedDate);

  const handleBook = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onBook({
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        serviceName: selectedService.name,
        price: selectedService.price,
        client: formData.name,
        email: formData.email
      });
      setStep(3);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto pt-8 pb-20 px-4">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
          Client Booking
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-4">Book a Session</h1>
        <p className="text-lg text-gray-500 max-w-lg mx-auto">
          Schedule a session with <span className="font-semibold text-gray-900">{providerConfig.name}</span>.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Side */}
        <div className="col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 text-gray-900 flex items-center justify-center text-xl font-bold uppercase">
                <User size={32} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{providerConfig.name}</h3>
                <p className="text-sm text-gray-500">{providerConfig.role}</p>
              </div>
            </div>
            
            {selectedService && (
               <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase mb-1">Selected Service</p>
                      <p className="font-bold text-gray-900">{selectedService.name}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock size={18} className="text-gray-400" />
                    <span>{selectedService.duration} min session</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Star size={18} className="text-gray-400" />
                    <span>${selectedService.price} / session</span>
                  </div>
               </div>
            )}
            
            {step > 0 && (
                <button 
                    onClick={() => { setStep(0); setSelectedTime(null); }}
                    className="mt-6 text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                    <ChevronLeft size={12}/> Change Service
                </button>
            )}
          </div>
        </div>

        {/* Interaction Area */}
        <div className="col-span-2">
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
            
            {/* Step 0: Select Service */}
            {step === 0 && (
              <div className="p-8 flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Select a Service</h3>
                <div className="grid gap-4">
                  {providerConfig.sessionTypes.map((service, idx) => (
                    <div 
                      key={idx}
                      onClick={() => { setSelectedService(service); setStep(1); }}
                      className="group p-5 rounded-2xl border border-gray-100 hover:border-blue-500 hover:shadow-md cursor-pointer transition-all flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{service.name}</h4>
                        <div className="flex gap-3 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1"><Clock size={14}/> {service.duration} min</span>
                          <span>•</span>
                          <span className="font-medium text-gray-900">${service.price}</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all">
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Date & Time */}
            {step === 1 && (
              <div className="p-8 flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Select Date & Time</h3>
                
                <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide mb-2">
                  {getNextDays().map((date, i) => {
                    const isSelected = date.toDateString() === selectedDate.toDateString();
                    return (
                      <button
                        key={i}
                        onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                        className={`flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                          isSelected 
                            ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105' 
                            : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                        }`}
                      >
                        <span className="text-xs font-medium uppercase">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <span className="text-xl font-bold">{date.getDate()}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="h-px w-full bg-gray-100 mb-6"></div>

                <div className="flex-1">
                  {availableSlots === null ? (
                    // Day Set Off State
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-3 min-h-[200px]">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                        <X size={32} />
                      </div>
                      <p className="font-semibold text-gray-500">Day Set Off</p>
                    </div>
                  ) : availableSlots.length === 0 ? (
                    // Fully Booked State
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2 min-h-[200px]">
                      <User size={32} className="opacity-20" />
                      <p>Fully Booked</p>
                    </div>
                  ) : (
                    // Available Slots
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {availableSlots.map(time => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 px-2 rounded-xl text-sm font-semibold transition-all ${
                            selectedTime === time
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                              : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                  <Button onClick={() => setStep(2)} disabled={!selectedTime}>
                    Next Step <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Confirmation */}
            {step === 2 && (
              <div className="p-8 flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                <button onClick={() => setStep(1)} className="text-gray-400 hover:text-gray-900 mb-6 flex items-center gap-2 text-sm font-medium transition-colors">
                  <ChevronLeft size={16} /> Back to Calendar
                </button>
                
                <h3 className="text-xl font-bold text-gray-900 mb-6">Confirm Details</h3>
                
                {/* Order Summary */}
                <div className="bg-gray-50 p-5 rounded-2xl mb-8 border border-gray-100">
                    <div className="space-y-3">
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Service</span>
                            <span className="font-semibold text-gray-900">{selectedService.name}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Date</span>
                            <span className="font-semibold text-gray-900">
                                {selectedDate.toLocaleDateString(undefined, {weekday: 'long', month: 'long', day: 'numeric'})}
                            </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Time</span>
                            <span className="font-semibold text-gray-900">{selectedTime}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Duration</span>
                            <span className="font-semibold text-gray-900">{selectedService.duration} minutes</span>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center">
                        <span className="text-gray-900 font-bold">Total Price</span>
                        <span className="text-2xl font-bold text-gray-900">${selectedService.price}</span>
                    </div>
                </div>

                <div className="space-y-5 max-w-md mb-8">
                  <Input 
                    label="Your Name" 
                    placeholder="Jane Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <Input 
                    label="Email Address" 
                    type="email" 
                    placeholder="jane@company.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="mt-auto flex justify-end">
                  <Button 
                    onClick={handleBook}
                    disabled={!formData.name || !formData.email || isSubmitting}
                    className={isSubmitting ? "opacity-80 w-full md:w-auto" : "w-full md:w-auto"}
                  >
                    {isSubmitting ? "Processing..." : <>Confirm <Check size={18} /></>}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div className="p-8 h-full flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <Check size={40} strokeWidth={3} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-500 max-w-xs mx-auto mb-8">
                  A receipt for <strong>${selectedService.price}</strong> and calendar invite has been sent to <strong>{formData.email}</strong>.
                </p>
                <Button variant="secondary" onClick={() => {
                  setStep(0); 
                  setSelectedTime(null);
                  setFormData({name: '', email: ''});
                }}>
                  Book Another Session
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SellerView = ({ providerConfig, onUpdateConfig, bookings }) => {
  const [activeDay, setActiveDay] = useState(1); // 0=Sun, 1=Mon...
  const [activeSessionIndex, setActiveSessionIndex] = useState(0); // Index of session type being edited
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  
  const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Local state for profile form
  const [profileForm, setProfileForm] = useState({
    name: providerConfig.name,
    role: providerConfig.role,
  });

  // Local state for Session Types
  const [sessionTypes, setSessionTypes] = useState(providerConfig.sessionTypes);

  // Sync state when props change
  useEffect(() => {
    setProfileForm({
      name: providerConfig.name,
      role: providerConfig.role,
    });
    setSessionTypes(providerConfig.sessionTypes);
  }, [providerConfig]);

  const handleProfileSave = () => {
    onUpdateConfig({ ...providerConfig, name: profileForm.name, role: profileForm.role });
    setIsEditModalOpen(false);
  };

  const handleSessionSave = () => {
    onUpdateConfig({ ...providerConfig, sessionTypes: sessionTypes });
    setIsSessionModalOpen(false);
  };

  const addSessionType = () => {
    // Default schedule for new sessions
    const defaultSchedule = {
      1: { active: true, ranges: [{start: "09:00", end: "17:00"}] },
      2: { active: true, ranges: [{start: "09:00", end: "17:00"}] },
      3: { active: true, ranges: [{start: "09:00", end: "17:00"}] },
      4: { active: true, ranges: [{start: "09:00", end: "17:00"}] },
      5: { active: true, ranges: [{start: "09:00", end: "17:00"}] },
    };
    
    setSessionTypes([...sessionTypes, { name: "New Session", duration: 60, price: 100, schedule: defaultSchedule }]);
  };

  const updateSessionType = (index, field, value) => {
    const updated = [...sessionTypes];
    updated[index] = { ...updated[index], [field]: value };
    setSessionTypes(updated);
  };

  const removeSessionType = (index) => {
    const updated = [...sessionTypes];
    updated.splice(index, 1);
    setSessionTypes(updated);
  };

  // --- Schedule Editing Logic (Deeply Nested) ---

  const getScheduleForActiveSession = () => {
    // Return schedule or empty object if undefined
    return providerConfig.sessionTypes[activeSessionIndex]?.schedule || {};
  };

  const updateScheduleForActiveSession = (newSchedule) => {
    const updatedSessionTypes = [...providerConfig.sessionTypes];
    updatedSessionTypes[activeSessionIndex] = {
      ...updatedSessionTypes[activeSessionIndex],
      schedule: newSchedule
    };
    onUpdateConfig({ ...providerConfig, sessionTypes: updatedSessionTypes });
  };

  const toggleDayActive = () => {
    const currentSchedule = getScheduleForActiveSession();
    const newSchedule = { ...currentSchedule };
    
    if (!newSchedule[activeDay]) newSchedule[activeDay] = { active: true, ranges: [] };
    
    newSchedule[activeDay] = {
      ...newSchedule[activeDay],
      active: !newSchedule[activeDay].active
    };
    updateScheduleForActiveSession(newSchedule);
  };

  const addRange = () => {
    const currentSchedule = getScheduleForActiveSession();
    const newSchedule = { ...currentSchedule };
    const dayData = newSchedule[activeDay] || { active: true, ranges: [] };
    
    newSchedule[activeDay] = {
      ...dayData,
      ranges: [...dayData.ranges, { start: "09:00", end: "12:00" }]
    };
    updateScheduleForActiveSession(newSchedule);
  };

  const removeRange = (rangeIndex) => {
    const currentSchedule = getScheduleForActiveSession();
    const newSchedule = { ...currentSchedule };
    
    if (newSchedule[activeDay] && newSchedule[activeDay].ranges) {
        const ranges = [...newSchedule[activeDay].ranges];
        ranges.splice(rangeIndex, 1);
        newSchedule[activeDay].ranges = ranges;
        updateScheduleForActiveSession(newSchedule);
    }
  };

  const updateRange = (rangeIndex, field, val) => {
    const currentSchedule = getScheduleForActiveSession();
    const newSchedule = { ...currentSchedule };
    
    if (newSchedule[activeDay] && newSchedule[activeDay].ranges) {
        const ranges = [...newSchedule[activeDay].ranges];
        ranges[rangeIndex] = { ...ranges[rangeIndex], [field]: val };
        newSchedule[activeDay].ranges = ranges;
        updateScheduleForActiveSession(newSchedule);
    }
  };

  const sortedBookings = [...bookings].sort((a, b) => b.id - a.id);
  
  // Safe access to current day data
  const activeSessionSchedule = getScheduleForActiveSession();
  const currentDayData = activeSessionSchedule[activeDay] || { active: false, ranges: [] };

  return (
    <div className="max-w-6xl mx-auto pt-8 pb-20 px-4 relative">
      
      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <Input 
                label="Display Name" 
                value={profileForm.name} 
                onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} 
              />
              <Input 
                label="Role / Title" 
                value={profileForm.role} 
                onChange={(e) => setProfileForm({...profileForm, role: e.target.value})} 
              />
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button onClick={handleProfileSave}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Sessions Modal */}
      {isSessionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Manage Sessions</h3>
              <button onClick={() => setIsSessionModalOpen(false)} className="text-gray-400 hover:text-gray-900">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
               {sessionTypes.map((session, idx) => (
                   <div key={idx} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 relative group">
                        <button 
                            onClick={() => removeSessionType(idx)} 
                            className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <Trash2 size={16} />
                        </button>
                        <div className="space-y-3">
                            <Input 
                                label="Session Name" 
                                value={session.name} 
                                onChange={(e) => updateSessionType(idx, 'name', e.target.value)} 
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <Input 
                                    label="Duration (min)" 
                                    type="number" 
                                    value={session.duration} 
                                    onChange={(e) => updateSessionType(idx, 'duration', parseInt(e.target.value) || 0)} 
                                />
                                <Input 
                                    label="Price ($)" 
                                    type="number" 
                                    value={session.price} 
                                    onChange={(e) => updateSessionType(idx, 'price', parseInt(e.target.value) || 0)} 
                                />
                            </div>
                        </div>
                   </div>
               ))}
               <Button variant="secondary" className="w-full border-dashed" onClick={addSessionType}>
                  <Plus size={16} /> Add New Session Type
               </Button>
            </div>

            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button variant="ghost" onClick={() => setIsSessionModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSessionSave}>Save Sessions</Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="text-gray-500">Manage profile and availability</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell size={24} className="text-gray-400 hover:text-gray-900 cursor-pointer" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
          </div>
          <button 
            onClick={() => setIsEditModalOpen(true)}
            className="group relative"
          >
            <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm transition-transform group-hover:scale-105 uppercase">
              <User size={20} />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-0.5 border-2 border-white">
              <Edit2 size={8} />
            </div>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Col: Stats */}
        <div className="space-y-6">
          <div className="bg-gray-900 text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-gray-400 font-medium text-sm mb-1">Upcoming Sessions</p>
              <h3 className="text-4xl font-bold">{bookings.length}</h3>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gray-800 rounded-full blur-2xl opacity-50"></div>
          </div>

          {/* Quick Profile Readout */}
          <div 
            onClick={() => setIsEditModalOpen(true)}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2 text-gray-900 font-bold">
                <User size={20} />
                <h3>Your Profile</h3>
              </div>
              <Edit2 size={16} className="text-gray-400 group-hover:text-blue-600" />
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-semibold">Name:</span> {providerConfig.name}</p>
              <p className="text-gray-500">{providerConfig.role}</p>
            </div>
          </div>

          {/* Session Types Manager */}
          <div 
            onClick={() => setIsSessionModalOpen(true)}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-2 text-gray-900 font-bold">
                <Briefcase size={20} />
                <h3>Session Types</h3>
              </div>
              <Edit2 size={16} className="text-gray-400 group-hover:text-blue-600" />
            </div>
            <div className="space-y-2">
                {providerConfig.sessionTypes.map((s, i) => (
                    <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600">{s.name}</span>
                        <span className="font-semibold text-gray-900">${s.price}</span>
                    </div>
                ))}
            </div>
          </div>

        </div>

        {/* Right Col: Schedule & Bookings */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Availability Editor */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-2 text-gray-900 font-bold">
                  <Calendar size={20} />
                  <h3>Weekly Schedule</h3>
                </div>
                
                {/* Session Selector */}
                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                    <span className="text-xs font-bold uppercase text-gray-400 pl-2">Edit:</span>
                    <select 
                        value={activeSessionIndex}
                        onChange={(e) => setActiveSessionIndex(Number(e.target.value))}
                        className="bg-transparent text-sm font-semibold text-gray-900 outline-none p-1 cursor-pointer"
                    >
                        {providerConfig.sessionTypes.map((s, idx) => (
                            <option key={idx} value={idx}>{s.name}</option>
                        ))}
                    </select>
                </div>
             </div>

             {/* Day Tabs */}
             <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
               {daysMap.map((day, i) => (
                 <button
                   key={day}
                   onClick={() => setActiveDay(i)}
                   className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                     activeDay === i 
                       ? 'bg-black text-white' 
                       : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                   }`}
                 >
                   {day.slice(0,3)}
                 </button>
               ))}
             </div>

             <div className="mt-4 p-4 bg-gray-50 rounded-2xl">
               <div className="flex items-center justify-between mb-4">
                 <h4 className="font-bold text-gray-900">{daysMap[activeDay]}</h4>
                 <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{currentDayData.active ? 'Available' : 'Day Off'}</span>
                    <button 
                      onClick={toggleDayActive}
                      className={`w-12 h-6 rounded-full transition-colors relative ${currentDayData.active ? 'bg-green-500' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${currentDayData.active ? 'left-7' : 'left-1'}`}></div>
                    </button>
                 </div>
               </div>

               {currentDayData.active && (
                 <div className="space-y-3">
                   {currentDayData.ranges.map((range, idx) => (
                     <div key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
                       <input 
                         type="time" 
                         value={range.start}
                         onChange={(e) => updateRange(idx, 'start', e.target.value)}
                         className="bg-gray-50 border-none rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none"
                       />
                       <span className="text-gray-400">-</span>
                       <input 
                         type="time" 
                         value={range.end}
                         onChange={(e) => updateRange(idx, 'end', e.target.value)}
                         className="bg-gray-50 border-none rounded-lg px-2 py-1 text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none"
                       />
                       <button onClick={() => removeRange(idx)} className="ml-auto text-red-400 hover:text-red-600 p-2">
                         <X size={16} />
                       </button>
                     </div>
                   ))}
                   <button 
                     onClick={addRange}
                     className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors flex items-center justify-center gap-2 text-sm font-bold"
                   >
                     <Plus size={16} /> Add Hours
                   </button>
                 </div>
               )}
             </div>
          </div>

          {/* Bookings List */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[300px]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-gray-900">Recent Bookings</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {sortedBookings.length === 0 ? (
                <div className="p-12 text-center text-gray-400">
                  <LayoutDashboard size={24} className="mx-auto mb-4 opacity-50"/>
                  <p>No bookings yet.</p>
                </div>
              ) : (
                sortedBookings.map((booking) => (
                  <div key={booking.id} className="p-6 hover:bg-blue-50/50 transition-colors flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {booking.client.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{booking.client}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase">{booking.serviceName || "Session"}</span>
                            <span className="flex items-center gap-1"><Mail size={12}/> {booking.email}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="font-bold text-gray-900 text-sm mb-1">{booking.time}</div>
                       <div className="text-xs text-gray-500">{booking.date}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Main Application ---

const App = () => {
  const [currentView, setCurrentView] = useState('customer'); // 'customer' | 'seller'
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Default schedules helper
  const defaultSchedule = {
      1: { active: true, ranges: [{start: "09:00", end: "12:00"}, {start: "13:00", end: "17:00"}] }, // Mon
      2: { active: true, ranges: [{start: "10:00", end: "16:00"}] }, // Tue
      3: { active: true, ranges: [{start: "09:00", end: "17:00"}] }, // Wed
      4: { active: true, ranges: [{start: "09:00", end: "17:00"}] }, // Thu
      5: { active: true, ranges: [{start: "09:00", end: "13:00"}] }, // Fri
  };

  const restrictedSchedule = {
      1: { active: true, ranges: [{start: "14:00", end: "16:00"}] }, 
      3: { active: true, ranges: [{start: "14:00", end: "16:00"}] }, 
      5: { active: true, ranges: [{start: "14:00", end: "16:00"}] }, 
  };

  // --- Shared State ---

  const [providerConfig, setProviderConfig] = useState({
    name: "Sarah Jenkins",
    role: "Senior Product Designer",
    avatar: "SJ",
    // New Structure: Schedule is now nested inside sessionTypes
    sessionTypes: [
        { name: "Consultation", duration: 60, price: 150, schedule: defaultSchedule },
        { name: "Quick Chat", duration: 30, price: 80, schedule: restrictedSchedule }
    ],
  });

  // Helper to get formatted date for mock data
  const getMockDate = (offset = 0) => {
      const d = new Date();
      d.setDate(d.getDate() + offset);
      return d.toISOString().split('T')[0];
  };

  const [bookings, setBookings] = useState([
    { id: 101, date: getMockDate(2), time: '10:00', client: 'Alice Freeman', email: 'alice@example.com', serviceName: 'Consultation' },
  ]);

  const showNotification = (msg, type = 'success') => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 4000);
  };

  const handleBooking = (newBooking) => {
    const bookingWithId = { ...newBooking, id: Math.floor(Math.random() * 10000) };
    setBookings(prev => [...prev, bookingWithId]);
    showNotification(`New booking received from ${newBooking.client}`, 'email');
  };

  const handleConfigUpdate = (newConfig) => {
    setProviderConfig({ ...providerConfig, ...newConfig });
    showNotification("Settings saved successfully", "success");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-gray-900 font-sans selection:bg-blue-200">
      <Toast message={notification.message} type={notification.type} isVisible={notification.show} />

      {/* Global View Toggle */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-2xl border border-gray-200 flex gap-1">
        <button
          onClick={() => setCurrentView('customer')}
          className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
            currentView === 'customer' 
              ? 'bg-black text-white shadow-lg' 
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Customer View
        </button>
        <button
          onClick={() => setCurrentView('seller')}
          className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
            currentView === 'seller' 
              ? 'bg-black text-white shadow-lg' 
              : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Seller Dashboard
        </button>
      </div>

      <div className="transition-opacity duration-300">
        {currentView === 'customer' ? (
          <CustomerView 
            providerConfig={providerConfig} 
            bookings={bookings} 
            onBook={handleBooking}
          />
        ) : (
          <SellerView 
            providerConfig={providerConfig} 
            onUpdateConfig={handleConfigUpdate} 
            bookings={bookings}
          />
        )}
      </div>
    </div>
  );
};

export default App;