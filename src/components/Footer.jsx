import { Link } from 'react-router-dom';
import { FaBus, FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-navy-900 border-t border-navy-700 relative z-10">
            <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="bg-gold-500/10 p-2 rounded-lg">
                        <FaBus className="text-gold-500 text-lg" />
                    </div>
                    <div>
                        <p className="text-cream font-display font-semibold text-sm">TravelEase</p>
                        <p className="text-slate-500 text-xs">Book your journey with confidence</p>
                    </div>
                </div>

                <p className="text-slate-600 text-xs">
                    © {new Date().getFullYear()} TravelEase — Built by Renuka Joshi
                </p>
            </div >
        </footer >
    );
}

export default Footer;