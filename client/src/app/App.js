import './App.scss';
import { AppProvider } from './context';
import About from './sections/About';
import Header from './sections/Header';
import Products from './sections/Products';
import MapSection from './sections/MapSection';
import Footer from './sections/Footer';
import { gsap } from 'gsap';
import { ScrollToPlugin, ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

function App() {
	return (
		<div className="app">
			<AppProvider>
				<Header />
				<About />
				<Products />
				<MapSection />
				<Footer />
			</AppProvider>
		</div>
	);
}

export default App;
