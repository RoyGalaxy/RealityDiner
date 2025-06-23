import ModelViewer from '@/components/ModelViewer'
import AnimatedContent from '@/components/reactbits/AnimatedComponent'
import SplitText from '@/components/reactbits/SplitText'
import React from 'react'
import { FaCamera, FaChartLine, FaCube, FaMobileAlt, FaUsers } from 'react-icons/fa'
import { FiBox } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const Sales = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-2">
          <SplitText
            text="Reality Diner"
            className="text-2xl font-semibold text-center"
            delay={100}
            animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
            animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            easing="easeOutCubic"
            threshold={0.2}
            rootMargin="0px"
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
          Contact Us
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")'
          }}
        ></div>
        <div className="relative z-20 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Experience the Future of Dining
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            See food before you order — with immersive AR
          </p>
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
          >
            Try RealityDiner Now
          </button>
        </div>
      </section>

      {/* What is RealityDiner Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">What is RealityDiner?</h2>
          <p className="text-lg text-gray-300 mb-12 max-w-4xl">
            RealityDiner uses cutting-edge Webxr and 3D models to bring dishes to life on your table. No app required — just scan a QR code or open the web link on your phone.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <AnimatedContent
              distance={50}
              reverse={false}
              config={{ tension: 100, friction: 20 }}
              initialOpacity={0.2}
              animateOpacity
              scale={0.8}
              threshold={0.8}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl text-center group hover:scale-105 transition-all duration-300 border border-gray-700/30 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-600/10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-blue-600/20 transform group-hover:-translate-y-1 transition-all duration-300">
                  <FaMobileAlt className="text-3xl text-white/90" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-400">No App Required</h3>
                <p className="text-gray-400 text-sm">Access instantly through your web browser</p>
              </div>
            </AnimatedContent>

            <AnimatedContent
              distance={50}
              reverse={false}
              config={{ tension: 100, friction: 20 }}
              initialOpacity={0.2}
              animateOpacity
              scale={0.8}
              threshold={0.8}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl text-center group hover:scale-105 transition-all duration-300 border border-gray-700/30 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-600/10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-blue-600/20 transform group-hover:-translate-y-1 transition-all duration-300">
                  <FaCube className="text-3xl text-white/90" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Realistic 3D Dishes</h3>
                <p className="text-gray-400 text-sm">High-quality models with accurate details</p>
              </div>
            </AnimatedContent>
            <AnimatedContent
              distance={50}
              reverse={false}
              config={{ tension: 100, friction: 20 }}
              initialOpacity={0.2}
              animateOpacity
              scale={0.8}
              threshold={0.8}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl text-center group hover:scale-105 transition-all duration-300 border border-gray-700/30 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-600/10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-blue-600/20 transform group-hover:-translate-y-1 transition-all duration-300">
                  <FaCamera className="text-3xl text-white/90" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Instant AR Preview</h3>
                <p className="text-gray-400 text-sm">See dishes on your table in real-time</p>
              </div>
            </AnimatedContent>
            <AnimatedContent
              distance={50}
              reverse={false}
              config={{ tension: 100, friction: 20 }}
              initialOpacity={0.2}
              animateOpacity
              scale={0.8}
              threshold={0.8}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl text-center group hover:scale-105 transition-all duration-300 border border-gray-700/30 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-600/10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-blue-600/20 transform group-hover:-translate-y-1 transition-all duration-300">
                  <FaUsers className="text-3xl text-white/90" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Better Confidence</h3>
                <p className="text-gray-400 text-sm">Customers know exactly what to expect</p>
              </div>
            </AnimatedContent>
            <AnimatedContent
              distance={50}
              reverse={false}
              config={{ tension: 100, friction: 20 }}
              initialOpacity={0.2}
              animateOpacity
              scale={0.8}
              threshold={0.8}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl text-center group hover:scale-105 transition-all duration-300 border border-gray-700/30 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-600/10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-blue-600/20 transform group-hover:-translate-y-1 transition-all duration-300">
                  <FaChartLine className="text-3xl text-white/90" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Boost Sales</h3>
                <p className="text-gray-400 text-sm">Increase orders with visual appeal</p>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Interactive Demo
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto">
            Experience our AR technology firsthand. Rotate, zoom, and view the dish in augmented reality.
          </p>
          <AnimatedContent
            distance={50}
            reverse={false}
            config={{ tension: 100, friction: 20 }}
            initialOpacity={0.2}
            animateOpacity
            scale={0.8}
            threshold={0.5}
          >
            <div className='relative md:w-2/3 sm:w-5/6 aspect-square mx-auto mb-16 rounded-2xl overflow-hidden shadow-2xl shadow-blue-600/20'>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent z-10 pointer-events-none"></div>
              <model-viewer
                src={`${import.meta.env.VITE_BACKEND_URL}/model3d/653afcf9-13a2-4e48-84e5-906dd12a2621breakfast.glb`}
                poster={`${import.meta.env.VITE_BACKEND_URL}/image/1QCFCk1SDXlEoHVwIAyHLjscmJ2ngRO2a.jpg`}
                alt="3D Food Model Demo"
                auto-rotate
                camera-controls
                ar
                exposure="1"
                shadow-intensity="1"
                environment-image="neutral"
                style={{ width: "100%", height: "100%" }}
                className="bg-gray-800/50 backdrop-blur-sm"
              >
                <button
                  slot="ar-button"
                  className="flex items-center gap-2 absolute top-4 left-4 text-sm text-white py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-600/30 border border-blue-500/30 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <FiBox fontSize={20} />
                  View in AR
                </button>
              </model-viewer>
            </div>
          </AnimatedContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/home')}
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-600/25 flex items-center gap-2"
            >
              Launch Website
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            How It Works
          </h2>
          <div className="relative">
            {/* Connecting lines */}
            <div className="absolute left-[22px] top-12 w-0.5 h-[calc(100%-48px)] bg-gradient-to-b from-blue-400 to-blue-600"></div>

            <div className="space-y-16">
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/30">
                  <span className="text-xl font-bold">1</span>
                </div>
                <div className="bg-gray-700/50 backdrop-blur-sm p-8 rounded-2xl flex-grow border border-gray-600/30">
                  <p className="text-lg font-medium text-blue-400">Customer visits menu page</p>
                  <p className="text-gray-300 mt-2">Browse through available dishes and categories</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/30">
                  <span className="text-xl font-bold">2</span>
                </div>
                <div className="bg-gray-700/50 backdrop-blur-sm p-8 rounded-2xl flex-grow border border-gray-600/30">
                  <p className="text-lg font-medium text-blue-400">Selects a dish</p>
                  <p className="text-gray-300 mt-2">View detailed information and pricing</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/30">
                  <span className="text-xl font-bold">3</span>
                </div>
                <div className="bg-gray-700/50 backdrop-blur-sm p-8 rounded-2xl flex-grow border border-gray-600/30">
                  <p className="text-lg font-medium text-blue-400">Taps "View in AR"</p>
                  <p className="text-gray-300 mt-2">Access the AR viewer with a single tap</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-600/30">
                  <span className="text-xl font-bold">4</span>
                </div>
                <div className="bg-gray-700/50 backdrop-blur-sm p-8 rounded-2xl flex-grow border border-gray-600/30">
                  <p className="text-lg font-medium text-blue-400">Dish appears on their table in AR</p>
                  <p className="text-gray-300 mt-2">Experience the dish in real-world scale</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Integration Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Restaurant Integration
          </h2>
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Restaurants can easily onboard by providing their menu and dish images. We'll create the 3D models and integrate them into your digital menu.
          </p>
          <div className="bg-gray-800/50 p-8 rounded-2xl shadow-xl backdrop-blur-sm max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <input
                type="email"
                placeholder="Enter your business email"
                className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
              />
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-600/25">
                Get Started
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Join hundreds of restaurants already using RealityDiner
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">📧</a>
              <a href="#" className="text-gray-400 hover:text-white">📱</a>
              <a href="#" className="text-gray-400 hover:text-white">🌐</a>
            </div>
          </div>
          <div className="text-center text-gray-400">
            <p>© 2024 RealityDiner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Sales