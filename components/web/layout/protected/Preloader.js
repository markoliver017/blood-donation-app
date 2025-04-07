import { motion } from 'framer-motion';
import { LinearGradient } from 'expo-linear-gradient';

export default function Preloader({ isLoading }) {
    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoading ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {/* Linear Gradient Background */}
            <LinearGradient
                colors={['#fff', '#f7f7f7']} // Deep blue to bright blue gradient
                start={[0, 0]}
                end={[1, 1]}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
            />

            {/* Animated Loading Text */}
            <motion.div
                className="text-2xl font-semibold text-blue-500 relative"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
            >
                Loading...
            </motion.div>
        </motion.div>
    );
}
