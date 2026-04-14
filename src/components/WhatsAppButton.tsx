import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/919876543210?text=Hi%20Suntech%2C%20I%20am%20interested%20in%20solar%20solutions"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    animate={{ y: [0, -5, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    <MessageCircle className="w-7 h-7 text-card" fill="currentColor" />
  </motion.a>
);

export default WhatsAppButton;
