'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useAnalytics } from '../../hooks/useAnalytics';
import { getConfig } from '../../utils/configUtils';

export default function AnalyticsProvider() {
    const { analyticsEnabled } = useAnalytics();
    const isDev = process.env.NODE_ENV === 'development';

    return (
        <>
            {analyticsEnabled && (
                <>
                    <Analytics
                        debug={isDev}
                    />
                    <SpeedInsights 
                        debug={isDev}
                    />
                </>
            )}
        </>
    );
}
