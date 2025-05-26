import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AudioUpload from './AudioUpload';
import ResultCard from './ResultCard';
import toast from 'react-hot-toast';

export default function TryDemo() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('audio', file);

        try {
            const res = await fetch('http://localhost:5000/analyze', {
                method: 'POST',
                body: formData,
            });
            toast.success('Audio analyzed successfully!');
            const data = await res.json();
            setResult({ data, filename: file.name });
        } catch (error) {
            console.error('Error during analysis:', error);
            setResult({ error: 'Failed to analyze audio' });
            toast.error('Failed to analyze audio');
        }
        setLoading(false);
    };

    return (
        <motion.section
            id="try"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
            className="border-b-4 border-gray-900 py-16 px-4 text-white"
        >
            <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#BFFF00] via-[#80FF00] to-[#00FF80] bg-clip-text text-transparent drop-shadow-[0_0_7px_#BFFF00,0_0_18px_#00FF80]">
                Try The Demo
            </h2>
            <div className="max-w-2xl mx-auto space-y-6">
                <AudioUpload onAnalyze={handleAnalyze} />
                {loading && (
                    <div className="flex justify-center my-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                )}
                {result && <ResultCard result={result} />}
            </div>
        </motion.section>
    );
}
