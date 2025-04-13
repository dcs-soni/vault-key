
import { Link } from 'react-router-dom';
import { Github, Twitter, Shield, Lock, Heart, Globe, Fingerprint, ChevronRight, Zap, CheckCircle, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <footer className="relative overflow-hidden pt-24 pb-12">
      {/* SVG Wave Divider */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="w-full h-16 text-background" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-background"></path>
        </svg>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-gold/5 backdrop-blur-3xl -z-10"></div>
      
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-10 mb-16">
          <div className="col-span-1 md:col-span-10 flex flex-col items-center text-center">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden group-hover:scale-110 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-teal animate-gradient-shift bg-size-200"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <KeyRound size={18} className="text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <span className="font-poppins font-bold text-4xl tracking-tight">
                <span className="text-navy dark:text-white">vault</span>
                <span className="bg-clip-text text-transparent bg-gradient-teal">Key</span>
              </span>
            </Link>
            <p className="text-lg w-1/2 text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-space">
              A zero-knowledge password manager where your data remains truly yours, with advanced encryption and complete privacy protection for the future.
            </p>
          </div>
          
         
        </div>
        
        <div className="relative">
          <div className="gradient-card">
            <motion.div 
              className="gradient-card-inner p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal/20 to-teal/10 flex items-center justify-center shadow-inner animate-pulse">
                    <Lock className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium font-poppins">End-to-End Encryption</h3>
                    <p className="text-sm text-gray-500">Your data is yours and yours alone</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal/20 to-teal/10 flex items-center justify-center shadow-inner animate-pulse">
                    <Shield className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium font-poppins">Zero-Knowledge Architecture</h3>
                    <p className="text-sm text-gray-500">We can't access your data</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal/20 to-teal/10 flex items-center justify-center shadow-inner animate-pulse">
                    <Fingerprint className="w-5 h-5 text-teal" />
                    
                  </div>
                  <div>
                    <h3 className="font-medium font-poppins">Master-Password Access</h3>
                    <p className="text-sm text-gray-500">Secure and convenient</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="pt-10 mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-200/50 dark:border-navy-800/30">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0 font-light">
            © {new Date().getFullYear()} vaultKey. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 font-light">
            <span>Built with</span>
            <Heart size={14} className="text-red-500 mx-1 hover:animate-pulse" />
            <span>for security and privacy</span>
            <Zap size={14} className="text-teal ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
