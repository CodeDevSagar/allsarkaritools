import React, { useEffect } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const AdSlot = ({ slot, style, format = 'auto', responsive = 'true' }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn('AdSense error:', e);
    }
  }, []);

  return (
    <div className="ad-container my-12 text-center overflow-hidden">
      <div className="mb-2 text-center opacity-30">
        <Text className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Sponsored Content</Text>
      </div>
      <div className="bg-white/5 border border-white/5 rounded-2xl min-h-[100px] flex items-center justify-center relative">
        <ins 
          className="adsbygoogle"
          style={style || { display: 'block' }}
          data-ad-client="ca-pub-0000000000000000"
          data-ad-slot={slot || "0000000000"}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        ></ins>
        {/* Placeholder for Dev view */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Text className="text-gray-700 font-bold uppercase tracking-widest text-xs">Ad Slot {slot || 'Automatic'}</Text>
        </div>
      </div>
    </div>
  );
};

export default AdSlot;
