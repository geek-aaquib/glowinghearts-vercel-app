"use client";

import { useEffect, useState } from "react";

export function useGeoCheck() {
    const [geoBlocked, setGeoBlocked] = useState(false);
    const [geoReason, setGeoReason] = useState("");
    const [checkingLocation, setCheckingLocation] = useState(true);
    const [clientIp, setClientIp] = useState<string | null>(null);
    const [clientGeo, setClientGeo] = useState<string | null>(null);

    useEffect(() => {
        const checkGeo = async () => {
            const CACHE_KEY = "geo-checked";
            const CACHE_TTL = 1000 * 60 * 10; // 10 minutes

            try {
                if (typeof window === "undefined") {
                    setCheckingLocation(false);
                    return;
                }

                // Try cached data
                let cachedStr: string | null = null;
                try {
                    cachedStr = localStorage.getItem(CACHE_KEY);
                } catch (err) {
                    console.warn("localStorage read failed:", err);
                }

                if (cachedStr) {
                    try {
                        const parsed = JSON.parse(cachedStr);
                        if (parsed.expires && parsed.expires > Date.now()) {
                            setGeoBlocked(!!parsed.isBlocked);
                            setGeoReason(parsed.reason || "");
                            setClientIp(parsed.ip || null);
                            setClientGeo(parsed.geo || null);
                            setCheckingLocation(false);
                            return;
                        } else {
                            try { localStorage.removeItem(CACHE_KEY); } catch { }
                        }
                    } catch (err) {
                        console.warn("Invalid geo cache, clearing it:", err);
                        try { localStorage.removeItem(CACHE_KEY); } catch { }
                    }
                }

                // lookup
                const res = await fetch("/api/geo");
                const data = await res.json();

                console.log(data)
                const {
                    country_code,
                    region_code,
                    vpn,
                    proxy,
                    hosting,
                    tor,
                    anonymous,
                    ip,
                    region,
                    country,
                    city,
                } = data;

                const geoStr = `${city} ${region} ${country}`;
                setClientIp(ip);
                setClientGeo(geoStr);

                const isInOntario =
                    country_code === "CA" &&
                    (region_code === "ON" || region === "Ontario");

                const isUsingVPN =
                    vpn === true ||
                    proxy === true ||
                    tor === true ||
                    hosting === true ||
                    anonymous === true;

                const isBlocked = !isInOntario || isUsingVPN;

                let reason = "";
                if (isBlocked) {
                    if (!isInOntario) {
                        reason = "This raffle is only available to residents of Ontario.";
                    } else if (isUsingVPN) {
                        reason = "VPN or proxy detected. Please disable it.";
                    } else {
                        reason = "Unusual IP behaviour detected. Please refresh or try another browser/device.";
                    }
                }

                const cacheObj = {
                    isBlocked,
                    reason,
                    ip,
                    geo: geoStr,
                    timestamp: Date.now(),
                    expires: Date.now() + CACHE_TTL,
                };
                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheObj));
                } catch (err) {
                    console.warn("localStorage write failed:", err);
                }

                setGeoBlocked(isBlocked);
                setGeoReason(reason);
            } catch (err) {
                console.error("Geo check failed:", err);
                setGeoBlocked(true);
                setGeoReason("Unable to verify your location.");
            } finally {
                setCheckingLocation(false);
            }
        };

        checkGeo();
    }, []);

    return { geoBlocked, geoReason, checkingLocation, clientIp, clientGeo };
}