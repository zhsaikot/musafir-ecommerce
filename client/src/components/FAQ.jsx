import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "How long does the battery last?",
    answer: "The Digital Tasbih Ring features a high-capacity rechargeable battery. On a single charge, it can last for weeks depending on your daily Zikr count and Bluetooth usage."
  },
  {
    question: "Is it really waterproof for Wudu?",
    answer: "Yes! The ring is designed with an IP67 waterproof rating. You can easily perform Wudu and wash your hands without any worry."
  },
  {
    question: "How does the Cash on Delivery (COD) work?",
    answer: "You pay nothing in advance. Our delivery partner will bring the product to your doorstep anywhere in Bangladesh. You inspect the product and pay the delivery man in cash."
  },
  {
    question: "What is the delivery time?",
    answer: "Inside Dhaka, delivery takes 24-48 hours. Outside Dhaka, it takes 3-5 working days."
  }
]

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="py-20 bg-dark-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-dark border border-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left text-white hover:bg-gray-900 transition"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`text-primary transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              {openIndex === index && (
                <div className="p-6 pt-0 text-gray-400 border-t border-gray-800">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ