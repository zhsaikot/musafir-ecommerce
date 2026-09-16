import { Monitor, Bluetooth, Bell, Battery, Droplets, Hash } from 'lucide-react'

const features = [
  {
    icon: <Monitor size={32} />,
    title: "OLED Display",
    desc: "Bright, clear screen to track your count effortlessly in any light."
  },
  {
    icon: <Bluetooth size={32} />,
    title: "Bluetooth App",
    desc: "Connect to our mobile app to track daily Zikr goals and history."
  },
  {
    icon: <Bell size={32} />,
    title: "Prayer Reminder",
    desc: "Gentle vibration reminders so you never miss your daily Dhikr."
  },
  {
    icon: <Battery size={32} />,
    title: "Rechargeable",
    desc: "Long-lasting battery. Charge once and use it for weeks."
  },
  {
    icon: <Droplets size={32} />,
    title: "Waterproof",
    desc: "Wudu-safe design. Wear it anytime without worry."
  },
  {
    icon: <Hash size={32} />,
    title: "Smart Counter",
    desc: "Accurate digital counting. Stop losing track of your SubhanAllah."
  }
]

const Features = () => {
  return (
    <section id="features" className="py-20 bg-dark-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Premium <span className="text-primary">Features</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Designed for the modern Muslim. Combining faith with smart technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-dark p-8 rounded-xl border border-gray-800 hover:border-primary/50 transition duration-300 group"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features