/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Sun, 
  Moon, 
  Download, 
  ShoppingBag, 
  Smartphone, 
  Monitor, 
  Image as ImageIcon,
  ChevronRight,
  ShieldCheck,
  Zap,
  Flame,
  ArrowRight,
  X,
  Maximize2,
  Minimize2,
  Search
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  tag?: string;
}

const FEATURED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Midnight GT',
    price: 'R29',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=800',
    tag: 'Trending'
  },
  {
    id: '2',
    name: 'Velocity Red',
    price: 'R29',
    image: 'https://images.unsplash.com/photo-1544636331-e26859203199?auto=format&fit=crop&q=80&w=800',
    tag: 'New'
  },
  {
    id: '3',
    name: 'Neon Drift',
    price: 'R29',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800'
  }
];

const BUNDLES = [
  { title: 'Starter Pack', count: '5 Wallpapers', price: 'R49', icon: <ImageIcon className="w-5 h-5" /> },
  { title: 'Pro Pack', count: '10 Wallpapers', price: 'R79', icon: <Flame className="w-5 h-5" />, popular: true },
  { title: 'Ultimate Collection', count: 'All Access', price: 'R129', icon: <Zap className="w-5 h-5" /> },
];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#050505';
      document.body.style.color = '#F5F5F5';
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#111111';
    }
  }, [darkMode]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !selectedProduct) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const transitionConfig = {
    duration: 1,
    ease: [0.22, 1, 0.36, 1]
  };

  return (
    <div className="min-h-screen font-sans selection:bg-gold selection:text-black flex flex-col">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gold origin-left z-[100]"
        style={{ scaleX }}
      />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-10 py-6 border-b luxury-border bg-luxury-bg/80 backdrop-blur-md flex justify-between items-center transition-all duration-500">
        <div className="flex items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white font-serif text-2xl tracking-widest uppercase font-bold"
          >
            VELAR <span className="font-normal italic">STUDIOS</span>
          </motion.div>
          
          <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-white/40">
            {['Collections', 'Wallpapers', 'Posters', 'Bundles'].map(link => (
              <a key={link} href="#" className="hover:text-gold hover:opacity-100 transition-all">{link}</a>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-full bg-white/5 border luxury-border text-white hover:bg-white/10 transition-all cursor-pointer"
            id="theme-toggle"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
          <button className="bg-white text-black px-8 py-2.5 text-[10px] uppercase tracking-[0.2em] font-black rounded-full hover:bg-gold transition-colors shadow-lg">
            Cart
          </button>
        </div>
      </nav>

      <div className="flex-1 flex pt-[88px]">
        {/* Side Marker Bar */}
        <div className="hidden md:flex w-20 border-r luxury-border flex-col items-center justify-center gap-32 py-10">
          <span className="rotate-[-90deg] whitespace-nowrap text-[10px] uppercase tracking-[0.5em] opacity-30 font-bold">EST. MMXXIV</span>
          <span className="rotate-[-90deg] whitespace-nowrap text-[10px] uppercase tracking-[0.5em] opacity-30 font-bold">HIGH FIDELITY ART</span>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-x-hidden">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center px-10 md:px-20 overflow-hidden border-b luxury-border">
            <div className="absolute inset-0 z-0">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920"
                className="w-full h-full object-cover grayscale-[0.2] opacity-70"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-rear-view-of-a-sports-car-driving-through-a-tunnel-42931-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg/20 via-transparent to-luxury-bg/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-bg/60 via-transparent to-transparent" />
              <div className="absolute top-0 right-0 w-[800px] h-full bg-gold/5 blur-[120px] rounded-full translate-x-1/2" />
            </div>

            <div className="relative z-10 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <h1 className="text-[14vw] sm:text-[100px] font-serif leading-[0.8] mb-8 tracking-tighter">
                  DRIVE THE <br />
                  <span className="italic font-normal gold-accent">AESTHETIC.</span>
                </h1>
                <p className="text-sm md:text-base text-white/50 mb-12 max-w-md font-light leading-relaxed">
                  Cinematic captures of automotive excellence. High-resolution digital wallpapers and archival quality physical posters for the modern enthusiast.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <button className="px-10 py-4 bg-gold text-white font-bold rounded-full hover:bg-gold/80 transition-all flex items-center gap-3 group text-xs uppercase tracking-widest">
                    Browse Collection <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button className="px-10 py-4 bg-white/5 backdrop-blur-md text-white border luxury-border font-bold rounded-full hover:bg-white/10 transition-all text-xs uppercase tracking-widest">
                    Explore Posters
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Categories Grid */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={transitionConfig}
            className="py-[120px] px-10 md:px-20"
          >
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] gold-accent mb-3 block">Archives</span>
                <h2 className="text-4xl md:text-6xl font-serif tracking-tight">Curated <span className="italic font-normal">Collections</span></h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Phone Wallpapers', icon: <Smartphone />, count: '240+ Assets', bg: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=800' },
                { name: 'Desktop 4K', icon: <Monitor />, count: '180+ Assets', bg: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800' },
                { name: 'Physical Posters', icon: <ShoppingBag />, count: 'Archival Print', bg: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800' }
              ].map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...transitionConfig, delay: i * 0.1 }}
                  whileHover={{ y: -15 }}
                  className="group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer border luxury-border"
                >
                  <img src={item.bg} alt={item.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg to-transparent opacity-80" />
                  <div className="absolute inset-0 p-10 flex flex-col justify-between text-white">
                    <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border luxury-border group-hover:border-gold/50 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-3xl font-serif mb-2">{item.name}</h3>
                      <p className="text-gold/60 text-xs font-bold uppercase tracking-widest">{item.count}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Featured Visuals */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={transitionConfig}
            className="py-[120px] px-10 md:px-20 border-y luxury-border bg-white/[0.01]"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={transitionConfig}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] gold-accent mb-3 block">High Fidelity</span>
                  <h2 className="text-4xl md:text-6xl font-serif tracking-tight">Museum <span className="italic font-normal">Selects</span></h2>
                </motion.div>
                <button className="text-[10px] font-black tracking-[0.3em] flex items-center gap-3 hover:text-gold transition-colors uppercase">
                  ENTER ARCHIVE <ChevronRight size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {FEATURED_PRODUCTS.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...transitionConfig, delay: i * 0.15 }}
                    className="group"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative aspect-[4/5] bg-neutral-950 rounded-[2.5rem] overflow-hidden mb-8 border luxury-border card-glass">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70"
                        referrerPolicy="no-referrer"
                      />
                      {product.tag && (
                        <span className="absolute top-6 left-6 px-4 py-1.5 bg-gold text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full z-20">
                          {product.tag}
                        </span>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-8 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
                        <button className="w-full py-5 bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 shadow-2xl hover:bg-gold transition-colors">
                          <ShoppingBag size={18} /> Purchase Access
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center px-4">
                      <div>
                        <h3 className="text-2xl font-serif mb-1">{product.name}</h3>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Digital License • 4K Master</p>
                      </div>
                      <div className="text-2xl font-serif gold-accent">{product.price}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Pricing Bundles */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={transitionConfig}
            className="py-[120px] px-10 md:px-20 overflow-hidden relative"
          >
            <div className="text-center mb-20">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] gold-accent mb-3 block">Membership</span>
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6">Velar <span className="italic font-normal">Bundles</span></h2>
              <p className="text-sm opacity-50 font-light max-w-lg mx-auto leading-relaxed">Curated asset collections designed for the ultimate automotive experience.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BUNDLES.map((bundle, i) => (
                <motion.div
                  key={bundle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...transitionConfig, delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className={`p-10 rounded-[3rem] border transition-all ${
                    bundle.popular 
                      ? 'bg-white/[0.02] border-gold/30 text-white shadow-2xl relative overflow-hidden' 
                      : 'bg-white/[0.01] border-white/5'
                  }`}
                >
                  {bundle.popular && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[50px] -mr-10 -mt-10" />
                  )}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 ${bundle.popular ? 'bg-gold/20' : 'bg-white/5'}`}>
                    {bundle.icon}
                  </div>
                  <h3 className="text-2xl font-serif mb-2">{bundle.title}</h3>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-10">{bundle.count}</p>
                  <div className="text-5xl font-serif mb-10 gold-accent">{bundle.price}</div>
                  <button className={`w-full py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
                    bundle.popular ? 'bg-gold text-white hover:bg-gold/80' : 'bg-white text-black hover:bg-gold hover:text-white'
                  }`}>
                    ACQUIRE PACK <Download size={16} />
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Bottom Interactive Callout */}
          <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={transitionConfig}
            className="py-[120px] px-10 md:px-20 bg-neutral-950 text-white relative border-t luxury-border"
          >
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={transitionConfig}
                className="text-4xl md:text-7xl font-serif tracking-tight mb-8"
              >
                CHOOSE YOUR <span className="italic font-normal gold-accent">DRIVE</span>
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {['GT3 ARCHIVE', 'VINTAGE 90S', 'MODERN EXOTIC'].map((car, i) => (
                  <motion.button
                    key={car}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...transitionConfig, delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/5 border luxury-border backdrop-blur-sm p-10 rounded-[2.5rem] hover:border-gold/50 transition-all font-bold tracking-[0.3em] text-[9px] uppercase group"
                  >
                    <div className="text-gold/20 text-3xl font-serif mb-6 group-hover:text-gold transition-colors">0{i+1}</div>
                    {car}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Status Bar / Footer */}
          <footer className="h-16 md:h-20 border-t luxury-border px-10 flex flex-col md:flex-row items-center justify-between text-[9px] uppercase tracking-[0.3em] font-bold opacity-40 bg-luxury-bg">
            <div className="flex gap-4 items-center">
               <span>&copy; 2026 VELAR STUDIOS</span>
               <div className="w-[1px] h-3 bg-white/20"></div>
               <span>CAPE TOWN ARCHIVE</span>
            </div>
            <div className="flex gap-10 py-4 md:py-0">
              <a href="#" className="hover:text-gold transition-colors">Terms</a>
              <a href="#" className="hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-gold transition-colors">Support</a>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span>SERVER: OPTIMAL</span>
            </div>
          </footer>
        </div>
      </div>

      {/* Interactive Detail Viewer */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-luxury-bg/95 backdrop-blur-xl"
          >
            <motion.div
              layoutId={`product-${selectedProduct.id}`}
              className="relative w-full max-w-6xl h-full max-h-[85vh] flex flex-col md:flex-row gap-10"
            >
              <div 
                className="relative flex-1 bg-black rounded-[2.5rem] overflow-hidden border luxury-border cursor-crosshair group"
                onMouseMove={handleMouseMove}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <div 
                  className="w-full h-full transition-transform duration-200 ease-out flex items-center justify-center"
                  style={{
                    transform: isZoomed ? `scale(2.5)` : `scale(1)`,
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                  }}
                >
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="absolute top-6 right-6 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border luxury-border text-white hover:bg-white/20">
                    {isZoomed ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                  </div>
                </div>

                {!isZoomed && (
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/40 backdrop-blur-md border luxury-border rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-white pointer-events-none">
                    Click to Inspect Detail
                  </div>
                )}
              </div>

              <div className="w-full md:w-[350px] flex flex-col justify-center">
                <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4">Masterpiece Archive</span>
                <h2 className="text-4xl md:text-6xl font-serif mb-6">{selectedProduct.name}</h2>
                <div className="space-y-6 mb-12 opacity-60 text-sm font-light leading-relaxed">
                  <p>A cinema-grade render optimized for large format displays and fine-art prints. Each detail is captured with high-fidelity precision.</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border luxury-border">
                      <div className="text-[9px] uppercase tracking-widest font-black gold-accent mb-1">Resolution</div>
                      <div className="font-serif">7680 × 4320</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border luxury-border">
                      <div className="text-[9px] uppercase tracking-widest font-black gold-accent mb-1">Format</div>
                      <div className="font-serif">RAW (ProRes)</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <button className="w-full py-5 bg-gold text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3">
                    <ShoppingBag size={18} /> Purchase License
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedProduct(null);
                      setIsZoomed(false);
                    }}
                    className="w-full py-5 bg-white/5 text-white border luxury-border font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10"
                  >
                    Close Archive
                  </button>
                </div>
              </div>

              <button 
                onClick={() => {
                  setSelectedProduct(null);
                  setIsZoomed(false);
                }}
                className="absolute -top-12 -right-0 md:-right-12 p-3 text-white/40 hover:text-white transition-colors"
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
